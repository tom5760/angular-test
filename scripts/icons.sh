#!/bin/sh

# The directory where this script is located.
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

pushd "$SCRIPT_DIR/.."

for size in 128 144 152 192
do
  echo "Generating ${size}x${size} icon..."
  inkscape \
    --without-gui \
    --export-png="app/images/icon-$size.png" \
    --export-width=$size \
    --export-height=$size \
    app/images/icon.svg
  echo
done

popd
