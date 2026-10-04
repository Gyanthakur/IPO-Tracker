<div align="center">

# 📈 IPO Tracker

**Track every IPO you apply for: from application to allotment to listing gain or loss.**

[![Live Demo](https://img.shields.io/badge/Live-Demo-4f46e5?style=for-the-badge&logo=vercel&logoColor=white)](https://ipo-tracker-gps.vercel.app/)
[![Backend](https://img.shields.io/badge/API-Render-46e3b7?style=for-the-badge&logo=render&logoColor=black)](https://ipo-tracker-server.onrender.com)
[![GitHub](https://img.shields.io/badge/GitHub-Repo-181717?style=for-the-badge&logo=github)](https://github.com/Gyanthakur/IPO-Tracker)

![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Clerk](https://img.shields.io/badge/Clerk_Auth-6C47FF?style=flat&logo=clerk&logoColor=white)

[Live Demo](https://ipo-tracker-gps.vercel.app/) · [Backend API](https://ipo-tracker-server.onrender.com) · [Report Bug](https://github.com/Gyanthakur/IPO-Tracker/issues) · [Request Feature](https://github.com/Gyanthakur/IPO-Tracker/issues)

</div>

---

## 📑 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Screenshots](#-screenshots)
- [Tech Stack](#-tech-stack)
- [IPO Workflow](#-ipo-workflow)
- [Folder Structure](#-folder-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Endpoints](#-api-endpoints)
- [Deployment](#-deployment)
- [Known Limitations](#-known-limitations)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [Author](#-author)

---

## 📖 About

**IPO Tracker** is a full-stack MERN application for investors who apply to many IPOs, sometimes for several family members or accounts. It records each application, reminds you when the allotment result is due, and calculates your profit or loss after listing. The dashboard shows your overall gain or loss.

IPO details such as open date, close date, allotment date, listing date, GMP, lot size and issue price can be **auto-filled from [InvestorGain](https://www.investorgain.com/report/ipo-gmp-live/331/)** when you pick a Mainboard or SME IPO.

---

## ✨ Features

- 🔐 **Authentication with Clerk**: email and password signup and login, multiple users supported
- 🛡️ **Admin and user roles**: admins see every user's IPOs and totals; users see only their own data
- ➕ **Add IPO button**: available in the navbar and on every page, opens a modal (a bottom sheet on mobile)
- 🔄 **Status flow**: new IPOs start as **Applied**; on the allotment date you mark them **Allotted** or **Not Allotted**
- 🗂️ **Separate sections**: Applied, Allotted and Not Allotted pages
- 💰 **Gain and Loss sections**: after listing, enter the listing price and the IPO moves into the Gain or Loss section
- 🧮 **Calculator**: calculate the gain or loss for any IPO (issue price, sell price, lot size, lots)
- 📊 **Dashboard**: total gain, total loss, overall gain or loss, and net P/L per applicant
- 🏷️ **Tags**: Mainboard / SME and NSE / BSE, plus the **applicant name**
- 🌐 **InvestorGain auto-fill**: dates, GMP, lot size and price fetched into the form
- ✏️ **Edit and delete** any IPO, and move a result back to Applied if you made a mistake
- 🌗 **Dark / light theme toggle**, saved across visits
- 📱 **Fully responsive**: hamburger menu on mobile, built with Tailwind CSS

---

## 📸 Screenshots

> Replace each `docs/screenshots/*.png` path with your own image. Create a `docs/screenshots` folder in the repo and upload your screenshots there.

| Page | Light mode | Dark mode | Mobile |
| ---- | ---------- | --------- | ------ |
| **Landing page** | ![Landing Light](docs/screenshots/landing-light.png) | ![Landing Dark](docs/screenshots/landing-dark.png) | ![Landing Mobile](docs/screenshots/landing-mobile.png) |
| **Dashboard** | ![Dashboard Light](docs/screenshots/dashboard-light.png) | ![Dashboard Dark](docs/screenshots/dashboard-dark.png) | ![Dashboard Mobile](docs/screenshots/dashboard-mobile.png) |
| **Applied IPOs** | ![Applied Light](docs/screenshots/applied-light.png) | ![Applied Dark](docs/screenshots/applied-dark.png) | ![Applied Mobile](docs/screenshots/applied-mobile.png) |
| **Allotted (Gain / Loss)** | ![Allotted Light](docs/screenshots/allotted-light.png) | ![Allotted Dark](docs/screenshots/allotted-dark.png) | ![Allotted Mobile](docs/screenshots/allotted-mobile.png) |
| **Not Allotted** | ![Not Allotted Light](docs/screenshots/not-allotted-light.png) | ![Not Allotted Dark](docs/screenshots/not-allotted-dark.png) | ![Not Allotted Mobile](docs/screenshots/not-allotted-mobile.png) |
| **Add IPO modal** | ![Add IPO Light](docs/screenshots/add-ipo-light.png) | ![Add IPO Dark](docs/screenshots/add-ipo-dark.png) | ![Add IPO Mobile](docs/screenshots/add-ipo-mobile.png) |
| **Calculator** | ![Calculator Light](docs/screenshots/calculator-light.png) | ![Calculator Dark](docs/screenshots/calculator-dark.png) | ![Calculator Mobile](docs/screenshots/calculator-mobile.png) |
| **Admin panel** | ![Admin Light](docs/screenshots/admin-light.png) | ![Admin Dark](docs/screenshots/admin-dark.png) | ![Admin Mobile](docs/screenshots/admin-mobile.png) |
| **Login / Sign up** | ![Auth Light](docs/screenshots/auth-light.png) | ![Auth Dark](docs/screenshots/auth-dark.png) | ![Auth Mobile](docs/screenshots/auth-mobile.png) |

---

## 🧰 Tech Stack

| Layer | Technology |
| ----- | ---------- |
| **Frontend** | React (Vite, JavaScript), React Router, Axios, Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB with Mongoose |
| **Authentication** | Clerk (`@clerk/clerk-react`, `@clerk/express`) |
| **Data source** | InvestorGain (scraped with Axios + Cheerio) |
| **Hosting** | Vercel (frontend), Render (backend) |

---

## 🔁 IPO Workflow

```
Add IPO ──► APPLIED ──(allotment date)──► ALLOTTED ──(enter listing price)──► GAIN or LOSS
                │                             │
                │                             └── ↩ move back to Applied
                └────────────────────────► NOT ALLOTTED
```

**Profit / loss formula**

```
P/L = (Listing price − Issue price) × Lot size × Lots
```

A positive result goes into the **Gain** section and a negative result into the **Loss** section. The dashboard adds both up to show total gain, total loss and the overall result.

---

## 📁 Folder Structure

```
IPO-Tracker/
│
├── client/                          # React + Vite frontend
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   └── useApi.js            # Axios instance with Clerk token
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Footer.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── IpoCard.jsx          # IPO card with status actions
│   │   │   ├── IpoForm.jsx
│   │   │   ├── IpoFormModal.jsx     # Add / Edit IPO modal
│   │   │   ├── Loading.jsx
│   │   │   ├── Navbar.jsx           # Menu, Add IPO, theme toggle, hamburger
│   │   │   └── SummaryCards.jsx     # Gain / Loss / Overall cards
│   │   ├── context/
│   │   │   ├── IpoModalContext.jsx  # Global Add / Edit modal
│   │   │   └── ThemeContext.jsx     # Dark / light theme
│   │   ├── hooks/
│   │   │   ├── useIpoData.js        # IPO list and summary hooks
│   │   │   └── useTheme.js
│   │   ├── pages/
│   │   │   ├── AdminPage.jsx
│   │   │   ├── CalculatorPage.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── IpoPage.jsx          # Applied / Allotted / Not Allotted
│   │   │   └── LandingPage.jsx
│   │   ├── utils/
│   │   │   └── pnl.js               # P/L, currency and date helpers
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── vercel.json
│   └── vite.config.js
│
├── server/                          # Express + MongoDB backend
│   ├── config/
│   │   └── db.js                    # MongoDB connection
│   ├── controllers/
│   │   ├── ipoController.js         # CRUD and summary
│   │   └── marketController.js      # InvestorGain data
│   ├── middleware/
│   │   └── auth.js                  # Clerk auth + admin check
│   ├── models/
│   │   └── Ipo.js                   # IPO schema
│   ├── routes/
│   │   ├── ipoRoutes.js
│   │   └── marketRoutes.js
│   ├── services/
│   │   └── investorGainScraper.js   # Scrapes InvestorGain
│   ├── .env
│   ├── index.js                     # Server entry point
│   ├── package.json
│   └── vercel.json
│
├── docs/
│   └── screenshots/                 # README screenshots
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- A [MongoDB](https://www.mongodb.com/) database (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- A free [Clerk](https://clerk.com/) account

### 1. Clone the repository

```bash
git clone https://github.com/Gyanthakur/IPO-Tracker.git
cd IPO-Tracker
```

### 2. Set up the backend

```bash
cd server
npm install
```

Create `server/.env` (see [Environment Variables](#-environment-variables)), then start the server:

```bash
npm run dev
```

The API runs on `http://localhost:5000`.

### 3. Set up the frontend

Open a second terminal:

```bash
cd client
npm install
```

Create `client/.env`, then start the app:

```bash
npm run dev
```

The app runs on `http://localhost:5173`.

### 4. Set up Clerk

1. Create an application in the [Clerk dashboard](https://dashboard.clerk.com/) and enable **Email + Password**.
2. Copy the **Publishable Key** and **Secret Key** into the `.env` files below.
3. To create an **admin**, open **Users → select a user → Public metadata** and add:

```json
{ "role": "admin" }
```

---

## 🔑 Environment Variables

### `server/.env`

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ipo-tracker
CLIENT_URL=http://localhost:5173
CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxx
```

### `client/.env`

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxx
VITE_API_URL=http://localhost:5000/api
```

> ⚠️ Never commit `.env` files. Both folders already ignore them through `.gitignore`.
> The Publishable Key on the client and the Publishable and Secret Keys on the server must come from the **same** Clerk application.

---

## 🔌 API Endpoints

All routes require a valid Clerk session token (`Authorization: Bearer <token>`).

| Method | Endpoint | Description | Access |
| ------ | -------- | ----------- | ------ |
| `GET` | `/api/ipos` | List IPOs (filter by `status`, `type`, `exchange`, `applicant`) | User / Admin |
| `POST` | `/api/ipos` | Add a new IPO (starts as `applied`) | User |
| `PUT` | `/api/ipos/:id` | Update an IPO (status, listing price, details) | Owner / Admin |
| `DELETE` | `/api/ipos/:id` | Delete an IPO | Owner / Admin |
| `GET` | `/api/ipos/summary` | Total gain, total loss, overall result, per-applicant P/L | User / Admin |
| `GET` | `/api/market/ipos?type=SME` | IPO list scraped from InvestorGain | User |

Add `?scope=all` to `GET /api/ipos` and `GET /api/ipos/summary` to get data for all users (**admin only**).

---

## ☁️ Deployment

| Part | Platform | URL |
| ---- | -------- | --- |
| Frontend | Vercel | https://ipo-tracker-gps.vercel.app/ |
| Backend | Render | https://ipo-tracker-server.onrender.com |

### Frontend (Vercel)

1. Import the repo on Vercel and set the **Root Directory** to `client`.
2. Add these environment variables:
   - `VITE_CLERK_PUBLISHABLE_KEY`
   - `VITE_API_URL` = `https://ipo-tracker-server.onrender.com/api`
3. Keep a `client/vercel.json` so page refreshes on React Router routes don't 404:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

### Backend (Render)

1. Create a **Web Service** from the repo with the **Root Directory** set to `server`.
2. Build command: `npm install`. Start command: `npm start`.
3. Add these environment variables:
   - `MONGO_URI` (use MongoDB Atlas and allow Render's IPs in Network Access)
   - `CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `CLIENT_URL` = `https://ipo-tracker-gps.vercel.app` (no trailing slash, required for CORS)

> 💤 On Render's free plan the server sleeps after inactivity, so the first request can take 30–60 seconds.

---

## ⚠️ Known Limitations

- **InvestorGain auto-fill relies on scraping.** If the site changes its layout or blocks requests, the dropdown may come back empty. You can always enter details manually.
- GMP values are unofficial grey-market estimates and may differ from the actual listing price. Do not use them as financial advice.
- This project is for personal tracking only. It is not connected to any broker.

---

## 🗺️ Roadmap

- [ ] Export IPO history to Excel / CSV
- [ ] Charts for yearly and monthly gain or loss
- [ ] Allotment-day email or push reminders
- [ ] Bulk actions on the Applied page
- [ ] PWA support for installing on a phone

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 👤 Author

**Gyan Thakur**

- GitHub: [@Gyanthakur](https://github.com/Gyanthakur)
- Project: [IPO-Tracker](https://github.com/Gyanthakur/IPO-Tracker)

---

<div align="center">

⭐ If you found this project useful, please give it a star on GitHub!

</div>