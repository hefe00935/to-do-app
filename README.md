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

## 🎨 UI/UX Details

### Color Palette
- **Primary**: `#FF7A59` (warm orange) — streaks, buttons, highlights
- **Accent**: `#6C8EFF` (cool blue) — active nav, focus states, charts
- **Success**: `#35C37D` (green) — completed tasks, badges, calendar
- **Danger**: `#FF4757` (red) — delete, clear data buttons
- **Background**: `#F7F9FC` light / `#0f1419` dark
- **Cards**: `#ffffff` light / `#1a202c` dark

### Typography
- **Font**: Inter system fonts (fallback: system-ui, Segoe UI, Arial)
- **Headlines**: 600 weight, larger sizes
- **Body**: 400 weight, readable sizes
- **Small labels**: 12px, muted color

### Components
- Rounded corners: `14px` main cards, `12px` buttons, `10px` modals
- Shadow: subtle (0 6px 18px) for depth on cards
- Spacing: consistent 8–12px gaps throughout
- Touch targets: all interactive elements ≥44px (mobile-friendly)

### Responsive Design
- Mobile-first: designed for small screens first
- Bottom nav for easy one-handed use
- Stacked layouts on small screens
- Stats grid adapts to 2 columns on mobile, 4 on desktop

## 🔧 How Streak Logic Works

### Completion Flow
1. User taps checkbox on task → ripple animation plays
2. System captures current UTC timestamp
3. **Compute local date** using `day_start` offset
   - If `grace_hours > 0` and time is within grace window of midnight, attribute to previous day
4. Check if task already has completion for that local date
5. If new: increment per-task streak (if yesterday also completed) or reset to 1
6. Update task's `last_completed_date`
7. Re-scan for global streak (days with ≥goal tasks)
8. Show confetti and undo snackbar

### Streak Calculation
```
task.streak = count of consecutive days 
              where task has ≥1 completion 
              (walking backward from last_completed_date)

global_streak = count of consecutive days 
                where distinct completed tasks ≥ daily_goal
                (walking backward from today)
```

**Grace Window Example**:
- User sets grace_hours=6
- Completes task at 3:00am (after midnight, before 6:00am)
- System attributes completion to previous calendar day
- Counts toward yesterday's streak, not today's

**Day Start Example**:
- User sets day_start=4 (night owl)
- Day now "starts" at 4:00am instead of midnight
- Useful for people who sleep past midnight
- Complete task at 2:00am = still counts toward "yesterday"

## 📁 Project Structure

```
to-do-app/
├── index.html        # Main SPA (193 lines): all views, modals, buttons
├── styles.css        # Complete styling (450+ lines): animations, dark mode, responsive
├── app.js            # App logic (550+ lines): state, streak calc, view rendering
└── README.md         # This documentation
```

**No dependencies**, no build step — pure HTML/CSS/JS with `localStorage`.

## ✅ What's Working Right Now

- ✅ Home view with all task management
- ✅ Calendar with month navigation, day-of-week headers, color-coded days
- ✅ Stats view with 4 cards, 7-day chart, achievement badges
- ✅ Settings with all options (name, timezone, day start, grace window, dark mode)
- ✅ Task creation, editing, deletion with proper modal flows
- ✅ Undo functionality with snackbar
- ✅ Per-task and global streak calculations
- ✅ localStorage persistence
- ✅ Sample data on first run (3 tasks + 7 days of completions)
- ✅ Dark mode toggle with instant theme switch
- ✅ Particle confetti and animations
- ✅ Export data as JSON / clear data with confirmation
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ All bottom nav buttons functional

## 🚀 Try It Now

1. **Home**: Complete a task → see streak increment + confetti
2. **Calendar**: Click 📅 → browse month, tap a day to see completions
3. **Stats**: Click 📊 → see 7-day chart and badges
4. **Settings**: Click ⚙ → toggle dark mode, export data, adjust goal
5. **Repeat**: Each day, open app and complete your daily tasks

## 🎯 Sample Data Included

On first run, the app includes:
- **3 starter tasks**: "Morning Exercise", "Read 10 pages", "Meditate"
- **7 days of history**: 2-3 random completions per day so calendar and stats show real data
- **Pre-computed streaks**: tasks already have streak values calculated

