from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from . import views

urlpatterns = [
    path('select_emp/', views.get_employee_by_params, name='get_employee_by_params'),
    path('select_emp_byid/<int:id>/', views.get_employee_by_id, name='get_employee_by_id'),
    path('select_emp_bystatus/<int:status>/', views.get_employee_by_status, name='get_employee_by_status'),
    path('select_emp_byname/<str:name>/', views.get_employee_by_name, name='get_employee_by_name'),

    path('add_emp/', views.assign_badge, name='assign_badge'),
    path('remove_emp/', views.employee_deactivate, name='employee_deactivate'),
    path('update_emp/', views.employee_update, name='employee_update'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)