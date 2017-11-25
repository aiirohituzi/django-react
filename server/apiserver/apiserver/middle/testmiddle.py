from django.conf import settings
from django.db import connection
from django.template import Template, Context
from django.http import HttpResponse
from django.contrib.auth import authenticate
from django.core import exceptions

class SimpleMiddleware(object):
    def __init__(self, get_response):
        self.get_response = get_response
        # One-time configuration and initialization.

    def __call__(self, request):
        # Code to be executed for each request before
        # the view (and later middleware) are called.

        response = self.get_response(request)

        # Code to be executed for each request/response after
        # the view is called.

        return response

    def process_view(self, request, view_func, view_args, view_kwargs):
        print('-------------------------------')
        print('process_view')
        print(request, view_args, view_func, view_kwargs)

        response = None
        return response

    def process_exception(self, request, exception):
        
        print('-------------------------------')
        print('process_exception')
        print(request, exception)
        response = None

        if request.path == '/upload/':
            if exceptions.ObjectDoesNotExist:
                print('*** [upload] Request of unauthorized user ***')
                response = HttpResponse('Forbidden', status=403)
            else:
                response = None
        elif request.path == '/delete/':
            if exceptions.ObjectDoesNotExist:
                print('*** [delete] Request of unauthorized user ***')
                response = HttpResponse('Forbidden', status=403)
            else:
                response = None
        elif request.path == '/update/':
            if exceptions.ObjectDoesNotExist:
                print('*** [update] Request of unauthorized user ***')
                response = HttpResponse('Forbidden', status=403)
            else:
                response = None
        else:
            response = None
        return response

    def process_template_response(self, request, response):

        # if connection.queries:
        #     execution_sql_time = sum([float(q['time']) for q in connection.queries])
        #     t = Template(
        #     """
        #     {{nb_sql}} requet{{nb_sql|pluralize:"e,es"}} en {{execution_sql_time}} second{{execution_sql_time|pluralize:"e,es"}}:
        #     {% for sql in sql_log %}
        #     [{{forloop.counter}}] {{sql.time}}s: {{sql.sql|safe}}
        #     {% endfor %}
        #     """)
        #     print("---------------")
        #     print(t.render(Context({'sql_log':connection.queries,'nb_sql':len(connection.queries),'execution_sql_time':execution_sql_time})))
        #     print("---------------")
            
        print('-------------------------------')
        print('process_template_response')
        print(request, response)
        return response