const localStorageAPI = {
    getData: (key) => JSON.parse(localStorage.getItem(key)) || {},
    setData: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
    clearAll: () => localStorage.clear()
};
let goal = localStorageAPI.getData("goal") || { cigarettes: -1, alcohol: -1 };
let dailyData = localStorageAPI.getData("dailyConsumption") || {};

function logConsumption() {
    let cigCount = parseInt(document.getElementById("cigarettes").value) || 0;
    let cigPrice = parseFloat(document.getElementById("cigarettePrice").value) || 0;
    let alcCount = parseInt(document.getElementById("alcohol").value) || 0;
    let alcPrice = parseFloat(document.getElementById("alcoholPrice").value) || 0;
    let today = new Date().toISOString().split("T")[0]; 

    if (!dailyData[today]) {
        dailyData[today] = { cigarettes: 0, alcohol: 0, spent: 0 };
    }

    dailyData[today].cigarettes += cigCount;
    dailyData[today].alcohol += alcCount;
    dailyData[today].spent += (cigCount * cigPrice) + (alcCount * alcPrice);

    localStorageAPI.setData("dailyConsumption", dailyData);
    updateStats();
}
function updateStats() {
    let totalCigs = 0, totalAlcohol = 0, totalSpent = 0;

    Object.values(dailyData).forEach(entry => {
        totalCigs += entry.cigarettes;
        totalAlcohol += entry.alcohol;
        totalSpent += entry.spent;
    });

    document.getElementById("totalCigarettes").textContent = totalCigs;
    document.getElementById("totalAlcohol").textContent = totalAlcohol;
    document.getElementById("totalSpent").textContent = totalSpent.toFixed(2);

    updateProgressBar();
}
function updateProgressBar() {
    let today = new Date().toISOString().split("T")[0];
    let todayCigs = dailyData[today]?.cigarettes || 0;
    let todayAlcohol = dailyData[today]?.alcohol || 0;
    let totalToday = todayCigs + todayAlcohol;
    let totalGoal = goal.cigarettes + goal.alcohol;
    let Ppercent = totalGoal ? Math.min((totalToday / totalGoal) * 100, 100) : 0;

    let pBar = document.getElementById("progressFill");
    pBar.style.width = `${Ppercent}%`;
    let progressText = document.getElementById("progressText");
    if (totalToday === 0 || totalToday < totalGoal) {
        progressText.textContent = "✅ Good Job! You're within your goal.";
        pBar.style.backgroundColor = "green";
    } else if (totalToday === totalGoal) {
        progressText.textContent = "⚠️ Warning: You've reached your goal limit!";
        pBar.style.backgroundColor = "orange";
    } else if(totalToday > totalGoal) {
        progressText.textContent = "🚨 Over Limit! Consider reducing.";
        pBar.style.backgroundColor = "red";
    }
    generateCalendar(); 
}
function resetData() {
    localStorageAPI.clearAll();
    dailyData = {};
    goal = { cigarettes: -1, alcohol: -1 };
    document.getElementById("progressFill").style.width = "0%";
    updateStats();
}
function setGoal() {
    let cigGoal = parseInt(document.getElementById("goalCigarettes").value) || -1;
    let alcGoal = parseInt(document.getElementById("goalAlcohol").value) || -1;

    goal = { cigarettes: cigGoal, alcohol: alcGoal };
    localStorageAPI.setData("goal", goal);
    closeGoalPopup();
    updateStats();
}
function showTracker() {
    document.getElementById("trackerSection").style.display = "block";
    document.getElementById("calendarSection").style.display = "none";
}

function showCalendar() {
    document.getElementById("trackerSection").style.display = "none";
    document.getElementById("calendarSection").style.display = "block";
    generateCalendar();
}
function openGoalPopup() {
    document.getElementById("goalPopup").style.display = "flex";
}

function closeGoalPopup() {
    document.getElementById("goalPopup").style.display = "none";
}

function generateCalendar() {
    let calendar = document.getElementById("calendar");
    calendar.innerHTML = "";
    let today = new Date();
    let monthDays = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();

    for (let day = 1; day <= monthDays; day++) {
        let date = new Date(today.getFullYear(), today.getMonth(), day).toISOString().split("T")[0];
        let consumption = dailyData[date] ? dailyData[date].cigarettes + dailyData[date].alcohol : 0;
        let color = "green"; 

        if (consumption > goal.cigarettes + goal.alcohol) {
            color = "red";
        } else if (consumption === goal.cigarettes + goal.alcohol) {
            color = "orange";
        } else if (consumption > 0) {
            color = "yellow";
        }
        let dayElement = document.createElement("div");
        dayElement.classList.add("calendar-day", color);
        dayElement.textContent = day;
        calendar.appendChild(dayElement);
    }
}
async function fetchQuote() {
    try {
        let response = await fetch("quotes.json"); 
        let quotes = await response.json();
        let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

        document.getElementById("quoteDisplay").innerText = randomQuote;
    } catch (error) {
        console.error("Error fetching quote:", error);
    }
}
fetchQuote();
setInterval(fetchQuote, 2500);

updateStats();
