// ROYAL CHALLENGE SEASONAL EVENT MODULE
// ============================================================================

const SEASONAL_REWARDS = [
    {
        stage: "I",
        goodless: [15, 30, 45, 60, 75, 90, 105, 120],
        elite: [
            { name: "Arconite wax", qty: 10, icon: "arconite_wax.png" },
            { name: null, qty: 0 },
            { name: null, qty: 0 },
            { name: "Red Philosopher's Stone", qty: 1, icon: "red_philosopher_stone.png" },
            { name: null, qty: 0 },
            { name: "Reaction stabilizer", qty: 1, icon: "reaction_stabilizer.png" },
            { name: null, qty: 0 },
            { name: "Purple Philosopher's Stone", qty: 5, icon: "purple_philosopher_stone.png" }
        ],
        general: [
            { name: "Shard of Unwavering Will", qty: 4 },
            { name: "Wanderer's Seal", qty: 5 },
            { name: "Wings of the Mad Buzz", qty: 100 },
            { name: "Life-giving magic potion", qty: 20 },
            { name: "Lucky Ogre Elixir", qty: 15 },
            { name: "Elmar Balm", qty: 50 },
            { name: "Four leaf clover", qty: 10, icon: "four_leaf_clover.png" },
            { name: "Trading place (24/36)", qty: 5 }
        ]
    },
    {
        stage: "II",
        goodless: [135, 150, 165, 180, 195, 210, 225, 240],
        elite: [
            { name: null, qty: 0 },
            { name: "Red Philosopher's Stone", qty: 10, icon: "red_philosopher_stone.png" },
            { name: null, qty: 0 },
            { name: null, qty: 0 },
            { name: "Card album", qty: 1 },
            { name: null, qty: 0 },
            { name: "Arconite wax", qty: 5, icon: "arconite_wax.png" },
            { name: null, qty: 0 }
        ],
        general: [
            { name: "Druid Seal", qty: 5 },
            { name: "Veronica's ticket", qty: 50 },
            { name: "Energy Bag", qty: 25 },
            { name: "Eltanit", qty: 20 },
            { name: "Melios Infusion", qty: 50 },
            { name: "Ricker's Tonic", qty: 10 },
            { name: "Trading place (24/36)", qty: 5 },
            { name: "Shard of Unwavering Will", qty: 4 }
        ]
    },
    {
        stage: "III",
        goodless: [255, 270, 285, 300, 315, 330, 345, 360],
        elite: [
            { name: "Rune of Preservation", qty: 5, icon: "rune_of_preservation.png" },
            { name: null, qty: 0 },
            { name: "Reaction stabilizer", qty: 1, icon: "reaction_stabilizer.png" },
            { name: null, qty: 0 },
            { name: "Arconite wax", qty: 10, icon: "arconite_wax.png" },
            { name: null, qty: 0 },
            { name: "Purple Philosopher's Stone", qty: 2, icon: "purple_philosopher_stone.png" },
            { name: "White Philosopher's Stone", qty: 10, icon: "white_philosopher_stone.png" }
        ],
        general: [
            { name: "Ricker's Tonic", qty: 10 },
            { name: "Seal of the Dead", qty: 5 },
            { name: "Herbalist's Potion", qty: 20 },
            { name: "Fortifying Elixir of the Lucky Thief", qty: 10 },
            { name: "Nectar of Tirum", qty: 25 },
            { name: "Eltanit", qty: 10 },
            { name: "Four leaf clover", qty: 10, icon: "four_leaf_clover.png" },
            { name: "Infanta's Ticket", qty: 30, icon: "infantas_ticket.png" }
        ]
    },
    {
        stage: "IV",
        goodless: [375, 390, 405, 420, 435, 450, 465, 480],
        elite: [
            { name: null, qty: 0 },
            { name: null, qty: 0 },
            { name: "Red Philosopher's Stone", qty: 5, icon: "red_philosopher_stone.png" },
            { name: null, qty: 0 },
            { name: null, qty: 0 },
            { name: "Rune of Cold", qty: 10 },
            { name: null, qty: 0 },
            { name: "Fast Lani's Storage Bag", qty: 1 }
        ],
        general: [
            { name: "Silver Magnetic Collar", qty: 1 },
            { name: "Seal of the Black Alchemist", qty: 5 },
            { name: "Infanta's Ticket", qty: 30, icon: "infantas_ticket.png" },
            { name: "Energy Bag", qty: 25 },
            { name: "Eltanit", qty: 20 },
            { name: "Shard of Unwavering Will", qty: 4 },
            { name: "Wings of the Mad Buzz", qty: 100 },
            { name: "Trading place (24/36)", qty: 5 }
        ]
    },
    {
        stage: "V",
        goodless: [495, 510, 525, 540, 555, 570, 585, 600],
        elite: [
            { name: "Arconite wax", qty: 5, icon: "arconite_wax.png" },
            { name: null, qty: 0 },
            { name: null, qty: 0 },
            { name: "Red Philosopher's Stone", qty: 5, icon: "red_philosopher_stone.png" },
            { name: null, qty: 0 },
            { name: "Purple Philosopher's Stone", qty: 3, icon: "purple_philosopher_stone.png" },
            { name: null, qty: 0 },
            { name: "Gold Magnetic Collar", qty: 1 }
        ],
        general: [
            { name: "Reaction stabilizer", qty: 1, icon: "reaction_stabilizer.png" },
            { name: "Seal of the Devourer", qty: 5 },
            { name: "Cleansing Potion", qty: 10 },
            { name: "Elixir of the Dodgy Buzz", qty: 15 },
            { name: "Ricker's Tonic", qty: 10 },
            { name: "Veronica's ticket", qty: 50 },
            { name: "Four leaf clover", qty: 10, icon: "four_leaf_clover.png" },
            { name: "Trading place (24/36)", qty: 5 }
        ]
    },
    {
        stage: "VI",
        goodless: [615, 630, 645, 660, 675, 690, 705, 720],
        elite: [
            { name: "Red Philosopher's Stone", qty: 5, icon: "red_philosopher_stone.png" },
            { name: null, qty: 0 },
            { name: "Reaction stabilizer", qty: 1, icon: "reaction_stabilizer.png" },
            { name: "Purple Philosopher's Stone", qty: 2, icon: "purple_philosopher_stone.png" },
            { name: null, qty: 0 },
            { name: null, qty: 0 },
            { name: "Card album", qty: 1 },
            { name: null, qty: 0 }
        ],
        general: [
            { name: "Red Philosopher's Stone", qty: 2, icon: "red_philosopher_stone.png" },
            { name: "Mechanic's Seal", qty: 5 },
            { name: "Lucky Guardian's Elixir", qty: 15 },
            { name: "Energy Bag", qty: 25 },
            { name: "Rune of Preservation", qty: 10, icon: "rune_of_preservation.png" },
            { name: "Veronica's ticket", qty: 50 },
            { name: "Shard of Unwavering Will", qty: 4 },
            { name: "Wings of the Mad Buzz", qty: 100 }
        ]
    },
    {
        stage: "VII",
        goodless: [735, 750, 765, 780, 795, 810, 825, 840],
        elite: [
            { name: "Red Philosopher's Stone", qty: 5, icon: "red_philosopher_stone.png" },
            { name: null, qty: 0 },
            { name: null, qty: 0 },
            { name: "Purple Philosopher's Stone", qty: 2, icon: "purple_philosopher_stone.png" },
            { name: null, qty: 0 },
            { name: "Rune of Cold", qty: 10 },
            { name: null, qty: 0 },
            { name: "Fast Lani's Storage Bag", qty: 1 }
        ],
        general: [
            { name: "Red Philosopher's Stone", qty: 3, icon: "red_philosopher_stone.png" },
            { name: "Seal of the Pharaoh", qty: 5 },
            { name: "Summoning Stone", qty: 10, icon: "summoning_stone.png" },
            { name: "Blood Resonator", qty: 10 },
            { name: "Ricker's Tonic", qty: 10 },
            { name: "Four leaf clover", qty: 10, icon: "four_leaf_clover.png" },
            { name: "Reaction stabilizer", qty: 1, icon: "reaction_stabilizer.png" },
            { name: "Eltanit", qty: 10 }
        ]
    },
    {
        stage: "VIII",
        goodless: [855, 870, 885, 900, 915, 930, 945, 960],
        elite: [
            { name: "Red Philosopher's Stone", qty: 10, icon: "red_philosopher_stone.png" },
            { name: null, qty: 0 },
            { name: "Reaction stabilizer", qty: 1, icon: "reaction_stabilizer.png" },
            { name: "Purple Philosopher's Stone", qty: 5, icon: "purple_philosopher_stone.png" },
            { name: null, qty: 0 },
            { name: "Rune of Cold", qty: 10 },
            { name: "Fast Lani's Storage Bag", qty: 1 },
            { name: "Card album", qty: 1 }
        ],
        general: [
            { name: "Reaction stabilizer", qty: 1, icon: "reaction_stabilizer.png" },
            { name: "Seal of Horror", qty: 5 },
            { name: "Rune of Preservation", qty: 10, icon: "rune_of_preservation.png" },
            { name: "Energy Bag", qty: 25 },
            { name: "Red Philosopher's Stone", qty: 3, icon: "red_philosopher_stone.png" },
            { name: "Shard of Unwavering Will", qty: 4 },
            { name: "Eltanit", qty: 20 },
            { name: "Card album", qty: 1 }
        ]
    }
];

