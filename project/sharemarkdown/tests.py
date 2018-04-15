from django.test import TestCase
from rest_framework.test import APITestCase
import json
from sharemarkdown.models import Folder
# Create your tests here.


class TestAPI(APITestCase):
    def test_get_user(self):
        self.client.post('http://localhost:8000/sharemarkdown/api/user/', {
            'username': 'paul841029',
            'password': '1234',
            'email': 'paul841029@gmail.com'
        })
        response = self.client.get('http://localhost:8000/sharemarkdown/api/user/')
        data = json.loads(response.content)
        self.assertEquals(data[0]['username'], 'paul841029')
        self.assertEquals(data[0]['email'], 'paul841029@gmail.com')

    def test_get_folder(self):
        self.client.post('http://localhost:8000/sharemarkdown/api/folder/', {
            'name': 'test_folder'
        })
        parent_id = Folder.objects.get(name='test_folder').pk
        self.client.post('http://localhost:8000/sharemarkdown/api/folder/', {
            'name': 'test_folder2',
            'parent_folder': parent_id
        })
        response = self.client.get('http://localhost:8000/sharemarkdown/api/folder/')
        data = json.loads(response.content)
        name = []
        for item in data:
            name.append(item['name'])
        self.assertEquals(set(name), {'test_folder', 'test_folder2'})






