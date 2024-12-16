
# Real-Time Chat Application

This is a real-time chat web application built with Spring Boot for the backend and MongoDB for data storage. The application supports user registration, room creation, and real-time messaging. It is designed to be scalable and deployable on Azure using Docker containers.

---

## Features
- **User Authentication**: Register and log in securely.
- **Real-Time Messaging**: Communicate with others instantly.
- **Chat Rooms**: Create and join chat rooms.
- **REST API**: Access chat and user data via REST endpoints.
- **MongoDB Integration**: Store messages and user data persistently.
- **Dockerized Deployment**: Run the application in isolated containers.
- **Azure Deployment**: Host the application in the cloud.

---

## Tech Stack
- **Backend**: Spring Boot
- **Database**: MongoDB
- **Real-Time Messaging**: WebSocket
- **Frontend**: React (or any preferred frontend framework)
- **Containerization**: Docker
- **Cloud Hosting**: Azure

---

## Prerequisites
- **Java** (v17 or later)
- **Node.js** (v20 or later) for frontend (if applicable)
- **MongoDB** (local or hosted instance)
- **Docker**
- **Azure CLI**

---

## Setup Instructions

### Backend Setup (Spring Boot)
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Harshh-sahu/Real_Time_Chat_App
   cd realtime-chat-app/chat-app-backend
   ```

2. **Configure MongoDB**:
   Update `application.properties` with your MongoDB connection details:
   ```properties
   spring.data.mongodb.uri=mongodb://<username>:<password>@<host>:<port>/<database>
   spring.data.mongodb.database=chat-app
   server.port=8081
   ```

3. **Build and Run**:
   ```bash
   ./mvnw clean install
   java -jar target/chat-app-backend-0.0.1-SNAPSHOT.jar
   ```

4. **Test the Backend**:
   Access the API at `http://localhost:8081/api/v1`.

### Frontend Setup
1. **Navigate to Frontend Directory**:
   ```bash
   cd ../chat-front
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run the Frontend**:
   ```bash
   npm start
   ```
   The frontend will run on `http://localhost:5173`.

4. **Configure API Base URL**:
   Update the `baseURL` in the frontend configuration file (e.g., `src/api/config.js`):
   ```javascript
   export const baseURL = "http://localhost:8081";
   ```

---

## Dockerization

### Backend Dockerfile
```dockerfile
FROM openjdk:21-jdk-slim
WORKDIR /app
COPY target/chat-app-backend-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "app.jar"]
```

### Frontend Dockerfile
```dockerfile
FROM node:20 as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Docker Compose
```yaml
version: '3.8'
services:
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "8081:8081"
    environment:
      - SPRING_DATA_MONGODB_URI=mongodb://mongo:27017/chat-app
    depends_on:
      - mongo

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "5173:80"

  mongo:
    image: mongo
    container_name: mongo
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
```

### Build and Run Docker Containers
1. Build and start the containers:
   ```bash
   docker-compose up --build
   ```
2. Access the application:
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:8081`

---

## Deploy on Azure


Before you begin, ensure you have the following:

