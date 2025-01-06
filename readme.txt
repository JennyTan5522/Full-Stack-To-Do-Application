References: https://dev.to/thekalderon/full-stack-todo-webapp-with-react-and-python-django-4472

Setting Django
===============
1. mkdir react-django-todo

2. cd react-django-todo

3. Create virtual env
   python3 -m venv env // python -m venv env 
   Note: Depending on your installation or OS, you may need to use python3 or python.

4. Activate virtual env in current dir
   .\env\Scripts\activate

5. Install django
   pip install django
   pip3 install django

6. Set up project
   django-admin startproject backend (name of proj) - generate a new direc called backend with a bunch of files by django
   django-admin startproject backend // python3 manage.py startproject backend
   Note: Depending on your installation or OS, you may need to use python3 or python.

7. Navigate to the backend
   cd backend

8. Create and start a new application in the same directory
   python manage.py startapp todos

9. Perform migrations
   python manage.py migrate

10. Start up server
    python manage.py runserver
    Press and hold the Ctrl Key and click on the link http://localhost:8000 to open it in your browser.

Django files
    • __init__.py: Tells python treat this dir like python package
    • asgi.py and wsgi.py: allows django communicate with web server
    • settings.py: Install apps, middleware, modifying dbs, ..
    • urls.py: Allows to configure different URL routes to different Django applications (direct applications)
    • manage.py: do things like make db migrations, run python server

REGISTERING THE todo APPLICATION IN DJANGO. Create Django app (standalone application , which also can be used in another application)
Django applications are modular as pieces of functionality are built into them. The setup for the backend is now complete and all applications in Django are registered as installed apps so Django can recognize them.
1. Download rest Framework and cors framework
   pip install djangorestframework django-cors-headers//
   pipenv install djangorestframework django-cors-headers
   
   - Django REST Framework is a powerful tool for creating RESTful APIs. It simplifies complex tasks like serialization, authentication, and request handling, making it a popular choice for backend development in Django. 
   - What is a RESTful API?
      A RESTful API (Representational State Transfer API) is a way to communicate between the backend (server) and frontend (client) or between different systems. It uses HTTP methods like:

      GET: To retrieve data.
      POST: To create new data.
      PUT/PATCH: To update existing data.
      DELETE: To delete data.
      REST APIs provide data in a standard format (usually JSON) that clients (e.g., web apps, mobile apps, or other servers) can consume.

   - Without CORS framework, react cant consume your API, with CORS enable the Django communicate with React.
   - Django CORS allows clients to consume APIs that are hosted on different domain.
      Why is CORS needed?
      Imagine this scenario:

      Your React frontend runs on http://localhost:3000.
      Your Django backend runs on http://127.0.0.1:8000.
      When your React app tries to make an API call to the Django server, the browser blocks the request because the two domains (localhost:3000 and 127.0.0.1:8000) are different origins.
      This happens because browsers enforce a same-origin policy, meaning:

      A frontend app can only make requests to the same domain (same host, port, and protocol) unless explicitly allowed.
      CORS solves this problem by allowing the backend (Django) to tell the browser:

      >> "Hey! It's okay for the frontend at http://localhost:3000 to access my resources."

2. After created django application, then need to link to Django project. In settings.py, place the name of our django app into the INSTALLED_APPS.
   -INSTALLED_APPS can be found in the directory 'backend/setting.py'.

   - This allows install our django projects. Install the application, and allow the our Django projects to view the code inside the "todo" project.
      INSTALLED_APPS = [
         'django.contrib.admin',
         'django.contrib.auth',
         'django.contrib.contenttypes',
         'django.contrib.sessions',
         'django.contrib.messages',
         'django.contrib.staticfiles',
         'todos',
         'rest_framework',
         'corsheaders'
         ]

      Add the code inside:
      CORS_ORIGIN_WHITELIST = [
     'http://localhost:3000'
      ]

      Add corsheaders.middleware.CorsMiddleware to middleware section :
      MIDDLEWARE = [
         'django.middleware.security.SecurityMiddleware',
         'django.contrib.sessions.middleware.SessionMiddleware',
         'django.middleware.common.CommonMiddleware',
         'django.middleware.csrf.CsrfViewMiddleware',
         'django.contrib.auth.middleware.AuthenticationMiddleware',
         'django.contrib.messages.middleware.MessageMiddleware',
         'django.middleware.clickjacking.XFrameOptionsMiddleware',
         'corsheaders.middleware.CorsMiddleware',
         'django.middleware.common.CommonMiddleware'
      ]

