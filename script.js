\
// ====== 行程資料與設定（V4：無登入，自動載入） ======
const STORAGE_KEY = "sydneyDiaryTripsV4";
const THEME_KEY = "sydneyDiaryThemeV1";

let stateTrips = null;
let currentTripIndex = 0;
let currentDayIndex = 0;
let isEditMode = false;

// ====== 原始行程資料（出發日 + Day1～Day9 + 回家日） ======
const baseTrips = [
  {
    id: "sydney-10d",
    name: "雪梨跨年 10 日遊",
    dateRange: "2025/12/23 – 2026/01/02",
    days: [
      // 出發日
      {
        id: "depart",
        title: "出發日｜TPE → SYD",
        date: "2025/12/23",
        subtitle: "晚班機飛往雪梨，在機上休息調時差",
        stay: {
          name: "機上過夜",
          mapUrl: "https://www.google.com/maps/place/Taiwan+Taoyuan+International+Airport"
        },
        weather: {
          icon: "✈️",
          label: "查看桃園機場天氣",
          linkUrl: "https://www.google.com/search?q=taoyuan+airport+weather+2025-12-23"
        },
        health: {
          highCalorie: false,
          walkingTarget: 3000,
          balanced: true
        },
        schedule: [
          {
            time: "20:30",
            endTime: "22:30",
            title: "前往桃園機場・辦理登機",
            detail: "抵達機場、報到、托運行李，通過安檢與出境。",
            transport: "自行前往桃園機場（客運／機捷／家人接送）。",
            photoSpot: false,
            mapUrl: "https://www.google.com/maps/place/Taiwan+Taoyuan+International+Airport"
          },
          {
            time: "23:50",
            endTime: "",
            title: "23:50 TPE → SYD",
            detail: "上機後調整時差，盡量在機上睡覺休息。",
            transport: "飛機。",
            photoSpot: false
          }
        ],
        meals: {
          breakfast: null,
          lunch: null,
          dinner: {
            name: "機場或機上餐",
            type: "輕食／飛機餐",
            needReservation: false,
            note: "依班機時間彈性用餐。"
          }
        }
      },
      // Day1 12/24
      {
        id: "day1",
        title: "Day 1｜抵達＆北雪梨散步",
        date: "2025/12/24",
        subtitle: "抵達雪梨，入住 North Sydney，下午港灣散步",
        stay: {
          name: "Citadines Walker North Sydney",
          mapUrl: "https://www.google.com/maps/search/Citadines+Walker+North+Sydney"
        },
        weather: {
          icon: "⛅",
          label: "查看 12/24 雪梨天氣",
          linkUrl: "https://www.google.com/search?q=sydney+weather+2025-12-24"
        },
        health: {
          highCalorie: false,
          walkingTarget: 8000,
          balanced: true
        },
        schedule: [
          {
            time: "12:15",
            endTime: "13:30",
            title: "抵達雪梨機場 SYD",
            detail: "下機、通過海關、領行李、檢疫。",
            transport: "步行依指標前往入境大廳。",
            photoSpot: false,
            mapUrl: "https://www.google.com/maps/place/Sydney+Airport"
          },
          {
            time: "13:30",
            endTime: "15:00",
            title: "前往 Citadines Walker North Sydney",
            detail: "機場搭火車 T8 → Central → 轉 T1/T9 至 North Sydney，步行約 5–8 分鐘到飯店。",
            transport: "機場快線＋市區火車＋步行。",
            photoSpot: false,
            mapUrl: "https://www.google.com/maps/search/North+Sydney+Station"
          },
          {
            time: "15:30",
            endTime: "17:30",
            title: "北雪梨港灣散步",
            detail: "步行到 Lavender Bay、Wendy’s Secret Garden，再到 Kirribilli 小鎮與 Bradfield Park，拍大橋＋歌劇院經典視角。",
            transport: "全程步行，注意防曬。",
            photoSpot: true,
            mapUrl: "https://www.google.com/maps/place/Wendy%27s+Secret+Garden"
          },
          {
            time: "18:30",
            endTime: "20:00",
            title: "晚餐",
            detail: "可選 Sails on Lavender Bay（海鮮＋牛排）或 The Botanist（小酒館、tapas／沙拉／牛排）。",
            transport: "依餐廳位置步行前往。",
            photoSpot: false
          },
          {
            time: "21:00",
            endTime: "",
            title: "回飯店休息",
            detail: "洗澡、早點休息，調整時差。",
            transport: "步行回飯店。",
            photoSpot: false
          }
        ],
        meals: {
          breakfast: null,
          lunch: {
            name: "機上餐點",
            type: "飛機餐",
            needReservation: false,
            note: "以墊肚子為主，下機後再好好吃。"
          },
          dinner: {
            name: "Sails on Lavender Bay 或 The Botanist",
            type: "海鮮／小酒館",
            needReservation: true,
            note: "視體力與預約情況調整。"
          }
        }
      },
      // Day2 12/25
      {
        id: "day2",
        title: "Day 2｜聖誕節・雪梨黃金散步線",
        date: "2025/12/25",
        subtitle: "古蹟＋海灣散步，店家多休息，適合拍照",
        stay: {
          name: "Citadines Walker North Sydney",
          mapUrl: "https://www.google.com/maps/search/Citadines+Walker+North+Sydney"
        },
        weather: {
          icon: "☀️",
          label: "查看 12/25 雪梨天氣",
          linkUrl: "https://www.google.com/search?q=sydney+weather+2025-12-25"
        },
        health: {
          highCalorie: true,
          walkingTarget: 12000,
          balanced: false
        },
        schedule: [
          {
            time: "09:00",
            endTime: "12:00",
            title: "City 文化散步",
            detail: "從 Wynyard / St James 站出來，走過 Hyde Park、St Mary’s Cathedral，沿 Macquarie St 北走，依序經過 Queen’s Square、The Mint、Hyde Park Barracks Museum、Il Porcellino 青銅豬、Sydney Hospital、NSW Parliament、State Library of NSW。",
            transport: "搭火車到 City，之後步行。",
            photoSpot: true,
            mapUrl: "https://www.google.com/maps/place/Hyde+Park+Sydney"
          },
          {
            time: "12:30",
            endTime: "13:30",
            title: "午餐：The Rocks 一帶",
            detail: "推薦 The Fine Food Store（早午餐、咖啡、三明治）。",
            transport: "步行前往 The Rocks。",
            photoSpot: false,
            mapUrl: "https://www.google.com/maps/search/The+Fine+Food+Store+The+Rocks"
          },
          {
            time: "13:30",
            endTime: "16:30",
            title: "植物園＋最美觀景點",
            detail: "進 Royal Botanic Garden，沿著步道到 Mrs Macquarie’s Chair / Point，拍「歌劇院＋大橋＋海灣」景色，再沿 Farm Cove 海邊步道走回 Sydney Opera House 外圍拍照。",
            transport: "全程步行，注意補水與防曬。",
            photoSpot: true,
            mapUrl: "https://www.google.com/maps/place/Mrs+Macquarie%27s+Chair"
          },
          {
            time: "16:30",
            endTime: "18:00",
            title: "Circular Quay / The Rocks 聖誕氣氛散步",
            detail: "在港邊與老街感受聖誕氛圍。",
            transport: "步行。",
            photoSpot: true,
            mapUrl: "https://www.google.com/maps/place/Circular+Quay"
          },
          {
            time: "18:30",
            endTime: "20:00",
            title: "晚餐：回 North Sydney 一帶",
            detail: "若餐廳選擇有限，就選 The Botanist 或附近開著的 pub 簡單吃。",
            transport: "搭火車回 North Sydney，步行至餐廳。",
            photoSpot: false
          },
          {
            time: "20:30",
            endTime: "",
            title: "回飯店休息",
            detail: "",
            transport: "步行回飯店。",
            photoSpot: false
          }
        ],
        meals: {
          breakfast: {
            name: "City 附近咖啡廳早餐",
            type: "早午餐・咖啡",
            needReservation: false,
            note: "聖誕節營業店家較少，建議前一天稍微查好。"
          },
          lunch: {
            name: "The Fine Food Store",
            type: "早午餐・咖啡",
            needReservation: false,
            note: "如擔心客滿可提前到或找替代店家。"
          },
          dinner: {
            name: "The Botanist 或 North Sydney pub",
            type: "小酒館／酒吧餐點",
            needReservation: true,
            note: "聖誕節營業時間可能較短，建議提前確認。"
          }
        }
      },
      // Day3 12/26
      {
        id: "day3",
        title: "Day 3｜Boxing Day 購物＋城市文化",
        date: "2025/12/26",
        subtitle: "大採購日＋博物館",
        stay: {
          name: "Citadines Walker North Sydney",
          mapUrl: "https://www.google.com/maps/search/Citadines+Walker+North+Sydney"
        },
        weather: {
          icon: "🌤️",
          label: "查看 12/26 雪梨天氣",
          linkUrl: "https://www.google.com/search?q=sydney+weather+2025-12-26"
        },
        health: {
          highCalorie: true,
          walkingTarget: 11000,
          balanced: false
        },
        schedule: [
          {
            time: "09:30",
            endTime: "14:00",
            title: "Pitt St Mall & 百貨購物",
            detail: "搭火車到 Town Hall，逛 Pitt St Mall、Westfield、QVB 等，利用 Boxing Day 折扣採買。",
            transport: "火車至 Town Hall，之後步行。",
            photoSpot: false,
            mapUrl: "https://www.google.com/maps/place/Pitt+Street+Mall"
          },
          {
            time: "12:00",
            endTime: "13:00",
            title: "午餐：City",
            detail: "可選 Mamak（馬來西亞料理：咖哩、羅提、椰漿飯），或百貨內美食街。",
            transport: "步行就近選店。",
            photoSpot: false,
            mapUrl: "https://www.google.com/maps/search/Mamak+Sydney"
          },
          {
            time: "14:30",
            endTime: "17:30",
            title: "Hyde Park & Australian Museum",
            detail: "走回 Hyde Park，進 Australian Museum 看恐龍、自然歷史展（室內行程，雨天也適合）。",
            transport: "步行前往。",
            photoSpot: false,
            mapUrl: "https://www.google.com/maps/place/Australian+Museum"
          },
          {
            time: "18:30",
            endTime: "20:00",
            title: "晚餐：Darling Square 一帶",
            detail: "多國料理集中區，丼飯、拉麵、漢堡、韓式等選擇很多。",
            transport: "步行或短程輕軌前往。",
            photoSpot: false,
            mapUrl: "https://www.google.com/maps/place/Darling+Square"
          },
          {
            time: "20:30",
            endTime: "",
            title: "回 North Sydney",
            detail: "",
            transport: "搭火車回 North Sydney。",
            photoSpot: false
          }
        ],
        meals: {
          breakfast: {
            name: "住宿附近簡單早餐",
            type: "輕食",
            needReservation: false,
            note: ""
          },
          lunch: {
            name: "Mamak 或百貨美食街",
            type: "東南亞料理／美食街",
            needReservation: false,
            note: ""
          },
          dinner: {
            name: "Darling Square 多國料理",
            type: "日式／韓式／西式皆可",
            needReservation: false,
            note: "視當日人潮彈性排隊。"
          }
        }
      },
      // Day4 12/27
      {
        id: "day4",
        title: "Day 4｜搬家・魚市場・達令港遊船晚餐",
        date: "2025/12/27",
        subtitle: "北雪梨 → City，魚市場＋遊船晚餐",
        stay: {
          name: "Metro Hotel Marlow Sydney Central",
          mapUrl: "https://www.google.com/maps/search/Metro+Hotel+Marlow+Sydney+Central"
        },
        weather: {
          icon: "⛅",
          label: "查看 12/27 雪梨天氣",
          linkUrl: "https://www.google.com/search?q=sydney+weather+2025-12-27"
        },
        health: {
          highCalorie: true,
          walkingTarget: 9000,
          balanced: false
        },
        schedule: [
          {
            time: "09:30",
            endTime: "10:30",
            title: "退房 → 搬到 Metro Hotel Marlow",
            detail: "從 Citadines 退房，搭火車或 Uber 前往 Central 附近的 Metro Hotel，若尚未可入住就先寄放行李。",
            transport: "火車或 Uber。",
            photoSpot: false,
            mapUrl: "https://www.google.com/maps/search/Metro+Hotel+Marlow+Sydney+Central"
          },
          {
            time: "11:00",
            endTime: "13:00",
            title: "Sydney Fish Market 午餐",
            detail: "前往魚市場，享用生蠔、龍蝦、鮭魚握壽司、炸魚薯條等海鮮。",
            transport: "搭輕軌或 Uber 前往。",
            photoSpot: true,
            mapUrl: "https://www.google.com/maps/place/Sydney+Fish+Market"
          },
          {
            time: "14:00",
            endTime: "17:00",
            title: "Darling Harbour & City Walk",
            detail: "回 Darling Harbour 一帶散步，經過 Pyrmont Bridge、Harbourside、King St Wharf 等，可順便逛商場或咖啡廳。",
            transport: "步行。",
            photoSpot: true,
            mapUrl: "https://www.google.com/maps/place/Darling+Harbour"
          },
          {
            time: "18:10",
            endTime: "21:00",
            title: "雪梨港精緻晚餐遊船（已購買）",
            detail: "於 SEA LIFE Sydney Aquarium 前碼頭附近集合登船，享用三道式晚餐與港灣夜景。",
            transport: "步行至指定碼頭。",
            photoSpot: true,
            mapUrl: "https://www.google.com/maps/place/SEA+LIFE+Sydney+Aquarium"
          },
          {
            time: "21:30",
            endTime: "",
            title: "回飯店休息",
            detail: "",
            transport: "步行或短程交通工具。",
            photoSpot: false
          }
        ],
        meals: {
          breakfast: {
            name: "退房前簡單早餐",
            type: "輕食",
            needReservation: false,
            note: ""
          },
          lunch: {
            name: "Sydney Fish Market 海鮮大餐",
            type: "海鮮",
            needReservation: false,
            note: "人多時需要排隊拿餐。"
          },
          dinner: {
            name: "達令港精緻遊船晚餐",
            type: "三道式晚餐",
            needReservation: true,
            note: "已事先購買行程，依票券時間報到。"
          }
        }
      },
      // Day5 12/28
      {
        id: "day5",
        title: "Day 5｜藍山自由行",
        date: "2025/12/28",
        subtitle: "藍山一日，Scenic World＋三姐妹岩",
        stay: {
          name: "Metro Hotel Marlow Sydney Central",
          mapUrl: "https://www.google.com/maps/search/Metro+Hotel+Marlow+Sydney+Central"
        },
        weather: {
          icon: "🌤️",
          label: "查看藍山天氣",
          linkUrl: "https://www.google.com/search?q=blue+mountains+weather+2025-12-28"
        },
        health: {
          highCalorie: false,
          walkingTarget: 13000,
          balanced: true
        },
        schedule: [
          {
            time: "07:30",
            endTime: "09:30",
            title: "出門 → 搭車前往藍山",
            detail: "從 Central Station 搭 Blue Mountains Line 到 Katoomba（約 2 小時），建議預留上車時間。",
            transport: "火車。",
            photoSpot: false,
            mapUrl: "https://www.google.com/maps/place/Central+Station,+Sydney"
          },
          {
            time: "09:30",
            endTime: "12:30",
            title: "Scenic World 纜車三寶",
            detail: "遊玩 Skyway、Railway、Cableway 等設施，俯瞰山谷景觀。",
            transport: "步行＋園區設施。",
            photoSpot: true,
            mapUrl: "https://www.google.com/maps/place/Scenic+World+Katoomba"
          },
          {
            time: "12:30",
            endTime: "13:30",
            title: "午餐",
            detail: "可在 Scenic World Café 或 Katoomba 小鎮用餐，例如 Station Bar（披薩＋啤酒）或 Yellow Deli（三明治＋熱湯）。",
            transport: "步行或短程公車。",
            photoSpot: false
          },
          {
            time: "13:30",
            endTime: "16:00",
            title: "Echo Point & 步道",
            detail: "前往 Echo Point（三姐妹岩），依體力走一小段 Prince Henry Cliff Walk 或至 Katoomba Cascades。",
            transport: "公車或步行。",
            photoSpot: true,
            mapUrl: "https://www.google.com/maps/place/Echo+Point+Lookout"
          },
          {
            time: "16:30",
            endTime: "18:30",
            title: "搭火車回 Central",
            detail: "從 Katoomba 搭火車回 Central，返回飯店附近。",
            transport: "火車。",
            photoSpot: false
          },
          {
            time: "18:30",
            endTime: "",
            title: "晚餐＆回飯店休息",
            detail: "在 Central 一帶隨意用餐後回飯店休息。",
            transport: "步行。",
            photoSpot: false
          }
        ],
        meals: {
          breakfast: {
            name: "簡單早餐／外帶咖啡",
            type: "輕食",
            needReservation: false,
            note: "可在 Central Station 附近買。"
          },
          lunch: {
            name: "Scenic World Café 或 Katoomba 小鎮餐廳",
            type: "西式餐點",
            needReservation: false,
            note: ""
          },
          dinner: {
            name: "Central 一帶簡單晚餐",
            type: "隨意餐廳",
            needReservation: false,
            note: ""
          }
        }
      },
      // Day6 12/29
      {
        id: "day6",
        title: "Day 6｜獵人谷酒莊一日遊（已訂）",
        date: "2025/12/29",
        subtitle: "葡萄酒＋起司盤的一天",
        stay: {
          name: "Metro Hotel Marlow Sydney Central",
          mapUrl: "https://www.google.com/maps/search/Metro+Hotel+Marlow+Sydney+Central"
        },
        weather: {
          icon: "⛅",
          label: "查看獵人谷天氣",
          linkUrl: "https://www.google.com/search?q=hunter+valley+weather+2025-12-29"
        },
        health: {
          highCalorie: true,
          walkingTarget: 8000,
          balanced: false
        },
        schedule: [
          {
            time: "08:00",
            endTime: "08:15",
            title: "走路至 St Laurence Church 集合",
            detail: "從飯店步行至 812 George St (St Laurence Church)，約 5 分鐘。",
            transport: "步行。",
            photoSpot: false,
            mapUrl: "https://www.google.com/maps/place/St+Laurence+Church+Sydney"
          },
          {
            time: "08:20",
            endTime: "17:30",
            title: "獵人谷一日遊行程",
            detail: "造訪約 3–4 間酒莊，品嚐紅白酒、起司盤、巧克力店，沿途欣賞田園風景。",
            transport: "遊覽車。",
            photoSpot: true,
            mapUrl: "https://www.google.com/maps/search/Hunter+Valley+Wineries"
          },
          {
            time: "18:00",
            endTime: "19:00",
            title: "回到 Central 附近",
            detail: "解散後步行回飯店或先吃晚餐。",
            transport: "步行。",
            photoSpot: false
          },
          {
            time: "19:00",
            endTime: "",
            title: "晚餐",
            detail: "可選唐人街中餐（The Eight 等港式）、或韓式烤肉。",
            transport: "步行。",
            photoSpot: false
          }
        ],
        meals: {
          breakfast: {
            name: "飯店附近簡單早餐",
            type: "輕食",
            needReservation: false,
            note: "可外帶吃在車上。"
          },
          lunch: {
            name: "獵人谷行程內安排午餐／小點",
            type: "團體餐",
            needReservation: true,
            note: "依旅行社行程為主。"
          },
          dinner: {
            name: "唐人街中餐或韓式烤肉",
            type: "中式／韓式",
            needReservation: false,
            note: "視體力決定是否排隊。"
          }
        }
      },
      // Day7 12/30
      {
        id: "day7",
        title: "Day 7｜Taronga Zoo ＋ Watsons Bay ＋ 搬到 Rydges",
        date: "2025/12/30",
        subtitle: "動物園＋海景散步，入住 Rydges Australia Square",
        stay: {
          name: "Rydges Australia Square（12/30–1/1）",
          mapUrl: "https://www.google.com/maps/search/Rydges+Australia+Square"
        },
        weather: {
          icon: "🌤️",
          label: "查看 12/30 雪梨天氣",
          linkUrl: "https://www.google.com/search?q=sydney+weather+2025-12-30"
        },
        health: {
          highCalorie: false,
          walkingTarget: 11000,
          balanced: true
        },
        schedule: [
          {
            time: "08:30",
            endTime: "09:30",
            title: "退房 → 行李帶去 Rydges 寄放",
            detail: "從 Metro Hotel 搬到 Rydges Australia Square，寄放行李，地點在 Pitt St, CBD，位置便利。",
            transport: "步行或短程交通工具。",
            photoSpot: false,
            mapUrl: "https://www.google.com/maps/search/Rydges+Australia+Square"
          },
          {
            time: "09:30",
            endTime: "13:00",
            title: "Taronga Zoo 動物園",
            detail: "從 Circular Quay 搭渡輪至 Taronga Zoo Wharf，轉 Sky Safari 纜車到入口，看無尾熊、袋鼠、鳥類表演與海獅秀。",
            transport: "渡輪＋纜車＋園區步行。",
            photoSpot: true,
            mapUrl: "https://www.google.com/maps/place/Taronga+Zoo+Sydney"
          },
          {
            time: "13:30",
            endTime: "17:30",
            title: "Watsons Bay 海景＋步道",
            detail: "從 Taronga Wharf 搭船至 Watsons Bay，散步 South Head Heritage Walk、Gap Bluff，看懸崖海景與燈塔。",
            transport: "渡輪＋步行。",
            photoSpot: true,
            mapUrl: "https://www.google.com/maps/place/Watsons+Bay"
          },
          {
            time: "17:30",
            endTime: "19:00",
            title: "晚餐：Doyle’s on the Beach",
            detail: "經典海鮮餐廳，推薦炸魚薯條、海鮮拼盤。",
            transport: "步行即可抵達餐廳。",
            photoSpot: false
          },
          {
            time: "19:00",
            endTime: "20:00",
            title: "渡輪回 Circular Quay → 回 Rydges 辦理 Check-in",
            detail: "回到 City，步行回 Rydges 正式入住。",
            transport: "渡輪＋步行。",
            photoSpot: false
          }
        ],
        meals: {
          breakfast: {
            name: "附近咖啡廳簡單早餐",
            type: "咖啡・早午餐",
            needReservation: false,
            note: ""
          },
          lunch: {
            name: "動物園內餐廳或輕食",
            type: "園區餐點",
            needReservation: false,
            note: ""
          },
          dinner: {
            name: "Doyle’s on the Beach",
            type: "海鮮餐廳",
            needReservation: true,
            note: "建議提前預約海景座位。"
          }
        }
      },
      // Day8 12/31
      {
        id: "day8",
        title: "Day 8｜跨年・歌劇院歌劇＋After Party",
        date: "2025/12/31",
        subtitle: "白天市區漫步，晚上歌劇＋煙火",
        stay: {
          name: "Rydges Australia Square",
          mapUrl: "https://www.google.com/maps/search/Rydges+Australia+Square"
        },
        weather: {
          icon: "☀️",
          label: "查看 12/31 雪梨天氣",
          linkUrl: "https://www.google.com/search?q=sydney+weather+2025-12-31"
        },
        health: {
          highCalorie: true,
          walkingTarget: 9000,
          balanced: false
        },
        schedule: [
          {
            time: "10:30",
            endTime: "14:00",
            title: "Barangaroo & Millers Point 散步",
            detail: "走路到 Barangaroo Reserve 海濱公園，往 Millers Point、Observatory Hill 方向散步，看大橋視野。",
            transport: "全程步行。",
            photoSpot: true,
            mapUrl: "https://www.google.com/maps/place/Barangaroo+Reserve"
          },
          {
            time: "12:30",
            endTime: "13:30",
            title: "午餐",
            detail: "在 Barangaroo 或 City 附近的餐廳用餐，現代澳式、日式、泰式皆可。",
            transport: "步行。",
            photoSpot: false
          },
          {
            time: "14:00",
            endTime: "16:30",
            title: "回飯店休息・準備跨年穿搭",
            detail: "洗澡、打扮、整理行李。",
            transport: "步行回飯店。",
            photoSpot: false
          },
          {
            time: "17:30",
            endTime: "18:30",
            title: "出門前輕食／小點",
            detail: "可在歌劇院附近簡單吃，避免演出結束後太餓。",
            transport: "步行前往 Circular Quay / Sydney Opera House。",
            photoSpot: false
          },
          {
            time: "19:00",
            endTime: "22:00",
            title: "Sydney Opera House 歌劇演出（已訂）",
            detail: "依票券座位入場欣賞歌劇或表演。",
            transport: "步行。",
            photoSpot: false,
            mapUrl: "https://www.google.com/maps/place/Sydney+Opera+House"
          },
          {
            time: "22:00",
            endTime: "00:30",
            title: "After Party + 跨年煙火",
            detail: "內含飲品、小點，午夜倒數欣賞港灣煙火。",
            transport: "於歌劇院周邊步行活動。",
            photoSpot: true
          },
          {
            time: "00:30",
            endTime: "01:00",
            title: "步行回 Rydges",
            detail: "步行約 10–15 分鐘回飯店，避免擠大眾運輸。",
            transport: "步行。",
            photoSpot: false
          }
        ],
        meals: {
          breakfast: {
            name: "飯店附近簡單早餐",
            type: "輕食",
            needReservation: false,
            note: ""
          },
          lunch: {
            name: "Barangaroo / City 餐廳",
            type: "現代澳式／日式／泰式",
            needReservation: false,
            note: ""
          },
          dinner: {
            name: "歌劇院前輕食＋After Party 點心",
            type: "輕食＋派對餐點",
            needReservation: true,
            note: "依票券內容為主。"
          }
        }
      },
      // Day9 1/1
      {
        id: "day9",
        title: "Day 9｜最後半天＆回程",
        date: "2026/01/01",
        subtitle: "跨年後睡飽、最後散步，晚上飛回台灣",
        stay: {
          name: "Rydges Australia Square（早上退房）",
          mapUrl: "https://www.google.com/maps/search/Rydges+Australia+Square"
        },
        weather: {
          icon: "⛅",
          label: "查看 1/1 雪梨天氣",
          linkUrl: "https://www.google.com/search?q=sydney+weather+2026-01-01"
        },
        health: {
          highCalorie: false,
          walkingTarget: 8000,
          balanced: true
        },
        schedule: [
          {
            time: "09:30",
            endTime: "11:00",
            title: "睡到自然醒・早餐",
            detail: "跨年後補眠，在飯店附近輕鬆吃早餐。",
            transport: "步行。",
            photoSpot: false
          },
          {
            time: "11:00",
            endTime: "11:30",
            title: "退房・寄放行李",
            detail: "11:00 前退房，再將行李寄放在 Rydges。",
            transport: "飯店內辦理。",
            photoSpot: false
          },
          {
            time: "11:30",
            endTime: "15:00",
            title: "最後散步＋Brunch",
            detail: "可在 City 附近喝咖啡、逛街補貨，或搭火車去 Newtown / Redfern 吃早午餐、逛文青小店（推薦 Three Williams）。",
            transport: "視選擇地點搭火車或步行。",
            photoSpot: false,
            mapUrl: "https://www.google.com/maps/search/Three+Williams+Sydney"
          },
          {
            time: "15:30",
            endTime: "16:00",
            title: "回飯店拿行李",
            detail: "回 Rydges 領回寄放行李。",
            transport: "步行。",
            photoSpot: false
          },
          {
            time: "16:00",
            endTime: "18:00",
            title: "前往機場",
            detail: "搭火車或機場巴士前往雪梨機場，建議預留 3 小時。",
            transport: "火車 Airport Link 或機場巴士。",
            photoSpot: false,
            mapUrl: "https://www.google.com/maps/place/Sydney+Airport"
          },
          {
            time: "20:00",
            endTime: "",
            title: "20:00 SYD → TPE",
            detail: "辦理登機後，搭乘回程班機。",
            transport: "飛機。",
            photoSpot: false
          }
        ],
        meals: {
          breakfast: {
            name: "飯店附近早餐／咖啡廳",
            type: "輕食",
            needReservation: false,
            note: ""
          },
          lunch: {
            name: "City 或 Newtown / Redfern 早午餐",
            type: "早午餐",
            needReservation: false,
            note: ""
          },
          dinner: {
            name: "機場／機上餐點",
            type: "機場餐／飛機餐",
            needReservation: false,
            note: ""
          }
        }
      },
      // 回程日 Day10 1/2
      {
        id: "day10",
        title: "回家日｜抵達台灣",
        date: "2026/01/02",
        subtitle: "清晨抵達台灣，回家休息",
        stay: {
          name: "甜甜的家",
          mapUrl: "https://www.google.com/maps/search/Taoyuan+Airport"
        },
        weather: {
          icon: "🏠",
          label: "查看台灣天氣",
          linkUrl: "https://www.google.com/search?q=taoyuan+weather+2026-01-02"
        },
        health: {
          highCalorie: false,
          walkingTarget: 4000,
          balanced: true
        },
        schedule: [
          {
            time: "05:50",
            endTime: "08:00",
            title: "抵達桃園機場・入境",
            detail: "領行李、通關，搭車回家。",
            transport: "機場捷運／家人接機／計程車。",
            photoSpot: false,
            mapUrl: "https://www.google.com/maps/place/Taiwan+Taoyuan+International+Airport"
          },
          {
            time: "08:00",
            endTime: "",
            title: "回家整理行李・好好休息",
            detail: "洗澡、洗衣服、整理戰利品，慢慢恢復日常。",
            transport: "在家。",
            photoSpot: false
          }
        ],
        meals: {
          breakfast: {
            name: "機上簡單早餐或回家後再吃",
            type: "輕食",
            needReservation: false,
            note: ""
          },
          lunch: {
            name: "家附近或外送",
            type: "隨意",
            needReservation: false,
            note: ""
          },
          dinner: {
            name: "家常晚餐",
            type: "在家煮／外帶",
            needReservation: false,
            note: ""
          }
        }
      }
    ]
  }
];

