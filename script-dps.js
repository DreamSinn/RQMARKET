/**
 * Royal Quest - DPS Analyzer Module
 * Ported from RQ.py and integrated into the site
 */

const DPS_STATE = {
    df: [],
    sessions: [],
    gapThreshold: 30, // seconds
    allMobs: [],
    currentDate: 'Todas',
    currentMob: 'Todos',
    currentSession: 'Todas as Lutas'
};

document.addEventListener('DOMContentLoaded', () => {
    // Add Chart.js dependency if not present
    if (typeof Chart === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
        script.onload = initDPSModule;
        document.head.appendChild(script);
    } else {
        initDPSModule();
    }
});

function initDPSModule() {
    renderDPSSection();
    setupDPSEvents();
}

function renderDPSSection() {
    const section = document.getElementById('dps-section');
    if (!section) return;

    section.innerHTML = `
        <div class="dps-panel">
            <div class="panel-header">
                <h2>⚔️ Analisador de DPS</h2>
            </div>
            <div class="dps-content" style="padding: 20px; display: grid; grid-template-columns: 300px 1fr; gap: 20px;">
                <!-- Sidebar -->
                <div class="dps-sidebar" style="background: var(--panel-bg); border: 1px solid var(--border-color); padding: 15px; border-radius: 5px;">
                    <h3 style="color: var(--accent-gold); margin-bottom: 15px; font-family: 'Cinzel', serif;">Configuração</h3>
                    
                    <div class="input-group" style="margin-bottom: 15px;">
                        <label>Selecionar Log (.htm):</label>
                        <input type="file" id="logFile" accept=".htm,.html" style="font-size: 12px;">
                    </div>

                    <div id="dpsFilters" style="display: none;">
                        <div class="input-group" style="margin-bottom: 15px;">
                            <label>1. Escolha a Data:</label>
                            <select id="comboDate" class="dps-select"></select>
                        </div>

                        <div class="input-group" style="margin-bottom: 15px;">
                            <label>2. Buscar Mob:</label>
                            <input type="text" id="searchMob" placeholder="Filtrar mob..." class="dps-input">
                            <select id="comboMob" class="dps-select" style="margin-top: 5px;"></select>
                        </div>

                        <div class="input-group" style="margin-bottom: 15px;">
                            <label>3. Escolha a Luta:</label>
                            <select id="comboSession" class="dps-select"></select>
                        </div>

                        <button class="btn-simulate" id="btnAnalyze" style="width: 100%; margin-top: 10px;">Analisar Seleção</button>
                    </div>
                </div>

                <!-- Main Area -->
                <div class="dps-main">
                    <div id="dpsSummary" class="selected-item-info" style="margin-bottom: 15px; text-align: left; padding: 15px;">
                        <p class="info-text">Carregue um arquivo de log para começar a análise.</p>
                    </div>

                    <div id="dpsResultsArea" style="display: none;">
                        <div class="report-container" style="background: #1e1e1e; border: 1px solid #444; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
                            <h3 style="color: #00ff00; font-family: 'Consolas', monospace; font-size: 14px; margin-bottom: 10px;">Relatório de Combate</h3>
                            <pre id="txtResult" style="color: #00ff00; font-family: 'Consolas', monospace; font-size: 12px; white-space: pre-wrap; margin: 0;"></pre>
                        </div>

                        <div class="chart-container-wrapper" style="background: #1e1e1e; border: 1px solid #444; padding: 15px; border-radius: 5px; height: 400px; position: relative;">
                            <canvas id="dpsChart"></canvas>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Add some styles for the selects and inputs
    const style = document.createElement('style');
    style.textContent = `
        .dps-select, .dps-input {
            width: 100%;
            background: #1a1a1a;
            border: 1px solid #8b7355;
            color: #d4af37;
            padding: 8px;
            border-radius: 4px;
            font-family: 'Crimson Text', serif;
        }
        .dps-select:focus, .dps-input:focus {
            outline: none;
            border-color: #d4af37;
        }
    `;
    document.head.appendChild(style);
}

function setupDPSEvents() {
    const logFileInput = document.getElementById('logFile');
    const comboDate = document.getElementById('comboDate');
    const comboMob = document.getElementById('comboMob');
    const searchMob = document.getElementById('searchMob');
    const btnAnalyze = document.getElementById('btnAnalyze');

    logFileInput.addEventListener('change', handleFileSelect);
    
    comboDate.addEventListener('change', (e) => {
        DPS_STATE.currentDate = e.target.value;
        updateMobsList();
        updateSessionsList();
    });

    comboMob.addEventListener('change', (e) => {
        DPS_STATE.currentMob = e.target.value;
        updateSessionsList();
    });

    searchMob.addEventListener('input', (e) => {
        filterMobsBySearch(e.target.value);
    });

    btnAnalyze.addEventListener('click', applyAnalysis);
}

async function handleFileSelect(event) {
    const file = event.target.files[0];
    if (!file) return;

    const summary = document.getElementById('dpsSummary');
    summary.innerHTML = '<p class="info-text">Processando arquivo... Aguarde.</p>';

    const reader = new FileReader();
    reader.onload = function(e) {
        processLogData(e.target.result);
    };
    reader.readAsText(file);
}

function processLogData(htmlContent) {
    const data = [];
    const currentYear = new Date().getFullYear();
    
    // Pattern: title='([^']+)'>.*?You have dealt (\d+) damage\. Target: ([^\n<]+)
    // We also look for "has died" to count rounds correctly
    const lines = htmlContent.split('\n');
    const damagePattern = /title='([^']+)'>.*?You have dealt (\d+) damage\. Target: ([^\n<]+)/;
    const deathPattern = /title='([^']+)'>.*?Target: ([^\n<]+) has died/;

    lines.forEach(line => {
        const dmgMatch = line.match(damagePattern);
        if (dmgMatch) {
            const [_, tsStr, damage, target] = dmgMatch;
            const dt = parseDate(tsStr, currentYear);
            if (dt) {
                data.push({
                    datetime: dt,
                    date: formatDate(dt),
                    damage: parseInt(damage),
                    target: target.trim(),
                    type: 'damage'
                });
            }
        }

        const deathMatch = line.match(deathPattern);
        if (deathMatch) {
            const [_, tsStr, target] = deathMatch;
            const dt = parseDate(tsStr, currentYear);
            if (dt) {
                data.push({
                    datetime: dt,
                    date: formatDate(dt),
                    target: target.trim(),
                    type: 'death'
                });
            }
        }
    });

    if (data.length === 0) {
        alert('Nenhum dado encontrado no log.');
        return;
    }

    // Sort by datetime
    data.sort((a, b) => a.datetime - b.datetime);
    DPS_STATE.df = data;
    
    identifySessions();
    finishLoading();
}

function parseDate(tsStr, year) {
    // tsStr format: "MM/DD HH:MM:SS"
    try {
        const [datePart, timePart] = tsStr.split(' ');
        const [month, day] = datePart.split('/');
        const [hour, minute, second] = timePart.split(':');
        return new Date(year, parseInt(month) - 1, parseInt(day), parseInt(hour), parseInt(minute), parseInt(second));
    } catch (e) {
        return null;
    }
}

function formatDate(dt) {
    const day = String(dt.getDate()).padStart(2, '0');
    const month = String(dt.getMonth() + 1).padStart(2, '0');
    const year = dt.getFullYear();
    return `${day}/${month}/${year}`;
}

function identifySessions() {
    DPS_STATE.sessions = [];
    const df = DPS_STATE.df;
    
    // Group by target and date
    const groups = {};
    df.forEach(row => {
        const key = `${row.target}|${row.date}`;
        if (!groups[key]) groups[key] = [];
        groups[key].push(row);
    });

    for (const key in groups) {
        const group = groups[key];
        let currentSessionHits = [];
        let lastTime = null;
        let deathsInSession = 0;

        group.forEach(row => {
            if (row.type === 'damage') {
                if (lastTime && (row.datetime - lastTime) / 1000 > DPS_STATE.gapThreshold) {
                    if (currentSessionHits.length > 0) {
                        addSession(currentSessionHits, deathsInSession);
                    }
                    currentSessionHits = [];
                    deathsInSession = 0;
                }
                currentSessionHits.push(row);
                lastTime = row.datetime;
            } else if (row.type === 'death') {
                deathsInSession++;
            }
        });

        if (currentSessionHits.length > 0) {
            addSession(currentSessionHits, deathsInSession);
        }
    }
}

function addSession(hits, deaths) {
    const target = hits[0].target;
    const date = hits[0].date;
    const startTime = hits[0].datetime;
    const totalDmg = hits.reduce((sum, h) => sum + h.damage, 0);
    
    // Use deaths as rounds
    const rounds = deaths; 

    DPS_STATE.sessions.push({
        target,
        date,
        startTime,
        totalDmg,
        rounds,
        hits: hits,
        display: `${target} (${startTime.getHours().toString().padStart(2, '0')}:${startTime.getMinutes().toString().padStart(2, '0')}:${startTime.getSeconds().toString().padStart(2, '0')}) - ${totalDmg.toLocaleString()} dmg`
    });
}

function finishLoading() {
    document.getElementById('dpsFilters').style.display = 'block';
    const summary = document.getElementById('dpsSummary');
    summary.innerHTML = `<p class="info-text" style="color: #90ee90;">Pronto! ${DPS_STATE.sessions.length} lutas identificadas.</p>`;

    // Populate dates
    const dates = ['Todas', ...new Set(DPS_STATE.df.map(row => row.date))].sort();
    const comboDate = document.getElementById('comboDate');
    comboDate.innerHTML = dates.map(d => `<option value="${d}">${d}</option>`).join('');
    
    updateMobsList();
    updateSessionsList();
    
    if (typeof addLog === 'function') {
        addLog(`Log de DPS carregado: ${DPS_STATE.sessions.length} lutas encontradas.`, 'success');
    }
}

function updateMobsList() {
    const selDate = DPS_STATE.currentDate;
    let mobs = [];
    if (selDate === 'Todas') {
        mobs = [...new Set(DPS_STATE.df.map(row => row.target))];
    } else {
        mobs = [...new Set(DPS_STATE.df.filter(row => row.date === selDate).map(row => row.target))];
    }
    mobs.sort();
    DPS_STATE.allMobs = mobs;
    
    const comboMob = document.getElementById('comboMob');
    comboMob.innerHTML = ['Todos', ...mobs].map(m => `<option value="${m}">${m}</option>`).join('');
    DPS_STATE.currentMob = 'Todos';
}

function filterMobsBySearch(term) {
    const filtered = DPS_STATE.allMobs.filter(m => m.toLowerCase().includes(term.toLowerCase()));
    const comboMob = document.getElementById('comboMob');
    comboMob.innerHTML = ['Todos', ...filtered].map(m => `<option value="${m}">${m}</option>`).join('');
}

function updateSessionsList() {
    const selDate = DPS_STATE.currentDate;
    const selMob = DPS_STATE.currentMob;
    
    const filtered = DPS_STATE.sessions.filter(s => 
        (selDate === 'Todas' || s.date === selDate) && 
        (selMob === 'Todos' || s.target === selMob)
    );
    
    const comboSession = document.getElementById('comboSession');
    comboSession.innerHTML = ['Todas as Lutas', ...filtered.map(s => s.display)].map(d => `<option value="${d}">${d}</option>`).join('');
}

let dpsChartInstance = null;

function applyAnalysis() {
    const selDisplay = document.getElementById('comboSession').value;
    let selectedHits = [];
    let title = "";
    let totalRounds = 0;

    if (selDisplay === 'Todas as Lutas') {
        const selDate = DPS_STATE.currentDate;
        const selMob = DPS_STATE.currentMob;
        const filtered = DPS_STATE.sessions.filter(s => 
            (selDate === 'Todas' || s.date === selDate) && 
            (selMob === 'Todos' || s.target === selMob)
        );
        
        if (filtered.length === 0) return;
        
        filtered.forEach(s => {
            selectedHits = selectedHits.concat(s.hits);
            totalRounds += s.rounds;
        });
        title = `Agregado: ${selMob} (${selDate})`;
    } else {
        const session = DPS_STATE.sessions.find(s => s.display === selDisplay);
        if (!session) return;
        selectedHits = session.hits;
        totalRounds = session.rounds;
        title = `Luta: ${selDisplay}`;
    }

    showResults(selectedHits, title, totalRounds);
}

function showResults(hits, title, rounds) {
    document.getElementById('dpsResultsArea').style.display = 'block';
    
    const totalDmg = hits.reduce((sum, h) => sum + h.damage, 0);
    const minTime = Math.min(...hits.map(h => h.datetime));
    const maxTime = Math.max(...hits.map(h => h.datetime));
    const duration = Math.max(1, (maxTime - minTime) / 1000);
    const dps = totalDmg / duration;
    const maxHit = Math.max(...hits.map(h => h.damage));
    const dpsPerRound = rounds > 0 ? (totalDmg / rounds) : 0;
    
    const summary = document.getElementById('dpsSummary');
    summary.innerHTML = `<p class="info-text" style="color: var(--accent-gold);">${title} | Dano: ${totalDmg.toLocaleString()} | DPS: ${dps.toFixed(2)} | Rounds: ${rounds} | Dano/Round: ${dpsPerRound.toLocaleString()}</p>`;
    
    const report = [
        title,
        "=".repeat(40),
        `Dano Total: ${totalDmg.toLocaleString()}`,
        `Duração: ${duration}s`,
        `DPS Médio: ${dps.toFixed(2)}`,
        `Máximo Golpe: ${maxHit.toLocaleString()}`,
        `Total de Golpes: ${hits.length}`,
        `Rounds (Mortes): ${rounds}`
    ].join('\n');
    
    document.getElementById('txtResult').textContent = report;
    
    updateChart(hits);
}

function updateChart(hits) {
    const ctx = document.getElementById('dpsChart').getContext('2d');
    
    // Group by second
    const timeline = {};
    hits.forEach(h => {
        const ts = Math.floor(h.datetime.getTime() / 1000) * 1000;
        timeline[ts] = (timeline[ts] || 0) + h.damage;
    });
    
    const labels = Object.keys(timeline).sort().map(ts => new Date(parseInt(ts)));
    const data = Object.keys(timeline).sort().map(ts => timeline[ts]);

    if (dpsChartInstance) {
        dpsChartInstance.destroy();
    }

    dpsChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Dano por Segundo',
                data: data,
                borderColor: '#ffd20f',
                backgroundColor: 'rgba(255, 210, 15, 0.1)',
                borderWidth: 2,
                pointRadius: 3,
                pointHoverRadius: 6,
                fill: true,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'second',
                        displayFormats: {
                            second: 'HH:mm:ss'
                        }
                    },
                    grid: { color: '#333' },
                    ticks: { color: '#fff' }
                },
                y: {
                    beginAtZero: true,
                    grid: { color: '#333' },
                    ticks: { color: '#fff' }
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Dano: ${context.parsed.y.toLocaleString()}`;
                        },
                        title: function(context) {
                            const date = new Date(context[0].parsed.x);
                            return date.toLocaleTimeString();
                        }
                    }
                }
            }
        }
    });
}
