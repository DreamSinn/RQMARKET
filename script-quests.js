// ============================================================================
// QUEST DATA DATABASE
// ============================================================================
// Dados extraídos da planilha: https://docs.google.com/spreadsheets/d/10dzoAqjbt4Yvge02wxbyUIezEu4LqmU_Y1WCqxUOCno
// Estrutura: { name, quantity (quantidade de itens necessários), questProfit (ouro que a quest dá) }

const QUEST_DATA = [
    { name: 'agreement ostin', quantity: 10, questProfit: 59978 },
    { name: 'prostrate shrub', quantity: 7, questProfit: 48750 },
    { name: 'gray sand', quantity: 18, questProfit: 59978 },
    { name: 'dud bomb', quantity: 18, questProfit: 64089 },
    { name: 'snowb head', quantity: 15, questProfit: 55994 },
    { name: 'northen bbz carapace', quantity: 8, questProfit: 52315 },
    { name: 'snowb carapace', quantity: 20, questProfit: 68522 },
    { name: 'snow bbz meat', quantity: 10, questProfit: 64089 },
    { name: 'hoof', quantity: 14, questProfit: 64089 },
    { name: 'black roe', quantity: 18, questProfit: 59978 },
    { name: 'twisted horn', quantity: 30, questProfit: 68522 },
    { name: 'waldermine collar', quantity: 10, questProfit: 64089 },
    { name: 'horny spike', quantity: 18, questProfit: 64089 },
    { name: 'alpha drill', quantity: 15, questProfit: 64089 },
    { name: 'hard alloy', quantity: 10, questProfit: 64089 },
    { name: 'magnesium ore', quantity: 5, questProfit: 48750 },
    { name: 'stella ore', quantity: 9, questProfit: 59978 },
    { name: 'Trial shot monocular', quantity: 8, questProfit: 59978 },
    { name: 'hoarbug', quantity: 25, questProfit: 59978 },
    { name: 'obykhan cloud', quantity: 5, questProfit: 48750 },
    { name: 'waldermine pelt', quantity: 10, questProfit: 55994 },
    { name: 'beautiful feather', quantity: 25, questProfit: 64089 },
    { name: 'poisonous feather', quantity: 25, questProfit: 68522 },
    { name: 'pild of old dust', quantity: 20, questProfit: 64089 },
    { name: 'shrew tail', quantity: 25, questProfit: 52315 },
    { name: 'snowb regulator', quantity: 14, questProfit: 59978 },
    { name: 'stoutbloom', quantity: 8, questProfit: 48750 },
    { name: 'cave salt', quantity: 10, questProfit: 64089 },
    { name: 'waldermine spit', quantity: 10, questProfit: 55994 },
    { name: 'icy streamer', quantity: 6, questProfit: 48750 },
    { name: 'tambourine', quantity: 8, questProfit: 64089 },
    { name: 'scorching tentacle', quantity: 16, questProfit: 59978 },
    { name: 'greengrow', quantity: 9, questProfit: 48750 }
];

// ============================================================================
// QUEST ANALYSIS MODULE
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    generateQuestPriceInputs();
    setupQuestAnalysis();
});

function generateQuestPriceInputs() {
    const pricesGrid = document.getElementById('questPricesGrid');
    if (!pricesGrid) return;

    pricesGrid.innerHTML = '';
    
    QUEST_DATA.forEach(quest => {
        const inputGroup = document.createElement('div');
        inputGroup.className = 'quest-price-input-group';
        
        // Tentar encontrar um ícone correspondente ou usar um padrão
        const label = document.createElement('label');
        label.textContent = quest.name;
        label.style.fontSize = '10px';
        label.style.textAlign = 'center';
        label.style.height = '24px';
        label.style.display = 'flex';
        label.style.alignItems = 'center';
        
        const input = document.createElement('input');
        input.type = 'number';
        input.className = 'quest-item-price';
        input.dataset.itemName = quest.name;
        input.value = '0';
        input.placeholder = 'Preço';
        input.step = '0.01';
        input.min = '0';
        
        inputGroup.appendChild(label);
        inputGroup.appendChild(input);
        pricesGrid.appendChild(inputGroup);
    });
}

