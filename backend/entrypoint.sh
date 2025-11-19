#!/bin/sh

echo "Waiting for database to be ready..."

echo "Host: $DB_HOST"
echo "Port: $DB_PORT"

while ! nc -z $DB_HOST $DB_PORT; do
  sleep 1
done

echo "Database is up!"

# Ejecutar el comando principal
exec "$@"