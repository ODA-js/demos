#!/usr/bin/env bash
for i in $(ls -d ./*/); do
  echo ${i%%/};
  pushd ${i%%/}
  rm -rf package-lock.json
  rm -rf yarn.lock
  popd
done
