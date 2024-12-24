#!/bin/bash

# 等待数据库启动
./wait-for-it.sh db:3306 --timeout=25 --strict -- echo "Database is up"

# 检查迁移是否已经应用
if [ ! -f /app/.migrations_done ]; then
    echo "Running migrations..."
    python manage.py migrate

    # 创建超级用户（如果需要）
    python manage.py createsuperuser --noinput || true

    # 标记迁移已完成
    touch /app/.migrations_done
else
    echo "Migrations already done, skipping..."
fi

# 启动 Django 开发服务器
python manage.py runserver 0.0.0.0:8000