Delete these and start fresh, or use them as examples!

## 💾 Storage Format

All data in `localStorage` under key `streaks_v2`:

```javascript
{
  user: {
    name: "Your Name",
    timezone: "UTC",
    daily_goal: 3,
    day_start: 0,
    grace_hours: 0,
    dark_mode: false
  },
  tasks: [
    {id, title, description, recurrence, streak, last_completed_date}
  ],
  completions: [
    {id, taskId, ts: ISO_string, localDate: "YYYY-MM-DD", counted: boolean}
  ],
  stats: { longest_global: 0 }
}
```

Export this JSON anytime via Settings → Export Data.

## 📝 Notes & Caveats

- **Timezone**: Currently simplified (uses day_start offset). For production, use luxon/Temporal.
- **Recurrence**: Saved but not enforced (all tasks appear daily). Implement filtering if needed.
- **Time windows**: Placeholder fields (start/end times captured but not enforced).
- **Reminders**: Not implemented (would need Service Workers + notifications).
- **Syncing**: Local-only. Add backend (Node.js + Postgres) to enable multi-device sync.

## 🎉 Enjoy!

Start building your streaks today. Remember: *small, consistent actions compound into remarkable results.* 

Good luck! 🔥

---

**Questions?** Check the code comments in `app.js` for implementation details. Or modify the palette in `styles.css` `:root` section to customize colors!

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

### Home / Daily View
- **Circular progress ring** showing tasks completed today vs. daily goal
- **Streak badges**: current global streak (days with ≥goal tasks) + longest ever
- **Task list** with quick-complete checkbox, title, recurrence, and per-task streak
- **Large FAB button** to add new tasks
- Completed tasks show ✓ and fade slightly

### Task Management
- **Create**: title, description, recurrence (daily/weekly/one-time)
- **Edit**: update any task details
- **Delete**: permanently remove a task (confirmation required)
- **Quick complete**: tap checkbox → animation → streak increments
- **Undo**: snackbar with 3-second window to undo last completion

### Streak Logic
- **Per-task streak**: consecutive days with ≥1 completion per task
- **Global streak**: consecutive days with ≥ daily goal distinct tasks completed
- **Grace window**: if you complete a task in the grace hours (e.g., 4am today), it counts toward yesterday's streak
- **Day boundaries**: configurable day start hour (e.g., "day starts at 4am" for late-night folks)
- Duplicate completions on same day are logged but don't double-count streaks

### Calendar / History View
- **Month grid** with day rings showing completion % per day
- Color-coded days:
  - 🟢 **Green (completed)**: ≥ daily goal tasks
  - 🟠 **Orange (partial)**: some tasks but < daily goal
  - ⚪ **Gray (missed)**: no completions
- **Tap a day** to see which tasks were completed
- **Navigate months** with ◀▶ buttons

### Stats View
- **Current streak** in days
- **Longest streak** ever (tracked automatically)
- **Completion %** this month
- **Average tasks/day** this month
- **7-day chart**: bar graph showing daily completions
- **Achievements/badges**: unlock milestones at 7, 21, 100-day streaks

### Settings
- **Profile**: update name and timezone
- **Goals**: adjust daily goal, day start hour, grace window
- **Appearance**: toggle dark mode
- **Data**: export data as JSON or clear all data (with confirmation)
- All settings saved to localStorage

### Animations & Microinteractions
- ✨ **Particle confetti** on counted completion (30 particles with gravity)
- 🔥 **Streak chip bounce**: +1 counter animates with scale-up
- 🎯 **Ripple effect** on task checkbox tap
- 📱 **Smooth transitions**: view changes, modals pop-in, snackbars slide up
- 🌙 **Dark mode** with instant toggle
- 🎨 **Pulsing streak badge** at top

### Offline & Data
- **100% offline**: app runs entirely in browser, no internet required
- **localStorage persistence**: data survives page reloads and browser close
- **Export**: download backup as JSON anytime
- **Grace window logic**: see `localDateForTs()` in app.js for detailed implementation

## 🎨 UI/UX Details

### Color Palette
- **Primary**: `#FF7A59` (warm orange) — streaks, buttons, highlights
- **Accent**: `#6C8EFF` (cool blue) — active nav, focus states
- **Success**: `#35C37D` (green) — completed tasks, badges
- **Danger**: `#FF4757` (red) — delete, clear data
- **Background**: `#F7F9FC` light / `#0f1419` dark
- **Cards**: `#ffffff` light / `#1a202c` dark

