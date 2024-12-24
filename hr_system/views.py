from django.shortcuts import render, get_object_or_404, redirect
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Employee, Position, Education, Experience
from .forms import EmployeeForm, PositionForm, EducationForm
from .serializers import EmployeeSerializer, PositionSerializer, EducationSerializer, ExperienceSerializer


def person_list(request):
    """展示所有人员"""
    persons = Employee.objects.all()
    return render(request, 'person_list.html', {'persons': persons})


def person_detail(request, person_id):
    """展示单个人员详情"""
    person = get_object_or_404(Employee, pk=person_id)
    return render(request, 'person_detail.html', {'person': person})


def add_employee(request):
    """添加人员"""
    if request.method == "POST":
        form = EmployeeForm(request.POST)
        if form.is_valid():
            form.save()  # 保存到数据库
            return redirect('person_list')
    else:
        form = EmployeeForm()

    return render(request, 'add_employee.html', {'form': form})


def delete_employee(request, person_id):
    """删除员工"""
    person = get_object_or_404(Employee, pk=person_id)
    if request.method == 'POST':
        person.delete()
        return redirect('person_list')  # 删除后可以重定向到员工列表页
    return render(request, 'confirm_delete_person.html', {'person': person})


@api_view(['GET'])
def person_list_api(request):
    """展示所有人员"""
    persons = Employee.objects.all()
    serializer = EmployeeSerializer(persons, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def person_detail_api(request):
    """展示单个人员详情"""
    person_id = request.GET.get('person_id')
    if person_id is None:
        return Response({'error': 'person_id is required'}, status=400)
    try:
        person_id = int(person_id)
    except ValueError:
        return Response({'error': 'Invalid person_id'}, status=400)

    person = get_object_or_404(Employee, pk=person_id)
    serializer = EmployeeSerializer(person)
    return Response(serializer.data)


@api_view(['POST'])
def add_employee_api(request):
    """添加员工"""
    serializer = EmployeeSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=200)
    return Response(serializer.errors, status=400)


@api_view(['DELETE'])
def delete_employee_api(request):
    """删除指定ID的员工"""
    if request.method == 'DELETE':
        person_id = request.GET.get('person_id')
        if person_id is None:
            return Response({'error': 'person_id is required'}, status=400)

        try:
            person_id = int(person_id)
        except ValueError:
            return Response({'error': 'Invalid person_id'}, status=400)

        employee = get_object_or_404(Employee, pk=person_id)
        employee.delete()
        return Response({'message': 'Employee deleted successfully'}, status=200)
    else:
        return Response({'error': 'Only DELETE method is allowed'}, status=400)