- An **Azure account** with permissions to create resources.
- **Azure Virtual Machine** with at least **8 GB RAM** (we'll cover the setup).
- Basic knowledge of Azure and terminal commands.

---

## 🛠️ Step-by-Step Guide

### Step 1: Set Up an Azure Virtual Machine

#### 1.1 Create a New Virtual Machine

1. **Log in to the Azure Portal**:  
   Go to [portal.azure.com](https://portal.azure.com) and sign in to your account.

2. **Navigate to Virtual Machines**:  
   In the left sidebar, click on **"Virtual machines"**, then click **"Create"** > **"Azure virtual machine"**.

3. **Configure Basic Settings**:
   - **Subscription**: Select your subscription.
   - **Resource Group**: Create a new resource group or use an existing one.
   - **Virtual Machine Name**: Choose a name (e.g., `react-restaurant-vm`).
   - **Region**: Select a region close to you.
   - **Image**: Choose **Ubuntu Server 20.04 LTS**.
   - **Size**: Select a VM size with at least **8 GB RAM** (e.g., **Standard DS2 v2**).

4. **Set Administrator Account**:
   - **Authentication Type**: Choose **SSH public key**.
   - **Username**: Enter your desired username.
   - **SSH public key source**: Use existing public key
   - **SSH Public Key**: Paste your public SSH key.

5. **Configure Inbound Port Rules**:
   - **Public Inbound Ports**: Select **Allow selected ports**.
   - **Select Inbound Ports**: Choose **SSH (22)** and **HTTP (80)**.

6. **Review and Create**:
   - Click **"Review + create"**.
   - Review the settings and click **"Create"**.

#### 1.2 Obtain the Public IP Address

- After deployment, navigate to your VM and note the **Public IP address**. You'll need this to connect via SSH and to access the website.

---

### Step 2: Connect to Your Azure VM via SSH

1. **Open Terminal**: On your local machine.

2. **Connect to the VM**:
   ```bash
   ssh <username>@<public_ip_address>
   ```
   Replace `<username>` with your VM's username and `<public_ip_address>` with your VM's public IP.

---

### Step 3: Install Docker on the Azure VM

1. **Update System Packages**:
   ```bash
   sudo apt update
   ```

2. **Install Docker**:
   ```bash
   sudo apt install -y docker.io
   ```

3. **Change the owner for docker**:
   ```bash
   sudo chown $USER /var/run/docker.sock
   ```

4. **Verify Docker Installation**:
   ```bash
   docker --version
   ```
   
###

###   ```

---

### Step 4: Clone the Repository on the VM

4. **Pull the docker image to  docker hub**:
   ```bash
   docker push harshsahu2003/chatfront:tagname
   docker push harshsahu2003/chatback:tagname


2. **Navigate into the Project Directory**:
   ```bash
   cd room
   ```

---

### Step 5: Create the Dockerfile on the VM

1. **Create a Dockerfile**:
   ```bash
   nano dockerfile-compose.yml
   ```

2. **Paste the Following Code** into the `dockerfile-compose.yml`:

             

       

 
4. **Save the Dockerfile** and exit (`Ctrl + s`, then `Ctrl + x` to exit).

---

### Step 6: Build the Docker Image on the VM

1. **pull the Docker Image from Docker Hub**:
   ```bash
   docker-compose pull.
   ```
   This command builds the Docker image and tags it as .

---

### Step 7: Run the Docker Container on the VM

1. **Run the Container**:
   ```bash
   docker run -d up
   ```
   - `-d`: Runs the container in detached mode.
   - `-p 80:80`: Maps port `80` of the VM to port `80` of the container.

2. **Verify the Container is Running**:
   ```bash
   docker ps
   ```
   You should see `all the three images` listed.

---
### Step 8: ALLOW OTHER PORT IN VIRTUAL MACHINE
     

   ufw 5173
   ufw 27018
   ufw 8081


### Step 8: Configure Azure Network Security Group (if needed)

If you didn't open port `80` during VM creation, you need to allow inbound traffic on port `80`.

1. **Navigate to Your VM** in the Azure Portal.

2. **Click on "Networking"** in the sidebar.

3. **Add Inbound Port Rule**:
   - **Destination port ranges**: `80`
   - **Protocol**: `TCP`
   - **Action**: `Allow`
   - **Priority**: A number (e.g., `1000`)
   - **Name**: `Allow-HTTP`

4. **Save** the rule.

---

### Step 9: Access the Deployed Website

1. **Open Your Web Browser**.

2. **Navigate to**:
   ```
   http://<public_ip_address>
   ```
   Replace `<public_ip_address>` with your VM's public IP.

3. **You Should See the React Restaurant Website!**

---

## 📂 Additional Docker Commands

- **List Running Containers**:
   ```bash
   docker ps
   ```

- **Stop a Running Container**:
   ```bash
   docker stop <container_id>
   ```

- **Remove a Container**:
   ```bash
   docker rm <container_id>
   ```

- **View Docker Images**:
   ```bash
   docker images
   ```

---

## 🛠️ Troubleshooting

### Common Issues

- **Port Already in Use**:  
  If you encounter an error that port `80` is already in use, try using a different port:
  ```bash
  docker run -d -p 8080:80 react-restaurant-site
  ```
  Then, ensure that port `8080` is allowed in the Azure Network Security Group and access the site via `http://<public_ip_address>:8080`.

- **Permission Denied Errors**:  
  Ensure your user is added to the Docker group:
  ```bash
  sudo usermod -aG docker $USER
  ```

  Then, log out and log back in.
  Or
  ```bash
  sudo chown $USER /var/run/docker.sock
  ```


- **Docker Build Fails**:  
  Ensure all dependencies are correctly installed and that you're connected to the internet.

---

## 🔒 Security Considerations

- **Firewall Rules**:  
  Opening ports to the internet can expose your VM to security risks. Ensure you only open necessary ports and consider using Azure Firewall or Network Security Groups for added security.

- **Updates**:  
  Regularly update your system packages and Docker to the latest versions.


---

## License
This project is licensed under the MIT License. See the LICENSE file for details.

---

## Contributing
Contributions are welcome! Feel free to fork the repository and submit a pull request.
