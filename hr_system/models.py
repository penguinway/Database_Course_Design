from django.db import models


class Position(models.Model):
    """岗位模型"""
    position_id = models.AutoField(primary_key=True)  # 岗位ID
    name = models.CharField(max_length=100, unique=True, blank=False, null=False)  # 岗位名称
    description = models.TextField(blank=True, null=True)  # 岗位描述
    responsibilities = models.TextField(blank=True, null=True)  # 职责

    def __str__(self):
        return self.name


class Employee(models.Model):
    """人员模型"""
    employee_id = models.AutoField(primary_key=True)  # 人员ID
    name = models.CharField(max_length=50, null=False, unique=True, blank=False)  # 姓名
    date_of_birth = models.DateField(null=False, blank=False)  # 出生日期
    gender = models.CharField(max_length=10, null=True, blank=True)  # 性别
    age = models.IntegerField(null=True, blank=True)  # 年龄
    ID_number = models.CharField(max_length=18, unique=True, null=False, blank=False)  # 身份证号
    Contact = models.CharField(max_length=255, null=True, blank=True)  # 联系方式
    position = models.ManyToManyField(Position, blank=True)  # 岗位关联
    Creation_date = models.DateField(auto_created=True, null=True, blank=True)  # 创建日期
    email = models.EmailField(unique=True)  # 电子邮箱

    def __str__(self):
        return f"{self.employee_id} {self.name}"


class Education(models.Model):
    """教育经历模型"""
    education_id = models.AutoField(primary_key=True)  # 教育经历ID
    person = models.ForeignKey(Employee,
                               on_delete=models.CASCADE,
                               related_name="educations")  # 关联到人员
    institution = models.CharField(max_length=200)  # 学校名称
    degree = models.CharField(max_length=100)  # 学位
    major = models.CharField(max_length=100)  # 专业
    start_date = models.DateField()  # 开始时间
    end_date = models.DateField(null=True, blank=True)  # 结束时间

    def __str__(self):
        return f"{self.degree} at {self.institution}"


class Experience(models.Model):
    """工作经历模型"""
    experience_id = models.AutoField(primary_key=True)  # 工作经历ID
    person = models.ForeignKey(Employee,
                               on_delete=models.CASCADE,
                               related_name="experience")  # 关联到人员
    company_name = models.CharField(max_length=200)  # 公司名称
    position = models.CharField(max_length=100)  # 岗位
    start_date = models.DateField()  # 开始时间
    end_date = models.DateField()  # 结束时间

    def __str__(self):
        return f"{self.person} at {self.company_name}"


# class Cert(models.Model):
#     cert_id = models.AutoField(primary_key=True)
#     person = models.ForeignKey(Employee,
#                                on_delete=models.CASCADE,
#                                related_name="certs")
#     name = models.CharField(max_length=100)
#     issuing_organization = models.CharField(max_length=200)
#     issue_date = models.DateField()
#     expiry_date = models.DateField()
#
#     def __str__(self):
#         return f"{self.person} has {self.name}"
