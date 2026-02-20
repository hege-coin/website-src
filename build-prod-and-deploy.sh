#!/usr/bin/env sh

./build-prod.sh && cd build-output/ && git add --all && git commit -m "HEGE your bets" && git push -u origin main