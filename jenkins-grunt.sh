export PATH=/usr/local/bin:/usr/bin/node:/usr/bin/npm:./node_modules/phantomjs/lib/phantom/bin/phantomjs:$PATH;

npm --version
node --version

npm install grunt-cli
npm install 
./node_modules/grunt-cli/bin/grunt jenkins --no-color
sed -E 's?<file name="(.*)\?">?<file name="'`pwd`'/\1">?' jshint-output.xml > jshint-proper.xml
