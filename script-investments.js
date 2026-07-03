// ============================================================================
// BEST INVESTMENTS ANALYSIS MODULE
// ============================================================================

// Initialize investments analysis when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    setupInvestmentsAnalysis();
});

// ============================================================================
// INVESTMENTS ANALYSIS SETUP
// ============================================================================

function setupInvestmentsAnalysis() {
    const analyzeBtn = document.getElementById('analyzeBtn');
    analyzeBtn.addEventListener('click', performInvestmentsAnalysis);

    // Load global settings from localStorage if available
    loadGlobalInvestmentSettings();
}

// ============================================================================
// LOCAL STORAGE FOR INVESTMENTS
// ============================================================================

function loadGlobalInvestmentSettings() {
    const stored = localStorage.getItem('investmentsGlobalSettings');
    if (stored) {
        const settings = JSON.parse(stored);
        if (settings.taxRate !== undefined) {
            document.getElementById('globalTaxRate').value = settings.taxRate;
        }
        if (settings.reservePercent !== undefined) {
            document.getElementById('globalReservePercent').value = settings.reservePercent;
        }
        if (settings.goldAvailable !== undefined) {
            document.getElementById('globalGoldAvailable').value = settings.goldAvailable;
        }
    }
}

// Sync global settings with centralized panel on load
function syncGlobalSettingsPanel() {
    // This function ensures the global settings are always in sync
    document.getElementById('analyzeBtn').addEventListener('click', () => {
        // Settings are automatically read from the centralized panel
    });
}

function saveGlobalInvestmentSettings() {
    const settings = {
        taxRate: parseFloat(document.getElementById('globalTaxRate').value) || 5,
        reservePercent: parseFloat(document.getElementById('globalReservePercent').value) || 0,
        goldAvailable: parseFloat(document.getElementById('globalGoldAvailable').value) || 0
    };
    localStorage.setItem('investmentsGlobalSettings', JSON.stringify(settings));
}

// ============================================================================
// MAIN ANALYSIS FUNCTION
// ============================================================================

function performInvestmentsAnalysis() {
    // Get global settings from the centralized panel
    const globalTaxRate = parseFloat(document.getElementById('globalTaxRate').value) || 5;
    const globalReservePercent = parseFloat(document.getElementById('globalReservePercent').value) || 0;
    const globalGoldAvailable = parseFloat(document.getElementById('globalGoldAvailable').value) || 0;

    // Save settings
    saveGlobalInvestmentSettings();

    // Validate inputs
    if (globalGoldAvailable <= 0) {
        if (typeof addLog === 'function') {
            addLog('Por favor, insira um valor de ouro disponível maior que zero', 'error');
        }
        return;
    }

    // Calculate available gold after reserve
    const reserveGold = globalGoldAvailable * (globalReservePercent / 100);
    const availableGold = globalGoldAvailable - reserveGold;

    if (availableGold <= 0) {
        if (typeof addLog === 'function') {
            addLog('Ouro disponível insuficiente após reserva', 'error');
        }
        return;
    }

    // Get all recipes (this should be available from script.js)
    if (typeof appState === 'undefined' || !appState.recipes) {
        if (typeof addLog === 'function') {
            addLog('Erro: Receitas não carregadas', 'error');
        }
        return;
    }

    // Calculate profitability for each recipe using manual sell prices when available
    const recipesWithProfit = calculateRecipeProfitability(appState.recipes, globalTaxRate);

    // Filter out items that don't sell well (Mithril, Verite, Gold, Silver, Iron, Elumio bar)
    const excludedKeywords = ['Mithril', 'Verite', 'Ouro', 'Prata', 'Ferro', 'Elúmio'];
    const filteredRecipes = recipesWithProfit.filter(recipe => {
        const name = recipe.name.toLowerCase();
        return !excludedKeywords.some(keyword => name.includes(keyword.toLowerCase()));
    });

    // Sort by profit (descending) and get top profitable items (up to 5)
    const top5Recipes = filteredRecipes
        .filter(r => r.profitPerItem > 0) // Only profitable items
        .sort((a, b) => b.profitPerItem - a.profitPerItem)
        .slice(0, 5);

    if (top5Recipes.length === 0) {
        if (typeof addLog === 'function') {
            addLog('Nenhum investimento lucrativo encontrado', 'error');
        }
        return;
    }

    // Calculate total profit potential for distribution
    const totalProfitPotential = top5Recipes.reduce((sum, r) => sum + r.profitPerItem, 0);

    // Distribute quantities based on profitability
    const investments = distributeInvestments(
        top5Recipes,
        totalProfitPotential,
        availableGold
    );

    // Calculate shopping list (materials needed for all investments)
    const shoppingList = calculateShoppingList(investments, appState.recipes);

    // Display results
    displayInvestmentsResults(investments, globalGoldAvailable, availableGold, shoppingList);

    if (typeof addLog === 'function') {
        addLog(`Análise concluída: ${investments.length} investimentos recomendados`, 'success');
    }
}

