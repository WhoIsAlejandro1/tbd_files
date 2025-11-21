# Bubble Up Dashboard - CSV Data Dictionary

## Overview
This document describes the structure of `bubble_up_data.csv`, a single CSV file that populates all data fields across both the main dashboard (`sales_game_ranking.html`) and employee profile page (`profile.html`).

## File Structure
- **File Name**: `bubble_up_data.csv`
- **Location**: `resources/data/`
- **Format**: CSV (Comma-Separated Values)
- **Encoding**: UTF-8

---

## Column Definitions

| Column Name | Data Type | Description | Example Values |
|------------|-----------|-------------|----------------|
| `data_type` | String | Identifies the type of record/data row | kpi_summary, market_unit_ranking, vp_performance, badge_aggregate, top_performer, branch_overview, score_distribution, employee_profile, employee_badge, employee_module, branch_leaderboard |
| `record_id` | Integer | Unique identifier for each record within its data_type | 1, 2, 3, etc. |
| `employee_id` | String | Unique employee identifier | EMP001, EMP002, etc. |
| `employee_name` | String | Full name of employee | Adam Joy, Jessica Nolan |
| `job_title` | String | Employee's job position | Sales Associate, VP of Sales |
| `location_branch` | String | Branch/office name | Akron, Baltimore, Memphis |
| `location_city` | String | City location | Akron, Baltimore |
| `location_state` | String | State abbreviation | OH, MD, TN, FL |
| `market_unit` | String | Market unit name | Carolinas, Corporate, Mid South, Mid West, Mid Atlantic |
| `rank` | Integer | Ranking position | 1, 2, 3, 4, 5 |
| `completion_rate` | Decimal | Training completion percentage | 87.2, 94.1, 95.0 |
| `on_time_rate` | Decimal | On-time completion percentage | 91.5, 88.5, 92.5 |
| `trainings_completed` | Integer | Number of trainings completed | 12, 1550, 7250 |
| `average_score` | Decimal | Average training score | 84.6, 91.2, 92.5 |
| `xp_points` | Integer | Experience points earned | 684, 4160, 5920 |
| `performance_change` | String | Change in performance (with +/- sign) | +2.7, -1.8, +3.2 |
| `change_direction` | String | Direction of change | positive, negative |
| `streak_days` | Integer | Current streak in days | 10, 15, 30 |
| `streak_target` | Integer | Target streak goal in days | 30, 60 |
| `badge_name` | String | Name of the badge/achievement | Perfect Score, On-Time Heroes, Accuracy Aces |
| `badge_count` | Integer | Count of badges earned (aggregate) | 245, 212, 187 |
| `module_name` | String | Training module name | Teamwork Essentials, Sales Techniques |
| `module_status` | String | Status of the module | In Progress, Completed, Not Started |
| `module_progress` | Integer | Progress percentage (0-100) | 80, 100 |
| `module_assigned_date` | Date | Date module was assigned (YYYY-MM-DD) | 2024-03-02, 2024-04-15 |
| `module_completed_date` | Date | Date module was completed (YYYY-MM-DD) | 2024-04-15, 2024-03-28 |
| `score_range` | String | Score range bucket | 50-59, 60-69, 70-79, 80-89, 90-100 |
| `score_distribution_percent` | Integer | Percentage of scores in range | 3, 7, 29, 59 |
| `leaderboard_rank` | Integer | Rank in branch leaderboard | 1, 2, 3, 4, 5 |
| `leaderboard_points` | Integer | Total points for leaderboard | 5920, 5860, 4160 |
| `leaderboard_completion` | Integer | Completion percentage for leaderboard | 85, 39, 86, 95 |

---

## Data Type Records

### 1. `kpi_summary`
**Purpose**: Populates the top KPI cards on the main dashboard
**Used In**: `sales_game_ranking.html` - KPI Section
**Required Fields**:
- `completion_rate`: Overall completion rate percentage
- `on_time_rate`: Overall on-time completion percentage
- `trainings_completed`: Total trainings completed across organization
- `average_score`: Overall average score

**Example**:
```csv
kpi_summary,1,,,,,,,,,87.2,91.5,7250,84.6,,,,,,,,,,,,,,,,
```

---

