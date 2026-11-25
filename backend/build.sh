#!/bin/bash

set -e

PREFIX="$HOME/wasm-deps/libxml2-wasm"

if [ "$#" -ne 2 ]; then
    echo "Usage: ./build.sh <metadata.xml> <content.html>"
    exit 1
fi

METADATA="$1"
CONTENT="$2"

if [ ! -f "$METADATA" ] || [ ! -f "$CONTENT" ]; then
    echo "Error: One or both input files do not exist."
    exit 1
fi

if [ ! -f "$PREFIX/lib/libxml2.a" ]; then
    echo "Error: WebAssembly libxml2 installation not found."
    exit 1
fi

emcc /srv/web/html/backend/page.c \
    -I"$PREFIX/include/libxml2" \
    "$PREFIX/lib/libxml2.a" \
    -o page.js \
    -O2 \
    -sMODULARIZE=1 \
    -sEXPORT_ES6=1 \
    -sEXPORTED_FUNCTIONS='["_generate_page","_free"]' \
    -sEXPORTED_RUNTIME_METHODS='["ccall","UTF8ToString","FS"]' \
    -sALLOW_MEMORY_GROWTH=1

echo "WebAssembly compilation successful."
echo "Metadata: $METADATA"
echo "Content: $CONTENT"