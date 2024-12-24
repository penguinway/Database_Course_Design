import requests
import random
from faker import Faker

fake = Faker('zh_CN')
generated_ids = set()
generated_personids = set()


def generate_unique_18_digit_id(down: int, up: int):
    while True:
        new_id = str(random.randint(down, up))
        if new_id not in generated_ids:
            generated_ids.add(new_id)
            return new_id


def generate_random_personid():
    while True:
        new_id = str(random.randint(1, 10 ** 8))
        if new_id not in generated_personids:
            generated_personids.add(new_id)
            return new_id


def generate_random_person():
    return {
        "employee_id": generate_random_personid(),
        "name": fake.name(),
        "Creation_date": fake.date_this_decade().isoformat(),
        "date_of_birth": fake.date_of_birth(minimum_age=18, maximum_age=90).isoformat(),
        "gender": random.choice(["男", "女"]),
        "ID_number": generate_unique_18_digit_id(10 ** 17, 10 ** 18 - 1),  # 假设 ID_number 是类似 SSN 的格式
        "Contact": fake.phone_number(),
        "email": fake.email(),
    }


def generate_random_position():
    return {
        "position_id": random.randint(1, 100000),  # 假设 position_id 是一个随机整数
        "name": fake.job(),
        "description": fake.text(max_nb_chars=200),
        "responsibilities": fake.text(max_nb_chars=300)
    }


# 生成模拟的教育经历数据
def generate_fake_education(person_id):
    schools = [
        "北京大学", "清华大学", "浙江大学", "复旦大学", "上海交通大学",
        "南京大学", "中国科学技术大学", "哈尔滨工业大学", "同济大学", "西安交通大学",
        "北京航空航天大学", "北京理工大学", "华中科技大学", "华南理工大学", "天津大学",
        "东南大学", "武汉大学", "四川大学", "重庆大学", "电子科技大学",
        "中山大学", "华南师范大学", "华东师范大学", "西南交通大学", "西北工业大学", "哈尔滨工程大学"
    ]
    return {
        "person_id": person_id,
        "institution": fake.random_element(elements=schools),
        "degree": fake.random_element(elements=("博士", "硕士", "学士")),
        "major": fake.random_element(elements=("水声工程", "计算机科学", "数学", "物理", "化学")),
        "start_date": fake.date_between(start_date="-10y", end_date="-5y").isoformat(),
        "end_date": fake.date_between(start_date="-4y", end_date="today").isoformat()
    }


# 生成模拟的工作经历数据
def generate_fake_experience(person_id):
    companies = [
        "bilibili", "腾讯", "阿里巴巴", "字节跳动", "华为", "小米", "百度", "京东", "网易", "美团",
        "滴滴出行", "快手", "拼多多", "携程", "爱奇艺", "优酷", "饿了么", "摩拜单车", "ofo", "58同城",
        "安居客", "赶集网", "链家网", "贝壳找房", "自如", "滴滴出行", "去哪儿网", "携程旅游", "同程旅游", "马蜂窝"
    ]
    positions = [
        "高级程序员", "软件工程师", "项目经理", "技术经理", "系统分析师", "数据分析师", "产品经理", "运维工程师",
        "测试工程师", "UI设计师", "UX设计师", "前端开发", "后端开发", "全栈开发", "云计算工程师", "大数据工程师",
        "人工智能工程师", "机器学习工程师", "区块链工程师", "安全工程师"
    ]
    return {
        "person_id": person_id,
        "company_name": fake.random_element(elements=companies),
        "position": fake.random_element(elements=positions),
        "start_date": fake.date_between(start_date="-10y", end_date="-5y").isoformat(),
        "end_date": fake.date_between(start_date="-4y", end_date="today").isoformat()
    }


def set_position(person_id, position_id):
    headers = {'Content-Type': 'application/json'}
    data = {
        "action": "add",
        "employee_id": person_id,
        "position_id": position_id
    }
    response = requests.post("http://localhost:8000/api/persons/positions/change/", json=data, headers=headers)
    print(f"Person ID: {person_id}, Position ID: {position_id}")
    print(f"Response Status Code: {response.status_code}")
    print(f"Response Body: {response.json()}\n")


def batch_upload(num_records, num_positions):
    base_url = "http://localhost:8000/api"

    headers = {'Content-Type': 'application/json'}

    for _ in range(num_records):
        person_data = generate_random_person()
        response = requests.post(f"{base_url}/persons/add/", json=person_data, headers=headers)

        if response.status_code == 200:
            print(f"Successfully added: {person_data}")
        else:
            print(f"Failed to add {person_data}. Status code: {response.status_code}, Response: {response.text}")

    for _ in range(num_positions):
        position_data = generate_random_position()
        response = requests.post(f"{base_url}/positions/add/", json=position_data, headers=headers)
        print(f"Uploaded: {position_data}")
        print(f"Response Status Code: {response.status_code}")
        print(f"Response Body: {response.json()}\n")

    for person_id in range(1, num_records + 1):
        education = generate_fake_education(person_id)
        response = requests.post(f"{base_url}/persons/education/add/", json=education, headers=headers)
        if response.status_code == 200:
            print(f"Education for person {person_id} added successfully.")
        else:
            print(
                f"Failed to add education for person {person_id}. Status code: {response.status_code}, Response: {response.text}")

    for person_id in range(1, num_records + 1):
        experience = generate_fake_experience(person_id)
        response = requests.post(f"{base_url}/persons/experience/add/", json=experience, headers=headers)
        if response.status_code == 200:
            print(f"Experience for person {person_id} added successfully.")
        else:
            print(
                f"Failed to add experience for person {person_id}. Status code: {response.status_code}, Response: {response.text}")

    for _ in range(num_records):
        person_id = random.randint(1, num_records)
        position_id = random.randint(1, num_positions)
        set_position(person_id, position_id)


if __name__ == "__main__":
    batch_upload(num_records=10, num_positions=2)
