from django.test import TestCase, Client
from django.core.management import call_command
from django.urls import reverse
from django.core.files.uploadedfile import SimpleUploadedFile

class TestViews(TestCase):
  def setUp(self):
    self.client = Client()
    self.get_listemp_status = reverse('get_employee_by_status', args=[1])
    self.get_listemp_name = reverse('get_employee_by_name', args=["john doe"])
  
  def test_get_employee_by_status(self):
    response = self.client.get(self.get_listemp_status)
    self.assertEquals(response.status_code, 200)
    data = response.json()
    self.assertIsInstance(data, dict)
    self.assertIn('data', data)
  
  def test_get_employee_by_name(self):
    response = self.client.get(self.get_listemp_name)
    self.assertEquals(response.status_code, 200)
    data = response.json()
    self.assertIsInstance(data, dict)
    self.assertIn('data', data)
  
  def test_post_add_emp(self):
    call_command('loaddata', 'emp/fixtures/initial_no_test.json')
    url = reverse('assign_badge')

    image_file = SimpleUploadedFile('test_image.jpg', b'content of test image', content_type='image/jpeg')
    
    data = {
      'fullname': 'John Doe',
      'dob': '1997-01-01',
      'photo': image_file
    }
        
    response = self.client.post(url, data=data)
    # print(f"Response Content: {response.content}")

    self.assertEqual(response.status_code, 200)

    response_data = response.json()
    self.assertIsInstance(response_data, dict)

    self.assertIn('employee_id', response_data)
    self.assertIn('badge_no', response_data)
  