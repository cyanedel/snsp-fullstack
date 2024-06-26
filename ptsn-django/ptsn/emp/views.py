from django.db import transaction
from django.http import JsonResponse
from .models import Employee, MasterBadge
import json

def get_employee_by_params(request):
  paramId = request.GET["id"]
  # paramStatus = request.GET["status"]
  data = {}
  res = {}
  if paramId is not None:
    res = Employee.objects.get(pk=paramId)
    data = {
        'id': res.id
      , 'badge_no': res.badge_no
      , 'fullname': res.employee_name
      , 'dob': res.date_of_birth
      , 'photo': res.photo.url if res.photo else None
      , 'status': res.status
    }

  return JsonResponse(data)

def get_employee_by_id(request, id):
  res = Employee.objects.get(id=id)
  data = {
      'id': res.id
    , 'badge_no': res.badge_no
    , 'fullname': res.employee_name
    , 'dob': res.date_of_birth
    , 'photo': res.photo.url if res.photo else None
    , 'status': res.status
  }
  
  return JsonResponse(data, status=200)

def get_employee_by_status(request, status):
  try:
    res = Employee.objects.filter(status=status)
    data = [
      {'id': emp.id, 'badge_no': emp.badge_no, 'fullname': emp.employee_name, 'dob': emp.date_of_birth, 'status': emp.status} for emp in res
    ]
    
    return JsonResponse({'data': data}, status=200)
  except Exception as e:
    return JsonResponse({'error': str(e)}, status=500)

def get_employee_by_name(request, name):
  try:
    res = Employee.objects.filter(status=True).filter(employee_name__icontains=name)
    data = [
      {'id': emp.id, 'badge_no': emp.badge_no, 'fullname': emp.employee_name, 'dob': emp.date_of_birth, 'status': emp.status} for emp in res
    ]
    
    return JsonResponse({'data': data}, status=200)
  except Exception as e:
    return JsonResponse({'error': str(e)}, status=500)

def assign_badge(request):
  if request.method == 'POST':
    fullname = request.POST.get('fullname')
    dob = request.POST.get('dob')
    photo = request.FILES.get("photo")
    try:
      with transaction.atomic():
        badge = MasterBadge.objects.select_for_update().filter(reserved=False).first()
        badge.reserved = True
        badge.save()

        emp = Employee.objects.create(employee_name=fullname, date_of_birth=dob, badge_no=badge.badge_no, photo=photo, status=True)
    except Exception as e:
      # Handle potential errors during transaction
      transaction.rollback()
      return JsonResponse({'error': str(e)}, status=500)
    return JsonResponse({"employee_id": emp.id, "badge_no": badge.badge_no}, status=200)
  else:
    return JsonResponse({'error':  'Invalid request.'}, status=405)

def employee_update(request):
  if request.method == 'POST':
    
    employee_id = request.POST.get("id")
    fullname = request.POST.get('fullname')
    dob = request.POST.get('dob')
    photo = request.FILES.get("photo")

    employee = Employee.objects.get(id=employee_id)
    
    if fullname is not None:
      employee.employee_name = fullname
    
    if dob is not None:
      employee.date_of_birth = dob
    
    if photo is not None:
      employee.photo = photo
    
    employee.save()

    return JsonResponse({"status": "ok", "status_code": 200})

def employee_deactivate(request):
  if request.method == 'POST':
    
    card_no = ""
    employee_id = ""

    if request.content_type == 'application/json':
      data = json.loads(request.body)
      card_no = data.get("badge_no")
      employee_id = data.get("employee_id")
    else:
      card_no = request.POST.get('badge_no')
      employee_id = request.POST.get('employee_id')
    
    badge = MasterBadge.objects.get(badge_no=card_no)
    badge.reserved = False
    badge.save()

    employee = Employee.objects.get(id=employee_id)
    employee.status = False
    employee.save()
    
    return JsonResponse({"status": "ok", "status_code": 200})
