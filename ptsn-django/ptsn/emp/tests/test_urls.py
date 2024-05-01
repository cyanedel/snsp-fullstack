from django.test import SimpleTestCase
from django.urls import reverse, resolve
from emp.views import get_employee_by_params, get_employee_by_id, get_employee_by_status, get_employee_by_name, assign_badge, employee_deactivate, employee_update

class TestUrls(SimpleTestCase):
  def test_get_employee_by_params(self):
    url = reverse('get_employee_by_params')
    self.assertAlmostEquals(resolve(url).func, get_employee_by_params)
  
  def test_get_employee_by_id(self):
    url = reverse('get_employee_by_id', args=[1])
    self.assertAlmostEquals(resolve(url).func, get_employee_by_id)
  
  def test_get_employee_by_status(self):
    url = reverse('get_employee_by_status', args=[1])
    self.assertAlmostEquals(resolve(url).func, get_employee_by_status)
  
  def test_get_employee_by_name(self):
    url = reverse('get_employee_by_name', args=["john doe"])
    self.assertAlmostEquals(resolve(url).func, get_employee_by_name)

  def test_add_emp(self):
    url = reverse('assign_badge')
    self.assertAlmostEquals(resolve(url).func, assign_badge)
  
  
  def test_remove_emp(self):
    url = reverse('employee_deactivate')
    self.assertAlmostEquals(resolve(url).func, employee_deactivate)
  
  def test_update_emp(self):
    url = reverse('employee_update')
    self.assertAlmostEquals(resolve(url).func, employee_update)