3. Create models, which used to store the data in the DB.
   - Inside backend/todos/models.py, add the code:

     class Todo(models.Model):
      title = models.CharField(max_length = 200)
      description = models.TextField(blank = True)
      completed = models.BooleanField(default=False)
      created = models.DateField(auto_now_add=True)
      updated = models.DateField(auto_now=True)

      def __str__(self):
         return self.title

4. Add serializers.py inside backend/todos directory
   - Convert Django model instances into JSON format which can be easily rendered and sent over the web.
   - This enables the frontend to work with the received data from the backend
   - Part of the Django REST Framework

   - Add the code:
     from rest_framework import serializers
     from .models import Todo

     class TodoSerializer(serializers.ModelSerializer):
       class Meta:
            model = Todo
            fields = ["id", "title", "description", "completed", "created", "updated"]

5. Open views.py in backend/todos. In views.py, will perform the CRUD operations.
   Add the code:
   from django.shortcuts import render, get_object_or_404
   from rest_framework.response import Response
   from rest_framework.decorators import api_view
   from rest_framework import status
   from .models import Todo
   from .serializers import TodoSerializer

   # HomePage
   def home(request):
      #return HttpResponse('Hello World') # After create view need to connect with root or URL
      return render(request, "home.html") # Render html template

   # Create your views here.
   @api_view(["GET", "POST"])
   def todo_list(request):
      if request.method == "GET":
         todos = Todo.objects.all()
         serializer = TodoSerializer(todos, many=True)
         return Response(serializer.data)
      
      elif request.method == "POST":
         serializer = TodoSerializer(data=request.data)
         if serializer.is_valid():
               serializer.save()
               return Response(serializer.data, status=status.HTTP_201_CREATED)
         return Response(serializer.error, status = status.HTTP_400_BAD_REQUEST)

   # GET: Fetch all todos; POST: Create a new todo; PUT: Replace an entire Todo object; PATCH: Update specific field in todo item; DELETE: Delete a todo
   @api_view(["GET", "PATCH", "PUT", "DELETE"])
   def todo_detail(request, id):
      todo = get_object_or_404(Todo, id=id)

      if request.method == "GET":
         serializer = TodoSerializer(todo)
         return Response(serializer.data)

      elif request.method == "PUT":
         serializer = TodoSerializer(todo, data = request.data)
         if serializer.is_valid():
               serializer.save()
               return Response(serializer.data)
         return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
      
      elif request.method == "DELETE":
         todo.delete()
         return Response(status = status.HTTP_204_NO_CONTENT)

6. Create a new file inside the todos/
- urls.py: Replace different URL routes, and connect them to our views
  urlpatterns = [
      path("", views.home, name="home"), # Redirect to the root URL of the website
      path("todos/", views.todo_list, name="todo_list"),
      path("todos/<int:id>/", views.todo_detail, name="todo_detail")
   ]      

7. Go inside the backend/urls, add the following code to include to todos urls
   from django.contrib import admin
   from django.urls import path, include

   urlpatterns = [
      path('admin/', admin.site.urls),
      path('', include("todos.url"))
   ]

8. Apply the changes to the DB by running:
   python manage.py makemigrations
   python manage.py migrate

Create superuser in Django
==============================
1. Create superuser: Enter username, email, password
   python manage.py createsuperuser

2. Let admin has the access to the Todo Model.
   In admin.py inside the todos, replace the code:

   from django.contrib import admin
   from .models import Todo

   # Register your models here.
   admin.site.register(Todo)

3. Run the app
   python maange.py runserver

4. Open the web browser by open the link:
   - Change the todos to admin
     http://127.0.0.1:8000/todos/
     http://127.0.0.1:8000/admin/

5. You should able to view the Todo inside admin page, where admin able to add the data over there.

6. After added some items inside the Todo, you should able to see the changes inside the todos page. 
   http://127.0.0.1:8000/todos/

