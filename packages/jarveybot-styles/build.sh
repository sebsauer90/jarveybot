rm -R ./dis
node-sass ./src/style.scss --output=./dist --output-style=compressed
cp -R ./src/styles ./dist/scss/
