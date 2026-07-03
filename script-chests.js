// ============================================================================
// CHEST SIMULATOR DATABASE & LOGIC
// ============================================================================

const CHEST_CONFIG = {
    // Probabilidades de raridade baseadas em simulação de 100.000 aberturas
    RARITY_CONFIG: {
        Common: { probability: 0.701, maxQty: 6, color: "#10b981", label: "Comum" },
        Uncommon: { probability: 0.209, maxQty: 4, color: "#3b82f6", label: "Incomum" },
        Rare: { probability: 0.067, maxQty: 3, color: "#f59e0b", label: "Raro" },
        Epic: { probability: 0.020, maxQty: 2, color: "#a855f7", label: "Épico" },
        Legendary: { probability: 0.003, maxQty: 1, color: "#f97316", label: "Lendário" }
    },
    CHEST_PRICES: {
        Crystal: 1725977.0,
        Golden: 853292.0,
        Iron: 329681.0
    },
    // Dados observados da simulação de 100.000 aberturas
    OBSERVED_DATA: {
        Crystal: {
            successRate: 44.7,
            averageProfit: 653813.68,
            minProfit: -1725974.15,
            maxProfit: 24861344.30,
            itemsInPool: 61,
            mostFrequent: [
                { name: "Summoning Stone", frequency: 0.54 },
                { name: "Large Trading Spot", frequency: 0.53 },
                { name: "Cotton Candy", frequency: 0.53 },
                { name: "Herbal Chewing Gum", frequency: 0.53 },
                { name: "Troll Potion", frequency: 0.53 }
            ]
        },
        Golden: {
            successRate: 56.4,
            averageProfit: 1077456.41,
            minProfit: -853289.15,
            maxProfit: 17080558.15,
            itemsInPool: 52,
            mostFrequent: [
                { name: "Troll Potion", frequency: 0.54 },
                { name: "Herbal Chewing Gum", frequency: 0.53 },
                { name: "Curare", frequency: 0.53 },
                { name: "Pumpkin Lemonade", frequency: 0.53 },
                { name: "Soda", frequency: 0.53 }
            ]
        },
        Iron: {
            successRate: 68.9,
            averageProfit: 1035003.27,
            minProfit: -329678.15,
            maxProfit: 12537641.50,
            itemsInPool: 48,
            mostFrequent: [
                { name: "Arkonite Wax", frequency: 0.83 },
                { name: "Rune of Preservation", frequency: 0.83 },
                { name: "Black Philosopher's Stone", frequency: 0.83 },
                { name: "Royal Blessing x3", frequency: 0.79 },
                { name: "Infanta's Ticket", frequency: 0.54 }
            ]
        }
    },
    ITEMS_BY_RARITY: {
        Common: [
            { name: "Fish Oil", price: 9700.0 },
            { name: "Infanta's Ticket", price: 4900.0 },
            { name: "Summoning Stone", price: 4899.0 },
            { name: "Large Trading Spot", price: 2888.0 },
            { name: "Four-Leaf Clover", price: 57000.0 },
            { name: "Mount Feed", price: 11988.0 },
            { name: "Festive Cake", price: 1.0 },
            { name: "Herbal Tea", price: 2489.0 },
            { name: "Sparkling Wine", price: 1.0 },
            { name: "Soda", price: 2999.0 },
            { name: "Cotton Candy", price: 1.0 },
            { name: "Pumpkin Pie", price: 1.0 },
            { name: "Pumpkin Lemonade", price: 1.0 },
            { name: "Troll Potion", price: 787.0 },
            { name: "Curare", price: 2749.0 },
            { name: "Herbal Chewing Gum", price: 3994.0 }
        ],
        Uncommon: [
            { name: "Black Philosopher's Stone", price: 109999.0 },
            { name: "White Philosopher's Stone", price: 366659.0 },
            { name: "Red Philosopher's Stone", price: 675998.0 },
            { name: "Rune of Preservation", price: 88900.0 },
            { name: "Arkonite Wax", price: 192000.0 }
        ],
        Rare: [
            { name: "Royal Blessing x3", price: 1277655.0 },
            { name: "Royal Blessing x7", price: 1777776.0 },
            { name: "Royal Blessing x14", price: 2850000.0 }
        ],
        Epic: [
            { name: "Seal of Morra", price: 330000.0 },
            { name: "Hand of Light", price: 450000.0 },
            { name: "Phantom", price: 249000.0 },
            { name: "Barbarian Costume", price: 720000.0 },
            { name: "Kitty Costume", price: 720000.0 },
            { name: "Slimmy (Pet)", price: 1.0 },
            { name: "Croaker (Pet)", price: 1.0 },
            { name: "VE-Droid (Pet)", price: 1.0 },
            { name: "Tyrex", price: 2222222.0 },
            { name: "Carcaron", price: 890000.0 },
            { name: "Vulture", price: 1093.0 }
        ],
        Legendary: [
            { name: "Aura's Tear", price: 2500000.0 },
            { name: "Protolupus Shard", price: 250000.0 },
            { name: "Rudolf Shard", price: 550000.0 }
        ]
    }
};

