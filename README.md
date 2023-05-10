# Jamvas
*A musical sequencer canvas for multiplayer jamming*

![CI](https://github.com/ynnckth/jamvas/actions/workflows/main.yml/badge.svg)

## Local development setup
Run the backend locally in dev mode:
```shell
cd jamvas-backend
npm install
npm run start:dev
```
By default, the backend should be available at: 
> http://localhost:3000/api

Run the frontend locally in dev mode: 
```shell
cd jamvas-frontend
npm install
npm run dev
```
By default, the frontend should be available at:
> http://localhost:5173/jamvas

**Dockerized setup**

If you want to test the dockerized application, you can use the provided docker compose stack. 
```shell
docker compose up -d
```
Access the locally running containerized backend at: 
> http://localhost:8000/api

The docker-compose stack will run a simple http server, serving the frontend at: 
> http://localhost:8080/jamvas

## Demo environment
The demo environment attempts to keep the running costs as low as possible.

The frontend is hosted on Github Pages:
> https://ynnckth.github.io/jamvas/

The backend is hosted on an Azure App Service:
> https://jamvas.azurewebsites.net/api

For more details on the infrastructure, check `./jamvas-infrastructure`.