// ============================================================================
// RECIPES DATABASE
// ============================================================================

const SMELTER_RECIPES = [
    {
        id: 'adamantium_steel',
        name: 'Aço Adamantio',
        icon: 'aco_adamantio.png',
        type: 'smelter',
        materials: { 'Minério Adamantio': 12, 'Antracite': 6 },
        cost: 17280,
        defaultTax: 0
    },
    {
        id: 'verite_steel',
        name: 'Aço Verite',
        icon: 'aco_verite.png',
        type: 'smelter',
        materials: { 'Minério Verite': 6, 'Antracite': 3 },
        cost: 930,
        defaultTax: 0
    },
    {
        id: 'iron',
        name: 'Ferro',
        icon: 'ferro.png',
        type: 'smelter',
        materials: { 'Minério Ferro': 2 },
        cost: 24,
        defaultTax: 0
    },
    {
        id: 'gold_ingot',
        name: 'Barra de Ouro',
        icon: 'barra_ouro.png',
        type: 'smelter',
        materials: { 'Minério Ouro': 6 },
        cost: 19701,
        defaultTax: 0
    },
    {
        id: 'logos',
        name: 'Logos',
        icon: 'logos.png',
        type: 'smelter',
        materials: { 'Minério Estelar': 7, 'Azulado': 8 },
        cost: 903,
        defaultTax: 0
    },
    {
        id: 'magnetizite',
        name: 'Magnetizita',
        icon: 'magnetizita.png',
        type: 'smelter',
        materials: { 'Minério Magnésio': 7, 'Azulado': 8 },
        cost: 1167,
        defaultTax: 0
    },
    {
        id: 'mithril_steel',
        name: 'Aço Mithril',
        icon: 'aco_mithril.png',
        type: 'smelter',
        materials: { 'Minério Mithril': 8, 'Antracite': 4 },
        cost: 2592,
        defaultTax: 0
    },
    {
        id: 'obsidian_steel',
        name: 'Aço Obsidiana',
        icon: 'aco_obsidiana.png',
        type: 'smelter',
        materials: { 'Minério Obsidiana': 10, 'Antracite': 5 },
        cost: 6516,
        defaultTax: 0
    },
    {
        id: 'silver_ingot',
        name: 'Barra de Prata',
        icon: 'barra_prata.png',
        type: 'smelter',
        materials: { 'Minério Prata': 6 },
        cost: 2745,
        defaultTax: 0
    },
    {
        id: 'elum_ingot',
        name: 'Barra de Elúmio',
        icon: 'barra_elumio.png',
        type: 'smelter',
        materials: { 'Elúm Vermelho': 25, 'Elúm Azul': 25, 'Elúm Verde': 25, 'Pérola Negra': 1 },
        cost: 915,
        defaultTax: 0
    },
    {
        id: 'steel',
        name: 'Aço',
        icon: 'aco.png',
        type: 'smelter',
        materials: { 'Ferro': 3, 'Antracite': 1 },
        cost: 267,
        defaultTax: 0
    }
];

