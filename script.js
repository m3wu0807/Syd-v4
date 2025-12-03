<!DOCTYPE html>
<html lang="zh-Hant">
<head>
  <meta charset="UTF-8" />
  <title>我的行程本｜Sydney Diary（單檔測試版）</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    :root {
      --primary-color: #111827;
      --accent-color: #2563eb;
      --bg-color: #f5f5f7;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }
    body {
      background: var(--bg-color);
      color: #222;
    }
    .app {
      max-width: 1100px;
      margin: 0 auto;
      padding: 16px;
    }
    .app-header {
      text-align: center;
      margin-bottom: 16px;
    }
    .app-header h1 {
      font-size: 24px;
      margin-bottom: 4px;
    }
    .subtitle {
      font-size: 14px;
      color: #666;
    }
    .top-controls {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 8px;
    }
    .theme-panel {
      background: #fff;
      border-radius: 12px;
      padding: 10px 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
      font-size: 12px;
      max-width: 360px;
    }
    .theme-row {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 6px;
    }
    .theme-row input[type="color"] {
      border: none;
      background: transparent;
      width: 40px;
      height: 24px;
      padding: 0;
    }
    .theme-row input[type="range"] {
      flex: 1;
    }
    .small-button {
      font-size: 11px;
      padding: 4px 8px;
      border-radius: 999px;
      border: 1px solid #e5e7eb;
      background: #f9fafb;
      cursor: pointer;
    }
    .layout {
      display: flex;
      gap: 16px;
      align-items: flex-start;
    }
    .sidebar {
      width: 260px;
      background: #fff;
      border-radius: 12px;
      padding: 12px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    }
    .sidebar h2 {
      font-size: 16px;
      margin-bottom: 8px;
    }
    #trip-list {
      list-style: none;
    }
    .trip-item {
      padding: 8px 10px;
      border-radius: 8px;
      cursor: pointer;
      font-size: 14px;
    }
    .trip-item.active {
      background: var(--primary-color);
      color: #fff;
    }
    .trip-item:hover {
      background: #f3f4f6;
    }
    .content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .day-tabs {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 4px;
    }
    .day-tab {
      font-size: 12px;
      padding: 4px 8px;
      border-radius: 999px;
      border: 1px solid #e5e7eb;
      background: #f9fafb;
      cursor: pointer;
    }
    .day-tab.active {
      background: var(--primary-color);
      color: #fff;
      border-color: var(--primary-color);
    }
    #day-header,
    #day-schedule,
    #day-meals {
      background: #fff;
      border-radius: 12px;
      padding: 14px 16px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    }
    .day-title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 4px;
    }
    .day-subtitle {
      font-size: 13px;
      color: #555;
      margin-bottom: 8px;
    }
    .day-banner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
      font-size: 12px;
    }
    .banner-label {
      font-weight: 600;
      margin-right: 4px;
    }
    .banner-weather {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .weather-icon { font-size: 16px; }
    .weather-text { font-size: 12px; }
    .section-title {
      font-size: 15px;
      font-weight: 600;
      margin-bottom: 8px;
    }
    .schedule-row {
      display: grid;
      grid-template-columns: 80px 1fr;
      gap: 8px;
      padding: 8px 0;
      border-bottom: 1px dashed #e5e7eb;
    }
    .schedule-row:last-child { border-bottom: none; }
    .time-cell {
      font-size: 12px;
      font-weight: 500;
      color: #4b5563;
    }
    .block-title {
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 2px;
    }
    .block-detail {
      font-size: 12px;
      color: #4b5563;
    }
    .block-meta {
      font-size: 11px;
      color: #6b7280;
      margin-top: 2px;
    }
    .meals-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 8px;
    }
    .meal-card {
      padding: 10px;
      border-radius: 10px;
      background: #f9fafb;
    }
    .meal-title {
      font-size: 13px;
      font-weight: 600;
      margin-bottom: 4px;
    }
    .meal-restaurant {
      font-size: 13px;
      margin-bottom: 2px;
    }
    .meal-note {
      font-size: 12px;
      color: #4b5563;
    }
    @media (max-width: 768px) {
      .layout { flex-direction: column; }
      .sidebar { width: 100%; }
      .day-banner { flex-direction: column; align-items: flex-start; }
    }
  </style>
