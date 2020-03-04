#!/bin/bash

echo "hello"

sleep 10

mongo --host mongo:27017 <<EOF
rs.initiate();
rs.status();
EOF