// ============================================================================
// CALCULATE RECIPE PROFITABILITY
// ============================================================================

function calculateRecipeProfitability(recipes, globalTaxRate) {
    return recipes.map(recipe => {
        // Get material prices from global prices or use 0
        let totalMaterialCost = 0;
        Object.entries(recipe.materials).forEach(([material, quantity]) => {
            // Try to get from global prices
            if (typeof appState !== 'undefined' && appState.globalMaterialPrices) {
                const materialPrice = appState.globalMaterialPrices[material] || 0;
                totalMaterialCost += materialPrice * quantity;
            }
        });

        const totalCost = totalMaterialCost + recipe.cost;

        // Calculate suggested price (cost + 20% margin)
        const suggestedPrice = totalCost * 1.2;

        // Check if user has set a manual sell price for this recipe
        let userSellPrice = 0;
        if (typeof appState !== 'undefined' && appState.lastCalculatorValues && appState.lastCalculatorValues[recipe.id]) {
            userSellPrice = appState.lastCalculatorValues[recipe.id].sellPrice || 0;
        }

        // Use user's manual price if available, otherwise use suggested price
        const finalSellPrice = userSellPrice > 0 ? userSellPrice : suggestedPrice;

        // Apply tax to the final sell price
        const taxAmount = finalSellPrice * (globalTaxRate / 100);
        const priceAfterTax = finalSellPrice - taxAmount;

        // Profit per item (Revenue after tax - Total Cost)
        const profitPerItem = priceAfterTax - totalCost;

        return {
            ...recipe,
            totalMaterialCost,
            totalCost,
            suggestedPrice,
            userSellPrice,
            finalSellPrice,
            taxAmount,
            priceAfterTax,
            profitPerItem
        };
    });
}

// ============================================================================
// DISTRIBUTE INVESTMENTS PROPORTIONALLY
// ============================================================================

function distributeInvestments(top5Recipes, totalProfitPotential, availableGold) {
    const investments = [];
    let totalInvested = 0;

    // Calculate proportional quantities based on profit
    for (let i = 0; i < top5Recipes.length; i++) {
        const recipe = top5Recipes[i];
        
        // Calculate proportion of total profit this item represents
        const profitProportion = recipe.profitPerItem / totalProfitPotential;
        
        // Calculate how much gold to allocate to this investment
        const allocatedGold = availableGold * profitProportion;
        
        // Calculate how many items can be made with allocated gold
        const quantity = Math.floor(allocatedGold / recipe.totalCost);
        
        if (quantity > 0) {
            const investmentAmount = quantity * recipe.totalCost;
            const totalProfit = quantity * recipe.profitPerItem;
            
            investments.push({
                recipe,
                quantity,
                investmentAmount,
                totalProfit,
                profitProportion,
                profitPerItem: recipe.profitPerItem
            });
            
            totalInvested += investmentAmount;
        }
    }

    // If there's remaining gold, try to add more items to the most profitable investment
    const remainingGold = availableGold - totalInvested;
    if (remainingGold > 0 && investments.length > 0) {
        // Sort by profit per item to find the most profitable
        const mostProfitable = investments[0];
        const additionalItems = Math.floor(remainingGold / mostProfitable.recipe.totalCost);
        
        if (additionalItems > 0) {
            mostProfitable.quantity += additionalItems;
            mostProfitable.investmentAmount += additionalItems * mostProfitable.recipe.totalCost;
            mostProfitable.totalProfit += additionalItems * mostProfitable.recipe.profitPerItem;
        }
    }

    return investments;
}