@api_view(['POST'])
def change_employee_api(request):
    """修改员工信息"""
    employee_id = request.data.get('person_id')  # 获取员工的唯一标识符
    if employee_id is None:
        return Response({'error': 'person_id is required'}, status=400)

    # 获取当前员工对象
    employee = get_object_or_404(Employee, pk=employee_id)

    # 将当前实例和数据传给序列化器
    serializer = EmployeeSerializer(instance=employee, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()  # 调用保存方法
        return Response(serializer.data, status=200)
    return Response(serializer.errors, status=400)


def position_list(request):
    """展示所有职位"""
    positions = Position.objects.all()
    return render(request, 'position_list.html', {'positions': positions})


def position_detail(request, position_id):
    """展示单个职位详情"""
    position = get_object_or_404(Position, pk=position_id)
    return render(request, 'position_detail.html', {'position': position})


def delete_position(request, position_id):
    """删除职位"""
    position = get_object_or_404(Position, pk=position_id)
    if request.method == 'POST':
        position.delete()
        return redirect('position_list')
    return render(request, 'confirm_delete_person.html', {'position': position})


def add_position(request):
    """添加职位"""
    if request.method == "POST":
        form = PositionForm(request.POST)
        if form.is_valid():
            form.save()  # 保存到数据库
            return redirect('position_list')
    else:
        form = PositionForm()

    return render(request, 'add_position.html', {'form': form})


@api_view(['GET'])
def position_list_api(request):
    """展示所有职位"""
    positions = Position.objects.all()
    serializer = PositionSerializer(positions, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def position_detail_api(request):
    """展示单个职位详情"""
    position_id = request.GET.get('position_id')
    if position_id is None:
        return Response({'error': 'position_id is required'}, status=400)
    try:
        position_id = int(position_id)
    except ValueError:
        return Response({'error': 'Invalid position_id'}, status=400)
    position = get_object_or_404(Position, pk=position_id)
    serializer = PositionSerializer(position)
    return Response(serializer.data)


@api_view(['POST'])
def add_position_api(request):
    """添加岗位"""
    serializer = PositionSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=200)
    return Response(serializer.errors, status=400)


@api_view(['DELETE'])
def delete_position_api(request):
    """删除指定ID的岗位"""
    if request.method == 'DELETE':
        position_id = request.GET.get('position_id')
        if position_id is None:
            return Response({'error': 'position_id is required'}, status=400)
        try:
            position_id = int(position_id)
        except ValueError:
            return Response({'error': 'Invalid position_id'}, status=400)
        position = get_object_or_404(Position, pk=position_id)
        position.delete()
        return Response({'message': 'Position deleted successfully'}, status=200)
    else:
        return Response({'error': 'Only DELETE method is allowed'}, status=400)


@api_view(['POST'])
def change_position_api(request):
    """修改岗位信息"""
    position_id = request.data.get('position_id')
    if position_id is None:
        return Response({'error': 'position_id is required'}, status=400)
    position = get_object_or_404(Position, pk=position_id)
    serializer = PositionSerializer(instance=position, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=200)
    return Response(serializer.errors, status=400)


@api_view(['POST'])
def add_education_api(request):
    """为指定员工添加教育信息"""
    person_id = request.data.get('person_id')
    if person_id is None:
        return Response({'error': 'person_id is required'}, status=400)
    try:
        person_id = int(person_id)
    except ValueError:
        return Response({'error': 'Invalid person_id'}, status=400)
    employee = get_object_or_404(Employee, pk=person_id)
    serializer = EducationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(person=employee)
        return Response(serializer.data, status=200)
    return Response(serializer.errors, status=400)


@api_view(['POST'])
def add_experience_api(request):
    """为指定员工添加工作经历"""
    person_id = request.data.get('person_id')
    if person_id is None:
        return Response({'error': 'person_id is required'}, status=400)
    try:
        person_id = int(person_id)
    except ValueError:
        return Response({'error': 'Invalid person_id'}, status=400)
    employee = get_object_or_404(Employee, pk=person_id)
    serializer = ExperienceSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(person=employee)
        return Response(serializer.data, status=200)
    return Response(serializer.errors, status=400)


@api_view(['GET'])
def get_employee_education_detail_api(request):
    """获取指定员工教育详情"""
    person_id = request.GET.get('person_id')
    if person_id is None:
        return Response({'error': 'person_id is required'}, status=400)
    try:
        person_id = int(person_id)
    except ValueError:
        return Response({'error': 'Invalid person_id'}, status=400)
    employee = get_object_or_404(Employee, pk=person_id)
    education_list = Education.objects.filter(person=employee)
    serializer = EducationSerializer(education_list, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_employee_experience_detail_api(request):
    """获取指定员工工作经历详情"""
    person_id = request.GET.get('person_id')
    if person_id is None:
        return Response({'error': 'person_id is required'}, status=400)
    try:
        person_id = int(person_id)
    except ValueError:
        return Response({'error': 'Invalid person_id'}, status=400)
    employee = get_object_or_404(Employee, pk=person_id)
    experience_list = Experience.objects.filter(person=employee)
    serializer = ExperienceSerializer(experience_list, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_all_education_api(request):
    """获取所有教育记录"""
    educations = Education.objects.all()
    serializer = EducationSerializer(educations, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_all_experience_api(request):
    """获取所有工作经历记录"""
    experiences = Experience.objects.all()
    serializer = ExperienceSerializer(experiences, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def delete_education_api(request):
    """删除指定教育记录"""
    education_id = request.data.get('education_id')
    if education_id is None:
        return Response({'error': 'education_id is required'}, status=400)
    try:
        education_id = int(education_id)
    except ValueError:
        return Response({'error': 'Invalid education_id'}, status=400)
    education = get_object_or_404(Education, pk=education_id)
    education.delete()
    return Response({'message': 'Education deleted successfully'}, status=200)


@api_view(['POST'])
def delete_experience_api(request):
    """删除指定工作经历记录"""
    experience_id = request.data.get('experience_id')
    if experience_id is None:
        return Response({'error': 'experience_id is required'}, status=400)
    try:
        experience_id = int(experience_id)
    except ValueError:
        return Response({'error': 'Invalid experience_id'}, status=400)
    experience = get_object_or_404(Experience, pk=experience_id)
    experience.delete()
    return Response({'message': 'Experience deleted successfully'}, status=200)


@api_view(['POST'])
def change_education_api(request):
    """修改教育信息"""
    education_id = request.data.get('education_id')
    if education_id is None:
        return Response({'error': 'education_id is required'}, status=400)
    education = get_object_or_404(Education, pk=education_id)
    serializer = EducationSerializer(instance=education, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=200)
    return Response(serializer.errors, status=400)


@api_view(['POST'])
def change_experience_api(request):
    """修改工作经历信息"""
    experience_id = request.data.get('experience_id')
    if experience_id is None:
        return Response({'error': 'experience_id is required'}, status=400)
    experience = get_object_or_404(Experience, pk=experience_id)
    serializer = ExperienceSerializer(instance=experience, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=200)
    return Response(serializer.errors, status=400)


def add_employee_position(employee_id, position_id):
    employee = get_object_or_404(Employee, pk=employee_id)
    position = get_object_or_404(Position, pk=position_id)
    employee.position.add(position)
    return employee


def remove_employee_position(employee_id, position_id):
    employee = get_object_or_404(Employee, pk=employee_id)
    position = get_object_or_404(Position, pk=position_id)
    employee.position.remove(position)
    return employee


@api_view(['POST'])
def change_employee_position_api(request):
    """修改员工岗位"""
    employee_id = request.data.get('employee_id')
    position_id = request.data.get('position_id')
    change = request.data.get('action')
    if employee_id is None or position_id is None:
        return Response({'error': 'employee_id and position_id are required'}, status=400)
    try:
        employee_id = int(employee_id)
        position_id = int(position_id)
    except ValueError:
        return Response({'error': 'Invalid employee_id or position_id'}, status=400)
    if change is None:
        return Response({'error': 'change is required'}, status=400)
    if change.lower() not in ['add', 'remove']:
        return Response({'error': 'Invalid change value'}, status=400)
    if change.lower() == 'add':
        add_employee_position(employee_id, position_id)
    elif change.lower() == 'remove':
        remove_employee_position(employee_id, position_id)
    return Response({'message': 'Employee position changed successfully'}, status=200)


def serve_react_app(request):
    return render(request, 'index.html')


# 在views.py中定义handler404视图
@api_view(['GET', 'POST'])
def handler404(request):
    return Response({"error": "Not Found"}, status=404)


# @api_view(['GET'])
# def get_all_cert_api(request):
#     """获取所有证书记录"""
#     certs = Cert.objects.all()
#     serializer = CertSerializer(certs, many=True)
#     return Response(serializer.data)
#
#
# @api_view(['POST'])
# def add_cert_api(request):
#     """为指定员工添加证书"""
#     person_id = request.data.get('person_id')
#     if person_id is None:
#         return Response({'error': 'person_id is required'}, status=400)
#     try:
#         person_id = int(person_id)
#     except ValueError:
#         return Response({'error': 'Invalid person_id'}, status=400)
#     employee = get_object_or_404(Employee, pk=person_id)
#     serializer = CertSerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save(person=employee)
#         return Response(serializer.data, status=201)
#     return Response(serializer.errors, status=400)
#
