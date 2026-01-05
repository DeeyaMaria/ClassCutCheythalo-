# 🎓 ClassCut – Smart Attendance & Timetable Dashboard

ClassCut is a modern, interactive student dashboard that helps track attendance, visualize eligibility to skip classes, and manage daily & weekly timetables using a clean UI and real-time backend APIs.

---

## ✨ Features

### 📊 Attendance Overview
- Donut charts for each subject
- Displays attendance percentage
- Hover tooltip shows:
  - Present classes
  - Absent classes
  - **Can Skip / Risky / No** status

### 🗓️ Timetable Management
- Auto-loads timetable based on selected date
- Dynamic day detection
- Full weekly timetable view

### 🎨 Attendance Marking
- Mark classes as:
  - ✅ Attended
  - ❌ Skipped
  - ⚠️ Cancelled
- Color-coded interactions
- “Attended All Classes Today” bulk option

### 🔄 Backend Integration
- Saves and loads attendance per date
- Real-time API sync
- Dynamic graph updates

---

## 🧠 Attendance Rule

| Percentage | Status |
|-----------|--------|
| > 75% | YES (Can Skip) |
| = 75% | RISKY |
| < 75% | NO |

---

## 🛠️ Tech Stack

- **Frontend**
  - HTML5
  - CSS3 (Animations, gradients, tooltips)
  - Vanilla JavaScript

- **Backend**
  - REST API (Ngrok exposed)

---

## 📂 Project Structure

