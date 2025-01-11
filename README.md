# Vistor Count

A simple app that increases vistor count by 1 on every page visit. Made to try docker and nginx.

## Requirements

- Docker

## Installation

Add your own SSL certifiations *ssl.crt* and *ssl.key* files in *certs* folders on root level. To generate these files, you can use the openssl library. Run the following command to generte them:

```bash
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ssl.key -out ssl.crt
```

To start the server, run:

```bash
docker-compose up
```

The app will start running on https://localhost