### Typography
- **Font**: Inter system fonts (fallback: system-ui, Segoe UI, Arial)
- **Headlines**: 600 weight
- **Body**: 400 weight
- **Small labels**: 12px, muted color

### Components
- Rounded corners: `14px` cards, `12px` buttons, `10px` modals
- Shadow: subtle (0 6px 18px) for depth
- Spacing: consistent 8–12px gaps

## 🔧 How Streak Logic Works

### Completion Flow
1. User taps checkbox on task
2. System captures current UTC timestamp
3. **Compute local date** using `day_start` offset
   - If `grace_hours > 0` and time is within grace window of midnight, attribute to previous day
4. Check if task already has completion for that local date
5. If new: increment per-task streak (if yesterday also completed) or reset to 1
6. Update task's `last_completed_date`
7. Re-scan for global streak
8. Show confetti and undo snackbar

### Streak Calculation
```
task.streak = count of consecutive days 
              where task has ≥1 completion 
              (walking backward from last_completed_date)

global_streak = count of consecutive days 
                where distinct completed tasks ≥ daily_goal
                (walking backward from today)
```

**Grace Window Example**:
- User sets grace_hours=6
- Completes task at 3:00am (after midnight, before 6:00am)
- System attributes completion to previous calendar day
- Counts toward yesterday's streak instead of today's

## 📁 Project Structure

```
to-do-app/
├── index.html        # Main SPA markup, all modals, views
├── styles.css        # Styling, animations, dark mode, responsive
├── app.js            # Core logic: state, streak calc, UI updates
└── README.md         # This file
```

**No dependencies**, no build step — pure HTML/CSS/JS with `localStorage`.

## 🚀 What You Can Do Right Now

1. **Onboard**: Set name, goal (e.g., 3), day start (0), grace window (0)
2. **Select starters**: Click chips to pick habits, then "Start streaking"
3. **Create tasks**: Tap FAB, enter title & recurrence
4. **Complete tasks**: Tap checkbox → animation → see streak increment
5. **Undo**: If you tapped by mistake, hit "Undo" on snackbar
6. **Browse calendar**: See month view with day completions
7. **Check stats**: View 7-day chart, achievements, longest streak
8. **Configure**: Toggle dark mode, adjust settings
9. **Export**: Backup your data as JSON
10. **Mobile-friendly**: Responsive design, works great on phone

## 🎯 Next Steps (If You Wanted to Extend)

- **Backend**: Wire up Node.js + Express + PostgreSQL for sync, auth, cloud backups
- **Notifications**: Push reminders at customizable times (Firebase Cloud Messaging)
- **Social**: Optional habit sharing, group challenges (privacy-first)
- **Advanced recurrence**: Custom weekly/monthly patterns, exceptions
- **Time windows**: "Complete between 6am–9am for bonus XP"
- **XP/Leveling**: Points per completion, level progress, unlockable themes
- **Habit insights**: AI suggestions, correlations, best times
- **Mobile apps**: React Native or Flutter wrapping this web app

## 💾 Storage Format

All data in `localStorage` under key `streaks_v2`:

```javascript
{
  user: {name, timezone, daily_goal, day_start, grace_hours, dark_mode},
  tasks: [{id, title, description, recurrence, streak, last_completed_date}],
  completions: [{id, taskId, ts, localDate, counted}],
  stats: {longest_global}
}
```

Export this JSON anytime via Settings → Export Data.

## 📝 Notes & Caveats

- **Timezone**: Currently simplified (uses day_start offset). For production, use luxon/Temporal for robust timezone handling.
- **Recurrence**: Saved but not yet enforced (all tasks appear daily). Implement filtering if needed.
- **Time windows**: Placeholder (start/end times captured but not enforced). Add validation if tasks have time constraints.
- **Reminders**: Not implemented yet (would need Service Workers + notifications).
- **Syncing**: Local-only. Add backend to enable multi-device sync and cloud backup.

## 🎉 Enjoy!

Start building your streaks today. Remember: *small, consistent actions compound into remarkable results.* Good luck! 🔥
