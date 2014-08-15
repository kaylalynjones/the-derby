#!/bin/bash

mongoimport --jsonArray --drop --db $1 --collection gamblers --file ../../db/gamblers.json
mongoimport --jsonArray --drop --db $1 --collection people --file ../../db/people.json

