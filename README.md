# ProjectHub

### [Live Demo](https://project--hub.vercel.app)

#### A responsive project management web app inspired by Jira.

- **Client**: TypeScript, React, React Query, Mantine
- **Server**: TypeScript, Node, Express, MongoDB/Mongoose

## Demo

![overview-dashboard](https://user-images.githubusercontent.com/91587325/221419343-1d11b7ae-88ac-463b-aef4-e9dcb128fb0b.png)
![project-dashboard](https://user-images.githubusercontent.com/91587325/221419423-bcc44726-8c12-45b5-a82b-7ee330cdfb6e.png)
![issue](https://user-images.githubusercontent.com/91587325/221420568-61bee96a-c47a-40a2-bb3d-dc77bb8d0464.gif)

## Features

- Project
  - Create/edit/delete an issue within a project (Task, Story, or Bug)
  - Drag and drop an issue within a column or between two columns to change its status
  - Filter issues by title or assigned user(s)
  - Search for issues across all projects
- User Account
  - Register, login and logout
  - Edit user profile
- Project Management
  - Create/edit/delete a project
- Admin Settings
  - Edit a member's role (Admin, Project Manager, or Member)

## Further Improvements

- Allow users to create/edit/delete a column
- Add drag and drop for columns
- Make all tables sortable
- Add end-to-end and integration tests

## Run Locally

- Clone repo

```bash
  git clone https://github.com/zachloh/project-management-app.git
```

- Client
  - env variable: REACT_APP_API_URL
  - ```
      cd project-management-app/client
      npm install
      npm start
    ```
- Server
  - env variables: PORT, MONGO_URI, ORIGIN, ACCESS_TOKEN_SECRET, TOKEN_EXPIRE_TIME, DEMO_PASSWORD
  - ```
      cd project-management-app/server
      npm install
      npm run dev
    ```
