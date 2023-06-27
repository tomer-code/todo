# Todo web application

### Installation
Open the folder 'todo' in IDE (VS Code, IntelliJ, etc.) and run **npm i** to install dependencies

### Getting Started
Run the command 'run npm i and then npm run start ' in the terminal to start the application.

### Overview
This project implements the backend of a TO-DOs web application.
The application allows users to create new task, edit tasks, delete task, and get task by Id. 
Each task has a description(type string) and a deadline(type date) which the user should send 
also the date that it created and the status - you can see in modules the structure.
Additionally, the application includes a notification logic that sends users notifications
when their task are approaching their deadlines (return all the task that the date past).

### System Overview
The backend of the TO-DOs web application consists of two microservices:
the Todos microservice and the Notifications microservice.
Each microservice is responsible for specific functionalities.

#### Main components
### Todos Microservice
handles all operations related to managing todos.

It provides the following functionalities:
Creating a new task, before creating new task we make validation to check the thr input correct.
Retrieving a task by id
Updating an existing task by id
Deleting a task by id
The Todos microservice stores todo data in a MongoDB database.

### Notifications Microservice
The Notifications microservice is responsible for sending notifications
to users when their deadline reached.
it checks each task if the date past, and sent to the method sendNotification()
Also, it provides the following functionalities:
Creating a new notification, while checking that the taskId is valid.
Retrieving a list of all notifications
Updating an existing notifications by id
Deleting a notification by id

### testsaaaaa
Run 'npm test' in the terminal to run tests.