function setupQuestAnalysis() {
    const analyzeQuestsBtn = document.getElementById('analyzeQuestsBtn');
    if (analyzeQuestsBtn) {
        analyzeQuestsBtn.addEventListener('click', performQuestAnalysis);
    }
}

// ============================================================================
// MAIN QUEST ANALYSIS FUNCTION
// ============================================================================

function performQuestAnalysis() {
    const questGoldAvailable = parseFloat(document.getElementById('questGoldAvailable').value) || 0;
    const accountsCount = parseInt(document.getElementById('questAccountsCount').value) || 1;
    const minProfitThreshold = parseFloat(document.getElementById('questMinProfit').value) || 0;

    // Validate inputs
    if (questGoldAvailable <= 0) {
        if (typeof addLog === 'function') {
            addLog('Por favor, insira um valor de ouro disponível maior que zero', 'error');
        }
        return;
    }

    // Get item prices from the price inputs
    const itemPrices = getQuestItemPrices();

    // Calculate profitability for each quest
    const questsWithProfit = QUEST_DATA.map(quest => {
        const unitPrice = itemPrices[quest.name] || 0;
        
        // Se o preço do item não foi informado (0 ou não existe), marcar como inválida
        const hasPrice = unitPrice > 0;
        
        const totalCost = quest.quantity * unitPrice;
        const netProfit = quest.questProfit - totalCost;
        const roi = totalCost > 0 ? ((netProfit / totalCost) * 100) : (netProfit > 0 ? 100 : 0);

        return {
            ...quest,
            unitPrice,
            totalCost,
            netProfit,
            roi,
            worthIt: netProfit > 0,
            hasPrice // Indica se o preço foi informado
        };
    });

    // Filter by minimum profit threshold, profitable quests, AND must have price informed
    const filteredQuests = questsWithProfit.filter(q => q.netProfit >= minProfitThreshold && q.worthIt && q.hasPrice);

    // Sort by ROI (descending) to prioritize best returns
    const sortedQuests = filteredQuests.sort((a, b) => b.roi - a.roi);

    // Distribute quantities based on available gold and accounts
    const questRecommendations = distributeQuestQuantities(sortedQuests, questGoldAvailable, accountsCount);

    // Display results
    displayQuestResults(questRecommendations, questGoldAvailable);

    if (typeof addLog === 'function') {
        const itemsWithoutPrice = questsWithProfit.filter(q => !q.hasPrice).length;
        let message = `Análise de Quests concluída: ${questRecommendations.length} quests recomendadas para ${accountsCount} conta(s)`;
        if (itemsWithoutPrice > 0) {
            message += ` (${itemsWithoutPrice} quests ignoradas por falta de preço)`;
        }
        addLog(message, 'success');
    }
}

// ============================================================================
// GET ITEM PRICES FROM INPUT FIELDS
// ============================================================================

function getQuestItemPrices() {
    const prices = {};
    
    // Get all price inputs from the quest panel
    const priceInputs = document.querySelectorAll('.quest-item-price');
    
    priceInputs.forEach((input, index) => {
        const itemName = input.dataset.itemName;
        const price = parseFloat(input.value) || 0;
        prices[itemName] = price;
    });

    return prices;
}

// ============================================================================
// DISTRIBUTE QUEST QUANTITIES
// ============================================================================

