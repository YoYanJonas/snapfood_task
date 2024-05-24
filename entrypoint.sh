#!/bin/sh

echo "Waiting for DB..."

while ! nc -z $DATABASE_HOST $DATABASE_PORT; do
    sleep 0.1
done

echo "DB started"

echo "Waiting for Redis..."

while ! nc -z $REDIS_HOST $REDIS_PORT; do
    sleep 0.1
done

echo "Redis started"

exec "$@"