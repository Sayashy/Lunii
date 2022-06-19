# Lunii

## For Dockerized environment

- Create containers

```sh
  docker-compose up -d
```

- Inspect containers

```sh
  docker-compose ps
```

- Get all logs

```sh
  docker-compose logs -f
```

- Get logs of a specific container

```sh
  docker-compose logs -f api-v1-shortener
```

## Without Docker

### Front

- Install Dependencies

```sh
  npm i
```

- Start application

```sh
  npm start
```

### Api

- Create .env file inside /api-v1-shortener

- Insert these values in your .env file

  1.  DB_HOST=mongodb://host:port/lunii
  2.  PORT=20000

- Install Dependencies

```sh
  npm i
```

- Start application

```sh
  npm start
```