const LOOM_RECIPES = [
    {
        id: 'adamantium_fabric',
        name: 'Tecido Adamantio',
        icon: 'tecido_adamantio.png',
        type: 'loom',
        materials: { 'Minério Adamantio': 6, 'Tecido Linho': 12 },
        cost: 8361,
        defaultTax: 0
    },
    {
        id: 'verite_fabric',
        name: 'Tecido Verite',
        icon: 'tecido_verite.png',
        type: 'loom',
        materials: { 'Minério Verite': 3, 'Tecido Linho': 6 },
        cost: 324,
        defaultTax: 0
    },
    {
        id: 'iron_fabric',
        name: 'Tecido Ferro',
        icon: 'tecido_ferro.png',
        type: 'loom',
        materials: { 'Minério Ferro': 2, 'Tecido Linho': 4 },
        cost: 108,
        defaultTax: 0
    },
    {
        id: 'gold_fabric',
        name: 'Tecido Ouro',
        icon: 'tecido_ouro.png',
        type: 'loom',
        materials: { 'Minério Ouro': 3, 'Tecido Linho': 12 },
        cost: 9852,
        defaultTax: 0
    },
    {
        id: 'linen',
        name: 'Tecido Linho',
        icon: 'tecido_linho.png',
        type: 'loom',
        materials: { 'Linho': 5 },
        cost: 18,
        defaultTax: 0
    },
    {
        id: 'mithril_fabric',
        name: 'Tecido Mithril',
        icon: 'tecido_mithril.png',
        type: 'loom',
        materials: { 'Minério Mithril': 4, 'Tecido Linho': 8 },
        cost: 1110,
        defaultTax: 0
    },
    {
        id: 'obsidian_fabric',
        name: 'Tecido Obsidiana',
        icon: 'tecido_obsidiana.png',
        type: 'loom',
        materials: { 'Minério Obsidiana': 5, 'Tecido Linho': 10 },
        cost: 3024,
        defaultTax: 0
    },
    {
        id: 'silver_fabric',
        name: 'Tecido Prata',
        icon: 'tecido_prata.png',
        type: 'loom',
        materials: { 'Minério Prata': 3, 'Tecido Linho': 6 },
        cost: 1611,
        defaultTax: 0
    },
    {
        id: 'hedra',
        name: 'Hedra',
        icon: 'hedra.png',
        type: 'loom',
        materials: { 'Linho': 15, 'Fibra Pegajosa': 7, 'Minério Estelar': 7 },
        cost: 645,
        defaultTax: 0
    }
];

// ============================================================================
// TOOLTIPS DATABASE
// ============================================================================

const TOOLTIPS = {
    'Preço do Material': 'Digite o preço unitário do material no mercado',
    'Preço de Venda': 'Preço que você deseja vender o item. O sistema sugerirá o melhor preço baseado nos custos',
    'Preço Sugerido': 'Preço recomendado para maximizar lucro mantendo competitividade',
    'Preço do Concorrente': 'Preço que seu concorrente está vendendo. Use para comparar e ajustar sua estratégia',
    'Imposto (%)': 'Percentual de imposto sobre a venda',
    'Ouro Disponível': 'Quantidade total de ouro que você tem',
    'Reserva (%)': 'Percentual de ouro a manter em reserva (não será gasto)',
    'Custo Total': 'Custo total para fabricar um item (materiais + custo de produção)',
    'Lucro por Item': 'Lucro obtido ao vender um item',
    'Lucro Total': 'Lucro total considerando a quantidade de itens que você pode fabricar',
    'Preço Máximo do Material': 'Preço máximo que você pode pagar pelo material e ainda ter lucro',
    'Itens Possíveis': 'Quantidade de itens que você consegue fabricar com o ouro disponível'
};

// ============================================================================
// APPLICATION STATE
// ============================================================================

let appState = {
    selectedRecipe: null,
    recipes: [...SMELTER_RECIPES, ...LOOM_RECIPES],
    customRecipes: [],
    lastCalculatorValues: {},
    lastSimulationValues: {},
    globalMaterialPrices: {} // NOVO: Armazena preços globais de materiais
};

// ============================================================================
// INITIALIZATION
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
    loadFromLocalStorage();
    initializeInventoryGrid();
    attachEventListeners();
    addLog('Aplicação inicializada', 'success');
});

// ============================================================================
// LOCAL STORAGE
// ============================================================================

function loadFromLocalStorage() {
    const stored = localStorage.getItem('rpgCalculatorData');
    if (stored) {
        const data = JSON.parse(stored);
        if (data.customRecipes) {
            appState.customRecipes = data.customRecipes;
            appState.recipes = [...SMELTER_RECIPES, ...LOOM_RECIPES, ...appState.customRecipes];
        }
        if (data.lastCalculatorValues) {
            appState.lastCalculatorValues = data.lastCalculatorValues;
        }
        if (data.lastSimulationValues) {
            appState.lastSimulationValues = data.lastSimulationValues;
        }
        // NOVO: Carrega preços globais de materiais
        if (data.globalMaterialPrices) {
            appState.globalMaterialPrices = data.globalMaterialPrices;
        }
    }
}

