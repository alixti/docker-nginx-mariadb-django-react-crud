# Full-Stack CRUD Application

A production-ready full-stack web application demonstrating a complete CRUD (Create, Read, Update, Delete) implementation using modern technologies: **Docker**, **Nginx**, **MariaDB**, **Django**, and **React**.

## 🚀 Features

- **Full CRUD Operations**: Create, read, update, and delete movies
- **RESTful API**: Django REST Framework backend
- **Modern Frontend**: React with React Router for SPA navigation
- **Containerized**: Fully dockerized architecture for easy deployment
- **Reverse Proxy**: Nginx for routing and load balancing
- **Database Management**: MariaDB with phpMyAdmin interface
- **Development & Production Ready**: Configured for both environments

## 📋 Table of Contents

- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Port Configuration](#port-configuration)
- [Usage](#usage)
- [Development](#development)
- [Production Deployment](#production-deployment)
- [Database Management](#database-management)
- [Troubleshooting](#troubleshooting)
- [License](#license)

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────┐
│                    Client                        │
│               (Browser: Port 8080)               │
└─────────────────┬───────────────────────────────┘
                  │
┌─────────────────▼───────────────────────────────┐
│                  Nginx                           │
│           (Reverse Proxy: Port 80)               │
│  ┌──────────────────────────────────────────┐  │
│  │  Routes requests to Django or React       │  │
│  │  - /api/* → Django Backend                │  │
│  │  - /* → React Frontend (dev) or Static    │  │
│  └──────────────────────────────────────────┘  │
└─────────┬─────────────────────┬─────────────────┘
          │                     │
┌─────────▼──────────┐  ┌──────▼──────────────────┐
│   Django (8000)    │  │   React (5173)          │
│  REST API Backend  │  │   Vite Dev Server       │
│  - DRF Endpoints   │  │   - Hot Module Reload   │
│  - Business Logic  │  │   - React Router        │
└─────────┬──────────┘  └─────────────────────────┘
          │
┌─────────▼──────────┐
│  MariaDB (3306)    │
│  Database Server   │
│  - Movies Table    │
└────────────────────┘
```

## 🛠️ Tech Stack

### Backend
- **Django 5.2.8**: Python web framework
- **Django REST Framework 3.15.2**: RESTful API toolkit
- **MySQL Client 2.2.5**: Database connector

### Frontend
- **React 19.2.0**: UI library
- **React Router 7.9.6**: Client-side routing
- **Vite 7.2.2**: Fast build tool and dev server

### Infrastructure
- **Docker & Docker Compose**: Containerization
- **Nginx**: Reverse proxy and web server
- **MariaDB Latest**: Relational database
- **phpMyAdmin**: Database management UI

## ✅ Prerequisites

- [Docker](https://www.docker.com/get-started) (version 20.10 or higher)
- [Docker Compose](https://docs.docker.com/compose/install/) (version 1.29 or higher)
- Git (for cloning the repository)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/alixti/docker-nginx-mariadb-django-react-crud.git
cd docker-nginx-mariadb-django-react-crud
```

### 2. Environment Configuration

Create a `.env.dev` file in the `backend` directory (or modify the existing one):

```env
DJANGO_SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost 127.0.0.1
DB_NAME=simplecrud_db
DB_USER=simplecrud_dbuser
DB_PASSWORD=db_password123
DB_HOST=simplecrud_mariadb
DB_PORT=3306
```

### 3. Build and Start Services

```bash
docker-compose up --build
```

This command will:
- Build all Docker images
- Create and start all containers
- Set up the database
- Start the development servers

### 4. Run Database Migrations

Open a new terminal and run:

```bash
docker exec -it simplecrud_django bash
python manage.py makemigrations
python manage.py migrate
exit
```

### 5. Access the Application

Open your browser and navigate to:
- **Application**: [http://localhost:8080](http://localhost:8080)
- **phpMyAdmin**: [http://localhost:8081](http://localhost:8081)

## 📁 Project Structure

```
docker-nginx-mariadb-django-react-crud/
├── backend/                    # Django backend
│   ├── Dockerfile             # Django container configuration
│   ├── requirements.txt       # Python dependencies
│   ├── manage.py             # Django management script
│   ├── entrypoint.sh         # Container entrypoint script
│   ├── .env.dev              # Environment variables
│   ├── simplecrud/           # Django project settings
│   │   ├── settings.py       # Main settings
│   │   ├── urls.py           # URL routing
│   │   └── views.py          # View logic
│   └── moviesapp/            # Movies application
│       ├── models.py         # Database models
│       ├── serializers.py    # DRF serializers
│       ├── views.py          # API views
│       ├── urls.py           # App URL routing
│       └── migrations/       # Database migrations
├── frontend/                  # React frontend
│   ├── Dockerfile            # React container configuration
│   ├── package.json          # Node dependencies
│   ├── vite.config.js        # Vite configuration
│   ├── index.html            # Entry HTML file
│   └── src/                  # React source code
│       ├── App.jsx           # Main App component
│       ├── main.jsx          # Entry point
│       └── pages/            # Page components
│           ├── MovieList.jsx
│           ├── MovieCreate.jsx
│           ├── MovieEdit.jsx
│           ├── MovieView.jsx
│           └── MovieDelete.jsx
├── nginx/                     # Nginx configuration
│   ├── Dockerfile            # Nginx container
│   └── nginx.conf            # Nginx routing rules
├── docker-entrypoint-initdb.d/
│   └── 01-createuser.sql     # Database initialization
├── docker-compose.yml         # Docker Compose configuration
└── README.md                  # This file
```

## 🔌 Port Configuration

| Service       | Internal Port | External Port | Access                        |
|---------------|---------------|---------------|-------------------------------|
| **Nginx**     | 80            | 8080          | Main application entry point  |
| **Django**    | 8000          | 8000          | ⚠️ Do not access directly     |
| **React**     | 5173          | 5173          | ⚠️ Do not access directly     |
| **MariaDB**   | 3306          | 3306          | Database connections          |
| **phpMyAdmin**| 80            | 8081          | Database management UI        |

> **Important**: Always access the application through **port 8080** (Nginx). Direct access to Django (8000) or React (5173) bypasses the proxy configuration.

## 💡 Usage

### API Endpoints

The Django REST API provides the following endpoints:

- `GET /api/movies/` - List all movies
- `POST /api/movies/` - Create a new movie
- `GET /api/movies/{id}/` - Retrieve a specific movie
- `PUT /api/movies/{id}/` - Update a movie
- `DELETE /api/movies/{id}/` - Delete a movie

### Frontend Routes

The React application uses client-side routing:

- `/` - Movie list (homepage)
- `/create` - Create new movie
- `/edit/{id}` - Edit existing movie
- `/view/{id}` - View movie details
- `/delete/{id}` - Delete confirmation

## 🔧 Development

### Access Container Shell

**Django Container:**
```bash
docker exec -it simplecrud_django bash
```

**React Container:**
```bash
docker exec -it simplecrud_react sh
```

**Database Container:**
```bash
docker exec -it simplecrud_mariadb bash
```

### Django Management Commands

Inside the Django container:

```bash
# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Collect static files
python manage.py collectstatic

# Run tests
python manage.py test
```

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f django
docker-compose logs -f react
docker-compose logs -f nginx
```

### Stop Services

```bash
# Stop all services
docker-compose down

# Stop and remove volumes (⚠️ deletes database data)
docker-compose down -v
```

### Restart Services

```bash
# Restart all services
docker-compose restart

# Restart specific service
docker-compose restart django
```

## 🚢 Production Deployment

For production deployment, follow these steps:

### 1. Build React for Production

```bash
cd frontend
npm run build
```

This creates optimized static files in `frontend/dist/`.

### 2. Update Nginx Configuration

Uncomment the production volume in `docker-compose.yml`:

```yaml
nginx:
  volumes:
    - ./frontend/dist:/app/dist  # Uncomment this line
```

Update `nginx/nginx.conf` to serve static files:

```nginx
location @webapp {
  internal;
  alias /app/dist/;
  try_files $uri /index.html;
}
```

### 3. Update Environment Variables

Create `backend/.env.prod`:

```env
DJANGO_SECRET_KEY=your-production-secret-key
DEBUG=False
ALLOWED_HOSTS=yourdomain.com www.yourdomain.com
DB_NAME=simplecrud_db
DB_USER=simplecrud_dbuser
DB_PASSWORD=strong-production-password
DB_HOST=simplecrud_mariadb
DB_PORT=3306
```

### 4. Collect Static Files

```bash
docker exec -it simplecrud_django python manage.py collectstatic --noinput
```

### 5. Security Considerations

- Change all default passwords
- Use strong `DJANGO_SECRET_KEY`
- Set `DEBUG=False`
- Configure proper `ALLOWED_HOSTS`
- Use HTTPS with SSL certificates
- Restrict database access
- Implement rate limiting

## 🗄️ Database Management

### Using phpMyAdmin

1. Navigate to [http://localhost:8081](http://localhost:8081)
2. Login credentials:
   - **Server**: `db`
   - **Username**: `simplecrud_dbuser`
   - **Password**: `db_password123`

### Using MySQL Client

```bash
# From host machine
mysql -h 127.0.0.1 -P 3306 -u simplecrud_dbuser -p

# From Django container
docker exec -it simplecrud_django python manage.py dbshell
```

### Backup Database

```bash
docker exec simplecrud_mariadb mysqldump -u root -pdb_password123 simplecrud_db > backup.sql
```

### Restore Database

```bash
docker exec -i simplecrud_mariadb mysql -u root -pdb_password123 simplecrud_db < backup.sql
```

## 🐛 Troubleshooting

### Database Connection Issues

**Problem**: Django can't connect to MariaDB

**Solution**:
```bash
# Ensure database is running
docker-compose ps

# Check database logs
docker-compose logs db

# Verify credentials in backend/.env.dev
```

### Port Already in Use

**Problem**: `Error: Port 8080 is already allocated`

**Solution**:
```bash
# Find process using the port
netstat -ano | findstr :8080

# Kill the process or change port in docker-compose.yml
```

### Migration Errors

**Problem**: Database migration fails

**Solution**:
```bash
# Reset migrations (⚠️ loses data)
docker exec -it simplecrud_django bash
python manage.py migrate --fake moviesapp zero
python manage.py migrate moviesapp
```

### React Hot Reload Not Working

**Problem**: Changes in React code don't reflect

**Solution**:
- Ensure volumes are properly mounted in `docker-compose.yml`
- Check that `node_modules` volume is created
- Restart the React container: `docker-compose restart react`

### Nginx 502 Bad Gateway

**Problem**: Nginx shows 502 error

**Solution**:
```bash
# Check if Django is running
docker-compose ps django

# Restart services in order
docker-compose restart django
docker-compose restart nginx
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built with ❤️ using Docker, Django, React, and MariaDB**

For questions or issues, please open an issue on [GitHub](https://github.com/alixti/docker-nginx-mariadb-django-react-crud).