// ====== DOM 取得 ======
const tripListEl = document.getElementById("trip-list");
const dayTabsEl = document.getElementById("day-tabs");
const dayHeaderEl = document.getElementById("day-header");
const dayScheduleEl = document.getElementById("day-schedule");
const dayMealsEl = document.getElementById("day-meals");

const themeColorInput = document.getElementById("theme-color");
const rRange = document.getElementById("r-range");
const gRange = document.getElementById("g-range");
const bRange = document.getElementById("b-range");
const resetThemeBtn = document.getElementById("reset-theme-btn");

// ====== 工具函式 ======
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function loadTrips() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      stateTrips = JSON.parse(raw);
      return;
    }
  } catch (e) {
    console.warn("無法讀取 localStorage，將使用預設行程。");
  }
  stateTrips = deepClone(baseTrips);
  saveTrips();
}

function saveTrips() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateTrips));
  } catch (e) {
    console.warn("無法寫入 localStorage。");
  }
}

function setDeepValue(obj, path, value) {
  const parts = path.split(".");
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts[i];
    if (!(key in cur)) return;
    cur = cur[key];
  }
  const last = parts[parts.length - 1];
  if (last in cur) {
    cur[last] = value;
  }
}

// ====== 主題色設定 ======
function applyTheme(theme) {
  const root = document.documentElement;
  root.style.setProperty("--primary-color", theme.primary);
  root.style.setProperty("--accent-color", theme.primary);
  root.style.setProperty("--bg-color", theme.bg || "#f5f5f7");

  if (themeColorInput) themeColorInput.value = theme.hex;
  if (rRange) rRange.value = theme.r;
  if (gRange) gRange.value = theme.g;
  if (bRange) bRange.value = theme.b;
}

