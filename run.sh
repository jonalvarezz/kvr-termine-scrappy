#!/bin/bash
set -e

for i in {1..100}; do npm start && break || sleep 300; done
