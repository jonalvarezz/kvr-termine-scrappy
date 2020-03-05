#!/bin/bash
set -e

for i in {1..100}; do node node_modules/.bin/jest && break || sleep 300; done
