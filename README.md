# Streaks — Daily Habit Tracker with Streak Motivation

A lightweight, delightful daily to-do app that motivates users via streaks. Complete tasks each day to keep your streak alive!

## Quick Start

# Streaks — Daily Habit Tracker with Streak Motivation

A lightweight, delightful daily to-do app that motivates users via streaks. Complete tasks each day to keep your streak alive!

## Quick Start

**Option 1: Double-click `index.html`** in your file explorer to open in browser.

**Option 2: Serve locally** (recommended for best performance):
```pwsh
# From the workspace folder (c:\Users\Pc\Desktop\to-do-app)
python -m http.server 5173
# Open http://localhost:5173 in your browser
```

Data is stored in `localStorage` and persists between sessions.

## ✨ Features Implemented

### Onboarding
- Set your name and daily goal (1–10 tasks/day)
- Configure day start hour (support for late-night users)
- Set grace window (0–12 hours backward time attribution)
- Choose starter habit templates (Read, Exercise, Meditate, Journal, Sleep Early) — or all!
- On first run, sample data is auto-populated so you can immediately explore all views

### Home / Daily View
- **Circular progress ring** showing tasks completed today vs. daily goal
- **Streak badges**: current global streak (days with ≥goal tasks) + longest ever
- **Task list** with quick-complete checkbox, title, recurrence, and per-task streak
- **Large FAB button** (⊕) to add new tasks
- Completed tasks show ✓ checkmark and fade slightly
- **Real-time updates** as you complete tasks

### Task Management
- **Create**: title, description, recurrence (daily/weekly/one-time), time window (optional)
- **Edit**: click task title to open editor, update any details
- **Delete**: permanently remove a task (confirmation required)
- **Quick complete**: tap checkbox → ripple animation → streak increments → confetti!
- **Undo**: snackbar with 3-second window to revert last completion

### 📅 Calendar / History View
Click the **📅** button in bottom nav to see:
- **Month grid** (7 columns for days of week, 4-6 rows for weeks)
- **Day-of-week headers** (Sun, Mon, Tue, Wed, Thu, Fri, Sat)
- Color-coded days:
  - 🟢 **Green (completed)**: ≥ daily goal tasks completed that day
  - 🟠 **Orange (partial)**: some tasks but < daily goal
  - ⚪ **Gray (missed)**: no completions that day
- Each day shows: day number + completion count (e.g., "2/3")
- **Tap a day** to see which specific tasks were completed
- **◀ ▶ buttons** to navigate previous/next months

### 📊 Stats View
Click the **📊** button in bottom nav to see:
- **4 stat cards**:
  - Current Streak (days with ≥goal tasks)
  - Longest Streak (ever recorded)
  - Completion % (days completed this month / days in month)
  - Avg/Day (total completions / days in month)
- **7-day bar chart**: visual graph of completions for last 7 days
  - Each bar shows tasks completed that day
  - Bars colored with gradient (accent→primary)
  - Hover to see exact count
- **Achievement badges** (unlock at 7, 21, 100-day streaks):
  - 7 days = ⚡ (locked until earned)
  - 21 days = 🌟
  - 100 days = 👑

### ⚙ Settings View
Click the **⚙** button in bottom nav to configure:
- **Profile section**:
  - Name: update your display name
  - Timezone: select from UTC, America/New_York, Europe/London, Asia/Tokyo
- **Goals & Timing section**:
  - Daily goal: 1–10 tasks/day
  - Day start hour: 0–23 (e.g., "4" means day starts at 4am for night owls)
  - Grace window: 0–12 hours (late completions attributed to previous day)
- **Appearance section**:
  - Dark mode toggle (instant theme switch)
- **Data section**:
  - **Export Data**: downloads JSON backup of all your data (streaks_backup.json)
  - **Clear all data**: wipes everything (confirmation required)
- **Save button**: persists all settings to localStorage

### Streak Logic
- **Per-task streak**: consecutive calendar days with ≥1 completion per task
- **Global streak**: consecutive calendar days with ≥ daily goal distinct tasks completed
- **Grace window**: if you complete a task in the grace hours (e.g., 4am today), it counts toward yesterday's streak
- **Day boundaries**: configurable day start hour (e.g., "day starts at 4am" for late-night folks)
- Duplicate completions on same day are logged but don't double-count streaks

### Animations & Microinteractions
- ✨ **Particle confetti** on counted completion (30 particles with gravity physics)
- 🔥 **Streak chip bounce**: +1 counter animates with scale-up effect
- 🎯 **Ripple effect** on task checkbox tap
- 📱 **Smooth transitions**: view changes fade in (0.3s), modals pop-in with scale animation
- 🌙 **Dark mode** with instant toggle (colors update immediately)
- 🎨 **Pulsing streak badge** at top (pulse animation every 2s)
- 💫 **Hover effects**: tasks lift on hover, buttons glow, bars fade on chart hover

### Offline & Data
- **100% offline**: app runs entirely in browser, no internet required
- **localStorage persistence**: data survives page reloads and browser close
- **Export**: download backup as JSON anytime via Settings
- **Sample data**: first run includes demo tasks/completions so you can explore immediately

## 🎯 How to Use (Step-by-Step)

### First Launch
1. Open `index.html` in browser
2. See onboarding modal with sample data pre-loaded
3. Optionally customize name, goal, day start, grace window
4. Leave starter habits selected or choose your own
5. Click "Start streaking"

### Daily Usage (Home Tab)
1. See today's date and your current global streak at top
2. Progress ring shows X/Y tasks completed (e.g., "2/3")
3. Each task card shows:
   - Checkbox (○ unchecked or ✓ completed)
   - Title + recurrence type
   - Flame badge with per-task streak count
4. Tap checkbox to complete task → animation → streak updates
5. Undo if you tapped by mistake (snackbar appears for 3 seconds)
6. See streak increment in real-time as you check off tasks

### Review History (📅 Calendar Tab)
1. Click 📅 button at bottom
2. See full month grid with day-of-week headers
3. Each day colored: green (complete), orange (partial), gray (missed)
4. Click a day to see which tasks were completed
5. Use ◀ ▶ to browse other months

### Check Progress (📊 Stats Tab)
1. Click 📊 button at bottom
2. See 4 stat cards with your numbers
3. Look at 7-day bar chart to see completion trend
4. Check achievement badges (locked/unlocked)

### Customize (⚙ Settings Tab)
1. Click ⚙ button at bottom
2. Update name, timezone, daily goal
3. Set day start hour (for night owls: 4 = day starts at 4am)
4. Set grace window (hours, allows late completions to count toward previous day)
5. Toggle dark mode on/off
6. Export data as JSON backup or clear everything
7. Click "Save settings"
