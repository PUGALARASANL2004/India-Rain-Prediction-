from django.db import models

class UserInput(models.Model):
    JUN = models.CharField(max_length=100)
    JUL = models.CharField(max_length=100)
    AUG = models.CharField(max_length=100)
    SEP = models.CharField(max_length=100)
    