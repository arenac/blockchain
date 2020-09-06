
# Blockchain solution

<p align="center">
  <img src="https://github.com/arenac/blockchain/blob/master/assets/blockchain.png?raw=true"  alt="Block Chain" width="700" height="300"/>
</p>

[![Python application](https://github.com/arenac/blockchain/workflows/Python%20application/badge.svg)](https://github.com/arenac/blockchain/actions)
[![Version](https://badge.fury.io/gh/tterb%2FHyde.svg)](https://github.com/arenac/blockchain)
[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/arenac/blockchain/blob/master/LICENSE)
[![GitHub last commit](https://img.shields.io/github/last-commit/google/skia.svg?style=flat)](https://github.com/arenac/blockchain/commits)

## Backend

A Python API


**Set up a virtual environment**

From backend folder type the following command in your terminal to generate the virtual environment

```
python3 -m venv blockchan-env
```

Next, activate it

```
source blockchain-env/bin/activate
```

Now install all the dependencies

```
pip3 install pytest==6.0.1, Flask==1.1.2, pubnub==4.5.3, python-decouple==3.3, requests==2.22.0, cryptography==2.8
```

**Run the tests**

With the virtual environment activated and the dependencies installed, run the tests from the root folder from this project:

```
python3 -m pytest backend/tests
```

**Run the API**

From the development environment, run the command

```
python3 -m backend.api
```

**Run a peer instance**

From the development environment, run the command

```
export PEER=True && python3 -m backend.app
```

## Web

A ReactJs app

## Mobile

A React Native mobile app
