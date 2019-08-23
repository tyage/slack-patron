#!/bin/bash

echo "hello"

sleep 10

mongo --host mongo:27017 <<EOF
rs.initiate();
rs.add({'host': 'mongo2:27017'});
rs.add({'host': 'mongo3:27017', arbiterOnly: true});
EOF
