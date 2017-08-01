#!/bin/bash

SOURCE_DIR=../src;
TO_SOURCE_DIR=src;
PACK_DIR=package;
ROOT_DIR=..;
PUBLISH=--publish

install(){
    npm i
}

pack() {

    echo 'Clearing /src and /package...'
    node_modules/.bin/rimraf "$TO_SOURCE_DIR"
    node_modules/.bin/rimraf "$PACK_DIR"

    # copy src
    echo 'Copying src...'
    node_modules/.bin/ncp "$SOURCE_DIR" "$TO_SOURCE_DIR"

    # copy README & LICENSE to src
    echo 'Copying README and LICENSE to /src...'
    node_modules/.bin/ncp "$ROOT_DIR"/LICENSE "$TO_SOURCE_DIR"/LICENSE
    node_modules/.bin/ncp "$ROOT_DIR"/README.md "$TO_SOURCE_DIR"/README.md

    # compile package and copy files required by npm
    echo 'Building /src...'
    cd "$TO_SOURCE_DIR"
    tsc
    cd ..

    echo 'Creating package...'
    # create package dir
    mkdir "$PACK_DIR"
    echo "created directory"
    # create the package
    cd "$PACK_DIR"
    echo "moved to pack dir"
    pwd
    npm pack ../"$TO_SOURCE_DIR"
    echo "npm packed"
    # delete source directory used to create the package
    cd ..
    node_modules/.bin/rimraf "$TO_SOURCE_DIR"
}

install && pack