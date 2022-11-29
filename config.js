/* MagicMirror² Config Sample
 *
 * By Michael Teeuw https://michaelteeuw.nl
 * MIT Licensed.
 *
 * For more information on how you can configure this file
 * see https://docs.magicmirror.builders/configuration/introduction.html
 * and https://docs.magicmirror.builders/modules/configuration.html
 */
let config = {
    address: "localhost", // Address to listen on, can be:
    // - "localhost", "127.0.0.1", "::1" to listen on loopback interface
    // - another specific IPv4/6 to listen on a specific interface
    // - "0.0.0.0", "::" to listen on any interface
    // Default, when address config is left out or empty, is "localhost"
    port: 8080,
    basePath: "/", // The URL path where MagicMirror² is hosted. If you are using a Reverse proxy
    // you must set the sub path here. basePath must end with a /
    ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"], // Set [] to allow all IP addresses
    // or add a specific IPv4 of 192.168.1.5 :
    // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.1.5"],
    // or IPv4 range of 192.168.3.0 --> 192.168.3.15 use CIDR format :
    // ["127.0.0.1", "::ffff:127.0.0.1", "::1", "::ffff:192.168.3.0/28"],

    useHttps: false, // Support HTTPS or not, default "false" will use HTTP
    httpsPrivateKey: "", // HTTPS private key path, only require when useHttps is true
    httpsCertificate: "", // HTTPS Certificate path, only require when useHttps is true

    language: "en",
    locale: "en-US",
    logLevel: ["INFO", "LOG", "WARN", "ERROR"], // Add "DEBUG" for even more logging
    timeFormat: 24,
    units: "metric",
    // serverOnly:  true/false/"local" ,
    // local for armv6l processors, default
    //   starts serveronly and then starts chrome browser
    // false, default for all NON-armv6l devices
    // true, force serveronly mode, because you want to.. no UI on this device

    modules: [{
            module: 'MMM-MTA-NextBus',
            position: "bottom_right", // This can be any of the regions.
            config: {
                apiKey: "2adda606-21b2-4383-a827-a30d59440dea",
                busStopCode: "200884",
            },
           
            classes: 'ivan'
        },
        {
            module: "MMM-GroveGestures",
            position: "top_right",
            config: {
                autoStart: true, //When Mirror starts, recognition will start.
                verbose: false, // If set as `true`, useful messages will be logged.
                recognitionTimeout: 1000, //Gesture sequence will be ended after this time from last recognized gesture.
                cancelGesture: "WAVE", //If set, You can cancel gesture sequence with this gesture.
                visible: true, //Recognized gesture sequence will be displayed on position

                idleTimer: 1000 * 60 * 30, // `0` for disable, After this time from last gesture, onIdle will be executed.
                onIdle: { // See command section
                    moduleExec: {
                        module: [],
                        exec: (module, gestures) => {
                            module.hide(1000, null, {
                                lockstring: "GESTURE"
                            })
                        }
                    }
                },
                onDetected: {
                    notificationExec: {
                        notification: "GESTURE_DETECTED",
                    },
                    /* You can make Mirror to wake up the modules which were hidden by onIdle with any gestures.
                    moduleExec: {
                      module: [],
                      exec: (module) => {
                        module.show(1000, null, {lockstring:"GESTURE"})
                      }
                    }
                    */
                },

                gestureMapFromTo: { //When your sensor is installed with rotated direction, you can calibrate with this.
                    "Up": "UP",
                    "Down": "DOWN",
                    "Left": "LEFT",
                    "Right": "RIGHT",
                    "Forward": "FORWARD",
                    "Backward": "BACKWARD",
                    "Clockwise": "CLOCKWISE",
                    "anti-clockwise": "ANTICLOCKWISE",
                    "wave": "WAVE"
                },

                defaultNotification: "GESTURE",
                pythonPath: "/usr/bin/python", // your python path

                defaultCommandSet: "default",
                commandSet: {
                    "default": {
                        "FORWARD-BACKWARD": {
                            notificationExec: {
                                notification: "ASSISTANT_ACTIVATE",
                                payload: null
                            }
                        },
                        "LEFT-RIGHT": {
                            notificationExec: {
                                notification: "ASSISTANT_CLEAR",
                                payload: null,
                            }
                        },
                        "CLOCKWISE": {
                            moduleExec: {
                                module: [],
                                exec: (module, gestures) => {
                                    module.hide(1000, null, {
                                        lockstring: "GESTURE"
                                    })
                                }
                            }
                        },
                        "ANTICLOCKWISE": {
                            moduleExec: {
                                module: [],
                                exec: (module, gestures) => {
                                    module.show(1000, null, {
                                        lockstring: "GESTURE"
                                    })
                                }
                            }
                        },
                        "LEFT": {
                            notificationExec: {
                                notification: "ARTICLE_PREVIOUS",
                                payload: null,
                            }
                        },
                        "RIGHT": {
                            notificationExec: {
                                notification: "ARTICLE_NEXT",
                                payload: null,
                            }
                        },
                    },
                },
            },
           
            classes: 'lars'
        }
       
        ,
        {
            module: "alert",
           
            classes: 'lars'
        },
        {
            module: "updatenotification",
            position: "top_bar",
           
            classes: 'lars'
        },
        {
            module: "clock",
            position: "top_left",
           
            classes: 'lars'
        },
        {
            module: "calendar",
            header: "US Holidays",
            position: "top_left",
            config: {
                calendars: [{
                    symbol: "calendar-check",
                    url: "webcal://www.calendarlabs.com/ical-calendar/ics/76/US_Holidays.ics"
                }]
            },
           
            classes: 'lars'
        },
        {
            module: "MMM-Jast",
            position: "bottom_left",
            config: {
                currencyStyle: "code", // One of ["code", "symbol", "name"]
                fadeSpeedInSeconds: 3.5,
                lastUpdateFormat: "HH:mm",
                maxChangeAge: 1 * 24 * 60 * 60 * 1000,
                maxWidth: "100%",
                numberDecimalsPercentages: 1,
                numberDecimalsValues: 2,
                scroll: "none", // One of ["none", "vertical", "horizontal"]
                showColors: true,
                showCurrency: true,
                showChangePercent: true,
                showChangeValue: false,
                showChangeValueCurrency: false,
                showHiddenStocks: false,
                showLastUpdate: false,
                showPortfolioValue: false,
                showPortfolioGrowthPercent: false,
                showPortfolioGrowth: false,
                updateIntervalInSeconds: 300,
                useGrouping: false,
                virtualHorizontalMultiplier: 2,
                stocks: [{
                        name: "Apple",
                        symbol: "AAPL",
                        quantity: 10
                    },
                    {
                        name: "Tesla",
                        symbol: "TSLA",
                        quantity: 15
                    },
                    {
                        name: "Twitter",
                        symbol: "TWTR",
                        hidden: true
                    },
                    {
                        name: "Netflix",
                        symbol: "NFLX",
                        quantity: 20
                    }
                ]
            },
           
            classes: 'daniel'
        },
        {
            module: "weather",
            position: "top_right",
            config: {
                weatherProvider: "openweathermap",
                type: "current",
                location: "New York",
                locationID: "5128581", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
                apiKey: "23ecee5a8c9ab24a8fb4d674493bf892"
            },
           
            classes: 'lars'
        },
        {
            module: "weather",
            position: "top_right",
            header: "Weather Forecast",
            config: {
                weatherProvider: "openweathermap",
                type: "forecast",
                location: "New York",
                locationID: "5128581", //ID from http://bulk.openweathermap.org/sample/city.list.json.gz; unzip the gz file and find your city
                apiKey: "23ecee5a8c9ab24a8fb4d674493bf892"
            },
           
            classes: 'lars'
        },
        {
            module: "newsfeed",
            position: "bottom_bar",
            config: {
                feeds: [{
                    title: "New York Times",
                    url: "https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml"
                }],
                showSourceTitle: true,
                showPublishDate: true,
                broadcastNewsFeeds: true,
                broadcastNewsUpdates: true
            },
           
            classes: 'always'
        },
        {
    module: 'MMM-Face-Reco-DNN',
    config: {
      // Logout 15 seconds after user was not detected any more
      // If they are detected within this period, the delay will start again
      logoutDelay: 15000,
      // How often the recognition starts in milliseconds
      // With a Raspberry Pi 3+ it works well every 2 seconds
      checkInterval: 2000,
      // Module set used for when there is no face detected ie no one is in front of the camera
      noFaceClass: 'noface',
      // Module set used for when there is an unknown/unrecognised face detected
      unknownClass: 'unknown',
      // Module set used for when there is a known/recognised face detected
      knownClass: 'known',
      // Module set used for strangers and if no user is detected
      defaultClass: 'default',
      // Set of modules which should be shown for any user ie when there is any face detected
      everyoneClass: 'everyone',
      // Set of modules that are always shown - show if there is a face or no face detected
      alwaysClass: 'always',
      // XML to recognize with haarcascade
      cascade: 'modules/MMM-Face-Reco-DNN/tools/haarcascade_frontalface_default.xml',
      // Pre-encoded pickle with the faces
      encodings: 'modules/MMM-Face-Reco-DNN/tools/encodings.pickle',
      // Use Raspberry Pi camera or another type
      // 1 = RasPi camera, 0 = other camera
      usePiCamera: 1,
      // If using another type of camera, you can choose
      // i.e. 0 = /dev/video0 or 'http://link.to/live'
      source: 0,
      // Rotate camera
      rotateCamera: 0,
      // Method of facial recognition
      // dnn = deep neural network, haar = haarcascade
      method: 'dnn',
      // Which face detection model to use
      // "hog" is less accurate but faster on CPUs
      // "cnn" is a more accurate deep-learning model which is GPU/CUDA accelerated
      detectionMethod: 'hog',
      // How long in milliseconds modules take to hide and show
      animationSpeed: 0,
      // Path to Python to run the face recognition
      // null or '' means default path
      pythonPath: null,
      // Should a welcome message be shown using the MagicMirror alerts module?
      welcomeMessage: true,
      // Dictionary for person name mapping in welcome message
      // Allows for displaying name with complex character sets in welcome message e.g. jerome => Jérôme, hideyuki => 英之
      usernameDisplayMapping: null,
      // Capture new pictures of recognized people, if unknown we save it in folder "unknown"
      // So you can extend your dataset and retrain it afterwards for better recognitions
      extendDataset: false,
      // If extendDataset is true, you need to set the full path of the dataset
      dataset: 'modules/MMM-Face-Reco-DNN/dataset/',
      // How much distance between faces to consider it a match. Lower is more strict.
      tolerance: 0.6,
      // allow multiple concurrent user logins, 0=no, any other number is the maximum number of concurrent logins
      multiUser: 0,
    }
}
    ]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {
    module.exports = config;
}