# **Project Name:** Lanes API

### **Overview:**

A RESTful API and the web app for managing tasks with support for user authentication, task categorization, and real-time updates.

## Project Setup

### Step 1

```sh
git clone https://github.com/Irtiza751/lanes.git
```

### Step 2

```sh
yarn install
```

### step 3

Install PostgreSQL and create a database lanes

### step 4

create the `.env` or `.env.local` file in the api folder and paste the content

```
PORT=4000
# db variables
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=user
DATABASE_PASSWORD=password
DATABASE_NAME=lanes
DATABASE_SYNC=true # only for development
DATABASE_AUTOLOAD=true
# jwt variables
JWT_ISSUER=irtiza
JWT_ACCESS_SECRET=you_jwt_secret
JWT_REFRESH_SECRET=your_refresh_jwt_secret
JWT_ACCESS_TTL=24h
JWT_REFRESH_TTL=1w
```

### Step 5 (Optional)

Optionally create the `.env` file in the web folder and the paste the bellow content

```
VITE_API_BASE_URL=http://localhost:4000/api
```

### Step 6

```sh
yarn run dev
```

both apps will start on their respective ports

- **web**: `http://localhost:5173/`
- **api**: `http://localhost:4000/api`

## **6. Optional Stretch Goals**

- REST to GraphQL upgrade
- Mobile app integration (with React Native or Flutter)
- Role-based access control
- GitHub Actions or Docker for deployment
