from django.db import models

# Create your models here, where the models represent the data that is used to store in DB
class Todo(models.Model):
    task = models.CharField(max_length = 200)
    description = models.TextField(blank = True)
    completed = models.BooleanField(default=False)
    created = models.DateField(auto_now_add=True)
    updated = models.DateField(auto_now=True)

    def __str__(self):
        return self.title