let chestState = {
    prices: {},
    chestPrices: { ...CHEST_CONFIG.CHEST_PRICES },
    marketTax: 5.0, // Taxa de mercado padrão de 5%
    simulationCount: 10000,
    isRunning: false
};

// Initialize prices from config
Object.keys(CHEST_CONFIG.ITEMS_BY_RARITY).forEach(rarity => {
    chestState.prices[rarity] = {};
    CHEST_CONFIG.ITEMS_BY_RARITY[rarity].forEach(item => {
        chestState.prices[rarity][item.name] = item.price;
    });
});

document.addEventListener('DOMContentLoaded', () => {
    loadChestData();
    renderChestPriceInputs();
    renderItemPriceInputs();
    renderMarketTaxInput();
    attachChestEventListeners();
});

function loadChestData() {
    const savedPrices = localStorage.getItem('chestSimulatorPrices');
    if (savedPrices) chestState.prices = JSON.parse(savedPrices);
    
    const savedChestPrices = localStorage.getItem('chestSimulatorChestPrices');
    if (savedChestPrices) chestState.chestPrices = JSON.parse(savedChestPrices);
    
    const savedMarketTax = localStorage.getItem('chestSimulatorMarketTax');
    if (savedMarketTax) chestState.marketTax = parseFloat(savedMarketTax);
}

function saveChestData() {
    localStorage.setItem('chestSimulatorPrices', JSON.stringify(chestState.prices));
    localStorage.setItem('chestSimulatorChestPrices', JSON.stringify(chestState.chestPrices));
    localStorage.setItem('chestSimulatorMarketTax', chestState.marketTax.toString());
}

function renderMarketTaxInput() {
    const container = document.getElementById('chestPricesContainer');
    if (!container) return;
    
    const taxGroup = document.createElement('div');
    taxGroup.className = 'input-group';
    taxGroup.innerHTML = `
        <label>Taxa de Mercado (%) <span class="tooltip-icon" title="Percentual de imposto aplicado ao vender itens">?</span>:</label>
        <input type="number" value="${chestState.marketTax}" step="0.1" onchange="updateMarketTax(this.value)">
    `;
    container.insertBefore(taxGroup, container.firstChild);
}

function renderChestPriceInputs() {
    const container = document.getElementById('chestPricesContainer');
    if (!container) return;
    
    // Limpar apenas os inputs de preço de chave (não a taxa)
    const priceInputs = container.querySelectorAll('.input-group:not(:first-child)');
    priceInputs.forEach(el => el.remove());
    
    Object.keys(chestState.chestPrices).forEach(type => {
        const group = document.createElement('div');
        group.className = 'input-group';
        group.innerHTML = `
            <label>Preço Chave ${type}:</label>
            <input type="number" value="${chestState.chestPrices[type]}" step="1" onchange="updateChestPrice('${type}', this.value)">
        `;
        container.appendChild(group);
    });
}

function renderItemPriceInputs() {
    const container = document.getElementById('itemPricesContainer');
    if (!container) return;
    
    container.innerHTML = '';
    Object.keys(CHEST_CONFIG.ITEMS_BY_RARITY).forEach(rarity => {
        const raritySection = document.createElement('div');
        raritySection.className = 'rarity-price-section';
        raritySection.innerHTML = `<h3 style="color: ${CHEST_CONFIG.RARITY_CONFIG[rarity].color}">${CHEST_CONFIG.RARITY_CONFIG[rarity].label}</h3>`;
        
        const grid = document.createElement('div');
        grid.className = 'price-grid';
        
        CHEST_CONFIG.ITEMS_BY_RARITY[rarity].forEach(item => {
            const group = document.createElement('div');
            group.className = 'input-group';
            group.innerHTML = `
                <label>${item.name}:</label>
                <input type="number" value="${chestState.prices[rarity][item.name]}" step="1" onchange="updateItemPrice('${rarity}', '${item.name}', this.value)">
            `;
            grid.appendChild(group);
        });
        
        raritySection.appendChild(grid);
        container.appendChild(raritySection);
    });
}

