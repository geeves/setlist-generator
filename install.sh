#!/usr/bin/env bash

rm -rf ./.data
mkdir ./.data

./scripts/buildTracksFromLexicon.js

sleep 5

# clean up temporary files
rm ./.data/tracks*.json

