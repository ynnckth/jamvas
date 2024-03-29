# Jamvas
*A musical sequencer canvas for multiplayer jamming*

![CI](https://github.com/ynnckth/jamvas/actions/workflows/build-backend.yml/badge.svg)
![CI](https://github.com/ynnckth/jamvas/actions/workflows/release-backend.yml/badge.svg)
![CI](https://github.com/ynnckth/jamvas/actions/workflows/build-frontend.yml/badge.svg)
![CI](https://github.com/ynnckth/jamvas/actions/workflows/release-frontend.yml/badge.svg)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ynnckth_jamvas&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=ynnckth_jamvas)

<img src="docs/assets/screenshot.gif" width="450px" />

## Local development setup
Run the **backend** locally in dev mode:
```shell
cd jamvas-backend
npm install
npm run start:dev
```
By default, the backend should be available at: 
> http://localhost:3000/api

Create a `.env` file with the following content at the root of the frontend folder:
```
VITE_BACKEND_API_BASE_URL=http://localhost:3000/api
```
Run the **frontend** locally in dev mode:

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

## Relevant links
- [Terraform Cloud](https://app.terraform.io/app/ynnckth/workspaces/jamvas)
- [Azure Portal](https://portal.azure.com/)
- [Github Repository](https://github.com/ynnckth/jamvas)
- [SonarCloud](https://sonarcloud.io/project/overview?id=ynnckth_jamvas)
