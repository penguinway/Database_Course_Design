FROM python:3.10-slim

# 设置工作目录
WORKDIR /app

# 安装必要的系统依赖
RUN apt-get update && apt-get install -y \
    default-libmysqlclient-dev \
    pkg-config \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# 将项目的 requirements.txt 复制到容器中
COPY requirements.txt /app/

# 安装 Python 依赖
RUN pip install --no-cache-dir -r requirements.txt -i https://mirrors.tuna.tsinghua.edu.cn/pypi/web/simple

# 复制整个 Django 项目到容器中
COPY . /app/

# 设置环境变量
ENV PYTHONUNBUFFERED 1

# 安装等待数据库服务的脚本
COPY ./wait-for-it.sh /app/
COPY entrypoint.sh /

# 确保脚本可执行
RUN chmod +x /app/wait-for-it.sh

# 赋予执行权限
RUN chmod +x /entrypoint.sh

# 设置容器入口点
ENTRYPOINT ["/entrypoint.sh"]
