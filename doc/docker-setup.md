# Docker setup

## Sensitive data

`htdocs/` - all other web data  
`data/.env` - sensitive data are outside of `htdocs/`, e.g.

```ini
MYSQL_HOST=localhost
MYSQL_ROOT_PASSWORD=
MYSQL_PASSWORD=
```

```sh
docker --version
docker ps -a
# Stop and remove all containers
docker-compose --env-file ../data/.env.docker down
docker-compose up -d
docker-compose --env-file ../data/.env.docker up -d
# Recreate and apply changes
docker-compose --env-file ../data/.env.docker up -d --build
# build jenkins
docker-compose build jenkins
# start only jenkins from docker-compose.yml
docker-compose --env-file ../data/.env.docker up -d jenkins
```

## Jenkins

Get Initial Jenkins Admin Password

```sh
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
# Stop only Jenkins
docker-compose down jenkins
# Restart only Jenkins
docker-compose restart jenkins
# Jenkins logs
docker-compose --env-file ../data/.env.docker logs -f jenkins
# Start multiple services
docker-compose --env-file ../data/.env.docker up -d jenkins mysql
```

login:

user: `admin`  
password: `password`
