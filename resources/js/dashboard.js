// Dashboard JavaScript
// Load data from CSV and populate dashboard

let dashboardData = [];

// Parse CSV data
function parseCSV(text) {
    const lines = text.split('\n');
    const headers = lines[0].split(',');
    const data = [];

    for (let i = 1; i < lines.length; i++) {
        if (lines[i].trim() === '') continue;

        const values = lines[i].split(',');
        const row = {};

        headers.forEach((header, index) => {
            row[header.trim()] = values[index] ? values[index].trim() : '';
        });

        data.push(row);
    }

    return data;
}

// Load CSV data
async function loadCSVData() {
    try {
        const response = await fetch('resources/data/bubble_up_data.csv');
        const text = await response.text();
        dashboardData = parseCSV(text);
        populateDashboard();
    } catch (error) {
        console.error('Error loading CSV data:', error);
    }
}

// Filter data by type
function getDataByType(type) {
    return dashboardData.filter(row => row.data_type === type);
}

// Populate dashboard with CSV data
function populateDashboard() {
    populateKPIs();
    populateMarketUnitRanking();
    populateVPPerformance();
    populateBadges();
    populateTopPerformers();
    populateBranches();
    populateScoreDistribution();
    addClickHandlers();
}

// Populate KPI cards
function populateKPIs() {
    const kpiData = getDataByType('kpi_summary')[0];
    if (!kpiData) return;

    const kpiValues = document.querySelectorAll('.kpi-value');
    if (kpiValues.length >= 4) {
        kpiValues[0].textContent = `${kpiData.completion_rate}%`;
        kpiValues[1].textContent = `${kpiData.on_time_rate}%`;
        kpiValues[2].textContent = formatNumber(kpiData.trainings_completed);
        kpiValues[3].textContent = kpiData.average_score;
    }
}

// Populate Market Unit Ranking
function populateMarketUnitRanking() {
    const rankings = getDataByType('market_unit_ranking');
    const rankingList = document.querySelector('.ranking-list');
    if (!rankingList) return;

    rankingList.innerHTML = '';

    const medals = ['medal-gold.svg', 'medal-silver.svg', 'medal-bronze.svg', 'medal-copper.svg'];

    rankings.forEach((ranking, index) => {
        const changeClass = ranking.change_direction === 'positive' ? 'positive' : 'negative';
        const medal = medals[index] || 'medal-copper.svg';

        const html = `
            <div class="ranking-item">
                <img src="resources/images/${medal}" alt="${ranking.rank} Place" class="ranking-medal">
                <div class="ranking-details">
                    <div class="ranking-name">${ranking.market_unit}</div>
                    <div class="ranking-location"></div>
                </div>
                <div class="ranking-stats">
                    <div class="ranking-percentage">${ranking.completion_rate}%</div>
                    <div class="ranking-change ${changeClass}">${ranking.performance_change}%</div>
                </div>
            </div>
        `;
        rankingList.innerHTML += html;
    });
}

// Populate VP Performance
function populateVPPerformance() {
    const vps = getDataByType('vp_performance');
    const vpGrid = document.querySelector('.vp-grid');
    if (!vpGrid) return;

    vpGrid.innerHTML = '';

    const colors = ['#4A90E2', '#E74C3C', '#4A90E2', '#6b7280'];

    vps.forEach((vp, index) => {
        const changeClass = vp.change_direction === 'positive' ? 'positive' : 'negative';
        const changeSymbol = vp.change_direction === 'positive' ? '↑' : '↓';
        const xpClass = vp.change_direction === 'positive' ? 'blue-xp' : 'red-xp';
        const color = colors[index] || '#4A90E2';

        const html = `
            <div class="vp-profile" data-employee-id="${vp.employee_id}" data-name="${vp.employee_name}" data-location="${vp.market_unit}">
                <span class="material-icons vp-photo" style="font-size: 80px; color: ${color};">account_circle</span>
                <div class="vp-name">${vp.employee_name}</div>
                <div class="vp-location">${vp.market_unit}</div>
                <div class="vp-percentage">${vp.completion_rate}%</div>
                <div class="vp-change ${changeClass}">${changeSymbol} ${vp.performance_change}%</div>
                <div class="vp-xp ${xpClass}">
                    <span class="material-icons xp-icon" style="font-size: 1rem;">stars</span>
                    <span>${vp.xp_points} XP</span>
                </div>
            </div>
        `;
        vpGrid.innerHTML += html;
    });
}

