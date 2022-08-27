#!/usr/bin/env bash

which -s brew
if [[ $? != 0 ]] ; then
    # Install Homebrew
    printf "Goto https://brew.sh and install Homebrew!"
    exit 1;
fi


brew update

brew install pre-commit
#brew install commitizen

pre-commit install
pre-commit install --hook-type pre-commit
#pre-commit install --hook-type commit-msg
