# ⚡ Real-Time Server & Service Uptime Monitor

A production-ready, containerized React application designed to monitor real-time server and microservice health status, built with a modern DevOps workflow using **Docker, Nginx, GitHub Actions, and Docker Hub**.

The project demonstrates practical DevOps concepts including **containerization, multi-stage Docker builds, automated CI/CD pipelines, secure secret management, and container image publishing**.

---

## 🚀 Tech Stack & DevOps Tools

| Category           | Technology         |
| ------------------ | ------------------ |
| Frontend           | React (Vite), CSS3 |
| Containerization   | Docker             |
| Web Server         | Nginx Alpine       |
| CI/CD              | GitHub Actions     |
| Container Registry | Docker Hub         |
| Version Control    | Git & GitHub       |

---

## ✨ Key Features

* ⚡ Real-time server and service status monitoring
* 🟢 Visual online/offline health indicators
* 📊 Clean and responsive monitoring dashboard
* 🐳 Fully containerized using Docker
* 🏗️ Optimized multi-stage Docker build
* 🌐 Production frontend served through Nginx
* 🔄 Automated CI/CD pipeline with GitHub Actions
* 📦 Automatic Docker image publishing to Docker Hub
* 🔐 Secure credential handling using GitHub Repository Secrets
* 🚀 Portable deployment across Docker-compatible environments

---

## 🏗️ Project Architecture

```text
Developer
    │
    │ git push
    ▼
GitHub Repository
    │
    ▼
GitHub Actions
    │
    ├── Checkout Source Code
    ├── Authenticate with Docker Hub
    ├── Build Docker Image
    └── Push Docker Image
            │
            ▼
        Docker Hub
            │
            ▼
     Deployment Environment
            │
            ▼
     Docker Container
            │
            ▼
       Nginx + React
```

---

## 🛠️ Local Setup

### Prerequisites

Make sure the following tools are installed:

* Git
* Docker
* A modern web browser

### 1. Clone the Repository

```bash
git clone https://github.com/Rumal2002/server-monitor-app.git
cd server-monitor-app
```

### 2. Build the Docker Image

```bash
docker build -t server-dashboard-img .
```

### 3. Run the Docker Container

```bash
docker run -d -p 8080:80 --name server-dashboard server-dashboard-img
```

### 4. Access the Application

Open your browser and navigate to:

```text
http://localhost:8080
```

---

## 🐳 Docker Architecture

The application uses a **multi-stage Docker build** to keep the final production image lightweight and optimized.

### Build Stage

The first stage:

* Uses Node.js to install dependencies
* Builds the React/Vite application
* Generates optimized production files

### Production Stage

The second stage:

* Uses the lightweight Nginx Alpine image
* Copies only the production build files
* Serves the React application through Nginx

This approach reduces the final image size and avoids including unnecessary development dependencies in the production container.

---

## 🔄 CI/CD Pipeline

The project includes an automated CI/CD pipeline using **GitHub Actions**.

### Pipeline Trigger

The workflow automatically runs whenever code is pushed to the:

```text
main
```

branch.

### Pipeline Process

```text
Code Change
    │
    ▼
git push origin main
    │
    ▼
GitHub Actions Triggered
    │
    ▼
Checkout Repository
    │
    ▼
Login to Docker Hub
    │
    ▼
Build Docker Image
    │
    ▼
Push Image to Docker Hub
    │
    ▼
rumal2002/server-monitor-app:latest
```

---

## 🔐 GitHub Secrets

Docker Hub credentials are securely stored using **GitHub Repository Secrets** instead of being hardcoded inside the repository.

The CI/CD workflow uses:

```text
DOCKER_USERNAME
DOCKER_PASSWORD
```

These secrets allow GitHub Actions to securely authenticate with Docker Hub during the automated pipeline.

---

## 📦 Docker Image

The CI/CD pipeline automatically builds and publishes the latest Docker image as:

```text
rumal2002/server-monitor-app:latest
```

The image can be pulled using:

```bash
docker pull rumal2002/server-monitor-app:latest
```

Run the published image:

```bash
docker run -d -p 8080:80 --name server-dashboard rumal2002/server-monitor-app:latest
```

Then access:

```text
http://localhost:8080
```

---

## 📂 Project Structure

```text
server-monitor-app/
│
├── src/
│   ├── components/
│   ├── assets/
│   └── ...
│
├── public/
│
├── .github/
│   └── workflows/
│       └── docker-build.yml
│
├── Dockerfile
├── .dockerignore
├── package.json
├── vite.config.js
└── README.md
```

---

## 🎯 DevOps Concepts Demonstrated

This project demonstrates hands-on experience with:

* Docker containerization
* Multi-stage Docker builds
* Nginx production hosting
* Docker image management
* Docker Hub container registry
* GitHub Actions
* CI/CD pipeline automation
* GitHub Repository Secrets
* Git-based development workflow
* Automated build and image publishing

---

## 👨‍💻 Author

**Rumal Medagedara**

Software Engineering Undergraduate
Full-Stack Developer | Aspiring DevOps Engineer

### GitHub

[Rumal2002](https://github.com/Rumal2002)

---

## ⭐ Support

If you find this project useful or interesting, consider giving the repository a **star ⭐**.
