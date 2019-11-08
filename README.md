# A Data Collection API

A REST API for a data collection system using nodejs.

## Getting Started

These instructions will get you the project up and running on your local machine for development and testing purposes

### Prerequisites

Install both docker and docker-compose on your local machine.

To make sure they were installed successfully, type the following on your terminal:

```bash
docker --version
docker-compose --version
```

## Setup

navigate to the data-collection-api directory where we have our docker-compose.yml file

```bash
<path_to_docker-compose.yml>
```

build the image

```bash
docker-compose build
```

boot the services

```bash
docker-compose up
```

now you have all your services up and running.

## How to use

First make sure you have postman app on your local machine to be able to construct requests and read responses easily.

`localhost:3000` is the main entry to our api service. For example, request will be in the form `localhost:3000/api/shifts/`, where `/api/shifts/` is the route for getting list of shifts

Following are the routes provided by our service, make sure to set the params and action of each request as stated

### Shift

* `GET /api/shift/`
* `POST /api/shift/`
* `PUT /api/shift/:shiftId`
* `DELETE /api/shift/:shiftId`

### Match

* `GET /api/match`
