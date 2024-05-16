## This is a Vite + React + Typescript application for tasks

### Getting Started

- navigate to frontend folder
- from there first install dependencies using **npm i**
- then run **npm run serve:local** to start the application
- visit localhost:5173 on the browser to check the application

### Features that this application supports is

- authentication
- authorisation
- tasks management

### application details

- application has 3 routes

  - /login
  - /register
  - /tasks

  - out of these 3 routes /tasks is auth protected which means you need to first login or register and only then you will be able to use the route and if a user is logged in once then he cannot access login or register route till he logouts
  - so first create an account on /register route and then it will redirect you to /tasks as I am trying to eliminate an extra step of login after register
  - You can also login using /login route and then it will redirect you to /tasks
  - Once on the /tasks page you can do the following things
    - create a new task
    - see your existing tasks
    - filter tasks by status
    - sort the tasks by title, description, status, created or updated fields
    - user can also edit or delete his tasks
    - If there are more than 10 tasks then they will be shown in a paginated manner.
    - Finally logout and once logged out user cannot visit this page till he logs in again

### Assumptions

- I am fetching all tasks by default