function defaultTheme() {
  return {
    primary: "rgb(17,24,39)",
    r: 17,
    g: 24,
    b: 39,
    hex: "#111827",
    bg: "#f5f5f7"
  };
}

function loadTheme() {
  try {
    const raw = localStorage.getItem(THEME_KEY);
    if (raw) {
      const t = JSON.parse(raw);
      applyTheme(t);
      return;
    }
  } catch (e) {
    console.warn("無法讀取主題設定，使用預設。");
  }
  const t = defaultTheme();
  applyTheme(t);
  saveTheme(t);
}

function saveTheme(theme) {
  try {
    localStorage.setItem(THEME_KEY, JSON.stringify(theme));
  } catch (e) {
  }
}

function rgbToHex(r, g, b) {
  return "#" + [r, g, b].map((x) => {
    const h = x.toString(16);
    return h.length === 1 ? "0" + h : h;
  }).join("");
}

// ====== 主題控制 UI 綁定 ======
function initThemeControls() {
  if (themeColorInput) {
    themeColorInput.addEventListener("input", (e) => {
      const hex = e.target.value;
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      const theme = {
        primary: `rgb(${r},${g},${b})`,
        r,
        g,
        b,
        hex,
        bg: "#f5f5f7"
      };
      applyTheme(theme);
      saveTheme(theme);
    });
  }

  [rRange, gRange, bRange].forEach((range) => {
    if (range) {
      range.addEventListener("input", () => {
        const r = parseInt(rRange.value || "17", 10);
        const g = parseInt(gRange.value || "24", 10);
        const b = parseInt(bRange.value || "39", 10);
        const hex = rgbToHex(r, g, b);
        const theme = {
          primary: `rgb(${r},${g},${b})`,
          r,
          g,
          b,
          hex,
          bg: "#f5f5f7"
        };
        applyTheme(theme);
        saveTheme(theme);
      });
    }
  });

  if (resetThemeBtn) {
    resetThemeBtn.addEventListener("click", () => {
      const t = defaultTheme();
      applyTheme(t);
      saveTheme(t);
    });
  }
}

