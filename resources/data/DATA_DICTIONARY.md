# Data Dictionary - Bubble Up Performance Dashboard

## 📋 Overview

This document describes all generated data files and how they map to the dashboard components.

---

## 📊 Data Files

### 1. **employee_profiles.csv**
Employee master data with demographics and assignments.

| Column | Type | Description | Example |
|--------|------|-------------|---------|
| Employee_ID | String | Unique employee identifier | EMP-1001 |
| First_Name | String | Employee first name | Kevin |
| Last_Name | String | Employee last name | Marshal |
| Full_Name | String | Complete name | Kevin Marshal |
| Role | String | Job title/position | Sales Account Manager |
| Market_Unit | String | Assigned market unit | Carolinas MU |
| Branch | String | Office location | Charlotte NC |
| Photo_URL | String | Path to profile photo | resources/images/profiles/emp-1001.jpg |
| Email | String | Work email address | kevin.marshal@company.com |
| Manager_Level | String | Employee tier | VP, Manager, Employee |

**Total Records:** 20 employees
**Market Units:** 5 (Carolinas, Corporate, Mid South, Mid Atlantic, Mid West)
**Manager Levels:** VP (4), Manager (6), Employee (10)

---

### 2. **training_completion.csv**
Individual training course completion records.

| Column | Type | Description | Example |
|--------|------|-------------|---------|
| Training_ID | String | Unique training record ID | TRN-001 |
| Employee_ID | String | Employee who took training | EMP-1001 |
| Course_Name | String | Name of training course | Product Knowledge 101 |
| Course_Category | String | Training category | Product Training |
| Completion_Date | Date | When completed | 2025-01-05 |
| Due_Date | Date | Deadline for completion | 2025-01-10 |
| Status | String | Completed, Late, In Progress | Completed |
| Score | Integer | Score achieved (0-100) | 95 |
| Duration_Minutes | Integer | Time spent on training | 45 |
| On_Time | String | Yes/No - met deadline | Yes |

**Total Records:** 52 training completions
**Date Range:** January - April 2025
**Categories:** Product Training, Sales Skills, Soft Skills, Compliance, Operations, Technology, Management, etc.

---

### 3. **market_unit_performance.csv**
Aggregated performance metrics by market unit.

| Column | Type | Description | Example |
|--------|------|-------------|---------|
| Market_Unit | String | Market unit name | Carolinas MU |
| Region | String | Geographic region | Southeast |
| Total_Employees | Integer | Employee count in MU | 45 |
| Completion_Rate | Float | % of trainings completed | 94.1 |
| On_Time_Rate | Float | % completed on time | 91.2 |
| Avg_Score | Float | Average training score | 88.5 |
| Total_Trainings | Integer | Total courses completed | 1550 |
| Monthly_Change | String | Performance trend | +2.7% |
| Rank | Integer | Overall ranking (1-5) | 1 |
| Manager_Name | String | Market unit leader | Kevin Marshal |

**Maps to Dashboard:** Market Unit Ranking section

---

### 4. **branch_performance.csv**
Detailed metrics for individual branches/offices.

| Column | Type | Description | Example |
|--------|------|-------------|---------|
| Branch | String | Branch identifier | Charlotte NC |
| City | String | City name | Charlotte |
| State | String | State code | NC |
| Market_Unit | String | Parent market unit | Carolinas MU |
| Completion_Rate | Float | Branch completion % | 95.2 |
| On_Time_Rate | Float | Branch on-time % | 92.5 |
| Avg_Score | Float | Branch average score | 91.2 |
| Total_Trainings | Integer | Trainings completed | 580 |
| Employees | Integer | Employee count | 15 |
| Top_Performer | String | Best employee name | Sarah Mitchell |
| Top_Performer_Score | String | Their score | 100% |

**Total Records:** 14 branches
**Maps to Dashboard:** Branches Overview table, Top Performers section

---

### 5. **badge_achievements.csv**
Badge types and award counts.

| Column | Type | Description | Example |
|--------|------|-------------|---------|
| Badge_Type | String | Badge code identifier | ON_TIME |
| Badge_Name | String | Display name | On-Time Heroes |
| Description | String | Badge criteria | Completed all trainings before due date |
| Icon_Path | String | Path to badge icon | resources/images/badge-ontime.svg |
| Total_Awarded | Integer | All-time count | 1245 |
| This_Period | Integer | Current period count | 245 |
| Category | String | Badge category | Timeliness |

