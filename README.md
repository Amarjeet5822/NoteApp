# 📝 Note-Taking Application

## 🌟 Overview
The Note-Taking Application is a full-stack web application designed to help users efficiently manage their notes. It allows users to perform CRUD (Create, Read, Update, Delete) operations, categorize notes, prioritize tasks, and search for specific notes. The app features a sleek and responsive user interface built with React and Tailwind CSS, while the backend is powered by Express.js.

## 🚀 Features
- **User Authentication:** Secure login and registration using JWT.
- **CRUD Operations:** Add, update, delete, and view notes.
- **Search and Filter:** Search notes by title or content and filter by category or priority.
- **Sorting:** Sort notes by title or creation date.
- **Responsive Design:** Fully responsive design for mobile, tablet, and desktop views.
- **Real-time Updates:** Instant updates to notes using Redux Toolkit.
- **Error Handling:** Robust error handling on both frontend and backend.

## 🛠️ Tech Stack
### Frontend
- **React**: Component-based UI development.
- **Redux Toolkit**: State management.
- **Axios**: Handling API requests.
- **Tailwind CSS**: Styling and responsiveness.
- **React Router**: Navigation and routing.

## 🔧 Installation and Setup
### Prerequisites
Ensure you have the following installed:
- Node.js

### 1. Clone the repository
```bash
git clone https://github.com/Amarjeet5822/NoteApp.git
cd NOTEAPP
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```
Create a `.env` file in the `frontend` directory:
```env
VITE_BACKEND_URL=http://localhost:5000
```
Start the frontend server:
```bash
npm run dev
```

## 🚀 Deployment
### Frontend Deployment
1. Build the React app:
```bash
npm run build
```
2. Deploy the `dist/` folder using platforms like Vercel, Netlify, or S3.


### Environment Configuration for Production
Ensure both the frontend and backend are correctly configured to use production URLs.

## ✅ Testing
- **Frontend**: Ensure all functionalities like CRUD operations, search, and filter work.

## 📚 Folder Structure
```
/NOTEAPP
│
├── /frontend
│   ├── /src
│   │   ├── /components
│   │   ├── /pages
│   │   ├── /store
│   │   └── App.jsx
│
└── README.md
```

## 🎯 Future Improvements
- Add dark mode.
- Implement collaborative note-taking with real-time updates.
- Add reminders and notification features.
- Get Profile details and allow users to edit them.
- Reset Password functionality.
- Enable login with phone number.
- Filter notes by category and priority.
- Add sorting options by title and created date.

## 🙌 Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

## 📧 Contact
For any queries, feel free to reach out:
- Email: amar.bst5822@gmail.com
- LinkedIn: [Your LinkedIn Profile](https://www.linkedin.com/in/amarjeet-gupta050/)

---

Let’s build something amazing together! 🚀

