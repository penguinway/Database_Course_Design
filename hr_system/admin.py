from django.contrib import admin
from .models import Position, Employee, Education, Experience


@admin.register(Position)
class PositionAdmin(admin.ModelAdmin):
    list_display = ('position_id', 'name', 'description', 'responsibilities')


@admin.register(Employee)
class PersonAdmin(admin.ModelAdmin):
    list_display = ('employee_id', 'name', 'date_of_birth', 'gender', 'age', 'ID_number', 'Contact', 'Creation_date', 'email')


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ('education_id', 'person', 'institution', 'degree', 'major', 'start_date', 'end_date')


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('experience_id', 'person', 'company_name', 'position', 'start_date', 'end_date')
