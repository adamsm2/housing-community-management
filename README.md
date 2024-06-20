# Warsaw Housing Community

## Table of Contents
- [Home page demo](#home-page-demo)
- [Technologies](#technologies)
- [Refresh token flow](#refresh-token-flow)
- [How to use](#how-to-use)
- [Features](#features)


## Home page demo
![gifHomePage](https://github.com/adamsm2/housing-community-management/assets/95346590/798d5ccd-c283-4d21-a823-72ab3bb4cece)


## Technologies
- Docker - complex configuration with health checks
  
### Frontend
- Vite
- Typescript
- React
- Tailwind
- i18next
- Axios

### Backend
- Java
- Maven
- SpringBoot
- Hibernate
- OpenAPI (Swagger 3)
- TestContainers
- Junit
- PostgreSQL


## Refresh token flow
![refreshTokenFlow](https://github.com/adamsm2/housing-community-management/assets/95346590/ed738eea-ffbe-4824-86d7-f1fb7b42dcd4)


## How to use
### Access Swagger UI: http://localhost:8080/swagger-ui/index.html

### Build

```
docker compose build
```

### Run all

```
docker compose up
```

### Run db in detach mode

```
docker compose up db -d
```

### Stop all

```
docker compose down
```


## Features
- [x] User authentication and authorization (JWT)
- [x] Automatic access token refreshing when needed
- [x] Home page
- [x] Theme, language switching
- [ ] Announcements page
- [ ] User dashboard
- [ ] Admin dashboard