function updateMarketTax(value) {
    chestState.marketTax = parseFloat(value);
    saveChestData();
}

function updateChestPrice(type, value) {
    chestState.chestPrices[type] = parseFloat(value);
    saveChestData();
}

function updateItemPrice(rarity, name, value) {
    chestState.prices[rarity][name] = parseFloat(value);
    saveChestData();
}

function attachChestEventListeners() {
    const btn = document.getElementById('runChestSimulation');
    if (btn) btn.addEventListener('click', runSimulation);
    
    const countInput = document.getElementById('simCount');
    if (countInput) {
        countInput.addEventListener('change', (e) => {
            chestState.simulationCount = parseInt(e.target.value);
        });
    }
}

function runSimulation() {
    if (chestState.isRunning) return;
    chestState.isRunning = true;
    
    const btn = document.getElementById('runChestSimulation');
    btn.textContent = 'Simulando...';
    btn.disabled = true;

    setTimeout(() => {
        const results = {};
        const chestTypes = Object.keys(chestState.chestPrices);
        
        chestTypes.forEach(type => {
            results[type] = simulateChest(type);
        });
        
        displayResults(results);
        
        chestState.isRunning = false;
        btn.textContent = 'Rodar Simulação';
        btn.disabled = false;
    }, 100);
}

function simulateChest(chestType) {
    const keyPrice = chestState.chestPrices[chestType];
    let totalRevenue = 0;
    let successCount = 0;
    let minProfit = Infinity;
    let maxProfit = -Infinity;
    
    const rarityDist = { Common: 0, Uncommon: 0, Rare: 0, Epic: 0, Legendary: 0 };
    const itemFrequency = {};
    
    for (let i = 0; i < chestState.simulationCount; i++) {
        // Cada baú droppa 3-5 itens aleatórios
        const itemsDropped = 3 + Math.floor(Math.random() * 3); // 3 a 5 itens
        let openProfit = 0;
        
        for (let j = 0; j < itemsDropped; j++) {
            const random = Math.random();
            let rarity = "Common";
            let cumulative = 0;
            
            // Usar as probabilidades observadas
            for (const [r, config] of Object.entries(CHEST_CONFIG.RARITY_CONFIG)) {
                cumulative += config.probability;
                if (random < cumulative) {
                    rarity = r;
                    break;
                }
            }
            
            rarityDist[rarity]++;
            const items = CHEST_CONFIG.ITEMS_BY_RARITY[rarity];
            const item = items[Math.floor(Math.random() * items.length)];
            
            // Quantidade aleatória baseada na raridade
            const maxQty = CHEST_CONFIG.RARITY_CONFIG[rarity].maxQty;
            const quantity = 1 + Math.floor(Math.random() * maxQty);
            
            const basePrice = chestState.prices[rarity][item.name];
            const priceWithTax = basePrice * (1 - chestState.marketTax / 100);
            const itemRevenue = priceWithTax * quantity;
            
            openProfit += itemRevenue;
            
            // Contar frequência de itens
            itemFrequency[item.name] = (itemFrequency[item.name] || 0) + quantity;
        }
        
        totalRevenue += openProfit;
        const profit = openProfit - keyPrice;
        
        if (profit > 0) successCount++;
        minProfit = Math.min(minProfit, profit);
        maxProfit = Math.max(maxProfit, profit);
    }
    
    const successRate = (successCount / chestState.simulationCount) * 100;
    const averageProfit = (totalRevenue / chestState.simulationCount) - keyPrice;
    
    // Ordenar itens por frequência
    const sortedItems = Object.entries(itemFrequency)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([name, count]) => ({
            name,
            frequency: (count / chestState.simulationCount).toFixed(2)
        }));
    
    return {
        keyPrice,
        averageProfit,
        successRate,
        minProfit,
        maxProfit,
        rarityDist,
        sortedItems,
        totalSimulations: chestState.simulationCount,
        observedData: CHEST_CONFIG.OBSERVED_DATA[chestType]
    };
}

