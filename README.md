# Express + Sequelize + Passport.js

- 로그인 시스템의 기본 모델 작업
- JWT 형태

1. 파일생성
  - .env : 환경 변수 설정
  - config/config.json : Database 연결정보 설정

```Text

PORT=<port number>
JWT_KEY=<JWT SECRETKEY>

```

```JSON
  // /config/config.json
  
  {
  "development": {
    "username": <username>,
    "password": <password>,
    "database": <database>,
    "host": <host>, 
    "dialect": "mariadb"
  },
  "test": {
    "username": <username>,
    "password": <password>,
    "database": <database>,
    "host": <host>, 
    "dialect": "mariadb"
  },
  "production": {
    "username": <username>,
    "password": <password>,
    "database": <database>,
    "host": <host>, 
    "dialect": "mariadb"
  }
}


```
