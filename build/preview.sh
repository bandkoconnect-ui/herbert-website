#!/bin/sh
# Rebuild the preview copy of the site in /home/claude/pv/site
set -e
cd /home/claude/site
node build/build.js --preview > /dev/null
mkdir -p /home/claude/pv/site
cp -r assets fonts /home/claude/pv/site/
cp -r img media /home/claude/pv/site/
