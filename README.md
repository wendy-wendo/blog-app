# Blog Web App Setup
This helps you set up a web application using Django for the backend, React for the frontend, and Firebase for authentication.

## Requirements

- Python 3.x
- Node.js and npm
- Firebase account

## Setup Instructions

### Backend (Django)

1. Clone the repository: `git clone <repository_url>`
2. Navigate to the backend directory: `cd backend`
3. Create a virtual environment (optional but recommended): `python -m venv env`
4. Activate the virtual environment:
    - On Windows: `env\Scripts\activate`
    - On macOS/Linux: `source env/bin/activate`
5. Install Python dependencies: `pip install -r requirements.txt`
6. Run Django migrations: `python manage.py migrate`
7. Start the Django server: `python manage.py runserver`

### Frontend (React)

1. Navigate to the frontend directory: `cd frontend`
2. Install npm dependencies: `npm install`
3. Start the React development server: `npm start`
4. Build the React application for production: `npm run build`

### Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Set up Firebase Authentication and choose the authentication methods you want to enable (e.g., email/password, Google, etc.).
3. Set up Firebase Realtime Database or Firestore for your database needs.
4. Obtain Firebase configuration details (API keys, project IDs, etc.) from Firebase Console.
5. Configure Firebase in your frontend React application using Firebase SDK.

## Configuration

### Backend (Django)

- Django settings can be configured in `backend/settings.py`.

### Frontend (React)

- Firebase configuration should be added to your React application. You can create a Firebase configuration file (e.g., `firebase.js`) in your React project's source directory.

## Additional Resources

- [Django Documentation](https://docs.djangoproject.com/en/stable/)
- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [Firebase Documentation](https://firebase.google.com/docs)