function saveToLocalStorage() {
    const data = {
        customRecipes: appState.customRecipes,
        lastCalculatorValues: appState.lastCalculatorValues,
        lastSimulationValues: appState.lastSimulationValues,
        globalMaterialPrices: appState.globalMaterialPrices // NOVO: Salva preços globais
    };
    localStorage.setItem('rpgCalculatorData', JSON.stringify(data));
}

// ============================================================================
// FORMATTING HELPER
// ============================================================================

function formatNumber(num) {
    return new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(num);
}

function createTooltipIcon(tooltipKey) {
    const span = document.createElement('span');
    span.className = 'tooltip-icon';
    span.textContent = '?';
    span.title = TOOLTIPS[tooltipKey] || '';
    return span;
}

// ============================================================================
// INVENTORY GRID
// ============================================================================

function initializeInventoryGrid() {
    const grid = document.getElementById('inventoryGrid');
    grid.innerHTML = '';

    appState.recipes.forEach(recipe => {
        const slot = createInventorySlot(recipe);
        grid.appendChild(slot);
    });
}

function createInventorySlot(recipe) {
    const slot = document.createElement('div');
    slot.className = 'inventory-slot';
    slot.dataset.recipeId = recipe.id;

    const img = document.createElement('img');
    img.src = `icons/${recipe.icon}`;
    img.alt = recipe.name;
    img.onerror = () => {
        img.src = 'icons/favicon.ico';
    };

    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = recipe.name;

    slot.appendChild(img);
    slot.appendChild(tooltip);

    slot.addEventListener('click', () => selectRecipe(recipe, slot));

    return slot;
}

function selectRecipe(recipe, slotElement) {
    // Remove previous selection
    document.querySelectorAll('.inventory-slot.selected').forEach(slot => {
        slot.classList.remove('selected');
    });

    // Add selection to current slot
    slotElement.classList.add('selected');

    // Update app state
    appState.selectedRecipe = recipe;

    // Update UI
    updateCalculatorPanel(recipe);
    updateSelectedItemInfo(recipe);

    addLog(`Selecionado: ${recipe.name}`, 'info');
}

// ============================================================================
// CALCULATOR PANEL
// ============================================================================

function updateSelectedItemInfo(recipe) {
    const infoDiv = document.getElementById('selectedItemInfo');
    const materialsText = Object.entries(recipe.materials)
        .map(([name, qty]) => `${name}: ${qty}`)
        .join(', ');

    infoDiv.innerHTML = `
        <div style="display: flex; align-items: center; gap: 15px;">
            <img src="icons/${recipe.icon}" alt="${recipe.name}" style="width: 60px; height: 60px; object-fit: contain;">
            <div style="text-align: left;">
                <h3 style="color: #d4af37; margin-bottom: 5px;">${recipe.name}</h3>
                <p style="color: #a89968; font-size: 12px;">Tipo: ${recipe.type === 'smelter' ? 'FUNDIÇÃO' : 'TEAR'}</p>
                <p style="color: #a89968; font-size: 12px;">Materiais: ${materialsText}</p>
                <p style="color: #d4af37; font-size: 12px;">Custo de Produção: ${formatNumber(recipe.cost)}</p>
            </div>
        </div>
    `;
}

