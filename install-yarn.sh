#!/usr/bin/env bash
for i in $(ls -d ./*/); do
  echo ${i%%/};
  pushd ${i%%/}
    yarn
  popd
done