// ====== 旅程列表 ======
function initTrips() {
  tripListEl.innerHTML = "";
  stateTrips.forEach((trip, index) => {
    const li = document.createElement("li");
    li.className = "trip-item";
    li.textContent = `${trip.name}｜${trip.dateRange}`;
    li.dataset.tripIndex = index;
    li.addEventListener("click", () => selectTrip(index));
    tripListEl.appendChild(li);
  });

  if (stateTrips.length > 0) {
    selectTrip(0);
  }
}

function selectTrip(index) {
  currentTripIndex = index;
  const trip = stateTrips[index];

  document.querySelectorAll(".trip-item").forEach((item) => {
    item.classList.toggle("active", Number(item.dataset.tripIndex) === index);
  });

  if (trip.days && trip.days.length > 0) {
    selectDay(0);
  } else {
    dayTabsEl.innerHTML = "";
    renderDay(null);
  }
}

// ====== Day 切換 ======
function renderDayTabs(trip, activeIndex) {
  dayTabsEl.innerHTML = "";
  if (!trip || !trip.days) return;

  trip.days.forEach((day, index) => {
    const btn = document.createElement("button");
    btn.className = "day-tab" + (index === activeIndex ? " active" : "");
    let labelPrefix;
    if (index === 0) {
      labelPrefix = "出發日";
    } else if (index === trip.days.length - 1) {
      labelPrefix = "回家日";
    } else {
      labelPrefix = `D${index}`;
    }
    btn.textContent = `${labelPrefix}｜${day.date}`;
    btn.addEventListener("click", () => {
      selectDay(index);
    });
    dayTabsEl.appendChild(btn);
  });
}