### 2. `market_unit_ranking`
**Purpose**: Displays market unit performance rankings
**Used In**: `sales_game_ranking.html` - Market Unit Ranking Card
**Required Fields**:
- `market_unit`: Name of market unit
- `rank`: Ranking position (1-4)
- `completion_rate`: Market unit completion percentage
- `performance_change`: Change from previous period
- `change_direction`: positive or negative

**Example**:
```csv
market_unit_ranking,1,,,,,,,Carolinas,1,94.1,,,,,+2.7,positive,,,,,,,,,,,,,
```

---

### 3. `vp_performance`
**Purpose**: Shows VP performance metrics
**Used In**: `sales_game_ranking.html` - VP Performance Card
**Required Fields**:
- `employee_name`: VP name
- `market_unit`: Market unit (displayed as location)
- `rank`: VP ranking
- `completion_rate`: VP's completion percentage
- `performance_change`: Change from previous period
- `change_direction`: positive or negative
- `xp_points`: Experience points earned

**Example**:
```csv
vp_performance,1,,Kevin Marshal,,Carolinas MU,,,,1,96.1,,,,,+3.2,positive,,684,,,,,,,,,,
```

---

### 4. `badge_aggregate`
**Purpose**: Shows total badge counts earned across organization
**Used In**: `sales_game_ranking.html` - Badges Earned This Period Card
**Required Fields**:
- `badge_name`: Name of the badge
- `badge_count`: Total count of this badge earned

**Example**:
```csv
badge_aggregate,1,,,,,,,,,,,,,,,,,,On-Time Heroes,245,,,,,,,,,
```

---

### 5. `top_performer`
**Purpose**: Lists top performers from each branch
**Used In**: `sales_game_ranking.html` - Top Performers Card
**Required Fields**:
- `employee_id`: Employee ID
- `employee_name`: Employee name
- `location_branch`: Branch name
- `location_city`: City
- `location_state`: State
- `rank`: Performer rank
- `completion_rate`: Performance score/percentage

**Example**:
```csv
top_performer,1,EMP001,Adam Joy,,Akron,OH,,,1,95,,,,,,,,,,,,,,,,,,
```

---

### 6. `branch_overview`
**Purpose**: Shows branch-level performance metrics
**Used In**: `sales_game_ranking.html` - Branches Overview Card
**Required Fields**:
- `location_branch`: Branch name
- `location_city`: City
- `location_state`: State
- `completion_rate`: Branch completion rate
- `on_time_rate`: Branch on-time rate
- `trainings_completed`: Total trainings at branch
- `average_score`: Branch average score

**Example**:
```csv
branch_overview,1,,,,Akron,OH,,,,,87.2,88.5,1550,91.2,,,,,,,,,,,,,,,
```

---

### 7. `score_distribution`
**Purpose**: Shows distribution of scores across ranges
**Used In**: `sales_game_ranking.html` - Score Distribution Card
**Required Fields**:
- `score_range`: Range label (50-59, 60-69, etc.)
- `score_distribution_percent`: Percentage in this range

**Example**:
```csv
score_distribution,1,,,,,,,,,,,,,,,,,,,,,,,,,50-59,3,,
```

---

### 8. `employee_profile`
**Purpose**: Main employee profile information
**Used In**: `profile.html` - Profile Card, Performance Metrics
**Required Fields**:
- `employee_id`: Employee ID
- `employee_name`: Full name
- `job_title`: Job title
- `location_branch`: Branch name
- `location_city`: City
- `location_state`: State
- `rank`: Branch rank
- `completion_rate`: Employee completion rate
- `on_time_rate`: Employee on-time rate
- `trainings_completed`: Trainings completed by employee
- `average_score`: Employee average score
- `xp_points`: Total XP earned
- `streak_days`: Current streak
- `streak_target`: Streak target

**Example**:
```csv
employee_profile,1,EMP001,Adam Joy,Sales Associate,Akron,OH,,,5,95,95,12,92.5,4160,,,10,30,,,,,,,,,,,
```

---

### 9. `employee_badge`
**Purpose**: Individual badges earned by employee
**Used In**: `profile.html` - Badges Earned Card
**Required Fields**:
- `employee_id`: Employee ID
- `badge_name`: Name of badge earned

**Example**:
```csv
employee_badge,1,EMP001,,,,,,,,,,,,,,,,,,Perfect Score,,,,,,,,,,
```

---

