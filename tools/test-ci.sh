#!/bin/bash

npm run sync
npm run tap
code=$?
exit $code
