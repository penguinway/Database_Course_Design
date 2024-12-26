from django.urls import path, re_path
from . import views

urlpatterns = [
    path('persons/', views.person_list, name='person_list'),
    path('persons/<int:person_id>/', views.person_detail, name='person_detail'),
    path('persons/add/', views.add_employee, name='add_employee'),
    path('persons/delete/<int:person_id>', views.delete_employee, name='delete_employee'),
    path('positions/', views.position_list, name='position_list'),
    path('positions/<int:position_id>/', views.position_detail, name='position_detail'),
    path('positions/add/', views.add_position, name='add_position'),
    path('positions/delete/<int:position_id>', views.delete_position, name='delete_position'),

    path('api/persons/', views.person_list_api, name='person_list_api'),
    path('api/positions/', views.position_list_api, name='position_list_api'),
    path('api/education/', views.get_all_education_api, name='get_all_education_api'),
    path('api/experience/', views.get_all_experience_api, name='get_all_experience_api'),

    path('api/persons/detail/', views.person_detail_api, name='person_detail_api'),
    path('api/positions/detail/', views.position_detail_api, name='position_detail_api'),
    path('api/persons/add/', views.add_employee_api, name='add_employee_api'),
    path('api/positions/add/', views.add_position_api, name='add_position_api'),
    path('api/persons/delete/', views.delete_employee_api, name='delete_employee_api'),
    path('api/positions/delete/', views.delete_position_api, name='delete_position_api'),
    path('api/persons/change/', views.change_employee_api, name='change_employee_api'),
    path('api/positions/change/', views.change_position_api, name='change_position_api'),
    path('api/education/change/', views.change_education_api, name='change_education_api'),
    path('api/experience/change/', views.change_experience_api, name='change_experience_api'),
    path('api/persons/education/add/', views.add_education_api, name='add_education_api'),
    path('api/persons/experience/add/', views.add_experience_api, name='add_experience_api'),
    path('api/persons/education/detail/', views.get_employee_education_detail_api, name='get_employee_education_detail_api'),
    path('api/persons/experience/detail/', views.get_employee_experience_detail_api, name='get_employee_experience_detail_api'),
    path('api/persons/education/delete/', views.delete_education_api, name='delete_education_api'),
    path('api/persons/experience/delete/', views.delete_experience_api, name='delete_experience_api'),
    path('api/persons/positions/change/', views.change_employee_position_api, name='change_employee_position_api'),

    re_path(r'^.*$', views.handler404, name='handler404'),
]
