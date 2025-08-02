# Example of adding CORS headers to specific Django views

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.utils.decorators import method_decorator
from django.views import View
import json

# Decorator to add CORS headers
def add_cors_headers(view_func):
    def wrapper(request, *args, **kwargs):
        response = view_func(request, *args, **kwargs)
        response['Access-Control-Allow-Origin'] = '*'  # Change to specific domain in production
        response['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
        response['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, X-Requested-With'
        response['Access-Control-Allow-Credentials'] = 'true'
        return response
    return wrapper

# Function-based view example
@csrf_exempt
@add_cors_headers
@require_http_methods(["GET", "POST", "OPTIONS"])
def vehicle_info_view(request):
    if request.method == 'OPTIONS':
        return JsonResponse({})
    
    if request.method == 'GET':
        # Your GET logic here
        return JsonResponse({'message': 'Vehicle info retrieved'})
    
    elif request.method == 'POST':
        # Your POST logic here
        data = json.loads(request.body)
        return JsonResponse({'message': 'Vehicle info updated', 'data': data})

# Class-based view example
@method_decorator(csrf_exempt, name='dispatch')
@method_decorator(add_cors_headers, name='dispatch')
class CartView(View):
    def options(self, request, *args, **kwargs):
        return JsonResponse({})
    
    def get(self, request, *args, **kwargs):
        # Your GET logic here
        return JsonResponse({'cart': []})
    
    def post(self, request, *args, **kwargs):
        # Your POST logic here
        data = json.loads(request.body)
        return JsonResponse({'message': 'Cart updated', 'data': data})

# URL patterns example:
# from django.urls import path
# from . import views
# 
# urlpatterns = [
#     path('api/dvla/vehicle-info/', views.vehicle_info_view, name='vehicle-info'),
#     path('api/dvla/cart/', views.CartView.as_view(), name='cart'),
# ]