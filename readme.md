# Full Stack React-Django ToDo Application
This project is a full-stack application built with Django (backend) and React (frontend). The backend provides a REST API, while the frontend offers an intuitive user interface for managing tasks.

### Backend Setup
1. Navigate to the `backend` directory:
   cd react-django-todo/backend
2. Create a virtual environment and actiate it:
   python -m venv venv
   source venv/bin/activate   # On Windows: venv\Scripts\activate
3. pip install -r requirements.txt
4. Apply migrations:
   python manage.py migrate
5. Run the server:
   python manage.py runserver

### Frontend Setup
1. Navigate to the `vite-frontend` directory:
   cd react-django-todo/vite-frontend
2. Install dependencies:
   npm install
3. Run the development server:
   npm run dev
4. Access frontend at: http://localhost:5173 

### How to Run
1. Start the Django backend server:
   python manage.py runserver
2. Start the React frontend development server:
   npm run dev
4. Open your browser and navigate to frontend url: http://localhost:5173

#### Preview
![To Do List](ToDoList.png)