function updateCalculatorPanel(recipe) {
    const inputs = document.getElementById('calculatorInputs');
    const results = document.getElementById('calculatorResults');
    const materialPricesContainer = document.getElementById('materialPricesContainer');

    inputs.style.display = 'grid';
    results.style.display = 'grid';

    // Generate dynamic material price inputs
    materialPricesContainer.innerHTML = '';
    const materials = Object.keys(recipe.materials);
    
    materials.forEach(material => {
        const quantity = recipe.materials[material];
        const inputGroup = document.createElement('div');
        inputGroup.className = 'input-group';
        
        const label = document.createElement('label');
        label.innerHTML = `${material} (x${quantity}) ${createTooltipIcon('Preço do Material').outerHTML}`;
        
        const input = document.createElement('input');
        input.type = 'number';
        input.placeholder = '0';
        input.step = '0.01';
        input.className = 'material-price-input';
        input.dataset.material = material;
        
        // NOVO: Usa preço global do material se disponível
        if (appState.globalMaterialPrices[material]) {
            input.value = appState.globalMaterialPrices[material];
        } else if (appState.lastCalculatorValues[recipe.id] && appState.lastCalculatorValues[recipe.id].materialPrices) {
            input.value = appState.lastCalculatorValues[recipe.id].materialPrices[material] || '';
        }
        
        inputGroup.appendChild(label);
        inputGroup.appendChild(input);
        materialPricesContainer.appendChild(inputGroup);
    });

    // Restore other values
    if (appState.lastCalculatorValues[recipe.id]) {
        const values = appState.lastCalculatorValues[recipe.id];
        document.getElementById('sellPrice').value = values.sellPrice || '';
        document.getElementById('competitorPrice').value = values.competitorPrice || '';
    } else {
        document.getElementById('sellPrice').value = '';
        document.getElementById('competitorPrice').value = '';
    }

    // Attach event listeners for real-time calculation
    const allInputs = document.querySelectorAll('.material-price-input, #sellPrice, #competitorPrice, #globalTaxRate, #globalGoldAvailable, #globalReservePercent');
    allInputs.forEach(input => {
        input.removeEventListener('input', calculateResults);
        input.addEventListener('input', calculateResults);
    });

    calculateResults();
}

function calculateResults() {
    if (!appState.selectedRecipe) return;

    const recipe = appState.selectedRecipe;
    
    // Get material prices
    const materialPrices = {};
    const materialInputs = document.querySelectorAll('.material-price-input');
    materialInputs.forEach(input => {
        const material = input.dataset.material;
        const price = parseFloat(input.value) || 0;
        materialPrices[material] = price;
        
        // NOVO: Atualiza o preço global do material
        if (price > 0) {
            appState.globalMaterialPrices[material] = price;
        }
    });

    const sellPrice = parseFloat(document.getElementById('sellPrice').value) || 0;
    const competitorPrice = parseFloat(document.getElementById('competitorPrice').value) || 0;
    // Usar as configuracoes globais centralizadas
    const taxPercent = parseFloat(document.getElementById('globalTaxRate').value) || 0;
    const goldAvailable = parseFloat(document.getElementById('globalGoldAvailable').value) || 0;
    const reservePercent = parseFloat(document.getElementById('globalReservePercent').value) || 0;

    // Save values to state
    appState.lastCalculatorValues[recipe.id] = {
        materialPrices,
        sellPrice,
        competitorPrice,
        taxPercent,
        goldAvailable,
        reservePercent
    };
    saveToLocalStorage();

    // Calculate material cost
    let totalMaterialCost = 0;
    Object.entries(recipe.materials).forEach(([material, quantity]) => {
        totalMaterialCost += (materialPrices[material] || 0) * quantity;
    });

    // Total cost including craft cost
    const totalCost = totalMaterialCost + recipe.cost;

    // Calculate suggested price (cost + 20% margin)
    const suggestedPrice = totalCost * 1.2;

    // Profit per item (using sell price if provided, otherwise suggested price)
    const finalSellPrice = sellPrice > 0 ? sellPrice : suggestedPrice;
    
    // Apply tax to the final sell price
    const taxAmount = finalSellPrice * (taxPercent / 100);
    const revenueAfterTax = finalSellPrice - taxAmount;
    
    // Profit per item (Revenue after tax - Total Cost)
    const profitPerItem = revenueAfterTax - totalCost;

    // How many crafts possible
    const reserveGold = goldAvailable * (reservePercent / 100);
    const availableGold = goldAvailable - reserveGold;
    const possibleCrafts = availableGold > 0 ? Math.floor(availableGold / totalCost) : 0;

    // Total profit (Profit per item * possible crafts)
    const totalProfit = profitPerItem * possibleCrafts;

    // Max material price (break-even analysis)
    let maxMaterialPrice = 0;
    if (Object.keys(recipe.materials).length > 0) {
        const totalMaterialQuantity = Object.values(recipe.materials).reduce((a, b) => a + b, 0);
        maxMaterialPrice = (finalSellPrice - recipe.cost) / totalMaterialQuantity;
    }

    // Update UI
    document.getElementById('totalCost').textContent = formatNumber(totalCost);
    document.getElementById('suggestedPrice').textContent = formatNumber(suggestedPrice);
    document.getElementById('profitPerItem').textContent = formatNumber(profitPerItem);
    document.getElementById('totalProfit').textContent = formatNumber(totalProfit);
    document.getElementById('maxMaterialPrice').textContent = formatNumber(maxMaterialPrice);
    document.getElementById('possibleCrafts').textContent = possibleCrafts.toLocaleString('pt-BR');

    // Update competitor comparison if competitor price is set
    if (competitorPrice > 0) {
        const competitorProfit = competitorPrice - totalCost;
        const yourAdvantage = finalSellPrice - competitorPrice;
        document.getElementById('competitorComparison').style.display = 'grid';
        document.getElementById('competitorProfit').textContent = formatNumber(competitorProfit);
        document.getElementById('yourAdvantage').textContent = yourAdvantage >= 0 ? 
            `+${formatNumber(yourAdvantage)} (Você é mais caro)` : 
            `${formatNumber(Math.abs(yourAdvantage))} (Concorrente é mais caro)`;
    } else {
        document.getElementById('competitorComparison').style.display = 'none';
    }
}

