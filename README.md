# Task Manager Full Stack Application
## 📁 Project Structure

```
task-manager/
├── task-manager-backend/                 # Laravel API
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/
│   │   │   ├── Requests/
│   │   │   └── Resources/
│   │   ├── Models/
│   │   ├── Services/
│   │   └── Repositories/
│   ├── database/
│   │   └── migrations/
│   └── routes/
└── task-manager-frontend/               # React App
    ├── src/
    │   ├── components/
    │   ├── hooks/
    │   ├── services/
    │   ├── types/
    │   └── utils/
    └── public/
```

## 🔧 Prerequisites

Before you begin, ensure you have the following installed:

- **PHP** >= 8.1
- **Composer** >= 2.0
- **Node.js** >= 16.0
- **npm** or **yarn**
- **PostgreSQL** >= 12.0

## 🚀 Installation

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd task-manager
```

### Step 2: Backend Setup (Laravel)

#### 2.1 Navigate to Backend Directory

```bash
cd task-manager-backend
```

#### 2.2 Install PHP Dependencies

```bash
composer install
```

#### 2.3 Environment Configuration

```bash
cp .env.example .env
```

#### 2.4 Generate Application Key

```bash
php artisan key:generate
```

#### 2.5 Database Setup

Create a PostgreSQL database:

```sql
CREATE DATABASE task_manager;
```

Update your `.env` file with database credentials:

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=task_manager
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

#### 2.6 Run Database Migrations

```bash
php artisan migrate
```

#### 2.7 Install Laravel Sanctum (Optional - for API authentication)

```bash
php artisan vendor:publish --provider="Laravel\Sanctum\SanctumServiceProvider"
```

#### 2.8 Start the Laravel Development Server

```bash
php artisan serve
```

The backend API will be available at `http://localhost:8000`

### Step 3: Frontend Setup (React)

#### 3.1 Navigate to Frontend Directory

```bash
cd ../task-manager-frontend
```

#### 3.2 Install Node Dependencies

```bash
npm install
```

#### 3.3 Environment Configuration

```bash
cp .env.example .env
```

Update the `.env` file with your backend API URL:

```env
REACT_APP_API_URL=http://localhost:8000/api/v1
```

#### 3.4 Start the React Development Server

```bash
npm start
```

The frontend application will be available at `http://localhost:3000`

## 📋 API Endpoints

### Tasks

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/tasks` | Get all tasks (supports `?filter=completed\|incomplete`) |
| POST | `/api/v1/tasks` | Create a new task |
| PATCH | `/api/v1/tasks/{id}` | Toggle task completion status |
| DELETE | `/api/v1/tasks/{id}` | Delete a task |

### Request/Response Examples

#### Create Task
```json
POST /api/v1/tasks
{
  "title": "Complete project documentation",
  "description": "Write comprehensive README and setup instructions",
  "due_date": "2024-12-31"
}
```

#### Response
```json
{
  "message": "Task created successfully",
  "data": {
    "id": 1,
    "title": "Complete project documentation",
    "description": "Write comprehensive README and setup instructions",
    "completed": false,
    "due_date": "2024-12-31",
    "is_overdue": false,
    "created_at": "2024-01-15T10:30:00.000000Z",
    "updated_at": "2024-01-15T10:30:00.000000Z"
  }
}
```

**Happy Task Managing! 🎯**