**Total Badge Types:** 8
**Maps to Dashboard:** Badges Earned This Period section

---

### 6. **score_distribution.csv**
Distribution of scores across all employees.

| Column | Type | Description | Example |
|--------|------|-------------|---------|
| Score_Range | Integer | Range ID (1-5) | 1 |
| Range_Label | String | Display label | 50-59 |
| Min_Score | Integer | Minimum score in range | 50 |
| Max_Score | Integer | Maximum score in range | 59 |
| Employee_Count | Integer | Employees in this range | 15 |
| Percentage | String | % of total | 3% |
| Color_Code | String | Bar color (red/orange/blue) | red |

**Total Ranges:** 5
**Maps to Dashboard:** Score Distribution section

---

### 7. **kpi_summary.csv**
Top-level KPI metrics for dashboard header.

| Column | Type | Description | Example |
|--------|------|-------------|---------|
| KPI_Name | String | Metric identifier | Completion_Rate |
| Current_Value | Float | Current period value | 87.2 |
| Previous_Value | Float | Prior period value | 85.5 |
| Change | String | Period-over-period change | +1.7 |
| Target | Float | Goal/target value | 90.0 |
| Status | String | On Track / Below Target | Below Target |
| Icon_Path | String | Path to KPI icon | resources/images/check-icon-blue.svg |
| Description | String | What this KPI measures | Percentage of assigned trainings completed |

**Total KPIs:** 6
**Maps to Dashboard:** KPI Cards (top row)

---

### 8. **gamify_v5 sample.csv** (Original)
Individual employee performance records from gamification system.

Key fields used:
- **Overall_Rank** - Employee ranking
- **Score** - Performance percentage
- **Achievement** - Badges earned
- **Current_Streak** - Consecutive periods of excellence
- **Monthly_Points / Yearly_Points / Lifetime_Points** - Gamification scores
- **Performance_Tier** - ELITE, SILVER, BRONZE tiers

---

## 🔗 Dashboard Mapping

### Header Section
- **Title:** Static text
- **Logo:** `resources/images/coca-cola-logo.svg`

### KPI Cards (Top Row)
**Data Source:** `kpi_summary.csv`

1. **Completion Rate** → Row where `KPI_Name = 'Completion_Rate'`
2. **On-Time Percentage** → Row where `KPI_Name = 'On_Time_Percentage'`
3. **Total Trainings** → Row where `KPI_Name = 'Total_Trainings'`
4. **Average Score** → Row where `KPI_Name = 'Average_Score'`

### Market Unit Ranking
**Data Source:** `market_unit_performance.csv`

- Sort by `Rank` ascending
- Display: `Market_Unit`, `Completion_Rate`, `Monthly_Change`
- Medal icons based on rank (1=Gold, 2=Silver, 3=Bronze, etc.)

### VP Performance
**Data Source:** `employee_profiles.csv` + `gamify_v5 sample.csv`

- Filter: `Manager_Level = 'VP'`
- Join with gamify data on `Employee_ID`
- Display: Photo, Full_Name, Market_Unit, Score, Points
- Color XP badges: High scores = blue, Lower scores = red

### Badges Earned This Period
**Data Source:** `badge_achievements.csv`

- Display: `Badge_Name`, `This_Period`
- Sort by `This_Period` descending
- Icon from `Icon_Path`

### Top Performers In Each Branch
**Data Source:** `branch_performance.csv`

- Group by top performers
- Display: `Top_Performer`, Branch (City, State), `Top_Performer_Score`
- Join with `employee_profiles.csv` for photos

### Branches Overview
**Data Source:** `branch_performance.csv`

- Table rows: One per branch
- Columns: Branch, Completion_Rate, On_Time_Rate, Avg_Score, Total_Trainings
- Highlight `On_Time_Rate` in green if > 90%

### Score Distribution
**Data Source:** `score_distribution.csv`

- Sort by `Score_Range`
- Bar width = `Percentage` value
- Bar color from `Color_Code` (red/orange/blue)

---

## 🧮 Calculated Metrics

### Completion Rate
```
Completion_Rate = (Completed Trainings / Total Assigned) × 100
```

From `training_completion.csv`:
```
COUNT(WHERE Status = 'Completed') / COUNT(*)
```

