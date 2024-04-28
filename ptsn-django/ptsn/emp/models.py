from django.db import models

class Employee(models.Model):
  badge_no = models.CharField(max_length=6, default=None)
  employee_name = models.CharField(max_length=255)
  date_of_birth = models.DateField(default=None, blank=True)
  photo = models.ImageField(upload_to='photo/', default=None, blank=True)
  status = models.BooleanField(default=False)

class MasterBadge(models.Model):
  badge_no = models.CharField(max_length=6)
  reserved = models.BooleanField(default=False)
