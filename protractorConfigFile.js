require('jasmine-reporters');
jasmine.getEnv().addReporter(new jasmine.JUnitXmlReporter(
    'report/', true, true));

exports.config = {
  seleniumAddress: 'http://localhost:9515',
  specs: [
    'test/*_spec.js'
  ],
  capabilities: {
    'browserName': 'phantomjs'
  },
  baseUrl: 'http://localhost:9000/',
  rootElement: 'body',
  onPrepare: function() {
    var ptor = protractor.getInstance();
    ptor.elem = ptor.findElement;
    ptor.elems = ptor.findElements;
    global.by = protractor.By;
    global.ptor = ptor;
	 global.window = ptor.window;
	 global.document = ptor.document;
  },
  jasmineNodeOpts: {
    onComplete: null,
    isVerbose: true,
    showColors: true,
    includeStackTrace: true,
    defaultTimeoutInterval: 30000
  }
};
