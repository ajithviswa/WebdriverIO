global.PLATFORM_NAME = process.env.PLATFORM_NAME || 'ANDROID';
global.isAndroid=PLATFORM_NAME =='ANDROID'? true:false;

process.env.test_env = 'staging';

exports.config ={
  /**
   ==================
   Specify Test Files
   ==================
   Define which test specs should run. The pattern is relative to the directory
   from which `wdio` was called. Notice that, if you are calling `wdio` from an
   NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
   directory is where your package.json resides, so `wdio` will be called from there.
   */
  suites: {
    healthCheck: [
      `./e2e/cucumber/features/${PLATFORM_NAME}/healthCheck/*.feature`,
    ],
  },

  /**
   First, you can define how many instances should be started at the same time.
   The property handles how many capabilities from the same test should run tests.
   */
  maxInstances: process.env.instance || 3,

  /**
   By default WebdriverIO commands are executed in a synchronous way using
   the wdio-sync package. If you still want to run your tests in an async way
   e.g. using promises you can set the sync option to false.
   */
  sync: true,
  deprecationreporterOptionsWarnings: true,

  // // The number of times to retry the entire specfile when it fails as a whole
  // specFileRetries: 2,
  
  // // Whether or not retried specfiles should be retried immediately or deferred to the end of the queue
  // specFileRetriesDeferred: true,

  // Runner and framework
  // Configuration
  // ====================
  runner: 'local',
  framework: 'cucumber',
  bail: 0,
  // baseUrl: 'http://the-internet.herokuapp.com',
  waitforTimeout: 30000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 1,
  hostname: 'localhost',
  reporters: [
    "spec",
    [
      "cucumberjs-json",
      {
        jsonFolder: `reports/cucumber/json`,
        language: "en",
      },
    ]
  ],
  
  cucumberOpts: {
    requireModule: ['@babel/register'],
    require: [
      './e2e/cucumber/stepDefinitions/*.js'
    ],
    backtrace: false,
    compiler: [],
    dryRun: false,
    failFast: false,
    format: ['pretty'],
    colors: true,
    snippets: true,
    source: true,
    profile: [],
    strict: false,
    timeout: 100000,
    ignoreUndefinedDefinitions: false,
    tagsInTitle: [],    //add tag to you feature name in reports
    tagExpression: process.env.TAGS,
  },

  // ====================
  // Appium Configuration
  // ====================
  port: 4723, // default appium port
  services: [
    [
      'appium',
      {
        args: {
        },
        command: 'appium'
      }
    ]
  ],
  path: '/',
  host: process.env.APPIUM_HOST || 'localhost',
  // port: process.env.APPIUM_PORT || 4723,
  logLevel: 'silent',
  // protocol: 'http',
};