// ============================================================================
// MARKET SIMULATION
// ============================================================================

function setupMarketSimulation() {
    const simulateBtn = document.getElementById('simulateBtn');
    simulateBtn.addEventListener('click', performMarketSimulation);

    // Restore last values
    const lastSim = appState.lastSimulationValues;
    if (lastSim.goldAmount) document.getElementById('simGoldAmount').value = lastSim.goldAmount;
    if (lastSim.reservePercent) document.getElementById('simReservePercent').value = lastSim.reservePercent;
    if (lastSim.sellPrice) document.getElementById('simSellPrice').value = lastSim.sellPrice;
    
    // Also attach listeners to global settings for real-time updates
    document.getElementById('globalTaxRate').addEventListener('input', calculateResults);
    document.getElementById('globalGoldAvailable').addEventListener('input', calculateResults);
    document.getElementById('globalReservePercent').addEventListener('input', calculateResults);
}

function performMarketSimulation() {
    if (!appState.selectedRecipe) {
        addLog('Por favor, selecione uma receita primeiro', 'error');
        return;
    }

    const recipe = appState.selectedRecipe;
    const goldAmount = parseFloat(document.getElementById('simGoldAmount').value) || 0;
    const reservePercent = parseFloat(document.getElementById('simReservePercent').value) || 0;
    const sellPrice = parseFloat(document.getElementById('simSellPrice').value) || 0;

    // Save values
    appState.lastSimulationValues = { goldAmount, reservePercent, sellPrice };
    saveToLocalStorage();

    // Calculate material cost (using current calculator values)
    const materialPrices = {};
    const materialInputs = document.querySelectorAll('.material-price-input');
    materialInputs.forEach(input => {
        const material = input.dataset.material;
        materialPrices[material] = parseFloat(input.value) || 0;
    });

    let totalMaterialCost = 0;
    Object.entries(recipe.materials).forEach(([material, quantity]) => {
        totalMaterialCost += (materialPrices[material] || 0) * quantity;
    });

    const totalCost = totalMaterialCost + recipe.cost;
    const reserveGold = goldAmount * (reservePercent / 100);
    const availableGold = goldAmount - reserveGold;

    // Calculate how many items possible
    const itemsPossible = availableGold > 0 ? Math.floor(availableGold / totalCost) : 0;

    // Get global tax rate
    const taxPercent = parseFloat(document.getElementById('globalTaxRate').value) || 0;
    const taxAmountPerItem = sellPrice * (taxPercent / 100);
    const revenuePerItem = sellPrice - taxAmountPerItem;

    // Calculate total cost and profit
    const simTotalCost = itemsPossible * totalCost;
    const simTotalProfit = (itemsPossible * revenuePerItem) - simTotalCost;
    const goldAfterSelling = goldAmount - simTotalCost + (itemsPossible * revenuePerItem);

    // Calculate total materials needed
    const totalMaterialsNeeded = calculateTotalMaterials(recipe, itemsPossible, appState.recipes);
    let materialsDisplay = '';
    if (Object.keys(totalMaterialsNeeded).length > 0) {
        materialsDisplay = Object.entries(totalMaterialsNeeded)
            .map(([mat, qty]) => `${qty.toLocaleString('pt-BR')}x ${mat}`)
            .join('<br>');
    } else {
        materialsDisplay = 'Nenhum material base necessário';
    }

    // Update UI
    document.getElementById('simulationResults').style.display = 'grid';
    document.getElementById('simItemsPossible').textContent = itemsPossible.toLocaleString('pt-BR');
    document.getElementById('simTotalCost').textContent = formatNumber(simTotalCost);
    document.getElementById('simTotalProfit').textContent = formatNumber(simTotalProfit);
    document.getElementById('simGoldAfter').textContent = formatNumber(goldAfterSelling);
    document.getElementById('simTotalMaterials').innerHTML = materialsDisplay;

    addLog(`Simulação: ${itemsPossible} itens possíveis, lucro: ${formatNumber(simTotalProfit)}. Materiais: ${Object.entries(totalMaterialsNeeded).map(([mat, qty]) => `${qty}x ${mat}`).join(', ')}`, 'success');
}

