export PATH=/usr/local/bin:/usr/bin/node:/usr/bin/npm:./node_modules/phantomjs/lib/phantom/bin/phantomjs:$PATH;

START=$(date +%s);
npm --version
node --version

npm install grunt-cli
npm install 
cp ./fix/protractor.js ./node_modules/protractor/lib/protractor.js
./node_modules/grunt-cli/bin/grunt jenkins --no-color
sed -E 's?<file name="(.*)\?">?<file name="'`pwd`'/\1">?' report/jshint-output.xml > report/jshint-proper.xml
END=$(date +%s)
DIFF=$(( $END - $START ))
echo "Compilation took $DIFF seconds"
