#!/usr/bin/env bash

rm -rf ./.data
rm -rf ./src/asset/data
mkdir ./.data
mkdir ./src/asset/data

./scripts/buildTracksFromLexicon.js

sleep 5

mv ./.data/alltracks.json ./src/asset/data/alltracks.json

# clean up temporary files
rm ./.data/tracks*.json