// ============================================================================
// CALCULATE SHOPPING LIST (MATERIALS NEEDED)
// ============================================================================

function calculateShoppingList(investments, allRecipes) {
    let totalMaterials = {};

    function resolveMaterials(currentRecipe, currentQuantity) {
        if (!currentRecipe || !currentRecipe.materials) {
            return;
        }

        Object.entries(currentRecipe.materials).forEach(([materialName, materialQuantity]) => {
            const required = materialQuantity * currentQuantity;
            const subRecipe = allRecipes.find(r => r.name === materialName);

            if (subRecipe) {
                // If the material is itself a craftable item, resolve its materials recursively
                resolveMaterials(subRecipe, required);
            } else {
                // Otherwise, add to total materials needed
                totalMaterials[materialName] = (totalMaterials[materialName] || 0) + required;
            }
        });
    }

    // Calculate materials for each investment
    investments.forEach(inv => {
        resolveMaterials(inv.recipe, inv.quantity);
    });

    return totalMaterials;
}

// ============================================================================
// DISPLAY RESULTS
// ============================================================================

function displayInvestmentsResults(investments, totalGoldAvailable, availableGold, shoppingList) {
    // Calculate totals
    let totalInvestmentAmount = 0;
    let totalEstimatedProfit = 0;

    investments.forEach(inv => {
        totalInvestmentAmount += inv.investmentAmount;
        totalEstimatedProfit += inv.totalProfit;
    });

    // Calculate ROI
    const roi = totalInvestmentAmount > 0 
        ? ((totalEstimatedProfit / totalInvestmentAmount) * 100).toFixed(2)
        : 0;

    // Update summary stats
    document.getElementById('totalInvestmentsCount').textContent = investments.length;
    document.getElementById('totalEstimatedProfit').textContent = formatNumber(totalEstimatedProfit);
    document.getElementById('totalInvestmentAmount').textContent = formatNumber(totalInvestmentAmount);
    document.getElementById('roiPercentage').textContent = `${roi}%`;

    // Populate table
    const tableBody = document.getElementById('investmentsTableBody');
    tableBody.innerHTML = '';

    investments.forEach(inv => {
        const row = document.createElement('tr');
        const percentageOfTotal = totalInvestmentAmount > 0 
            ? ((inv.investmentAmount / totalInvestmentAmount) * 100).toFixed(1)
            : 0;

        // Display the final sell price (user's manual price or suggested price)
        const displayPrice = inv.recipe.userSellPrice > 0 
            ? `${formatNumber(inv.recipe.userSellPrice)} (manual)` 
            : `${formatNumber(inv.recipe.priceAfterTax)} (sugerido)`;

        row.innerHTML = `
            <td>
                <div class="investment-item-name">
                    <img src="icons/${inv.recipe.icon}" alt="${inv.recipe.name}" class="investment-item-icon" onerror="this.src='icons/favicon.ico'">
                    <span>${inv.recipe.name}</span>
                </div>
            </td>
            <td class="investment-quantity">${inv.quantity.toLocaleString('pt-BR')}</td>
            <td class="investment-sell-price">${displayPrice}</td>
            <td class="investment-profit">${formatNumber(inv.recipe.profitPerItem)}</td>
            <td class="investment-total-profit">${formatNumber(inv.totalProfit)}</td>
            <td class="investment-amount">${formatNumber(inv.investmentAmount)}</td>
            <td class="investment-percentage">${percentageOfTotal}%</td>
        `;
        tableBody.appendChild(row);
    });

    // Add totals row
    const totalsRow = document.createElement('tr');
    totalsRow.style.background = 'linear-gradient(to right, #2a0000, #1a1a1a)';
    totalsRow.style.borderTop = '2px solid var(--accent-gold)';
    totalsRow.innerHTML = `
        <td style="color: var(--accent-gold); font-weight: bold; font-family: Cinzel, serif;">TOTAL</td>
        <td class="investment-quantity" style="color: var(--accent-gold); font-weight: bold;">${investments.reduce((sum, inv) => sum + inv.quantity, 0).toLocaleString('pt-BR')}</td>
        <td></td>
        <td></td>
        <td class="investment-total-profit" style="color: #10b981; font-weight: bold;">${formatNumber(totalEstimatedProfit)}</td>
        <td class="investment-amount" style="color: var(--accent-gold); font-weight: bold;">${formatNumber(totalInvestmentAmount)}</td>
        <td class="investment-percentage" style="color: var(--accent-gold); font-weight: bold;">100%</td>
    `;
    tableBody.appendChild(totalsRow);

    // Display shopping list
    displayShoppingList(shoppingList);

    // Show results section
    document.getElementById('investmentsResults').style.display = 'block';
}

