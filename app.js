// Comprehensive Streaks App with all features
(function(){
  const qs = s => document.querySelector(s);
  const qsa = s => Array.from(document.querySelectorAll(s));
  const STORAGE_KEY = 'streaks_v2';

  let state = loadState() || defaultState();
  let currentMonth = new Date();
  let editingTaskId = null;

  function loadState(){
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return null;
    try{ return JSON.parse(raw); } catch(e){ return null; }
  }

  function saveState(s){ localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); }

  function defaultState(){
    return {
      user:{name:'You',timezone:'UTC',daily_goal:3,day_start:0,grace_hours:0,dark_mode:false},
      tasks:[],
      completions:[],
      stats:{longest_global:0}
    };
  }

  // TIME & DATE HELPERS
  function localDateForTs(ts){
    const d = new Date(ts);
    const dayStart = state.user.day_start || 0;
    const graceMins = (state.user.grace_hours || 0) * 60;
    const shifted = new Date(d.getTime() - dayStart*3600*1000);
    const y = shifted.getUTCFullYear();
    const m = shifted.getUTCMonth()+1;
    const day = shifted.getUTCDate();
    return `${y}-${String(m).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
  }

  function uid(prefix='id'){ return prefix+'_'+Math.random().toString(36).slice(2,9); }

  function prevDay(dayStr){
    const d = new Date(dayStr+'T00:00:00Z');
    d.setUTCDate(d.getUTCDate()-1);
    return d.toISOString().slice(0,10);
  }

  function nextDay(dayStr){
    const d = new Date(dayStr+'T00:00:00Z');
    d.setUTCDate(d.getUTCDate()+1);
    return d.toISOString().slice(0,10);
  }

  // STREAK LOGIC
  function hasCompletionForDay(taskId, day){
    return state.completions.some(c=>c.taskId===taskId && c.localDate===day && c.counted);
  }

  function countDistinctTasksForDay(day){
    const set = new Set();
    state.completions.forEach(c=>{ if(c.localDate===day && c.counted) set.add(c.taskId); });
    return set.size;
  }

  function recomputeTaskStreak(task){
    let streak = 0;
    let day = task.last_completed_date;
    if(!day) return 0;
    while(day){
      if(hasCompletionForDay(task.id, day)){
        streak++;
        day = prevDay(day);
      } else break;
    }
    task.streak = streak;
  }

  function recomputeGlobalStreak(){
    const today = localDateForTs(Date.now());
    let streak = 0; let day = today;
    while(true){
      const n = countDistinctTasksForDay(day);
      if(n>=state.user.daily_goal){ streak++; day = prevDay(day); } else break;
    }
    state.stats.longest_global = Math.max(state.stats.longest_global||0, streak);
    return streak;
  }

  // UI RENDERING
  function render(){
    renderHome();
  }

  function renderHome(){
    qs('#dateLabel').textContent = new Date().toLocaleDateString(undefined,{weekday:'short',month:'short',day:'numeric'});
    qs('#dailyGoal').textContent = state.user.daily_goal;
    const today = localDateForTs(Date.now());
    const done = countDistinctTasksForDay(today);
    qs('#progressCount').textContent = done;
    const pct = Math.min(100, Math.round((done/state.user.daily_goal)*100));
    qs('.progress-ring').style.setProperty('--p', pct+'%');
    const global = recomputeGlobalStreak();
    qs('#globalStreak').textContent = global;
    qs('#streakBadge').textContent = '🔥 '+global;
    qs('#longest').textContent = '(Longest: '+(state.stats.longest_global||0)+')';

    const list = qs('#tasksList'); list.innerHTML='';
    state.tasks.forEach(t=>{
      const completed = hasCompletionForDay(t.id,today);
      const el = document.createElement('div');
      el.className = 'task' + (completed ? ' completed' : '');
      el.innerHTML = `<div class="left" data-id="${t.id}">${completed?'✓':'○'}</div>
        <div class="body"><div class="title">${escapeHtml(t.title)}</div><div class="meta">${t.recurrence||'daily'}</div></div>
        <div class="right">🔥 ${t.streak||0}</div>`;
      list.appendChild(el);
      el.querySelector('.left').addEventListener('click',()=>completeTask(t.id));
      el.querySelector('.title').addEventListener('click',()=>openTaskModal(t.id));
    });
    saveState(state);
  }

  function renderCalendar(){
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const first = new Date(year, month, 1);
    const last = new Date(year, month+1, 0);
    const monthName = first.toLocaleDateString(undefined, {month:'long', year:'numeric'});
    qs('#monthLabel').textContent = monthName;

    const grid = qs('#calendarGrid'); 
    grid.innerHTML='';
    
    // Add day-of-week headers
    const dayLabels = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    dayLabels.forEach(label => {
      const headerDiv = document.createElement('div');
      headerDiv.style.textAlign = 'center';
      headerDiv.style.fontWeight = '600';
      headerDiv.style.fontSize = '12px';
      headerDiv.style.color = 'var(--muted)';
      headerDiv.style.paddingBottom = '8px';
      headerDiv.textContent = label;
      grid.appendChild(headerDiv);
    });
    
    const dayStart = first.getDay();
    for(let i=0; i<dayStart; i++){ grid.appendChild(document.createElement('div')); }

    for(let d=1; d<=last.getDate(); d++){
      const dayStr = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
      const completed = countDistinctTasksForDay(dayStr);
      const goal = state.user.daily_goal;
      const status = completed===0 ? 'missed' : (completed>=goal ? 'completed' : 'partial');

      const div = document.createElement('div');
      div.className = `calendar-day ${status}`;
      div.innerHTML = `<div class="day-num">${d}</div><div class="day-count">${completed}/${goal}</div>`;
      div.addEventListener('click', ()=>openDayModal(dayStr));
      grid.appendChild(div);
    }
  }

  function renderStats(){
    const global = recomputeGlobalStreak();
    qs('#statCurrent').textContent = global;
    qs('#statLongest').textContent = state.stats.longest_global||0;

    // completion rate this month
    const now = new Date();
    const month = now.getMonth();
    const year = now.getFullYear();
    const daysInMonth = new Date(year, month+1, 0).getDate();
    let completedDays = 0;
    for(let d=1; d<=daysInMonth; d++){
      const dayStr = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
      if(countDistinctTasksForDay(dayStr)>=state.user.daily_goal) completedDays++;
    }
    const rate = Math.round((completedDays/daysInMonth)*100);
    qs('#statRate').textContent = rate;

    // avg completions
    const allCompletions = state.completions.filter(c=>c.counted).length;
    const avgPerDay = daysInMonth>0 ? Math.round((allCompletions/daysInMonth)*10)/10 : 0;
    qs('#statAvg').textContent = avgPerDay;

    // 7-day chart
    const chart = qs('#chart7d'); chart.innerHTML='';
    const today = new Date();
    for(let i=6; i>=0; i--){
      const d = new Date(today);
      d.setDate(d.getDate()-i);
      const dayStr = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
      const count = countDistinctTasksForDay(dayStr);
      const pct = Math.min(100, Math.round((count/state.user.daily_goal)*100));
      const bar = document.createElement('div');
      bar.className = 'bar';
      bar.style.height = pct+'%';
      bar.setAttribute('data-val', count);
      chart.appendChild(bar);
    }

    // badges
    const badges = qs('#badgesContainer'); badges.innerHTML='';
    const milestones = [{val:7,emoji:'⚡'},{val:21,emoji:'🌟'},{val:100,emoji:'👑'}];
    milestones.forEach(m=>{
      const badge = document.createElement('div');
      badge.className = 'badge ' + (global>=m.val ? '' : 'locked');
      badge.innerHTML = m.emoji;
      badges.appendChild(badge);
    });
  }

  function renderSettings(){
    qs('#settingName').value = state.user.name||'';
    qs('#settingTz').value = state.user.timezone||'UTC';
    qs('#settingGoal').value = state.user.daily_goal||3;
    qs('#settingDayStart').value = state.user.day_start||0;
    qs('#settingGrace').value = state.user.grace_hours||0;
    qs('#settingDarkMode').checked = state.user.dark_mode||false;
  }

  // MODALS & ACTIONS
  function openOnboard(){
    qs('#onboard').classList.remove('hidden');
    qs('#obName').value = state.user.name||'';
    qs('#obGoal').value = state.user.daily_goal||3;
    qs('#obDayStart').value = state.user.day_start||0;
    qs('#obGrace').value = state.user.grace_hours||0;

    // chip selection
    qsa('#starterChips .chip').forEach(chip=>{
      chip.classList.remove('selected');
      chip.addEventListener('click', (e)=>{
        e.target.classList.toggle('selected');
      });
    });
  }

  function closeOnboard(){ qs('#onboard').classList.add('hidden'); }

  function startOnboard(){
    state.user.name = qs('#obName').value||state.user.name;
    state.user.daily_goal = Math.max(1,Math.min(10,parseInt(qs('#obGoal').value||3)));
    state.user.day_start = parseInt(qs('#obDayStart').value||0);
    state.user.grace_hours = parseInt(qs('#obGrace').value||0);

    const selected = qsa('#starterChips .chip.selected');
    selected.forEach(chip=>{
      const title = chip.getAttribute('data-title');
      const t = {id:uid('task'),title,description:'',recurrence:'daily',streak:0,last_completed_date:null};
      state.tasks.push(t);
    });

    closeOnboard(); saveState(state); setActiveNav(0); render();
  }

  function openTaskModal(taskId){
    editingTaskId = taskId;
    const modal = qs('#taskModal'); modal.classList.remove('hidden');
    const deleteBtn = qs('#deleteTask');

    if(taskId){
      const t = state.tasks.find(x=>x.id===taskId);
      qs('#taskModalTitle').textContent = 'Edit Task';
      qs('#taskTitle').value = t.title;
      qs('#taskDesc').value = t.description||'';
      qs('#taskRec').value = t.recurrence||'daily';
      deleteBtn.style.display = 'block';
    } else {
      qs('#taskModalTitle').textContent = 'New Task';
      qs('#taskTitle').value='';qs('#taskDesc').value='';qs('#taskRec').value='daily';
      deleteBtn.style.display = 'none';
    }
  }

  function closeTaskModal(){ qs('#taskModal').classList.add('hidden'); editingTaskId=null; }

  function saveTask(){
    const title = qs('#taskTitle').value.trim();
    if(!title) return alert('Enter a title');

    if(editingTaskId){
      const t = state.tasks.find(x=>x.id===editingTaskId);
      t.title = title;
      t.description = qs('#taskDesc').value;
      t.recurrence = qs('#taskRec').value;
    } else {
      const t = {id:uid('task'),title,description:qs('#taskDesc').value,recurrence:qs('#taskRec').value,streak:0,last_completed_date:null};
      state.tasks.push(t);
    }

    saveState(state); closeTaskModal(); render();
  }

  function deleteTask(){
    if(!editingTaskId) return;
    if(confirm('Delete this task?')){
      state.tasks = state.tasks.filter(t=>t.id!==editingTaskId);
      state.completions = state.completions.filter(c=>c.taskId!==editingTaskId);
      saveState(state); closeTaskModal(); render();
    }
  }

  function completeTask(taskId){
    const ts = new Date().toISOString();
    const day = localDateForTs(ts);
    const task = state.tasks.find(t=>t.id===taskId);
    const already = hasCompletionForDay(taskId, day);
    const counted = !already;

    state.completions.push({id:uid('c'),taskId,ts,localDate:day,counted});

    if(counted){
      task.last_completed_date = day;
      const y = prevDay(day);
      if(hasCompletionForDay(taskId,y)){
        task.streak = (task.streak||0)+1;
      } else {
        task.streak = 1;
      }

      showParticleConfetti();
      animateStreakChip(taskId);
      showSnackbar('Nice! +1 streak 🔥', 'Undo', ()=>undoLastCompletion());
    } else {
      showSnackbar('Already logged today');
    }

    saveState(state); render();
  }

  function undoLastCompletion(){
    const last = state.completions.pop();
    if(last && last.counted){
      const task = state.tasks.find(t=>t.id===last.taskId);
      const days = state.completions.filter(c=>c.taskId===task.id && c.counted).map(c=>c.localDate).sort().reverse();
      task.last_completed_date = days[0]||null;
      recomputeTaskStreak(task);
    }
    saveState(state); render();
  }

  function openDayModal(dayStr){
    const tasks = state.tasks.filter(t=>hasCompletionForDay(t.id, dayStr));
    const d = new Date(dayStr+'T00:00:00Z');
    qs('#dayModalDate').textContent = d.toLocaleDateString(undefined, {month:'short', day:'numeric'});
    const content = qs('#dayModalTasks');
    content.innerHTML = tasks.length ? tasks.map(t=>`<div style="padding:8px; border-bottom:1px solid #eee;"><strong>${escapeHtml(t.title)}</strong></div>`).join('') : '<p style="padding:8px; color:#aaa;">No completions</p>';
    qs('#dayModal').classList.remove('hidden');
  }

  function closeDayModal(){ qs('#dayModal').classList.add('hidden'); }

  function saveSettings(){
    state.user.name = qs('#settingName').value||state.user.name;
    state.user.timezone = qs('#settingTz').value||'UTC';
    state.user.daily_goal = Math.max(1,Math.min(10,parseInt(qs('#settingGoal').value||3)));
    state.user.day_start = parseInt(qs('#settingDayStart').value||0);
    state.user.grace_hours = parseInt(qs('#settingGrace').value||0);
    state.user.dark_mode = qs('#settingDarkMode').checked;

    if(state.user.dark_mode){
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    saveState(state);
    showSnackbar('Settings saved');
    setActiveNav(0);
  }

  function clearAllData(){
    if(confirm('Clear all data? This cannot be undone.')){
      localStorage.removeItem(STORAGE_KEY);
      state = defaultState();
      saveState(state);
      showSnackbar('Data cleared');
      openOnboard();
    }
  }

  function exportData(){
    const json = JSON.stringify(state, null, 2);
    const blob = new Blob([json], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'streaks-backup.json';
    a.click();
    showSnackbar('Data exported');
  }

  // ANIMATIONS
  function showParticleConfetti(){
    const canvas = qs('#canvas');
    if(!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    for(let i=0; i<30; i++){
      particles.push({
        x: window.innerWidth/2,
        y: window.innerHeight/3,
        vx: (Math.random()-0.5)*8,
        vy: (Math.random()-0.5)*8,
        life: 1,
        emoji: ['🎉','🎊','✨','🔥'][Math.floor(Math.random()*4)]
      });
    }

    function animate(){
      ctx.clearRect(0,0,canvas.width,canvas.height);
      particles.forEach(p=>{
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.2; // gravity
        p.life -= 0.02;
        ctx.globalAlpha = p.life;
        ctx.font = '24px Arial';
        ctx.fillText(p.emoji, p.x, p.y);
      });
      if(particles.some(p=>p.life>0)) requestAnimationFrame(animate);
      else ctx.clearRect(0,0,canvas.width,canvas.height);
    }
    animate();
  }

  function animateStreakChip(taskId){
    const chip = document.querySelector(`.task [data-id="${taskId}"]`)?.closest('.task')?.querySelector('.right');
    if(chip) chip.style.animation = 'none'; // reset
    setTimeout(()=>{
      if(chip) chip.style.animation = 'bounceScale 0.4s';
    },10);
  }

  let snackbarTimer = null;
  function showSnackbar(text, actionText, action){
    const s = qs('#snackbar');
    s.textContent = '';
    s.classList.remove('hidden');
    const span = document.createElement('span');
    span.textContent = text;
    s.appendChild(span);
    if(actionText){
      const btn = document.createElement('button');
      btn.textContent = actionText;
      btn.onclick = ()=>{action&&action(); hideSnackbar();};
      s.appendChild(btn);
    }
    clearTimeout(snackbarTimer);
    snackbarTimer = setTimeout(hideSnackbar, 3000);
  }

  function hideSnackbar(){ qs('#snackbar').classList.add('hidden'); }

  function escapeHtml(s){ return (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;'); }

  // VIEWS
  function setActiveNav(index){
    // Hide all views
    const views = [qs('#viewHome'), qs('#viewCalendar'), qs('#viewStats'), qs('#viewSettings')];
    views.forEach(v => { if(v) v.classList.remove('active'); });
    
    // Remove active class from all nav buttons
    qsa('.bottom-nav button').forEach(b => b.classList.remove('active'));

    // Show selected view
    if(views[index]){
      views[index].classList.add('active');
      qsa('.bottom-nav button')[index].classList.add('active');

      // Render specific view content
      if(index===0) render(); // Home
      if(index===1) { setTimeout(()=>renderCalendar(), 0); } // Calendar
      if(index===2) { setTimeout(()=>renderStats(), 0); } // Stats
      if(index===3) { setTimeout(()=>renderSettings(), 0); } // Settings
    }
  }

  // INIT
  function init(){
    // Initialize with sample data if first run and no tasks
    if(!state.tasks || state.tasks.length===0){
      // Add some sample tasks for demo
      const sampleTasks = [
        {id:uid('task'),title:'Morning Exercise',description:'30 min cardio',recurrence:'daily',streak:3,last_completed_date:null},
        {id:uid('task'),title:'Read 10 pages',description:'',recurrence:'daily',streak:5,last_completed_date:null},
        {id:uid('task'),title:'Meditate',description:'10 minutes',recurrence:'daily',streak:2,last_completed_date:null}
      ];
      state.tasks = sampleTasks;
      
      // Add sample completions for the last 7 days
      const today = new Date();
      for(let i=0; i<7; i++){
        const d = new Date(today);
        d.setDate(d.getDate()-i);
        const dayStr = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
        // Add 2-3 random task completions per day
        for(let j=0; j<Math.floor(Math.random()*2)+2; j++){
          const taskIdx = Math.floor(Math.random()*sampleTasks.length);
          if(!state.completions.some(c=>c.taskId===sampleTasks[taskIdx].id && c.localDate===dayStr)){
            const ts = new Date(d);
            ts.setHours(Math.floor(Math.random()*12)+6); // between 6am and 6pm
            state.completions.push({
              id:uid('c'),
              taskId:sampleTasks[taskIdx].id,
              ts:ts.toISOString(),
              localDate:dayStr,
              counted:true
            });
          }
        }
      }
      
      // Recompute streaks
      sampleTasks.forEach(task => recomputeTaskStreak(task));
      recomputeGlobalStreak();
      saveState(state);
      openOnboard();
    }

    qs('#startBtn').addEventListener('click', startOnboard);
    qs('#fab').addEventListener('click', ()=>openTaskModal());
    qs('#closeTask').addEventListener('click', closeTaskModal);
    qs('#deleteTask').addEventListener('click', deleteTask);
    qs('#saveTask').addEventListener('click', saveTask);
    qs('#closeDayModal').addEventListener('click', closeDayModal);

    qs('#prevMonth').addEventListener('click', ()=>{
      currentMonth.setMonth(currentMonth.getMonth()-1);
      renderCalendar();
    });
    qs('#nextMonth').addEventListener('click', ()=>{
      currentMonth.setMonth(currentMonth.getMonth()+1);
      renderCalendar();
    });

    qs('#saveSettings').addEventListener('click', saveSettings);
    qs('#clearDataBtn').addEventListener('click', clearAllData);
    qs('#exportDataBtn').addEventListener('click', exportData);

    qsa('.bottom-nav button').forEach((btn,i)=>{
      btn.addEventListener('click', ()=>setActiveNav(i));
    });

    if(state.user.dark_mode) document.documentElement.classList.add('dark');

    setActiveNav(0);
    render();
  }

  window.addEventListener('load', init);
})();
