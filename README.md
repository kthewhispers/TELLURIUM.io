# Tellurium
Tellurium Proof of Concept project implementation.

## Structure
tellus_eth – blockchain related code and utilities.
Blockchain tasks in the Tellurium project solves by ZeppelinOS 2.0 and Truffle frameworks.
/contracts - this folder contains Ethereum solidity smart contracts. It contains RegistryEntities smart contract for managing entities and follows CRUD architecture with Create, Read, Update and Destroy operations on entities. For local development it uses Ganache.

tellus_services – backend and frontend services for interacting with smart contracts boxed to Docker containers.

tellus_data_handler – utilities for mass data uploading to blockchain.

## How to Deploy

1. Install go-ipfs:
```
$ cd ~
$ wget https://dist.ipfs.io/go-ipfs/v0.4.21/go-ipfs_v0.4.21_linux-amd64.tar.gz
$ tar -xvzf go-ipfs_v0.4.21_linux-amd64.tar.gz
$ sudo ./install.sh
& nohup ipfs daemon &
```

2. Start services
  1. Backend API
Some preparations: you should install `make, build-essentials, g++, python, postgresql, postgresql-contrib` for deploy. NodeJS can be installed via `nvm`. Also it recommends to use globally installed `pm2` in production.
```
$ cd ../tellus_services/tellus_backend
$ npm install
$ npm start
or (better)
$ pm2 start pm2.config.json
```

  2. Frontend React App
There is no need make `npm install` for production mode, because all production code is static and contained in `/build` folder. All you need to do is to serve this folder. It's easy to do by `serve` npm package. This folder contains pm2 config for that. Just do (after installing `serve`):
```
$ cd ../tellus_services/tellus_react
$ pm2 start pm2.config.json
```