// ============================================================================
// DISPLAY SHOPPING LIST
// ============================================================================

function displayShoppingList(shoppingList) {
    const shoppingListContainer = document.getElementById('shoppingListContainer');
    
    if (!shoppingListContainer) {
        // Container doesn't exist yet, it will be created in HTML
        return;
    }

    shoppingListContainer.innerHTML = '';

    if (Object.keys(shoppingList).length === 0) {
        shoppingListContainer.innerHTML = '<p style="color: #a89968;">Nenhum material necessário</p>';
        return;
    }

    const shoppingTable = document.createElement('table');
    shoppingTable.className = 'shopping-list-table';
    shoppingTable.style.width = '100%';
    shoppingTable.style.borderCollapse = 'collapse';

    // Create header
    const headerRow = document.createElement('tr');
    headerRow.style.background = 'rgba(139, 0, 0, 0.2)';
    headerRow.style.borderBottom = '2px solid var(--border-color)';
    headerRow.innerHTML = `
        <th style="color: var(--accent-gold); padding: 10px; text-align: left; border: 1px solid var(--border-color); font-family: Cinzel, serif;">Material</th>
        <th style="color: var(--accent-gold); padding: 10px; text-align: right; border: 1px solid var(--border-color); font-family: Cinzel, serif;">Quantidade</th>
    `;
    shoppingTable.appendChild(headerRow);

    // Add material rows
    Object.entries(shoppingList)
        .sort((a, b) => b[1] - a[1]) // Sort by quantity descending
        .forEach(([material, quantity]) => {
            const row = document.createElement('tr');
            row.style.borderBottom = '1px solid #5a5a4a';
            row.innerHTML = `
                <td style="color: var(--text-dim); padding: 8px; border: 1px solid var(--border-color);">${material}</td>
                <td style="color: var(--accent-gold); padding: 8px; text-align: right; border: 1px solid var(--border-color); font-weight: bold;">${quantity.toLocaleString('pt-BR')}</td>
            `;
            shoppingTable.appendChild(row);
        });

    shoppingListContainer.appendChild(shoppingTable);
}

// ============================================================================
// HELPER: FORMAT NUMBER (reuse from script.js if available, otherwise define)
// ============================================================================

if (typeof formatNumber === 'undefined') {
    function formatNumber(num) {
        return new Intl.NumberFormat('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(num);
    }
}
