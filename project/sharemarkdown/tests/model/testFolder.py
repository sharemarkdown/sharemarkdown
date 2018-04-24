from rest_framework.test import APITestCase
import json
# Create your tests here.


class TestFolderAPI(APITestCase):
    def setUp(self):
        response = self.client.post('http://localhost:8000/sharemarkdown/api/register', {
            'username': 'paul841029',
            'password': '1234',
            'email': 'paul841029@gmail.com',
            'last_name': 'l'
        })
        self.assertEquals(response.status_code, 201)
        response = self.client.post('http://localhost:8000/sharemarkdown/api/login', {
            'username': 'paul841029',
            'password': '1234'
        })
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + response.data['token'])


    def test_create_folder(self):
        response = self.client.post('http://localhost:8000/sharemarkdown/api/folders', {
            'folder_name': 'folder1',
        })
        self.assertEquals(response.status_code, 201)

    def test_get_folder(self):
        self.test_create_folder()
        response = self.client.get('http://localhost:8000/sharemarkdown/api/folders')
        self.assertEquals(response.data[0]['folder_name'], 'folder1')


    def test_update_document(self):
        response = self.client.post('http://localhost:8000/sharemarkdown/api/folders', {
            'folder_name': 'folder2',
        })
        folder_id = response.data['id']
        self.client.put('http://localhost:8000/sharemarkdown/api/folder/'+str(folder_id), {
            'folder_name': 'abc',
        })
        response = self.client.get('http://localhost:8000/sharemarkdown/api/folder/'+str(folder_id))
        self.assertEquals(response.data['folder_name'], 'abc')
