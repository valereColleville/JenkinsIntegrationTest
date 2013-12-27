export PATH=/usr/local/bin:/usr/bin/node:/usr/bin/npm:./node_modules/phantomjs/lib/phantom/bin/phantomjs:$PATH;

START=$(date +%s);
npm --version
node --version

npm install grunt-cli
npm install 
./node_modules/protractor/bin/webdriver-manager update --out_dir selenium
./node_modules/grunt-cli/bin/grunt jenkins --no-color
sed -E 's?<file name="(.*)\?">?<file name="'`pwd`'/\1">?' jshint-output.xml > jshint-proper.xml
END=$(date +%s)
DIFF=$(( $END - $START ))
echo "Compilation took $DIFF seconds"
