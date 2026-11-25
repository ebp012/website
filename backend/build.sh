#!/bin/bash

set -e

emcc page.c \
    -Ilibxml2/include/libxml2 \
    libxml2/lib/libxml2.a \
    -o page.js \
    -O2 \
    -sMODULARIZE=1 \
    -sEXPORT_ES6=1 \
    -sEXPORTED_FUNCTIONS='["_generate_page","_free"]' \
    -sEXPORTED_RUNTIME_METHODS='["ccall","UTF8ToString","FS"]' \
    -sALLOW_MEMORY_GROWTH=1

echo "WebAssembly compilation successful."