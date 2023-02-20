#!/bin/bash
set -x

for i in `ls -d build/static/js/*`; do gzip -9 $i; mv $i.gz $i; gzip -t $i; done
for i in `ls -d build/static/css/*`; do gzip -9 $i; mv $i.gz $i; gzip -t $i; done