// ============================================================================
// ADD RECIPE MODAL
// ============================================================================

function setupAddRecipeModal() {
    const addRecipeBtn = document.getElementById('addRecipeBtn');
    const modal = document.getElementById('addRecipeModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const saveRecipeBtn = document.getElementById('saveRecipeBtn');

    addRecipeBtn.addEventListener('click', () => {
        modal.classList.add('active');
    });

    closeModalBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    saveRecipeBtn.addEventListener('click', saveNewRecipe);
}

function saveNewRecipe() {
    const name = document.getElementById('recipeName').value.trim();
    const icon = document.getElementById('recipeIcon').value.trim();
    const cost = parseFloat(document.getElementById('recipeCost').value) || 0;
    const materialsText = document.getElementById('recipeMaterials').value.trim();

    if (!name || !icon || !materialsText) {
        addLog('Por favor, preencha todos os campos', 'error');
        return;
    }

    // Parse materials
    const materials = {};
    const materialPairs = materialsText.split(',');
    for (const pair of materialPairs) {
        const [matName, qty] = pair.split(':').map(s => s.trim());
        if (matName && qty) {
            materials[matName] = parseInt(qty) || 0;
        }
    }

    if (Object.keys(materials).length === 0) {
        addLog('Formato de materiais inválido', 'error');
        return;
    }

    // Create new recipe
    const newRecipe = {
        id: `custom_${Date.now()}`,
        name,
        icon,
        type: 'custom',
        materials,
        cost,
        defaultTax: 0
    };

    appState.customRecipes.push(newRecipe);
    appState.recipes.push(newRecipe);
    saveToLocalStorage();

    // Clear form
    document.getElementById('recipeName').value = '';
    document.getElementById('recipeIcon').value = '';
    document.getElementById('recipeCost').value = '';
    document.getElementById('recipeMaterials').value = '';

    // Close modal
    document.getElementById('addRecipeModal').classList.remove('active');

    // Refresh inventory
    initializeInventoryGrid();

    addLog(`Receita "${name}" adicionada com sucesso`, 'success');
}

// ============================================================================
// RESULTS LOG
// ============================================================================

function addLog(message, type = 'info') {
    const logContent = document.getElementById('logContent');
    const timestamp = new Date().toLocaleTimeString();
    const entry = document.createElement('p');
    entry.className = `log-entry ${type}`;
    entry.textContent = `[${timestamp}] ${message}`;

    logContent.insertBefore(entry, logContent.firstChild);

    // Keep only last 50 entries
    while (logContent.children.length > 50) {
        logContent.removeChild(logContent.lastChild);
    }
}

function setupLogClear() {
    const clearBtn = document.getElementById('clearLogBtn');
    clearBtn.addEventListener('click', () => {
        document.getElementById('logContent').innerHTML = '<p class="log-entry">Log limpo</p>';
        addLog('Log limpo', 'info');
    });
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function calculateTotalMaterials(recipe, quantity, allRecipes) {
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

    resolveMaterials(recipe, quantity);
    return totalMaterials;
}

function attachEventListeners() {
    setupMarketSimulation();
    setupAddRecipeModal();
    setupLogClear();
}
