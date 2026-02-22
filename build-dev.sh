#!/usr/bin/env sh

# Builds the website and applies post processing, storing the final output in
# `build-output/`.

hugo build --cleanDestinationDir --baseURL "https://dev.hegecoin.com"
mkdir build-output
rm -r build-output/*
rm -r build-output/.git
cd build-output
ln -s ../build-git-dev .git
cd ..
cp -r build-base-dev/* build-output/
cp -r public/* build-output/

# Make output HTML pretty
find build-output -path "*.html" -type f \
  -exec tidy \
  --quiet yes \
  --indent no \
  --show-filename yes \
  --drop-empty-elements no \
  --fix-style-tags no \
  --warn-proprietary-attributes no \
  --wrap 0 \
  --tidy-mark no \
  --omit-optional-tags no \
  -o {} {} \;