#!/bin/bash
set -e

for i in {1..100}; do yarn start && break || sleep 300; done
