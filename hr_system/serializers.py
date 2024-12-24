from rest_framework import serializers
from .models import Employee, Position, Education, Experience


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'


class PositionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Position
        fields = '__all__'


class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = ['education_id', 'institution', 'degree', 'major', 'start_date', 'end_date']


class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = ['experience_id', 'company_name', 'position', 'start_date', 'end_date']


# class CertSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Cert
#         fields = ['cert_id', 'name', 'issuing_organization', 'issue_date', 'expiry_date']