const DAILY_QUESTS = [
    { name: "Green Slime", qty: 50, lvl: 20 },
    { name: "Ball of Web", qty: 50, lvl: 20 },
    { name: "Chitinous plates", qty: 60, lvl: 22 },
    { name: "Caustic Acid", qty: 50, lvl: 22 },
    { name: "Green Herb", qty: 50, lvl: 22 },
    { name: "Ent's Branch", qty: 50, lvl: 22 },
    { name: "Zhuzh shells", qty: 50, lvl: 23 },
    { name: "Wings", qty: 100, lvl: 24 },
    { name: "Piece of Meat", qty: 70, lvl: 24 },
    { name: "Elenium Weave", qty: 80, lvl: 25 },
    { name: "White clay", qty: 50, lvl: 30 },
    { name: "Shimmering Pollen", qty: 55, lvl: 33 },
    { name: "White sand", qty: 60, lvl: 38 },
    { name: "Mica", qty: 50, lvl: 46 }
];

const CHEF_MAREN_QUESTS = [
    { name: "Horn Soup", item: "Blind Buzzard Horn", qty: 15, goldReward: 972, icon: "blind_buzzard_horn.png" }
];

let seasonalState = {
    itemPrices: {},
    dailyQuestPrices: {},
    chefQuestPrices: {},
    hasEliteAccess: false,
    currentGoodless: 0,
    accountsCount: 1,
    daysRemaining: 30
};

