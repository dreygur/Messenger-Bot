#!/bin/sh -e

# Run Reply daemon if i am unavailable
if ! who | grep -wq $USER; then
  exit
fi
echo -e "Starting...\n"
node index.js