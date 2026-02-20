#!/usr/bin/env sh

pyftsubset "original/ibm-plex-mono-regular.ttf" --output-file="optimized/ibmpm-home.woff2" --text-file="home-pm-chars.txt" --flavor=woff2 --layout-features=kern