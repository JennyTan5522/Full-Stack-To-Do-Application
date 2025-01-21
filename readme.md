# Full Stack React-Django ToDo Application
1. cd vite-frontend
2. npm run dev
3. View the ToDo List by accessing the following URL in your browser: http://localhost:5173/

Project Root directory
--------------------------
react-django-todo/
├── backend/            # Django backend (REST API)
├── vite-frontend/      # React frontend
├── README.md           # Project overview and documentation    

Django Backend File Structure
--------------------------------
backend/
├── manage.py                    
├── db.sqlite3                    
├── requirements.txt               # Backend dependencies
├── backend/                      
│   ├── __init__.py
│   ├── asgi.py
│   ├── settings.py               
│   ├── urls.py                   
│   ├── wsgi.py
├── todos/                       
│   ├── __init__.py
│   ├── admin.py                   
│   ├── apps.py                    
│   ├── migrations/               
│   │   ├── __init__.py
│   │   └── ... (migration files)
│   ├── models.py                  
│   ├── serializers.py             
│   ├── tests.py                   
│   ├── urls.py                   
│   ├── views.py                 
└──

React Frontend File Structure
--------------------------------
vite-frontend/
├── public/                         
│   └── vite.svg
├── src/                            
│   ├── components/                
│   │   ├── TodoAdd.jsx            
│   │   ├── TodoFilter.jsx           
│   │   └── TodoHeader.jsx   
│   │   └── TodoList.jsx         
│   ├── App.css   
│   ├── App.jsx                      
│   ├── index.css                     
│   ├── main.jsx  
├── eslint.config.js             
├── package-lock.json                   
├── package.json  
├── index.html     
├── vite.config.js                              
└──

![To Do List](ToDoList.png)