</head>
<body>
  <div class="app">
    <header class="app-header">
      <h1>我的行程本｜Sydney Diary</h1>
      <p class="subtitle">（單檔測試版）已自動載入行程，不需輸入密碼</p>
    </header>

    <main>
      <section id="app-section">
        <div class="top-controls">
          <div class="theme-panel">
            <div class="theme-title">🎨 網站色系</div>
            <div class="theme-row">
              <label for="theme-color">主色</label>
              <input type="color" id="theme-color" />
            </div>
            <div class="theme-row">
              <span>RGB</span>
              <input type="range" id="r-range" min="0" max="255" />
              <input type="range" id="g-range" min="0" max="255" />
              <input type="range" id="b-range" min="0" max="255" />
            </div>
            <button id="reset-theme-btn" class="small-button">恢復預設</button>
          </div>
        </div>

        <div class="layout">
          <aside class="sidebar">
            <h2>旅程列表</h2>
            <ul id="trip-list"></ul>
          </aside>
          <section class="content">
            <div id="day-tabs" class="day-tabs"></div>
            <div id="day-header"></div>
            <div id="day-schedule"></div>
            <div id="day-meals"></div>
          </section>
        </div>
      </section>
    </main>
  </div>

  <script>
    // --- 簡單主題 ---
    function applyTheme(theme) {
      var root = document.documentElement;
      root.style.setProperty("--primary-color", theme.primary);
      root.style.setProperty("--accent-color", theme.primary);
      root.style.setProperty("--bg-color", theme.bg || "#f5f5f7");
      document.getElementById("theme-color").value = theme.hex;
      document.getElementById("r-range").value = theme.r;
      document.getElementById("g-range").value = theme.g;
      document.getElementById("b-range").value = theme.b;
    }
    function defaultTheme() {
      return { primary:"rgb(17,24,39)", r:17, g:24, b:39, hex:"#111827", bg:"#f5f5f7" };
    }
    function rgbToHex(r,g,b){
      function h(x){var s=x.toString(16);return s.length===1?"0"+s:s;}
      return "#"+h(r)+h(g)+h(b);
    }

    // --- 一筆測試行程（出發日） ---
    var trips = [
      {
        id:"sydney-10d",
        name:"雪梨跨年 10 日遊",
        dateRange:"2025/12/23 – 2026/01/02",
        days:[
          {
            id:"depart",
            title:"出發日｜TPE → SYD",
            date:"2025/12/23",
            subtitle:"晚班機飛往雪梨，在機上休息調時差",
            stay:{ name:"機上過夜" },
            weather:{
              icon:"✈️",
              label:"查看桃園機場天氣",
              linkUrl:"https://www.google.com/search?q=taoyuan+airport+weather+2025-12-23"
            },
            schedule:[
              {
                time:"20:30",
                endTime:"22:30",
                title:"前往桃園機場・辦理登機",
                detail:"抵達機場、報到、托運行李，通過安檢與出境。",
                transport:"自行前往桃園機場。"
              },
              {
                time:"23:50",
                endTime:"",
                title:"23:50 TPE → SYD",
                detail:"上機後調整時差，盡量在機上睡覺休息。",
                transport:"飛機。"
              }
            ],
            meals:{
              breakfast:null,
              lunch:null,
              dinner:{
                name:"機場或機上餐",
                type:"輕食／飛機餐",
                needReservation:false,
                note:"依班機時間彈性用餐。"
              }
            }
          }
        ]
      }
    ];

    // --- DOM 變數 ---
    var tripListEl   = document.getElementById("trip-list");
    var dayTabsEl    = document.getElementById("day-tabs");
    var dayHeaderEl  = document.getElementById("day-header");
    var dayScheduleEl= document.getElementById("day-schedule");
    var dayMealsEl   = document.getElementById("day-meals");

    function initThemeUI(){
      var t = defaultTheme();
      applyTheme(t);
      var tc = document.getElementById("theme-color");
      var r  = document.getElementById("r-range");
      var g  = document.getElementById("g-range");
      var b  = document.getElementById("b-range");
      var reset = document.getElementById("reset-theme-btn");
      tc.addEventListener("input",function(e){
        var hex = e.target.value;
        var rr = parseInt(hex.slice(1,3),16);
        var gg = parseInt(hex.slice(3,5),16);
        var bb = parseInt(hex.slice(5,7),16);
        applyTheme({primary:"rgb("+rr+","+gg+","+bb+")", r:rr,g:gg,b:bb,hex:hex,bg:"#f5f5f7"});
      });
      [r,g,b].forEach(function(range){
        range.addEventListener("input",function(){
          var rr = parseInt(r.value||"17",10);
          var gg = parseInt(g.value||"24",10);
          var bb = parseInt(b.value||"39",10);
          var hex = rgbToHex(rr,gg,bb);
          applyTheme({primary:"rgb("+rr+","+gg+","+bb+")", r:rr,g:gg,b:bb,hex:hex,bg:"#f5f5f7"});
        });
      });
      reset.addEventListener("click",function(){ applyTheme(defaultTheme());});
    }

    function initTrips(){
      tripListEl.innerHTML = "";
      trips.forEach(function(trip,idx){
        var li = document.createElement("li");
        li.className = "trip-item"+(idx===0?" active":"");
        li.textContent = trip.name + "｜" + trip.dateRange;
        li.dataset.index = idx;
        li.addEventListener("click",function(){
          selectTrip(idx);
        });
        tripListEl.appendChild(li);
      });
      selectTrip(0);
    }

    var currentTripIndex = 0;
    var currentDayIndex = 0;

    function selectTrip(i){
      currentTripIndex = i;
      var trip = trips[i];
      var items = document.querySelectorAll(".trip-item");
      for (var k=0;k<items.length;k++){
        items[k].classList.toggle("active", parseInt(items[k].dataset.index,10)===i);
      }
      renderDayTabs(trip,0);
      renderDay(trip.days[0]);
    }

    function renderDayTabs(trip,active){
      dayTabsEl.innerHTML = "";
      trip.days.forEach(function(day,idx){
        var btn = document.createElement("button");
        btn.className = "day-tab"+(idx===active?" active":"");
        var label = idx===0?"出發日":"D"+idx;
        btn.textContent = label+"｜"+day.date;
        btn.addEventListener("click",function(){
          currentDayIndex = idx;
          renderDayTabs(trip,idx);
          renderDay(day);
        });
        dayTabsEl.appendChild(btn);
      });
    }

    function renderDay(day){
      // header
      var banner = "";
      if(day.stay || day.weather){
        banner += '<div class="day-banner">';
        banner += '<div>';
        if(day.stay){
          banner += '<span class="banner-label">🏨 今晚住宿</span>';
          banner += '<span>'+ (day.stay.name||"") +'</span>';
        }
        banner += '</div>';
        if(day.weather){
          banner += '<div class="banner-weather">';
          banner += '<span class="weather-icon">'+(day.weather.icon||"⛅")+'</span>';
          banner += '<a href="'+(day.weather.linkUrl||"#")+'" target="_blank" rel="noopener noreferrer">';
          banner += '<span class="weather-text">'+(day.weather.label||"查看今日天氣")+'</span>';
          banner += '</a></div>';
        }
        banner += '</div>';
      }
      dayHeaderEl.innerHTML =
        banner +
        '<div class="day-title">'+ day.title +'</div>' +
        '<div class="day-subtitle">'+ day.date +'｜'+ (day.subtitle||"") +'</div>';

      // schedule
      dayScheduleEl.innerHTML = '<div class="section-title">📋 行程時間軸（測試版）</div>';
      if(!day.schedule || !day.schedule.length){
        dayScheduleEl.innerHTML += '<p style="font-size:13px;color:#6b7280;">這一天還沒有填寫行程。</p>';
      }else{
        day.schedule.forEach(function(b){
          var row = document.createElement("div");
          row.className = "schedule-row";
          var timeText = b.time + (b.endTime?("–"+b.endTime):"");
          row.innerHTML =
            '<div class="time-cell">'+ timeText +'</div>'+
            '<div>'+
            '<div class="block-title">'+ b.title +'</div>'+
            '<div class="block-detail">'+ (b.detail||"") +'</div>'+
            '<div class="block-meta">'+ (b.transport||"") +'</div>'+
            '</div>';
          dayScheduleEl.appendChild(row);
        });
      }

      // meals
      dayMealsEl.innerHTML = '<div class="section-title">🍽️ 今日三餐（測試版）</div>';
      var wrap = document.createElement("div");
      wrap.className = "meals-grid";
      var order = [["breakfast","早餐"],["lunch","午餐"],["dinner","晚餐"]];
      order.forEach(function(pair){
        var key = pair[0], label = pair[1];
        var card = document.createElement("div");
        card.className = "meal-card";
        var meal = day.meals ? day.meals[key] : null;
        if(meal){
          card.innerHTML =
            '<div class="meal-title">'+label+'</div>'+
            '<div class="meal-restaurant">'+meal.name+'</div>'+
            '<div class="meal-note">類型：'+(meal.type||"—")+'</div>';
        }else{
          card.innerHTML =
            '<div class="meal-title">'+label+'</div>'+
            '<div class="meal-note" style="font-size:12px;color:#9ca3af;">尚未安排。</div>';
        }
        wrap.appendChild(card);
      });
      dayMealsEl.appendChild(wrap);
    }

    // 直接初始化（script 在 body 底部，DOM 已經載入）
    initThemeUI();
    initTrips();
  </script>
</body>
</html>