document.addEventListener('DOMContentLoaded', () => {
    loadSeasonalPrices();
    renderSeasonalInterface();
    attachSeasonalEvents();
});

function loadSeasonalPrices() {
    const savedPrices = localStorage.getItem('seasonalEventPrices');
    if (savedPrices) {
        seasonalState.itemPrices = JSON.parse(savedPrices);
    }

    const savedDailyPrices = localStorage.getItem('dailyQuestPrices');
    if (savedDailyPrices) {
        seasonalState.dailyQuestPrices = JSON.parse(savedDailyPrices);
    }

    const savedChefPrices = localStorage.getItem('chefQuestPrices');
    if (savedChefPrices) {
        seasonalState.chefQuestPrices = JSON.parse(savedChefPrices);
    }

    const savedConfig = localStorage.getItem('seasonalConfig');
    if (savedConfig) {
        const config = JSON.parse(savedConfig);
        seasonalState.hasEliteAccess = config.hasEliteAccess || false;
        seasonalState.currentGoodless = config.currentGoodless || 0;
        seasonalState.accountsCount = config.accountsCount || 1;
        seasonalState.daysRemaining = config.daysRemaining || 30;
    }
}

function saveSeasonalState() {
    localStorage.setItem('seasonalEventPrices', JSON.stringify(seasonalState.itemPrices));
    localStorage.setItem('dailyQuestPrices', JSON.stringify(seasonalState.dailyQuestPrices));
    localStorage.setItem('chefQuestPrices', JSON.stringify(seasonalState.chefQuestPrices));
    localStorage.setItem('seasonalConfig', JSON.stringify({
        hasEliteAccess: seasonalState.hasEliteAccess,
        currentGoodless: seasonalState.currentGoodless,
        accountsCount: seasonalState.accountsCount,
        daysRemaining: seasonalState.daysRemaining
    }));
}

