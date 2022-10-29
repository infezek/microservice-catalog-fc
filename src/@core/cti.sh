#!/bin/sh


npm run cti create "./src/@seedwork/application" -- -i "*spec.ts"  -b &&
npm run cti create "./src/@seedwork/domain" -- -i "*spec.ts" -e "tests" -e "__test__" -b &&
npm run cti create "./src/@seedworK/infra" -- -i "*spec.ts"  -b &&

npm run cti create "./src/category/application" -- -i "*spec.ts"  -b &&
npm run cti create "./src/category/domain" -- -i "*spec.ts"  -b &&
npm run cti create "./src/category/infra" -- -i "*spec.ts"  -b


