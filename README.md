# 🚬🍺 Consumption Tracker

## 📌 Overview
A simple web-based application to track cigarette and alcohol consumption. The app helps users set daily limits, log their consumption, view spending statistics, and get motivated with an auto-updating no-smoking & no-drinking quote every 3 seconds.

## 🛠️ Features
- **Consumption Logging:** Track cigarettes smoked and alcohol consumed daily.
- **Spending Calculation:** Calculates and displays total spending.
- **Goal Setting:** Set daily consumption limits for cigarettes and alcohol.
- **Progress Bar:** Visual representation of goal adherence.
- **Calendar View:** Color-coded monthly consumption tracking.
- **Motivational Quotes:** Fetches and updates a no-smoking & no-drinking quote every 3 seconds.
- **Data Persistence:** Saves consumption history and goals using local storage.

## 🏗️ Tech Stack
- **HTML, CSS, JavaScript**: Frontend structure and logic
- **LocalStorage API**: Persistent data storage
- **Quotes API (JSON file-based)**: Provides motivational quotes

## API for Motivational Quotes

- The `quotes.json` file contains a list of anti-smoking and anti-drinking quotes.
- The `fetchQuote()` function selects a random quote every 2.5 seconds and updates the UI.

## Local Storage Usage

- **Consumption Data** is stored in `dailyConsumption`.
- **Goals** are stored in `goal`.
- Data persists even after refreshing the page.

## 🚀 Installation & Setup
1. **Clone the Repository**
   ```sh
   git clone https://github.com/samyak2005/Consumption_Tracker.git
   ```
2. **Navigate to the Project Folder**
   ```sh
   cd consumption-tracker
   ```
3. **Run the App**
   - Open `index.html` in a browser.

## 📜 File Structure
```
📂 consumption-tracker
├── 📄 index.html        # Main HTML structure
├── 📄 styles.css        # Stylesheet
├── 📄 script.js         # JavaScript logic
├── 📄 quotes.json       # JSON file with motivational quotes
├── 📄 README.md         # Project documentation
```

## 🔥 Usage Guide
1. Enter the number of cigarettes and drinks consumed along with their prices.
2. Click `Log Consumption` to save data.
3. Set daily goals by clicking `Set Limit`.
4. Check statistics and progress bar updates.
5. Switch between `Tracker` and `Calendar` views.
6. Get new motivational quotes automatically every 3 seconds.

## 💡 Future Enhancements
- API integration for real-time cigarette and alcohol pricing.
- User authentication and cloud-based data storage.
- Graphs and analytics for long-term tracking.
- Mobile app version.

---
💡 **Stay motivated and reduce smoking & drinking for a healthier life!** 🚭🍻
