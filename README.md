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



| Page | Light mode | Dark mode | Mobile |
| ---- | ---------- | --------- | ------ |
| **Landing page** | ![Landing Light](<img width="947" height="425" alt="Image" src="https://github.com/user-attachments/assets/2f845cf0-01f6-462d-975a-29fd08eb8e0b" />) | ![Landing Dark](<img width="944" height="434" alt="Image" src="https://github.com/user-attachments/assets/abf4e03a-90c6-49ab-93ba-37e828fe0174" />) | ![Landing Mobile](<img width="158" height="353" alt="Image" src="https://github.com/user-attachments/assets/3cd36492-332c-4033-a0dc-6289733c6e1a" />) |
| **Dashboard** | ![Dashboard Light](<img width="944" height="435" alt="Image" src="https://github.com/user-attachments/assets/29e8073d-c779-4174-aaab-178245454776" />) | ![Dashboard Dark](<img width="945" height="437" alt="Image" src="https://github.com/user-attachments/assets/a1364d11-2450-445a-b05c-279db15de969" />) | ![Dashboard Mobile](<img width="157" height="353" alt="Image" src="https://github.com/user-attachments/assets/852666b4-ca27-4b49-83a6-03c90154786d" />) |
| **Applied IPOs** | ![Applied Light](<img width="946" height="438" alt="Image" src="https://github.com/user-attachments/assets/5fa34fd8-7dfd-45ae-a2c5-53167cb39df6" />) | ![Applied Dark](<img width="947" height="434" alt="Image" src="https://github.com/user-attachments/assets/43989171-5dc8-49fa-818e-94f3c379926f" />) | ![Applied Mobile](<img width="159" height="357" alt="Image" src="https://github.com/user-attachments/assets/99642caa-c1f7-4b12-bdcb-8eee73c710c4" />) |
| **Allotted (Gain / Loss)** | ![Allotted Light](<img width="946" height="435" alt="Image" src="https://github.com/user-attachments/assets/6267ffd4-3842-4b06-bbd4-f1fd936563c5" />) | ![Allotted Dark](<img width="945" height="424" alt="Image" src="https://github.com/user-attachments/assets/de84ae17-2e02-4ed8-85a5-a7ca8e9ef10a" />) | ![Allotted Mobile](<img width="158" height="353" alt="Image" src="https://github.com/user-attachments/assets/a10f1661-15a9-4628-9181-e1614c1ff289" />) |
| **Not Allotted** | ![Not Allotted Light](<img width="946" height="431" alt="Image" src="https://github.com/user-attachments/assets/9d636e7d-949e-4569-8211-623f78cae48d" />) | ![Not Allotted Dark](<img width="945" height="430" alt="Image" src="https://github.com/user-attachments/assets/bb7a3bae-3544-4d46-b214-933ae3263146" />) | ![Not Allotted Mobile](<img width="158" height="353" alt="Image" src="https://github.com/user-attachments/assets/7a5f5abe-0aa0-4e2d-aa9d-5a5865214d47" />) |
| **Add IPO modal** | ![Add IPO Light](docs/screenshots/add-ipo-light.png) | ![Add IPO Dark](<img width="952" height="434" alt="Image" src="https://github.com/user-attachments/assets/0eebea48-8852-42bc-a7b8-d6b558dc41cf" />) | ![Add IPO Mobile](<img width="158" height="355" alt="Image" src="https://github.com/user-attachments/assets/de730d06-7402-4641-ace1-affa4b9708ce" />) |
| **Calculator** | ![Calculator Light](<img width="946" height="436" alt="Image" src="https://github.com/user-attachments/assets/c0f11c3e-91b7-4598-9ff5-753c44d0b256" />) | ![Calculator Dark](<img width="943" height="434" alt="Image" src="https://github.com/user-attachments/assets/bd737066-cbda-4ab8-b76e-064f1f1e2291" />) | ![Calculator Mobile](<img width="157" height="352" alt="Image" src="https://github.com/user-attachments/assets/94da058d-ba48-43fd-93d5-1c5be29c9395" />) |

| **Login / Sign up** | ![Auth Light](<img width="947" height="434" alt="Image" src="https://github.com/user-attachments/assets/1eff9af5-54ce-4548-baa3-636c9e47d8cc" />) | ![Auth Dark](<img width="941" height="431" alt="Image" src="https://github.com/user-attachments/assets/b2d1382a-d9e0-4440-8ade-ac2770548246" />) | ![Auth Mobile](<img width="157" height="353" alt="Image" src="https://github.com/user-attachments/assets/1359727b-a398-4e5b-b746-bae88de1e75d" />) |

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