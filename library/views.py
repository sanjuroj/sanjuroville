import json
from django.shortcuts import render
import requests


def search_by_isbn(request):
    if request.method == 'GET':
        return render(request, 'sanjuroville/search_by_isbn.html')

    if request.method == 'POST':
        results = []
        isbn_numbers = [isbn.strip() for isbn in request.POST.get('isbn_numbers').split('\n') if isbn != '']

        api_base = 'https://openlibrary.org/api/books?format=json&jscmd=data&bibkeys='
        bibkeys = ','.join([f'ISBN:{i}' for i in isbn_numbers])

        api_url = api_base + bibkeys
        response = requests.get(api_url)
        if response.status_code != 200:
            results.append("There was an error. Flog the developer.")
        else:
            content = json.loads(response.content)
            for isbn_number in isbn_numbers:
                content_key = 'ISBN:' + str(isbn_number)
                try:
                    book_content = content[content_key]
                    subjects = ', '.join([s['name'] for s in book_content['subjects']])
                    results.append((isbn_number, book_content['title'], subjects))

                except KeyError:
                    results.append((isbn_number, 'Error', None))

        return render(request, 'sanjuroville/search_by_isbn_results.html', context={'results': results})
