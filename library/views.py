import json
from django.shortcuts import render
import requests


def search_by_isbn(request):
    if request.method == 'GET':
        return render(request, 'sanjuroville/search_by_isbn.html')

    if request.method == 'POST':
        results = []
        isbn_numbers = request.POST.get('isbn_numbers').split('\n')
        api_base = 'https://openlibrary.org/isbn/{}.json'
        for isbn_number in isbn_numbers:
            if isbn_number.strip() == '':
                continue
            api_url = api_base.format(isbn_number)
            response = requests.get(api_url)
            if response.status_code != 200:
                results.append([isbn_number, 'Not found'])
            else:
                content = json.loads(response.content)
                try:
                    results.append([isbn_number, content['title']])
                except KeyError:
                    results.append([isbn_number, 'Error'])

        return render(request, 'sanjuroville/search_by_isbn_results.html', context={'results': results})
