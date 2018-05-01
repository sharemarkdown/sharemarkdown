from rest_framework.test import APITestCase
import json
# Create your tests here.


class TestDocumentAPI(APITestCase):
    def setUp(self):
        self.client.post('http://localhost:8000/sharemarkdown/api/register', {
            'username': 'paul1234',
            'password': '1234',
            'email': 'paul841029@gmail.com',
            'last_name': 'l'
        })
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


    def test_create_document(self):
        response = self.client.post('http://localhost:8000/sharemarkdown/api/documents', {
            'file_name': 'aaa',
            'content': 'content'
        })
        self.assertEquals(response.status_code, 201)
        return response

    def test_get_document(self):
        self.test_create_document()
        response = self.client.get('http://localhost:8000/sharemarkdown/api/documents')
        self.assertEquals(response.data[0]['file_name'], 'aaa')
        self.assertEquals(response.data[0]['content'], 'content')

    def test_update_document(self):
        response = self.client.post('http://localhost:8000/sharemarkdown/api/documents', {
            'file_name': 'aaa',
            'content': 'content'
        })
        doc_id = response.data['id']
        self.client.put('http://localhost:8000/sharemarkdown/api/document/'+str(doc_id), {
            'file_name': 'aaa',
            'content': 'content '
        })
        response = self.client.get('http://localhost:8000/sharemarkdown/api/document/'+str(doc_id))
        self.assertEquals(response.data['content'], 'content ')

    def test_share_document(self):
        id = self.test_create_document().data['id']
        response = self.client.post('http://localhost:8000/sharemarkdown/api/share/doc',
                         {
                             'user': 'paul1234',
                             'document': id
                         })
        self.assertEquals(response.status_code, 204)
        response = self.client.post('http://localhost:8000/sharemarkdown/api/login', {
            'username': 'paul1234',
            'password': '1234'
        })
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + response.data['token'])
        response = self.client.get('http://localhost:8000/sharemarkdown/api/files')
        self.assertContains(response, id)

    def test_delete_document(self):
        id = self.test_create_document().data['id']
        response = self.client.delete('http://localhost:8000/sharemarkdown/api/document/'+str(id))
        self.assertEquals(response.status_code, 204)
        response = self.client.get('http://localhost:8000/sharemarkdown/api/document/' + str(id))
        self.assertEquals(response.status_code, 404)