function renderSeasonalInterface() {
    const container = document.getElementById('seasonal-section');
    if (!container) return;

    const allRewardItems = new Set();
    const rewardIcons = {};
    SEASONAL_REWARDS.forEach(stage => {
        stage.elite.forEach(item => { 
            if (item.name) {
                allRewardItems.add(item.name);
                if (item.icon) rewardIcons[item.name] = item.icon;
            }
        });
        stage.general.forEach(item => { 
            if (item.name) {
                allRewardItems.add(item.name);
                if (item.icon) rewardIcons[item.name] = item.icon;
            }
        });
    });

    let html = `
        <div class="seasonal-panel">
            <div class="panel-header">
                <h2>👑 Royal Challenge (Maio 26 - Junho 26)</h2>
            </div>
            <div class="seasonal-content">
                
                <!-- Daily Quests Optimization Section -->
                <div class="seasonal-config-section">
                    <h3>🎯 Otimização de Quests Diárias (50 Gudles/dia)</h3>
                    <p style="color: var(--text-dim); font-size: 12px; margin-bottom: 15px;">Regra: 1 quest de entrega + 1 quest do Chef Maren + 1 quest Wanted.</p>
                    
                    <div class="global-config-grid" style="margin-bottom: 20px;">
                        <div class="input-group">
                            <label>Quantidade de Personagens:</label>
                            <input type="number" id="accountsCount" value="${seasonalState.accountsCount}" min="1">
                        </div>
                        <div class="input-group">
                            <label>Dias Restantes do Evento:</label>
                            <input type="number" id="daysRemaining" value="${seasonalState.daysRemaining}" min="1" max="31">
                        </div>
                    </div>

                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <div>
                            <h4 style="color: var(--accent-gold); font-size: 13px; margin-bottom: 10px; border-bottom: 1px solid #5a5a4a;">Quests de Entrega (Escolher 1)</h4>
                            <div class="daily-quests-grid" style="grid-template-columns: 1fr;">
                                ${DAILY_QUESTS.map(quest => `
                                    <div class="input-group">
                                        <label style="font-size: 11px; display: flex; align-items: center; gap: 5px;">
                                            <img src="icons/seasonal/daily_task.png" style="width: 16px; height: 16px;">
                                            ${quest.name} (x${quest.qty}):
                                        </label>
                                        <input type="number" class="daily-price-input" data-item="${quest.name}" value="${seasonalState.dailyQuestPrices[quest.name] || 0}" step="0.1">
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        <div>
                            <h4 style="color: var(--accent-gold); font-size: 13px; margin-bottom: 10px; border-bottom: 1px solid #5a5a4a;">Quest do Chef Maren & Wanted</h4>
                            <div class="daily-quests-grid" style="grid-template-columns: 1fr;">
                                ${CHEF_MAREN_QUESTS.map(quest => `
                                    <div class="input-group">
                                        <label style="font-size: 11px; display: flex; align-items: center; gap: 5px;">
                                            <img src="icons/seasonal/${quest.icon}" style="width: 18px; height: 18px; border-radius: 2px;">
                                            Chef: ${quest.item} (x${quest.qty}):
                                        </label>
                                        <input type="number" class="chef-price-input" data-item="${quest.item}" value="${seasonalState.chefQuestPrices[quest.item] || 0}" step="0.1">
                                        <div style="font-size: 10px; color: #10b981; margin-top: 2px;">Recompensa: ${quest.goldReward} Gold</div>
                                    </div>
                                `).join('')}
                                <div class="input-group" style="margin-top: 10px; padding: 10px; border: 1px dashed #5a5a4a; border-radius: 4px; background: rgba(0,0,0,0.1);">
                                    <label style="font-size: 11px; display: flex; align-items: center; gap: 5px; color: var(--text-dim);">
                                        <img src="icons/seasonal/daily_task.png" style="width: 16px; height: 16px; filter: hue-rotate(90deg);">
                                        Quest Wanted (Matar Boss):
                                    </label>
                                    <div style="font-size: 10px; color: var(--text-dim);">Custo: 0 (Apenas esforço)</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="dailyOptimizationResults" class="daily-optimization-results" style="margin-top: 20px; padding: 15px; background: rgba(0,0,0,0.3); border-radius: 5px; border: 1px solid #5a5a4a;">
                        <h4 style="color: var(--accent-gold); margin-bottom: 10px;">📊 Estratégia de Custo Mínimo (1+1+1)</h4>
                        <div id="bestQuestsDisplay">Escolha os preços para ver a melhor opção...</div>
                    </div>
                </div>

                <div class="seasonal-config-section">
                    <h3>⚙️ Configurações de Progresso</h3>
                    <div class="input-group">
                        <label style="display: flex; align-items: center; gap: 5px;">
                            <img src="icons/seasonal/gudles.png" style="width: 20px; height: 20px;">
                            Gudles Atuais:
                        </label>
                        <input type="number" id="currentGoodless" value="${seasonalState.currentGoodless}" min="0" max="1500">
                    </div>
                    <div class="input-group" style="flex-direction: row; align-items: center; gap: 10px; margin-top: 10px;">
                        <input type="checkbox" id="eliteAccess" ${seasonalState.hasEliteAccess ? 'checked' : ''} style="width: auto;">
                        <label for="eliteAccess">Possuo Acesso Elite (1990 Reais)</label>
                    </div>
                </div>

                <div class="seasonal-config-section">
                    <h3>💰 Preços de Mercado dos Prêmios</h3>
                    <div class="seasonal-prices-grid" id="seasonalPricesGrid">
                        ${Array.from(allRewardItems).sort().map(item => `
                            <div class="input-group">
                                <label style="font-size: 11px; display: flex; align-items: center; gap: 5px;">
                                    ${rewardIcons[item] ? `<img src="icons/seasonal/${rewardIcons[item]}" style="width: 18px; height: 18px; border-radius: 2px;">` : ''}
                                    ${item}:
                                </label>
                                <input type="number" class="seasonal-price-input" data-item="${item}" value="${seasonalState.itemPrices[item] || 0}" step="100">
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="seasonal-results-section">
                    <button class="btn-simulate" id="calculateSeasonalBtn">Calcular Valor Total</button>
                    <div id="seasonalResults" class="seasonal-results" style="display: none; margin-top: 20px;">
                        <div class="summary-stat">
                            <span class="stat-label">Valor Total Recompensas Gerais:</span>
                            <span class="stat-value" id="totalGeneralValue">0</span>
                        </div>
                        <div class="summary-stat" id="eliteValueRow" style="${seasonalState.hasEliteAccess ? 'display: flex;' : 'display: none;'}">
                            <span class="stat-label">Valor Total Recompensas Elite:</span>
                            <span class="stat-value" id="totalEliteValue">0</span>
                        </div>
                        <div class="summary-stat" style="background: linear-gradient(135deg, #3d3d2d 0%, #2a2a1a 100%); border: 1px solid var(--accent-gold);">
                            <span class="stat-label" style="color: #ffd700;">Valor Total Acumulado:</span>
                            <span class="stat-value" id="totalSeasonalValue" style="color: #ffd700;">0</span>
                        </div>
                    </div>
                </div>

                <div class="seasonal-table-container" style="margin-top: 30px;">
                    <h3>📋 Tabela de Recompensas</h3>
                    <table class="seasonal-table">
                        <thead>
                            <tr>
                                <th>Estágio</th>
                                <th>Gudles</th>
                                <th>Geral</th>
                                <th>Elite</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${SEASONAL_REWARDS.map(stage => stage.goodless.map((g, i) => `
                                <tr class="${g <= seasonalState.currentGoodless ? 'obtained' : ''}">
                                    ${i === 0 ? `<td rowspan="8" style="font-weight: bold; color: var(--accent-gold);">${stage.stage}</td>` : ''}
                                    <td style="display: flex; align-items: center; gap: 5px; justify-content: center;">
                                        <img src="icons/seasonal/gudles.png" style="width: 14px; height: 14px;">
                                        ${g}
                                    </td>
                                    <td>
                                        <div style="display: flex; align-items: center; gap: 5px;">
                                            ${stage.general[i].icon ? `<img src="icons/seasonal/${stage.general[i].icon}" style="width: 20px; height: 20px;">` : ''}
                                            ${stage.general[i].qty}x ${stage.general[i].name}
                                        </div>
                                    </td>
                                    <td class="elite-cell">
                                        <div style="display: flex; align-items: center; gap: 5px;">
                                            ${stage.elite[i].icon ? `<img src="icons/seasonal/${stage.elite[i].icon}" style="width: 20px; height: 20px;">` : ''}
                                            ${stage.elite[i].name ? `${stage.elite[i].qty}x ${stage.elite[i].name}` : '-'}
                                        </div>
                                    </td>
                                </tr>
                            `).join('')).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
    container.innerHTML = html;
    calculateDailyOptimization();
}

function attachSeasonalEvents() {
    const calcBtn = document.getElementById('calculateSeasonalBtn');
    const eliteCheck = document.getElementById('eliteAccess');
    const goodlessInput = document.getElementById('currentGoodless');
    const accountsInput = document.getElementById('accountsCount');
    const daysInput = document.getElementById('daysRemaining');
    
    if (calcBtn) calcBtn.addEventListener('click', calculateSeasonalValue);
    
    if (eliteCheck) {
        eliteCheck.addEventListener('change', (e) => {
            seasonalState.hasEliteAccess = e.target.checked;
            document.getElementById('eliteValueRow').style.display = e.target.checked ? 'flex' : 'none';
            saveSeasonalState();
            calculateSeasonalValue();
        });
    }

    if (goodlessInput) {
        goodlessInput.addEventListener('input', (e) => {
            seasonalState.currentGoodless = parseInt(e.target.value) || 0;
            saveSeasonalState();
            updateObtainedRows();
        });
    }

    if (accountsInput) {
        accountsInput.addEventListener('input', (e) => {
            seasonalState.accountsCount = parseInt(e.target.value) || 1;
            saveSeasonalState();
            calculateDailyOptimization();
        });
    }

    if (daysInput) {
        daysInput.addEventListener('input', (e) => {
            seasonalState.daysRemaining = parseInt(e.target.value) || 1;
            saveSeasonalState();
            calculateDailyOptimization();
        });
    }

    document.querySelectorAll('.seasonal-price-input').forEach(input => {
        input.addEventListener('change', (e) => {
            const item = e.target.dataset.item;
            const price = parseFloat(e.target.value) || 0;
            seasonalState.itemPrices[item] = price;
            saveSeasonalState();
        });
    });

    document.querySelectorAll('.daily-price-input').forEach(input => {
        input.addEventListener('input', (e) => {
            const item = e.target.dataset.item;
            const price = parseFloat(e.target.value) || 0;
            seasonalState.dailyQuestPrices[item] = price;
            saveSeasonalState();
            calculateDailyOptimization();
        });
    });

    document.querySelectorAll('.chef-price-input').forEach(input => {
        input.addEventListener('input', (e) => {
            const item = e.target.dataset.item;
            const price = parseFloat(e.target.value) || 0;
            seasonalState.chefQuestPrices[item] = price;
            saveSeasonalState();
            calculateDailyOptimization();
        });
    });
}

function calculateDailyOptimization() {
    // 1. Otimizar Quests de Entrega (escolher apenas a MAIS barata)
    const deliveryQuestCosts = DAILY_QUESTS.map(quest => {
        const unitPrice = seasonalState.dailyQuestPrices[quest.name] || 0;
        return {
            ...quest,
            totalCost: unitPrice * quest.qty
        };
    }).filter(q => q.totalCost > 0);

    // 2. Otimizar Quest do Chef Maren (escolher a mais barata/lucrativa)
    const chefQuestCosts = CHEF_MAREN_QUESTS.map(quest => {
        const unitPrice = seasonalState.chefQuestPrices[quest.item] || 0;
        const totalCost = unitPrice * quest.qty;
        const netCost = totalCost - quest.goldReward; // Gasto menos a recompensa em gold
        return {
            ...quest,
            totalCost: totalCost,
            netCost: netCost
        };
    }).filter(q => q.totalCost > 0);

    const display = document.getElementById('bestQuestsDisplay');
    
    if (deliveryQuestCosts.length < 1 || chefQuestCosts.length < 1) {
        display.innerHTML = '<p style="color: #ff6b6b;">Insira o preço de pelo menos 1 item de entrega e 1 item do Chef Maren para calcular.</p>';
        return;
    }

    // Sort delivery by total cost ascending
    deliveryQuestCosts.sort((a, b) => a.totalCost - b.totalCost);
    const bestDelivery = deliveryQuestCosts[0];

    // Sort chef by net cost ascending
    chefQuestCosts.sort((a, b) => a.netCost - b.netCost);
    const bestChef = chefQuestCosts[0];

    // Wanted quest cost is 0
    const dailyNetCostPerChar = bestDelivery.totalCost + bestChef.netCost;
    const totalDailyNetCost = dailyNetCostPerChar * seasonalState.accountsCount;
    const totalEventNetCost = totalDailyNetCost * seasonalState.daysRemaining;

    let html = `
        <div style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 15px;">
            <div>
                <p style="color: var(--text-dim); font-size: 12px; margin-bottom: 5px;">Quests Selecionadas:</p>
                <ul style="margin-left: 15px; color: #10b981; font-weight: bold; font-size: 12px;">
                    <li>1x Entrega: ${bestDelivery.name} (x${bestDelivery.qty}) - ${formatNumber(bestDelivery.totalCost)}</li>
                    <li>1x Chef: ${bestChef.name} (${bestChef.item} x${bestChef.qty}) - ${formatNumber(bestChef.netCost)} (líquido)</li>
                    <li>1x Wanted: Matar Boss - <span style="color: var(--text-dim);">Grátis</span></li>
                </ul>
            </div>
            <div style="text-align: right; background: rgba(0,0,0,0.2); padding: 10px; border-radius: 4px;">
                <p style="color: var(--text-dim); font-size: 11px;">Custo Líquido Diário/Char: <span style="color: var(--accent-gold); font-weight: bold;">${formatNumber(dailyNetCostPerChar)}</span></p>
                <p style="color: var(--text-dim); font-size: 11px;">Custo Líquido Diário Total: <span style="color: var(--accent-gold); font-weight: bold;">${formatNumber(totalDailyNetCost)}</span></p>
                <p style="color: #ffd700; font-size: 14px; margin-top: 5px; border-top: 1px solid #5a5a4a; padding-top: 5px;">Custo Líquido Total Evento: <strong>${formatNumber(totalEventNetCost)}</strong></p>
            </div>
        </div>
        <div style="margin-top: 10px; padding-top: 10px; border-top: 1px dashed #5a5a4a;">
            <p style="color: var(--text-dim); font-size: 11px;">📋 Lista de Compras para ${seasonalState.daysRemaining} dias (${seasonalState.accountsCount} chars):</p>
            <p style="color: var(--accent-gold); font-size: 12px; font-weight: bold;">
                ${bestDelivery.qty * seasonalState.accountsCount * seasonalState.daysRemaining}x ${bestDelivery.name} | 
                ${bestChef.qty * seasonalState.accountsCount * seasonalState.daysRemaining}x ${bestChef.item}
            </p>
        </div>
    `;
    display.innerHTML = html;
}

function updateObtainedRows() {
    const rows = document.querySelectorAll('.seasonal-table tbody tr');
    rows.forEach(row => {
        const goodlessCell = row.cells[row.cells.length === 4 ? 1 : 0];
        if (goodlessCell) {
            const goodlessValue = parseInt(goodlessCell.textContent.replace(/[^0-9]/g, ''));
            if (goodlessValue <= seasonalState.currentGoodless) {
                row.classList.add('obtained');
            } else {
                row.classList.remove('obtained');
            }
        }
    });
}

function calculateSeasonalValue() {
    let totalGeneral = 0;
    let totalElite = 0;

    SEASONAL_REWARDS.forEach(stage => {
        stage.goodless.forEach((g, i) => {
            if (g <= seasonalState.currentGoodless) {
                const genItem = stage.general[i];
                if (genItem.name) {
                    totalGeneral += (seasonalState.itemPrices[genItem.name] || 0) * genItem.qty;
                }
                if (seasonalState.hasEliteAccess) {
                    const eliteItem = stage.elite[i];
                    if (eliteItem.name) {
                        totalElite += (seasonalState.itemPrices[eliteItem.name] || 0) * eliteItem.qty;
                    }
                }
            }
        });
    });

    document.getElementById('seasonalResults').style.display = 'block';
    document.getElementById('totalGeneralValue').textContent = formatNumber(totalGeneral);
    document.getElementById('totalEliteValue').textContent = formatNumber(totalElite);
    document.getElementById('totalSeasonalValue').textContent = formatNumber(totalGeneral + totalElite);
    
    if (typeof addLog === 'function') {
        addLog(`Cálculo sazonal: Total ${formatNumber(totalGeneral + totalElite)}`, 'success');
    }
}

function formatNumber(num) {
    return new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(num);
}
