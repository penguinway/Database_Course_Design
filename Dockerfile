FROM python:3.10-slim-bullseye

WORKDIR /app

# 复制项目文件
COPY . /app

RUN sed -i 's/deb.debian.org/mirrors.ustc.edu.cn/g' /etc/apt/sources.list && \
sed -i 's/security.debian.org/mirrors.ustc.edu.cn/g' /etc/apt/sources.list
# 安装系统依赖
# 添加系统依赖
RUN apt-get update && apt-get install -y \
    pkg-config \
    default-libmysqlclient-dev \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# 安装依赖
RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8000

CMD ["python3", "manage.py", "runserver", "localhost:8000"]
