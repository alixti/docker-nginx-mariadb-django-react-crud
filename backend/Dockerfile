FROM python:3.12.5

# Prevents Python from writing pyc files to disc
ENV PYTHONDONTWRITEBYTECODE=1

# Prevents Python from buffering stdout and stderr
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Install netcat-traditional for wait-for-it functionality
RUN apt-get update && apt-get install -y netcat-traditional

# Install Python dependencies
RUN pip install --upgrade pip
COPY requirements.txt /app
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entrypoint script into the container
COPY ./entrypoint.sh /app

# Change the entrypoint.sh file to executable
RUN chmod +x /app/entrypoint.sh

# Copy the current directory contents into the container at /app
COPY . /app

ENTRYPOINT ["/app/entrypoint.sh"]