function distributeQuestQuantities(sortedQuests, availableGold, maxAccounts) {
    const recommendations = [];
    let remainingGold = availableGold;

    // Iterate through sorted quests and allocate gold, limited by number of accounts
    for (const quest of sortedQuests) {
        if (remainingGold <= 0) break;

        const costPerQuest = quest.totalCost;
        
        // Even if cost is 0 (free items), we still limit by accounts
        // But if cost is > 0, we check if we have enough gold for at least one account
        let possibleTimes = maxAccounts;
        
        if (costPerQuest > 0) {
            const goldAllows = Math.floor(remainingGold / costPerQuest);
            possibleTimes = Math.min(maxAccounts, goldAllows);
        }

        if (possibleTimes <= 0) continue;

        const investmentAmount = possibleTimes * costPerQuest;
        const totalProfit = possibleTimes * quest.netProfit;

        recommendations.push({
            quest,
            quantity: possibleTimes, // Quantas vezes (contas) faremos essa quest
            investmentAmount,
            totalProfit,
            roi: quest.roi
        });

        remainingGold -= investmentAmount;
    }

    return recommendations;
}

// ============================================================================
// DISPLAY QUEST RESULTS
// ============================================================================

function displayQuestResults(recommendations, totalGoldAvailable) {
    const questResults = document.getElementById('questResults');
    const questTableBody = document.getElementById('questTableBody');
    const totalQuestsCount = document.getElementById('totalQuestsCount');
    const questProfitPerAccount = document.getElementById('questProfitPerAccount');
    const questTotalInvestment = document.getElementById('questTotalInvestment');
    const questROI = document.getElementById('questROI');
    const questConsolidatedProfit = document.getElementById('questConsolidatedProfit');

    // Calculate totals
    let totalInvestment = 0;
    let totalProfit = 0;

    // Clear table
    questTableBody.innerHTML = '';

    if (recommendations.length === 0) {
        questTableBody.innerHTML = '<tr><td colspan="10" style="text-align: center; color: var(--primary-red); padding: 30px; font-weight: bold; font-family: Cinzel, serif;">Nenhuma quest lucrativa encontrada com os preços informados ou ouro insuficiente.</td></tr>';
    } else {
        // Populate table
        recommendations.forEach(rec => {
            const row = document.createElement('tr');
            const roiPercent = rec.roi.toFixed(2);

            row.innerHTML = `
                <td>${rec.quest.name}</td>
                <td>${rec.quest.quantity}</td>
                <td>${formatNumberQuest(rec.quest.unitPrice)}</td>
                <td>${formatNumberQuest(rec.quest.totalCost)}</td>
                <td>${formatNumberQuest(rec.quest.questProfit)}</td>
                <td>${formatNumberQuest(rec.quest.netProfit)}</td>
                <td>${roiPercent}%</td>
                <td>${rec.quantity}</td>
                <td>${formatNumberQuest(rec.investmentAmount)}</td>
                <td>${formatNumberQuest(rec.totalProfit)}</td>
            `;
            questTableBody.appendChild(row);

            totalInvestment += rec.investmentAmount;
            totalProfit += rec.totalProfit;
        });
    }

    // Update summary
    totalQuestsCount.textContent = recommendations.length;
    
    // Calculate profit per account (average or sum of single instances)
    const accountsCount = parseInt(document.getElementById('questAccountsCount').value) || 1;
    const profitPerAccount = totalProfit / accountsCount;
    
    if (questProfitPerAccount) {
        questProfitPerAccount.textContent = formatNumberQuest(profitPerAccount);
    }
    
    questTotalInvestment.textContent = formatNumberQuest(totalInvestment);
    
    const overallROI = totalInvestment > 0 ? ((totalProfit / totalInvestment) * 100).toFixed(2) : 0;
    questROI.textContent = `${overallROI}%`;

    // Update consolidated profit (Total Profit already accounts for all accounts in distributeQuestQuantities)
    if (questConsolidatedProfit) {
        questConsolidatedProfit.textContent = formatNumberQuest(totalProfit);
    }

    // Show results
    questResults.style.display = 'block';
}

// ============================================================================
// NUMBER FORMATTING HELPER
// ============================================================================

function formatNumberQuest(num) {
    return new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(num);
}
