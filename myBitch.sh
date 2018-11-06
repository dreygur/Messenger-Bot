#!/bin/sh -e

# Run Reply daemon for my bitch if i am unavailable
if ! who | grep -wq $USER; then
  exit
fi

node index.js