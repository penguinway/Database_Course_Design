# ⚓ 船舶人力资源管理系统

[![MIT License][license-shield]][license-url]
[![Docker][docker-shield]][docker-url]
[![Django][django-shield]][django-url]
[![React][react-shield]][react-url]

> 哈尔滨工程大学软件工程综合课程设计作品
> 专为船舶行业打造的专业人力资源管理解决方案

[🚀 在线演示](http://ship.penguinway.space) • [📖 文档](#文档) • [🐛 报告问题](https://github.com/penguinway/Database_Course_Design/issues) • [💡 功能建议](https://github.com/penguinway/Database_Course_Design/issues)

---

## 📋 目录

- [✨ 特性](#特性)
- [🏗️ 技术架构](#技术架构)
- [🚀 快速开始](#快速开始)
  - [环境要求](#环境要求)
  - [安装方式](#安装方式)
  - [开发模式](#开发模式)
- [📁 项目结构](#项目结构)
- [🔧 配置说明](#配置说明)
- [📖 API文档](#api文档)
- [🐳 Docker部署](#docker部署)
- [🤝 贡献指南](#贡献指南)
- [📝 更新日志](#更新日志)
- [📄 许可证](#许可证)

---

## ✨ 特性

### 👥 员工管理
- **完整信息管理**: 员工基本信息、联系方式、身份证等
- **多岗位关联**: 支持员工担任多个岗位
- **智能搜索**: 按姓名、岗位、部门等多维度搜索
- **数据导入导出**: 支持批量数据操作

### 🏛️ 岗位管理
- **岗位层级管理**: 建立完整的岗位体系
- **职责描述**: 详细的岗位职责和要求说明
- **编制管理**: 岗位编制和人数统计

### 🎓 教育经历
- **学历信息**: 完整的教育背景记录
- **专业管理**: 专业与岗位匹配度分析
- **时间线展示**: 清晰的学习历程展示

### 💼 工作经历
- **职业轨迹**: 完整的职业发展路径
- **公司档案**: 历史工作单位记录
- **经验统计**: 工作年限和经验分析

### 📊 数据分析
- **可视化图表**: 直观的数据展示
- **统计报表**: 人力成本和结构分析
- **趋势预测**: 人员流动趋势分析

### 🎨 用户体验
- **响应式设计**: 适配各种设备屏幕
- **现代化界面**: 基于Ant Design的美观UI
- **流畅交互**: 优化的用户操作体验
- **实时更新**: 数据实时同步刷新

---

## 🏗️ 技术架构

### 后端技术栈
```
🐍 Python 3.10+
├── 🎯 Django 5.x           # Web框架
├── 🌐 Django REST Framework # API框架
├── 🗄️ MySQL 8.0           # 数据库
├── 🦄 Gunicorn            # WSGI服务器
└── 🌉 django-cors-headers # 跨域支持
```

### 前端技术栈
```
⚛️ React 18.x
├── 🎨 TypeScript           # 类型安全
├── 🎯 Ant Design 5.x      # UI组件库
├── 📊 @ant-design/charts  # 图表组件
├── 🛣️ React Router 7.x    # 路由管理
├── ⚡ Vite 6.x            # 构建工具
└── 📡 Axios               # HTTP客户端
```

### 部署架构
```
🐳 Docker & Docker Compose
├── 🗄️ MySQL Container      # 数据库服务
├── 🐍 Django Container     # 后端API服务
└── 🌐 Nginx Container      # 反向代理 & 静态文件服务
```

---

## 🚀 快速开始

### 环境要求

| 环境 | 最低版本 | 推荐版本 |
|------|---------|----------|
| Python | 3.10 | 3.11+ |
| Node.js | 18.0 | 20.0+ |
| MySQL | 8.0 | 8.0+ |
| Docker | 20.0 | 24.0+ |

### 安装方式

#### 🐳 Docker快速部署（推荐）

```bash
# 1. 克隆项目
git clone https://github.com/penguinway/Database_Course_Design.git
cd Database_Course_Design

# 2. 启动所有服务
cd docker
docker-compose up -d

# 3. 等待服务启动完成
docker-compose logs -f

# 4. 访问应用
# 前端: http://localhost:8090
# 后端API: http://localhost:8000
# 管理后台: http://localhost:8000/admin
```

#### 🔧 手动安装部署

**后端部署**

```bash
# 1. 创建Python虚拟环境
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 2. 安装依赖
pip install -r requirements.txt

# 3. 配置数据库
# 编辑 ship_hr_system/settings.py 中的数据库配置

# 4. 数据库迁移
python manage.py makemigrations
python manage.py migrate

# 5. 创建超级管理员
python manage.py createsuperuser

# 6. 启动Django服务
python manage.py runserver 0.0.0.0:8000
```

**前端部署**

```bash
# 1. 进入前端目录
cd front/ship_hr_system

# 2. 安装依赖
npm install

# 3. 开发模式启动
npm run dev

# 4. 生产构建
npm run build

# 5. 预览构建结果
npm run preview
```

---

## 📁 项目结构

```
ship_hr_system/
├── 📂 backend/                    # Django后端
│   ├── 📂 hr_system/             # 核心应用
│   │   ├── models.py             # 数据模型
│   │   ├── views.py              # 视图逻辑
│   │   ├── urls.py               # 路由配置
│   │   ├── serializers.py        # API序列化
│   │   └── admin.py              # 管理后台
│   ├── 📂 ship_hr_system/        # 项目配置
│   │   ├── settings.py           # 核心设置
│   │   ├── urls.py               # 主路由
│   │   └── wsgi.py               # WSGI配置
│   ├── 📂 templates/             # HTML模板
│   ├── 📂 static/               # 静态文件
│   └── 🐳 Dockerfile            # 后端容器配置
├── 📂 frontend/                   # React前端
│   └── 📂 ship_hr_system/       # 前端应用
│       ├── 📂 src/
│       │   ├── 📂 components/   # 组件库
│       │   ├── 📂 pages/        # 页面组件
│       │   ├── 📂 services/     # API服务
│       │   ├── 📂 utils/        # 工具函数
│       │   ├── App.tsx          # 主应用
│       │   └── main.tsx         # 入口文件
│       ├── 📂 public/           # 公共资源
│       ├── package.json         # 依赖配置
│       └── vite.config.ts       # 构建配置
├── 📂 docker/                    # Docker配置
│   ├── docker-compose.yml       # 服务编排
│   └── 🗄️ mysql/               # 数据库初始化脚本
├── 📂 nginx/                     # Nginx配置
│   └── nginx.conf               # 反向代理配置
├── requirements.txt              # Python依赖
└── README.md                    # 项目文档
```

---

## 🔧 配置说明

### 数据库配置

编辑 `ship_hr_system/settings.py`:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': os.getenv('DB_NAME', 'ship_hr_system'),
        'USER': os.getenv('DB_USER', 'ship_admin'),
        'PASSWORD': os.getenv('DB_PASSWORD', '123456'),
        'HOST': os.getenv('DB_HOST', 'localhost'),
        'PORT': '3306',
        'OPTIONS': {
            'charset': 'utf8mb4',
        },
    }
}
```

### 环境变量配置

创建 `.env` 文件:

```bash
# 数据库配置
DB_NAME=ship_hr_system
DB_USER=ship_admin
DB_PASSWORD=123456
DB_HOST=localhost

# Django配置
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
```

### API配置

```python
# CORS设置
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",  # Vite开发服务器
    "http://localhost:8090",   # 生产环境
]

# REST Framework配置
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
    ],
}
```

---

## 📖 API文档

### 核心API端点

| 方法 | 端点 | 描述 |
|------|------|------|
| GET | `/api/employees/` | 获取员工列表 |
| POST | `/api/employees/` | 创建新员工 |
| GET | `/api/employees/{id}/` | 获取员工详情 |
| PUT | `/api/employees/{id}/` | 更新员工信息 |
| DELETE | `/api/employees/{id}/` | 删除员工 |
| GET | `/api/positions/` | 获取岗位列表 |
| POST | `/api/positions/` | 创建新岗位 |
| GET | `/api/education/` | 获取教育经历 |
| GET | `/api/experience/` | 获取工作经历 |

### API使用示例

```bash
# 获取所有员工
curl -X GET http://localhost:8000/api/employees/

# 创建新员工
curl -X POST http://localhost:8000/api/employees/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "张三",
    "ID_number": "123456789012345678",
    "email": "zhangsan@example.com"
  }'

# 获取岗位列表
curl -X GET http://localhost:8000/api/positions/
```

---

## 🐳 Docker部署

### 服务组件

```yaml
services:
  db:        # MySQL 8.0 数据库
  web:       # Django 后端服务
  nginx:     # Nginx 反向代理
```

### 启动命令

```bash
# 完整启动
docker-compose up -d

# 后台运行
docker-compose up -d --build

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down

# 清理数据（谨慎使用）
docker-compose down -v
```

### 端口映射

| 服务 | 容器端口 | 宿主机端口 |
|------|---------|-----------|
| MySQL | 3306 | 3306 |
| Django | 8000 | 8000 |
| Nginx | 80 | 8090 |

---

## 🤝 贡献指南

我们欢迎所有形式的贡献！请遵循以下步骤：

### 开发流程

1. **Fork 项目**
   ```bash
   git clone https://github.com/your-username/Database_Course_Design.git
   ```

2. **创建功能分支**
   ```bash
   git checkout -b feature/AmazingFeature
   ```

3. **提交更改**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```

4. **推送分支**
   ```bash
   git push origin feature/AmazingFeature
   ```

5. **创建 Pull Request**

### 代码规范

- **Python**: 遵循 PEP 8 规范
- **TypeScript**: 使用 ESLint + Prettier
- **提交信息**: 使用 [Conventional Commits](https://www.conventionalcommits.org/)
- **文档**: 保持注释和文档的及时更新

### 开发环境设置

```bash
# 安装开发依赖
pip install -r requirements-dev.txt
npm install

# 运行测试
python manage.py test
npm test

# 代码检查
flake8 .
npm run lint
```

---

## 📝 更新日志

### v2.0.0 (2024-12)
- ✨ 新增Docker容器化部署
- 🎨 全新React + TypeScript前端界面
- 📊 集成数据可视化图表
- 🔧 完善API文档和测试

### v1.0.0 (2024-06)
- 🎉 初始版本发布
- 👥 基础员工管理功能
- 🏛️ 岗位管理系统
- 🗄️ MySQL数据存储

---

## 📄 许可证

本项目基于 [MIT License](https://github.com/penguinway/Database_Course_Design/blob/master/LICENSE) 开源协议。

```
MIT License

Copyright (c) 2024 哈尔滨工程大学 船舶人力资源管理系统

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 🙏 致谢

感谢以下开源项目和服务：

- [Django](https://www.djangoproject.com/) - 强大的Python Web框架
- [React](https://reactjs.org/) - 用户界面构建库
- [Ant Design](https://ant.design/) - 企业级UI设计语言
- [MySQL](https://www.mysql.com/) - 可靠的关系型数据库
- [Docker](https://www.docker.com/) - 容器化平台
- [Vite](https://vitejs.dev/) - 下一代前端构建工具

特别感谢哈尔滨工程大学软件工程学院的支持和指导！

---

<div align="center">

**[⬆ 回到顶部](#-船舶人力资源管理系统)**

Made with ❤️ by Harbin Engineering University

</div>