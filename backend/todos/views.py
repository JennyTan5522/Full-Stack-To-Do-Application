from django.shortcuts import render, HttpResponse, get_object_or_404

from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .models import Todo
from .serializers import TodoSerializer

# Create your views here.
# HomePage
def home(request):
    return HttpResponse('Hello World') # After create view need to connect with root or URL
    #return render(request, "home.html") # Render html template

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
    
    elif request.method == "PATCH":
        # Perform a partial update (only update fields provided in the request)
        serializer = TodoSerializer(todo, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    elif request.method == "DELETE":
        todo.delete()
        return Response(status = status.HTTP_204_NO_CONTENT)

@api_view(["POST"])
def complete_todo(request):
    todo_id = request.data.get("todo_id")
    todo = Todo.objects.get(id=todo_id)
    todo.completed = not todo.completed
    todo.save()
    return Response("Todo updated successfully!")