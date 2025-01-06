from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home"), # Redirect to the root URL of the website
    path("todos/", views.todo_list, name="todo_list"),
    path("todos/<int:id>/", views.todo_detail, name="todo_detail"),
    path("todos/completeToDos/", views.complete_todo, name="complete_todo")
]                                        

# urls:
    #http://localhost:3000/todos
    #http://localhost:3000/todos/id