function displayResults(results) {
    const container = document.getElementById('chestResultsContainer');
    if (!container) return;
    
    container.style.display = 'block';
    container.innerHTML = '<h3>📊 Resultados da Simulação</h3>';
    
    const grid = document.createElement('div');
    grid.className = 'chest-results-grid';
    
    // Determinar qual baú é mais seguro e lucrativo
    let bestProfitChest = 'Crystal';
    let bestProfitValue = results.Crystal.averageProfit;
    let bestSuccessChest = 'Crystal';
    let bestSuccessValue = results.Crystal.successRate;
    
    Object.entries(results).forEach(([type, data]) => {
        if (data.averageProfit > bestProfitValue) {
            bestProfitChest = type;
            bestProfitValue = data.averageProfit;
        }
        if (data.successRate > bestSuccessValue) {
            bestSuccessChest = type;
            bestSuccessValue = data.successRate;
        }
    });
    
    Object.entries(results).forEach(([type, data]) => {
        const card = document.createElement('div');
        card.className = 'chest-result-card';
        const isProfitable = data.averageProfit > 0;
        const isBestProfit = type === bestProfitChest;
        const isBestSuccess = type === bestSuccessChest;
        
        if (isBestProfit || isBestSuccess) {
            card.classList.add('best-chest');
        }
        
        let badges = '';
        if (isBestProfit) badges += '<span class="badge badge-profit">💰 Mais Lucrativo</span>';
        if (isBestSuccess) badges += '<span class="badge badge-success">🛡️ Mais Seguro</span>';
        
        // Mostrar dados observados vs simulados
        const obsData = data.observedData;
        const successDiff = ((data.successRate - obsData.successRate) / obsData.successRate * 100).toFixed(1);
        const profitDiff = ((data.averageProfit - obsData.averageProfit) / obsData.averageProfit * 100).toFixed(1);
        
        card.innerHTML = `
            <div class="card-header">
                <h4>Baú de ${type}</h4>
                ${badges}
            </div>
            <div class="result-row">
                <span>Preço da Chave:</span>
                <span>${formatNumber(data.keyPrice)}</span>
            </div>
            <div class="result-row">
                <span>Lucro Médio:</span>
                <span class="${isProfitable ? 'profit-positive' : 'profit-negative'}">${formatNumber(data.averageProfit)}</span>
            </div>
            <div class="result-row highlight">
                <span>Taxa de Sucesso:</span>
                <span class="success-rate">${data.successRate.toFixed(1)}%</span>
            </div>
            <div class="result-row">
                <span>Pior Cenário:</span>
                <span class="profit-negative">${formatNumber(data.minProfit)}</span>
            </div>
            <div class="result-row">
                <span>Melhor Cenário:</span>
                <span class="profit-positive">${formatNumber(data.maxProfit)}</span>
            </div>
            <div class="result-row">
                <span>Simulações:</span>
                <span>${data.totalSimulations.toLocaleString('pt-BR')}</span>
            </div>
            <div class="result-row">
                <span>Taxa de Mercado:</span>
                <span>${chestState.marketTax.toFixed(1)}%</span>
            </div>
        `;
        grid.appendChild(card);
    });
    
    container.appendChild(grid);
    
    // Adicionar resumo comparativo
    const summary = document.createElement('div');
    summary.className = 'chest-comparison-summary';
    summary.innerHTML = `
        <h3>📈 Resumo Comparativo</h3>
        <div class="comparison-table">
            <div class="comparison-row">
                <span class="label">Baú Mais Seguro (Maior Taxa de Sucesso):</span>
                <span class="value">${bestSuccessChest} - ${results[bestSuccessChest].successRate.toFixed(1)}%</span>
            </div>
            <div class="comparison-row">
                <span class="label">Baú Mais Lucrativo (Maior Lucro Médio):</span>
                <span class="value">${bestProfitChest} - ${formatNumber(results[bestProfitChest].averageProfit)}</span>
            </div>
            <div class="comparison-row">
                <span class="label">Recomendação:</span>
                <span class="value recommendation">🏆 ${bestSuccessChest} (Segurança: ${results[bestSuccessChest].successRate.toFixed(1)}% | Lucro: ${formatNumber(results[bestSuccessChest].averageProfit)})</span>
            </div>
        </div>
    `;
    container.appendChild(summary);
}

function formatNumber(num) {
    return new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(num);
}
