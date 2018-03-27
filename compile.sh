#!/usr/bin/env bash
for i in $(ls -d ./*/); do
  echo ${i%%/};
  pushd ${i%%/}
  ./compile.sh
  popd
done

for i in $(ls -d ./ui-*/); do
  echo ${i%%/};
  pushd ${i%%/}
   npm run generate
  popd
done