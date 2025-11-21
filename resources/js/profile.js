// Profile page JavaScript
// Load data from CSV and populate profile page

let profileData = [];
let currentEmployeeId = null;

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
        profileData = parseCSV(text);
        loadProfileData();
    } catch (error) {
        console.error('Error loading CSV data:', error);
    }
}

// Navigate back to dashboard
function goBack() {
    window.location.href = 'sales_game_ranking.html';
}

// Get employee ID from URL
function getEmployeeIdFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('employee_id') || 'EMP001'; // Default to EMP001
}

// Filter data by type and employee
function getEmployeeData(dataType, employeeId) {
    return profileData.filter(row =>
        row.data_type === dataType && row.employee_id === employeeId
    );
}

// Get data by type only
function getDataByType(dataType) {
    return profileData.filter(row => row.data_type === dataType);
}

// Load and populate profile data
function loadProfileData() {
    currentEmployeeId = getEmployeeIdFromURL();

    const employee = getEmployeeData('employee_profile', currentEmployeeId)[0];
    if (!employee) {
        console.error('Employee not found:', currentEmployeeId);
        return;
    }

    populateProfileCard(employee);
    populateCurrentModuleProgress(employee);
    populatePerformanceMetrics(employee);
    populateBadges();
    populateModules();
    populateLeaderboard();
}

// Populate Profile Card
function populateProfileCard(employee) {
    document.getElementById('profileName').textContent = employee.employee_name;
    document.getElementById('profileTitle').textContent = employee.job_title;
    document.getElementById('profileLocation').textContent = `${employee.location_city}, ${employee.location_state}`;
    document.getElementById('xpValue').textContent = formatNumber(employee.xp_points);
    document.getElementById('streakValue').textContent = employee.streak_days;
}

// Populate Current Module Progress
function populateCurrentModuleProgress(employee) {
    const modules = getEmployeeData('employee_module', currentEmployeeId);
    const currentModule = modules.find(m => m.module_status === 'In Progress');

    if (currentModule) {
        // Update module title and date
        const moduleTitleElement = document.querySelector('.module-title-large');
        const moduleAssignedElement = document.querySelector('.module-assigned');

        if (moduleTitleElement) {
            moduleTitleElement.textContent = currentModule.module_name;
        }

        if (moduleAssignedElement) {
            const assignedDate = new Date(currentModule.module_assigned_date);
            moduleAssignedElement.textContent = `Assigned ${assignedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
        }

        // Update progress circle
        const progress = parseInt(currentModule.module_progress) || 0;
        const progressPercentElement = document.querySelector('.progress-percentage');
        if (progressPercentElement) {
            progressPercentElement.textContent = `${progress}%`;
        }

        animateProgressCircle(progress);

        // Update streak info
        const streakDaysElement = document.querySelector('.streak-days');
        const streakTargetElement = document.querySelector('.streak-target');

        if (streakDaysElement) {
            streakDaysElement.textContent = `${employee.streak_days} days`;
        }

        if (streakTargetElement) {
            streakTargetElement.textContent = `/ ${employee.streak_target} days`;
        }
    }
}

// Populate Performance Metrics
function populatePerformanceMetrics(employee) {
    const metricsValues = document.querySelectorAll('.metric-value');

    if (metricsValues.length >= 4) {
        metricsValues[0].textContent = employee.trainings_completed;
        metricsValues[1].textContent = employee.average_score;
        metricsValues[2].textContent = `${employee.on_time_rate}%`;
        metricsValues[3].textContent = formatNumber(employee.xp_points);
    }
}

// Populate Badges
function populateBadges() {
    const badges = getEmployeeData('employee_badge', currentEmployeeId);
    const badgesGrid = document.querySelector('.badges-grid');

    if (!badgesGrid || badges.length === 0) return;

    badgesGrid.innerHTML = '';

    const badgeConfig = {
        'Perfect Score': { icon: 'grade', class: 'gold' },
        'Accuracy Ace': { icon: 'verified', class: 'blue' },
        'Streak Master': { icon: 'local_fire_department', class: 'orange' },
        'On-Time Hero': { icon: 'access_time', class: 'green' }
    };

    badges.forEach((badge) => {
        const config = badgeConfig[badge.badge_name] || { icon: 'emoji_events', class: 'gold' };

        const html = `
            <div class="badge-earned">
                <div class="badge-circle ${config.class}">
                    <span class="material-icons">${config.icon}</span>
                </div>
                <div class="badge-name-small">${badge.badge_name}</div>
            </div>
        `;
        badgesGrid.innerHTML += html;
    });
}

// Populate Modules List
function populateModules() {
    const modules = getEmployeeData('employee_module', currentEmployeeId);
    const moduleList = document.querySelector('.module-list');

    if (!moduleList || modules.length === 0) return;

    moduleList.innerHTML = '';

    modules.forEach((module) => {
        const statusClass = module.module_status.toLowerCase().replace(' ', '-');
        const progress = parseInt(module.module_progress) || 0;
        const progressFillClass = module.module_status === 'Completed' ? 'completed' : '';

        let metaText = '';
        if (module.module_status === 'Completed' && module.module_completed_date) {
            const completedDate = new Date(module.module_completed_date);
            metaText = `Completed on ${completedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
        } else {
            metaText = `${progress}% Complete`;
        }

        const html = `
            <div class="module-item">
                <div class="module-header">
                    <div class="module-name">${module.module_name}</div>
                    <span class="module-status ${statusClass}">${module.module_status}</span>
                </div>
                <div class="module-progress-bar">
                    <div class="module-progress-fill ${progressFillClass}" style="width: ${progress}%;"></div>
                </div>
                <div class="module-meta">${metaText}</div>
            </div>
        `;
        moduleList.innerHTML += html;
    });
}

