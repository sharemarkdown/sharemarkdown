from django.test import TestCase
from rest_framework.test import APITestCase
import json
from sharemarkdown.models import Folder
# Create your tests here.


class TestUserAPI(APITestCase):
    def setUp(self):
        response = self.client.post('http://localhost:8000/sharemarkdown/api/register', {
            'username': 'paul841029',
            'password': '1234',
            'email': 'paul841029@gmail.com',
            'last_name': 'l'
        })
        self.assertEquals(response.status_code, 201)

    def test_login_success(self):
        response = self.client.post('http://localhost:8000/sharemarkdown/api/login', {
            'username': 'paul841029',
            'password': '1234'
        })
        self.assertEquals(response.status_code, 200)

    def test_login_fail(self):
        response = self.client.post('http://localhost:8000/sharemarkdown/api/login', {
            'username': 'paul841029',
            'password': '12345'
        })
        self.assertEquals(response.status_code, 400)