function selectDay(dayIndex) {
  currentDayIndex = dayIndex;
  const trip = stateTrips[currentTripIndex];
  const day = trip.days[dayIndex];
  renderDayTabs(trip, dayIndex);
  renderDay(day);
}

// ====== 編輯模式控制 ======
function setEditMode(on) {
  isEditMode = on;
  const trip = stateTrips[currentTripIndex];
  const day = trip.days[currentDayIndex];
  renderDay(day);
}

function saveCurrentDayFromDOM() {
  const trip = stateTrips[currentTripIndex];
  const day = trip.days[currentDayIndex];
  const editableEls = document.querySelectorAll("[data-path]");
  editableEls.forEach((el) => {
    const path = el.getAttribute("data-path");
    const text = el.innerText.trim();
    setDeepValue(day, path, text);
  });
  saveTrips();
}

function resetCurrentDay() {
  const baseTrip = baseTrips[currentTripIndex];
  if (!baseTrip) return;
  const baseDay = baseTrip.days[currentDayIndex];
  if (!baseDay) return;

  stateTrips[currentTripIndex].days[currentDayIndex] = deepClone(baseDay);
  saveTrips();
  const trip = stateTrips[currentTripIndex];
  renderDay(trip.days[currentDayIndex]);
}

// 新增一個空白行程區塊
function addScheduleBlock() {
  const trip = stateTrips[currentTripIndex];
  const day = trip.days[currentDayIndex];
  if (!day.schedule) day.schedule = [];
  day.schedule.push({
    time: "HH:MM",
    endTime: "",
    title: "新行程",
    detail: "在這裡輸入行程內容。",
    transport: "",
    photoSpot: false,
    mapUrl: ""
  });
  saveTrips();
  renderDay(day);
}