### 10. `employee_module`
**Purpose**: Employee's module progress and history
**Used In**: `profile.html` - Current Module Progress, Modules List
**Required Fields**:
- `employee_id`: Employee ID
- `module_name`: Name of training module
- `module_status`: In Progress, Completed, or Not Started
- `module_progress`: Progress percentage (0-100)
- `module_assigned_date`: Date assigned (for in-progress modules)
- `module_completed_date`: Date completed (for completed modules)

**Example**:
```csv
employee_module,1,EMP001,,,,,,,,,,,,,,,,,,,Teamwork Essentials,In Progress,80,2024-03-02,,,,,
```

---

### 11. `branch_leaderboard`
**Purpose**: Branch leaderboard rankings
**Used In**: `profile.html` - Branch Leaderboard Card
**Required Fields**:
- `employee_id`: Employee ID
- `employee_name`: Employee name
- `job_title`: Job title (optional)
- `location_branch`: Branch name
- `location_city`: City
- `location_state`: State
- `leaderboard_rank`: Position in leaderboard (1-5+)
- `leaderboard_points`: Total points
- `leaderboard_completion`: Completion percentage

**Example**:
```csv
branch_leaderboard,1,EMP005,Caitlin M.,,Akron,OH,,,,,,,,5920,,,,,,,,,,,,,1,5920,85
```

---

## Data Rules & Validation

### General Rules
1. **Empty Fields**: Use empty values (consecutive commas) for fields not applicable to a data_type
2. **Date Format**: YYYY-MM-DD (e.g., 2024-03-02)
3. **Percentages**: Decimal format without % symbol (e.g., 87.2 for 87.2%)
4. **Change Values**: Include +/- sign (e.g., +2.7, -1.8)

### Required Combinations
- When `module_status` = "In Progress", provide `module_assigned_date` and `module_progress`
- When `module_status` = "Completed", provide `module_completed_date` and set `module_progress` = 100
- When `change_direction` = "positive", use + in `performance_change`
- When `change_direction` = "negative", use - in `performance_change`

### Validation Rules
- `completion_rate`: 0-100
- `on_time_rate`: 0-100
- `module_progress`: 0-100
- `average_score`: 0-100
- `rank`: Positive integer
- `xp_points`: Non-negative integer
- `trainings_completed`: Non-negative integer

---

## Usage Notes

### Dashboard Population
The JavaScript files (`dashboard.js` and `profile.js`) should:
1. Load and parse `bubble_up_data.csv`
2. Filter rows by `data_type`
3. Map CSV columns to HTML element IDs and classes
4. Update DOM elements with corresponding data

### Adding New Records
To add new data:
1. Choose appropriate `data_type`
2. Provide unique `record_id` within that data_type
3. Fill required fields for that data_type
4. Leave non-applicable fields empty
5. Maintain CSV format (no line breaks within fields)

### Multiple Employees
For multiple employee profiles:
- Add multiple `employee_profile` rows with different `employee_id`
- Add corresponding `employee_badge` rows for each employee's badges
- Add corresponding `employee_module` rows for each employee's modules
- Add corresponding `branch_leaderboard` entries

---

## Example Data Flow

### Dashboard KPIs
```
CSV: data_type=kpi_summary → completion_rate=87.2
↓
JavaScript reads CSV → Filters data_type=kpi_summary
↓
Updates HTML: <div class="kpi-value">87.2%</div>
```

### Employee Profile
```
CSV: data_type=employee_profile, employee_id=EMP001 → employee_name=Adam Joy
↓
JavaScript reads CSV → Filters data_type=employee_profile, employee_id=EMP001
↓
Updates HTML: <h2 id="profileName">Adam Joy</h2>
```

---

## Maintenance

### Regular Updates
- Update `kpi_summary` daily/weekly for current metrics
- Update `market_unit_ranking` and `vp_performance` monthly/quarterly
- Add `employee_module` records when modules are assigned/completed
- Update `badge_aggregate` as badges are earned

### Data Integrity
- Ensure employee_id is consistent across all data_types
- Validate percentages are within 0-100 range
- Verify dates are in correct format
- Check that rank sequences are continuous (1,2,3,4...)

---

## Support
For questions or issues with the data structure, refer to the HTML source files:
- `sales_game_ranking.html` - Main dashboard structure
- `profile.html` - Employee profile structure
