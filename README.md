# News Digest Composer

A full-stack web application that curates a **daily personalized news digest** based on user interests using **AI-powered summarization** and topic extraction.

---

## 🚀 Features
- User onboarding to capture interests and keywords
- Hourly news fetching using News API / RSS feeds
- AI-powered summarization tailored to user profiles
- MongoDB storage with article metadata
- In-app daily news digest view
- Optional daily email digest

---

## 🧰 Tech Stack
- **Frontend:** React.js, React Router, Axios
- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas
- **AI:** OpenAI / Claude API
- **Email:** Nodemailer or SendGrid

---

## 📁 Project Structure
```
personalized-news-digest/
│
├── backend/
│   ├── server.js
│   ├── db.js
│   ├── models/User.js
│   ├── routes/userRoutes.js
│   ├── routes/newsRoutes.js
│   ├── services/newsService.js
│   ├── services/aiService.js
│   └── .env
│
└── frontend/
    ├── src/
    │   ├── App.js
    │   ├── pages/Onboarding.js
    │   ├── pages/Digest.js
    │   └── api.js
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository
```bash
git clone https://github.com/Kaifee3/news-digest
cd news-digest
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
node server.js
```

Create a `.env` file inside `backend/`:
```
MONGO_URI=your_mongodb_uri
NEWS_API_KEY=your_newsapi_key
OPENAI_KEY=your_openai_key
```

### 3️⃣ Frontend Setup
```bash
cd frontend
npm install
npm start
```

---





## 📸 Demo
- UI Screenshots available in `/screenshots`
- [Demo video link](https://drive.google.com/file/d/1sBxLo08Q-WfpQmrIY9VWuw-DXlaurSr8/view?usp=sharing)

---

## 🔐 Security Note
- API keys are stored securely using environment variables
- `.env` file is excluded from version control

---


