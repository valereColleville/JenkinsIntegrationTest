require('jasmine-reporters');

exports.config = {
  seleniumServerJar: 'selenium/selenium-server-standalone-2.39.0.jar',
  seleniumPort: 4444,
  chromeDriver: 'selenium/chromedriver',
  seleniumArgs: [],
  specs: [
    'test/*_spec.js'
  ],
  capabilities: {
    'browserName': 'phantomjs'
  },
  allScriptsTimeout: 50000,
  baseUrl: 'http://localhost:9000/',
  rootElement: 'body',
  onPrepare: function() {
	jasmine.getEnv().addReporter(new jasmine.JUnitXmlReporter(
    'outputdir/', true, true));
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
