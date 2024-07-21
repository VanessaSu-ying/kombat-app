<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Kombat Service

## Descripción

Servicio creaado para disponibilizar resultado de 2 jugadores que se enfrenta en una Kombate estilo JRPG. Cada jugador posee su turno y cuenta con movientos y golpes especiales.

## Reglas del Kombate

```md
Botones a usar por los jugadores
```

![Image description](/images/player-button.png 'Botones a usar en el kombate')

```md
Movientos y golpes permitidos por jugador
```

![Image description](/images/player-hits.png 'Jugadas especiales por jugador')

## Requisitos

Antes de comenzar debes contar con Docker instalado.

- Docker : (https://docs.docker.com/compose/install/).

## Documentación : Swagger

Para revisar la documentacion del servicio se expone mediante swagger:

```bash
$ http://localhost:3000/api/doc
```

## Información de Referencia

La url para iniciar el servicio:

```bash
$ POST - http://localhost:3000/kombat
```

## Ejecutar app

### Instalación de dependencias

```bash
$ npm install
```

### Ejecutar aplicación

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Ejecutar con docker

Para ejecuar mediante docker usar comando:

```bash
$ docker-compose up
```

### Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Contribuir

Para contribuir y generar nueva funcionalidades:

1. Fork the Project
2. Crea una nueva rama desde master (`git checkout -b NuevaFuncionalidad`)
3. Añade tus cambios y realiza el commit (`git commit -m 'Añade nueva funcionalidad'`)
4. Push hacia tu nueva rama (`git push origin NuevaFuncionalidad`)
5. Abrir a Pull Request
