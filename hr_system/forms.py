from django import forms
from .models import Employee, Position, Education


class EmployeeForm(forms.ModelForm):
    class Meta:
        model = Employee
        fields = ['name', 'gender', 'age', 'date_of_birth', 'ID_number', 'email', 'Contact', 'position']


class PositionForm(forms.ModelForm):
    class Meta:
        model = Position
        fields = ['name', 'description', 'responsibilities']


class EducationForm(forms.ModelForm):
    class Meta:
        model = Education
        fields = ['institution', 'degree', 'major', 'start_date', 'end_date']