// 刪除指定行程區塊
function deleteScheduleBlock(index) {
  const trip = stateTrips[currentTripIndex];
  const day = trip.days[currentDayIndex];
  if (!day.schedule || index < 0 || index >= day.schedule.length) return;
  day.schedule.splice(index, 1);
  saveTrips();
  renderDay(day);
}

// ====== 渲染單日 ======
function renderDay(day) {
  if (!day) {
    dayHeaderEl.innerHTML = "<p>尚未有行程</p>";
    dayScheduleEl.innerHTML = "";
    dayMealsEl.innerHTML = "";
    return;
  }

  const badges = [];
  if (day.health?.highCalorie) {
    badges.push('<span class="badge badge-danger">🍰 高熱量日</span>');
  }
  if (day.health?.walkingTarget) {
    badges.push(
      `<span class="badge">🚶 目標 ${day.health.walkingTarget.toLocaleString()} 步</span>`
    );
  }
  if (day.health?.balanced) {
    badges.push('<span class="badge badge-ok">✅ 飲食較平衡</span>');
  }

  let bannerHtml = "";
  if (day.stay || day.weather) {
    bannerHtml += `<div class="day-banner">`;

    bannerHtml += `<div>`;
    if (day.stay) {
      bannerHtml += `<span class="banner-label">🏨 今晚住宿</span>`;
      if (day.stay.mapUrl) {
        bannerHtml += `<a href="${day.stay.mapUrl}" target="_blank" rel="noopener noreferrer" data-path="stay.name">${day.stay.name}</a>`;
      } else {
        bannerHtml += `<span data-path="stay.name">${day.stay.name}</span>`;
      }
    }
    bannerHtml += `</div>`;

    if (day.weather) {
      const url = day.weather.linkUrl || "#";
      const icon = day.weather.icon || "⛅";
      const label = day.weather.label || "查看今日天氣";
      bannerHtml += `<div class="banner-weather">`;
      bannerHtml += `<span class="weather-icon" data-path="weather.icon">${icon}</span>`;
      bannerHtml += `<a href="${url}" target="_blank" rel="noopener noreferrer">`;
      bannerHtml += `<span class="weather-text" data-path="weather.label">${label}</span>`;
      bannerHtml += `</a></div>`;
    }

    bannerHtml += `</div>`;
  }

  const subtitleText = `${day.date}｜${day.subtitle || ""}`;

  dayHeaderEl.innerHTML = `
    <div>
      ${bannerHtml}
      <div class="day-title editable" data-path="title">${day.title}</div>
      <div class="day-subtitle editable" data-path="subtitle">${subtitleText}</div>
      <div class="badge-row">
        ${badges.join("")}
      </div>
      <div class="edit-controls">
        <button id="edit-day-btn" class="edit-button">${isEditMode ? "🔒 關閉編輯模式" : "✏️ 開啟編輯模式"}</button>
        <button id="save-day-btn" class="edit-button primary">💾 儲存本日行程</button>
        <button id="reset-day-btn" class="edit-button">↩️ 還原本日預設</button>
      </div>
    </div>
  `;

  // 行程時間軸
  dayScheduleEl.innerHTML = `<div class="section-title">📋 行程時間軸</div>`;
  if (!day.schedule || day.schedule.length === 0) {
    dayScheduleEl.innerHTML += `<p style="font-size:13px;color:#6b7280;">這一天還沒有填寫行程。</p>`;
  } else {
    day.schedule.forEach((b, index) => {
      const row = document.createElement("div");
      row.className = "schedule-row";

      const mapHtml = b.mapUrl
        ? ` <a href="${b.mapUrl}" target="_blank" rel="noopener noreferrer">📍 地圖</a>`
        : "";

      const editingClass = isEditMode ? "editing-active" : "";
      const editableAttr = isEditMode ? 'contenteditable="true"' : "";

      row.innerHTML = `
        <div class="time-cell">${b.time}${b.endTime ? "–" + b.endTime : ""}</div>
        <div>
          <div class="block-title editable ${editingClass}" data-path="schedule.${index}.title" ${editableAttr}>${b.title}</div>
          <div class="block-detail editable ${editingClass}" data-path="schedule.${index}.detail" ${editableAttr}>${b.detail || ""}</div>
          <div class="block-meta">
            <span class="editable ${editingClass}" data-path="schedule.${index}.transport" ${editableAttr}>${b.transport || ""}</span>
            ${b.photoSpot ? "　📸 適合拍照" : ""}
            ${mapHtml}
          </div>
          ${
            isEditMode
              ? `<div class="schedule-actions">
                    <button class="schedule-delete-btn" data-index="${index}">刪除此行程</button>
                 </div>`
              : ""
          }
        </div>
      `;
      dayScheduleEl.appendChild(row);
    });
  }

  if (isEditMode) {
    const addBtnRow = document.createElement("div");
    addBtnRow.className = "schedule-actions";
    addBtnRow.style.marginTop = "8px";
    addBtnRow.innerHTML = `<button id="add-schedule-btn">＋ 新增行程區塊</button>`;
    dayScheduleEl.appendChild(addBtnRow);
  }

  // 今日三餐
  dayMealsEl.innerHTML = `<div class="section-title">🍽️ 今日三餐</div>`;
  const mealsWrap = document.createElement("div");
  mealsWrap.className = "meals-grid";

  const mealOrder = [
    ["breakfast", "早餐"],
    ["lunch", "午餐"],
    ["dinner", "晚餐"]
  ];

  mealOrder.forEach(([key, label]) => {
    const meal = day.meals?.[key];
    const card = document.createElement("div");
    card.className = "meal-card";
    if (meal) {
      const basePath = `meals.${key}`;
      const editingClass = isEditMode ? "editing-active" : "";
      const editableAttr = isEditMode ? 'contenteditable="true"' : "";
      card.innerHTML = `
        <div class="meal-title">${label}</div>
        <div class="meal-restaurant editable ${editingClass}" data-path="${basePath}.name" ${editableAttr}>${meal.name}</div>
        <div class="meal-note">
          類型：<span class="editable ${editingClass}" data-path="${basePath}.type" ${editableAttr}>${meal.type || "—"}</span><br/>
          <span class="editable ${editingClass}" data-path="${basePath}.note" ${editableAttr}>${meal.note || ""}</span>
        </div>
        <div class="meal-tag">
          ${meal.needReservation ? "📅 建議預約" : "🙂 不需預約"}
        </div>
      `;
    } else {
      card.innerHTML = `
        <div class="meal-title">${label}</div>
        <div class="meal-note" style="font-size:12px;color:#9ca3af;">
          尚未安排，可之後再補。
        </div>
      `;
    }
    mealsWrap.appendChild(card);
  });

  dayMealsEl.appendChild(mealsWrap);

  // 編輯樣式控制
  if (isEditMode) {
    document.querySelectorAll(".editable").forEach((el) => {
      el.classList.add("editing-active");
      el.setAttribute("contenteditable", "true");
    });
  } else {
    document.querySelectorAll(".editable").forEach((el) => {
      el.classList.remove("editing-active");
      el.setAttribute("contenteditable", "false");
    });
  }

  // 按鈕綁定
  const editBtn = document.getElementById("edit-day-btn");
  const saveBtn = document.getElementById("save-day-btn");
  const resetBtn = document.getElementById("reset-day-btn");

  if (editBtn) {
    editBtn.addEventListener("click", () => {
      setEditMode(!isEditMode);
    });
  }

  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      saveCurrentDayFromDOM();
      setEditMode(false);
      alert("已儲存本日行程（保存在此裝置的瀏覽器中）。");
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (confirm("確定要還原本日預設行程嗎？（會覆蓋目前的編輯內容）")) {
        resetCurrentDay();
        alert("已還原本日預設行程。");
      }
    });
  }

  // 行程刪除與新增按鈕
  if (isEditMode) {
    const addBtn = document.getElementById("add-schedule-btn");
    if (addBtn) {
      addBtn.addEventListener("click", () => {
        addScheduleBlock();
      });
    }

    document.querySelectorAll(".schedule-delete-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const idx = Number(e.target.getAttribute("data-index"));
        if (confirm("確定要刪除此行程區塊嗎？")) {
          deleteScheduleBlock(idx);
        }
      });
    });
  }
}

// ====== 初始化 ======
window.addEventListener("DOMContentLoaded", () => {
  loadTheme();
  initThemeControls();
  loadTrips();
  initTrips();
});