7. Try to add a todo inside the link (http://127.0.0.1:8000/todos/):
   Under Content, add:
   {
        "title": "Study LangChain Framework"
   }
   Then click the POST. the changes will be reflected in the page.

8. Try to delete an item, open the link, can replace any id inside the page
   http://127.0.0.1:8000/todos/3/
   Click the delete button

9. Can refresh the page to view the latest record:
   http://127.0.0.1:8000/todos/

Django Admin Panel
- Admin page: http://127.0.0.1:8000/admin/login/?next=/admin/
- Allows us to manage users in different DB models
- Create user command: python manage.py createsuperuser (username: jenny, password: jenny123, email: jenny.tan@intel.com)
- We can add Todo items inside the sqlite db in the website

Setting up FrontEnd for react
===============================
Navigate back to the react-django-todo
1. Run command
   npx create-react-app react-frontend

2. Navigate into frontend
   cd react-frontend

3. Start react application. The browser will open the http://localhost:3000.
   npm start

4. Install bootstrap and reactstrap
   npm install boostrap reactstrap --legacy-peer-deps

Setting up React Frontend with Vite
===================================
Navigate back to the react-django-todo, initialize a new Vite project:
1. npm create vite@latest. Use the default project name or create a new vite project name. Here i used the name as "vite-frontend"
2. Select React as framework
3. Select Javascript as variant
4. cd vite-frontend. 
5. Install dependencies: npm install
6. Opoen browser to check react-vite has been installed successfully: npm run dev

Setting up UI in Vite-frontend
================================
1.Create a components folder inside vite-frontend/src
- Create 3 jsx file inside the components folder (jsx is JavaScript XML which allows you to write HTML-like syntax in your JavaScript code)
 
2. Add components into the base component which is called as App.jsx. Replace the code:

3. Refresh the page where you can view the 3 sentence in the browser.

4. Install axios for making HTTP Request

Install react icon
=======================
npm install react-icons --save

Install react-form 
===================
npm install react-hook-form

Run the app
==============
To run the app
- python manage.py runserver

Apply the Model to the Database
- python manage.py makemigrations
- python manage.py migrate

Django Framework
- todo/models.py : Manage DB (data)
- todo/views.py  : Views define how data is accessed and returned via APIs
- Set up urls.py : Include the todo inside the urls.py

Access to the Todo List page
- http://127.0.0.1:8000/todos/

Install the react-frontend
===============================
1. Create frontend dir folder
   npx create-react-app frontend 

2. cd frontend

3. Start the frontend application
   npm start

4. The browser will open the http://localhost:3000 to show your React app running.

5. Install bootstrap and reactstrap
   npm install boostrap reactstrap --legacy-peer-deps

6. Install Axios. Axios is a library used for making HTTP requests.
   npm install axios

=====================================================
Project Root directory
--------------------------
react-django-todo/
├── backend/          # Django backend (REST API)
├── frontend/         # React frontend
├── venv/             # Python virtual environment
├── requirements.txt  # Python dependencies
├── package.json      # Node.js dependencies
├── .gitignore        # Git ignore rules
├── README.md         # Project overview and documentation

Django Backend File Structure
--------------------------------
backend/
├── manage.py                      # Django management script
├── db.sqlite3                     # SQLite database (or your preferred DB)
├── requirements.txt               # Backend dependencies
├── backend/                       # Project settings folder
│   ├── __init__.py
│   ├── asgi.py
│   ├── settings.py                # Django settings
│   ├── urls.py                    # Project-wide URL configuration
│   ├── wsgi.py
├── todos/                         # To-Do app folder
│   ├── __init__.py
│   ├── admin.py                   # Django admin interface
│   ├── apps.py                    # App configuration
│   ├── migrations/                # Database migrations
│   │   ├── __init__.py
│   │   └── ... (migration files)
│   ├── models.py                  # Database models
│   ├── serializers.py             # DRF serializers
│   ├── tests.py                   # Unit tests for the app
│   ├── urls.py                    # App-specific URLs
│   ├── views.py                   # REST API views (CRUD logic)
└──
settings.py: Configuration for Django, including installed apps, middleware, database, and static files.
urls.py: Maps URLs to views for the API endpoints.
models.py: Defines the structure of the TodoItem database table.
serializers.py: Converts TodoItem models to JSON format and vice versa.
views.py: Contains API logic (CRUD operations).
tests.py: Unit tests to ensure the backend logic works as expected.

React Frontend File Structure
--------------------------------
frontend/
├── public/                         # Static assets
│   ├── index.html                  # Main HTML file
│   └── favicon.ico
├── src/                            # Main React source folder
│   ├── components/                 # Reusable UI components
│   │   ├── TodoList.js             # Todo list component
│   │   ├── TodoForm.js             # Form for adding/updating tasks
│   │   └── Header.js               # (Optional) Header component
│   ├── services/                   # API service functions
│   │   └── todoService.js          # Axios functions for API calls
│   ├── App.js                      # Main app component
│   ├── index.js                    # Entry point for React
│   ├── styles.css                  # Global styles (optional)
├── package.json                    # Dependencies and scripts
├── .env                            # Environment variables
└──
public/index.html: The single HTML file that React renders into.
src/components/: Contains all the React components.
TodoList.js: Manages and displays the list of to-dos.
TodoForm.js: Handles the form for creating or updating tasks.
Header.js: Optional component for a page header.
services/todoService.js: Centralized file for all Axios API requests (e.g., getTodos, addTodo, updateTodo, deleteTodo).
App.js: The root React component where all components are imported and rendered.