// Populate Badges
function populateBadges() {
    const badges = getDataByType('badge_aggregate');
    const badgesList = document.querySelector('.badges-list');
    if (!badgesList) return;

    badgesList.innerHTML = '';

    const icons = [
        { name: 'On-Time Heroes', icon: 'access_time', color: '#27AE60' },
        { name: 'Accuracy Aces', icon: 'verified', color: '#4A90E2' },
        { name: 'Streak Masters', icon: 'local_fire_department', color: '#F39C12' },
        { name: 'Perfect Scores', icon: 'grade', color: '#9B59B6' },
        { name: 'Bubble Boosters', icon: 'rocket_launch', color: '#E74C3C' }
    ];

    badges.forEach((badge) => {
        const iconData = icons.find(i => i.name === badge.badge_name) || icons[0];

        const html = `
            <div class="badge-item">
                <span class="material-icons badge-icon" style="color: ${iconData.color};">${iconData.icon}</span>
                <div class="badge-details">
                    <div class="badge-name">${badge.badge_name}</div>
                </div>
                <div class="badge-count">${badge.badge_count}</div>
            </div>
        `;
        badgesList.innerHTML += html;
    });
}

// Populate Top Performers
function populateTopPerformers() {
    const performers = getDataByType('top_performer');
    const performersGrid = document.querySelector('.performers-grid');
    if (!performersGrid) return;

    performersGrid.innerHTML = '';

    const colors = ['#4A90E2', '#27AE60', '#F39C12', '#9B59B6'];

    performers.forEach((performer, index) => {
        const color = colors[index] || '#4A90E2';
        const location = `${performer.location_city}, ${performer.location_state}`;

        const html = `
            <div class="performer-row" data-employee-id="${performer.employee_id}">
                <span class="material-icons performer-photo" style="font-size: 50px; color: ${color};">account_circle</span>
                <div class="performer-details">
                    <div class="performer-name">${performer.employee_name}</div>
                    <div class="performer-location">${location}</div>
                </div>
                <div class="performer-score positive">+${performer.completion_rate}%</div>
            </div>
        `;
        performersGrid.innerHTML += html;
    });
}

// Populate Branches
function populateBranches() {
    const branches = getDataByType('branch_overview');
    const branchesList = document.querySelector('.branches-list');
    if (!branchesList) return;

    branchesList.innerHTML = '';

    branches.forEach((branch) => {
        const location = `${branch.location_city}, ${branch.location_state}`;

        const html = `
            <div class="branch-item">
                <div class="branch-header">
                    <div class="branch-name">${location}</div>
                </div>
                <div class="branch-metrics">
                    <div class="branch-metric">
                        <div class="metric-label-small">Completion</div>
                        <div class="metric-value-small">${branch.completion_rate}%</div>
                    </div>
                    <div class="branch-metric">
                        <div class="metric-label-small">On-Time</div>
                        <div class="metric-value-small highlight-green">${branch.on_time_rate}%</div>
                    </div>
                    <div class="branch-metric">
                        <div class="metric-label-small">Avg Score</div>
                        <div class="metric-value-small">${branch.average_score}</div>
                    </div>
                    <div class="branch-metric">
                        <div class="metric-label-small">Trainings</div>
                        <div class="metric-value-small">${formatNumber(branch.trainings_completed)}</div>
                    </div>
                </div>
            </div>
        `;
        branchesList.innerHTML += html;
    });
}

// Populate Score Distribution
function populateScoreDistribution() {
    const distributions = getDataByType('score_distribution');
    const distributionList = document.querySelector('.distribution-list');
    if (!distributionList) return;

    distributionList.innerHTML = '';

    distributions.forEach((dist) => {
        const percent = parseInt(dist.score_distribution_percent);
        let barClass = 'blue-bar';
        if (dist.score_range.startsWith('5') || dist.score_range.startsWith('6')) {
            barClass = 'red-bar';
        } else if (dist.score_range.startsWith('7')) {
            barClass = 'orange-bar';
        }

        const html = `
            <div class="distribution-row">
                <div class="distribution-label">${dist.score_range}</div>
                <div class="distribution-bar-container">
                    <div class="distribution-bar ${barClass}" style="width: ${percent}%;"></div>
                </div>
                <div class="distribution-percentage">${percent}%</div>
            </div>
        `;
        distributionList.innerHTML += html;
    });
}

// Add click handlers for navigation
function addClickHandlers() {
    // Add click handlers to performer rows
    const performerRows = document.querySelectorAll('.performer-row');
    performerRows.forEach((row) => {
        row.style.cursor = 'pointer';

        row.addEventListener('click', function() {
            const employeeId = row.dataset.employeeId;
            window.location.href = `profile.html?employee_id=${employeeId}`;
        });

        row.addEventListener('mouseenter', function() {
            row.style.transform = 'translateX(5px)';
        });

        row.addEventListener('mouseleave', function() {
            row.style.transform = 'translateX(0)';
        });
    });

    // Add click handlers to VP profiles
    const vpProfiles = document.querySelectorAll('.vp-profile');
    vpProfiles.forEach((profile) => {
        profile.style.cursor = 'pointer';

        profile.addEventListener('click', function() {
            const employeeId = profile.dataset.employeeId;
            if (employeeId) {
                window.location.href = `profile.html?employee_id=${employeeId}`;
            }
        });
    });
}

// Helper function to format numbers with commas
function formatNumber(num) {
    if (!num) return '0';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    loadCSVData();
    console.log('Dashboard initialized with CSV data');
});
