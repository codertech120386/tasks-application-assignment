## This is a Python FastAPI application for tasks

### Getting Started

- You need to start your docker setup and then navigate to backend directory and then run **docker-compose up -d --build
  ** and this command will provide Python, Postgres and the fastapi application required
- due to security reasons it is not advisable to commit .env file which holds the environment variables so I am not
  pushing that, but I have created a .env.example file which will tell you what all environment variables are required
  for this application

### Features that this application supports is

- authentication
- authorisation
- tasks management

### Shutting down

- Once you are done then you can run **docker-compose down** and if you don't want to keep the data then you instead run
  **docker-compose down -v** and this will delete the data volume that was attached to this application 
