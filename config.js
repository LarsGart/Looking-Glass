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
            }
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
            }
        },
        {
            module: "alert",
        },
        {
            module: "updatenotification",
            position: "top_bar"
        },
        {
            module: "clock",
            position: "top_left"
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
            }
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
            }
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
            }
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
            }
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
            }
        },
    ]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {
    module.exports = config;
}