### On-Time Percentage
```
On_Time_Percentage = (On-Time Completions / Total Completed) × 100
```

From `training_completion.csv`:
```
COUNT(WHERE On_Time = 'Yes') / COUNT(WHERE Status = 'Completed')
```

### Average Score
```
Average_Score = SUM(Score) / COUNT(Completed Trainings)
```

From `training_completion.csv`:
```
AVG(Score WHERE Status = 'Completed')
```

### Market Unit Rank
Sort market units by:
1. `Completion_Rate` (descending)
2. `On_Time_Rate` (descending)
3. `Avg_Score` (descending)

---

## 🎨 Data Relationships

```
employee_profiles.csv
    ├─ Employee_ID (PK)
    │
    ├── training_completion.csv
    │       └─ Employee_ID (FK)
    │
    ├── gamify_v5 sample.csv
    │       └─ Employee_ID (FK)
    │
    └─ Market_Unit ──> market_unit_performance.csv
            └─ Market_Unit (FK)

branch_performance.csv
    └─ Market_Unit ──> market_unit_performance.csv
            └─ Market_Unit (FK)
```

---

## 📸 Photo Assets Required

Based on `employee_profiles.csv`, create these profile photos:

### VP Level (Featured in VP Performance)
- `resources/images/profiles/emp-1001.jpg` - Kevin Marshal
- `resources/images/profiles/emp-3136.jpg` - Jessica Nolan
- `resources/images/profiles/emp-5694.jpg` - Robert Haves
- `resources/images/profiles/emp-1004.jpg` - Christina Yang

### Managers (Featured in Top Performers)
- `resources/images/profiles/emp-4782.jpg` - Adam Joy
- `resources/images/profiles/emp-9770.jpg` - Mark Patterson
- `resources/images/profiles/emp-7402.jpg` - Sarah Mitchell
- `resources/images/profiles/emp-8649.jpg` - David Chen

### All Other Employees (12 more)
- See complete list in `employee_profiles.csv`

**Photo Specs:**
- Format: JPG or PNG
- Recommended size: 200x200px (square)
- Max file size: 500KB each
- Style: Professional headshots with neutral background

---

## 🔄 Data Update Frequency

| File | Update Frequency | Source System |
|------|------------------|---------------|
| employee_profiles.csv | Weekly | HR System |
| training_completion.csv | Daily | LMS (Learning Management System) |
| market_unit_performance.csv | Daily (aggregated) | Analytics DB |
| branch_performance.csv | Daily (aggregated) | Analytics DB |
| badge_achievements.csv | Real-time | Gamification Engine |
| score_distribution.csv | Daily (calculated) | Analytics DB |
| kpi_summary.csv | Daily | Dashboard Aggregation |
| gamify_v5 sample.csv | Real-time | Gamification Engine |

---

## 🚀 Integration Example

### Loading Data in JavaScript

```javascript
// Load all data files
const profiles = await fetch('resources/data/employee_profiles.csv');
const kpis = await fetch('resources/data/kpi_summary.csv');
const marketUnits = await fetch('resources/data/market_unit_performance.csv');
const badges = await fetch('resources/data/badge_achievements.csv');
const branches = await fetch('resources/data/branch_performance.csv');
const distribution = await fetch('resources/data/score_distribution.csv');

// Parse CSV and update dashboard
updateKPICards(kpis);
updateMarketUnitRanking(marketUnits);
updateVPPerformance(profiles);
updateBadges(badges);
updateBranches(branches);
updateDistribution(distribution);
```

---

## ✅ Data Quality Checks

Before deploying to dashboard:

- [ ] All Employee_IDs in training_completion.csv exist in employee_profiles.csv
- [ ] All Market_Units in employee_profiles.csv exist in market_unit_performance.csv
- [ ] All percentages are between 0-100
- [ ] All dates are in valid YYYY-MM-DD format
- [ ] Photo files exist at specified Photo_URL paths
- [ ] Badge icon files exist at specified Icon_Path locations
- [ ] Score distributions sum to 100%
- [ ] No duplicate Employee_IDs in employee_profiles.csv
- [ ] No null/empty required fields

---

**Last Updated:** 2025-11-20
**Data Version:** 1.0
**Total Records:** 20 employees, 52 trainings, 5 market units, 14 branches, 8 badge types