// Populate Branch Leaderboard
function populateLeaderboard() {
    const employee = getEmployeeData('employee_profile', currentEmployeeId)[0];
    if (!employee) return;

    const leaderboardData = getDataByType('branch_leaderboard')
        .filter(item => item.location_branch === employee.location_branch)
        .sort((a, b) => parseInt(a.leaderboard_rank) - parseInt(b.leaderboard_rank));

    // Update rank badge
    const rankBadge = document.querySelector('.rank-badge');
    if (rankBadge) {
        rankBadge.textContent = `RANK ${employee.rank}`;
    }

    // Update current user highlight
    const currentRank = document.querySelector('.current-rank');
    const currentName = document.querySelector('.current-name');
    const statPoints = document.querySelector('.stat-points');
    const statCompletion = document.querySelector('.stat-completion');

    if (currentRank) currentRank.textContent = employee.rank;
    if (currentName) currentName.textContent = employee.employee_name;
    if (statPoints) statPoints.textContent = `${formatNumber(employee.xp_points)} pts`;
    if (statCompletion) statCompletion.textContent = `${employee.on_time_rate}%`;

    // Populate leaderboard list
    const leaderboardList = document.querySelector('.leaderboard-list');
    if (!leaderboardList) return;

    leaderboardList.innerHTML = '';

    leaderboardData.slice(0, 4).forEach((leader) => {
        const rank = parseInt(leader.leaderboard_rank);
        const rankClass = rank <= 3 ? `rank-${rank}` : '';
        const isMedal = rank <= 3;
        const completionClass = parseInt(leader.leaderboard_completion) >= 80 ? 'high' : 'low';

        const rankDisplay = isMedal
            ? '<span class="material-icons rank-medal">emoji_events</span>'
            : `<span class="rank-num">${rank}</span>`;

        const html = `
            <div class="leaderboard-item ${rankClass}">
                <div class="item-rank">
                    ${rankDisplay}
                </div>
                <span class="material-icons item-avatar">account_circle</span>
                <div class="item-info">
                    <div class="item-name">${leader.employee_name}</div>
                    <div class="item-stats">
                        <span class="item-points">${formatNumber(leader.leaderboard_points)}</span>
                        <span class="item-completion ${completionClass}">${leader.leaderboard_completion}%</span>
                    </div>
                </div>
            </div>
        `;
        leaderboardList.innerHTML += html;
    });
}

// Animate the circular progress indicator
function animateProgressCircle(progress = 80) {
    const circle = document.querySelector('.progress-ring-circle');
    if (!circle) return;

    const radius = 52;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;

    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = circumference;

    setTimeout(() => {
        circle.style.strokeDashoffset = offset;
    }, 100);
}

// Helper function to format numbers
function formatNumber(num) {
    if (!num) return '0';
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    loadCSVData();
    console.log('Profile page initialized with CSV data');
});
