# Mood Tracker

A simple mood tracking web app built with **Next.js 15**, **TypeScript**, **Zustand**, and **Chart.js**.  
Users can add, edit, and delete daily mood entries, which are saved in **localStorage**.  
The app also visualizes mood trends over time with a chart and supports a fully responsive, mobile-first design.

---

## ✨ Features
- ➕ Add / Edit / Delete mood entries  
- 💾 Data persistence with localStorage  
- 📊 Mood Trends chart (Chart.js + react-chartjs-2)  
- 📱 Responsive, mobile-first layout (TailwindCSS)  
- 🔔 Modal dialogs & confirmation popup before delete  

---

## 🛠 Tech Stack
- [Next.js 15 (App Router)](https://nextjs.org/)  
- [TypeScript](https://www.typescriptlang.org/)  
- [Zustand](https://github.com/pmndrs/zustand) (state management)  
- [TailwindCSS](https://tailwindcss.com/) (styling)  
- [Chart.js](https://www.chartjs.org/) + [react-chartjs-2](https://react-chartjs-2.js.org/) (visualization)  

---

## 📂 Project Structure
```src/
├─ app/ # Next.js pages (/ , /add , /edit/[id])
├─ components/ # Reusable components (Modal, MoodForm, MoodCard, etc.)
├─ store/ # Zustand store
├─ types/ # Type definitions
└─ utils/ # Helper utilities (uuid generator)
```

## 🚀 Getting Started
1. **Clone repo**
   ```bash
   git clone https://github.com/yourusername/mood-tracker.git
   cd mood-tracker
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Run development server**
   ```bash
   npm run dev
   ```
