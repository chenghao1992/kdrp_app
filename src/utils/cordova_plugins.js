cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "id": "cordova-plugin-network-information.network",
        "file": "plugins/cordova-plugin-network-information/www/network.js",
        "pluginId": "cordova-plugin-network-information",
        "clobbers": [
            "navigator.connection",
            "navigator.network.connection"
        ]
    },
    {
        "id": "cordova-plugin-network-information.Connection",
        "file": "plugins/cordova-plugin-network-information/www/Connection.js",
        "pluginId": "cordova-plugin-network-information",
        "clobbers": [
            "Connection"
        ]
    },
    {
        "id": "cordova-sms-plugin.Sms",
        "file": "plugins/cordova-sms-plugin/www/sms.js",
        "pluginId": "cordova-sms-plugin",
        "clobbers": [
            "window.sms"
        ]
    },
    {
        "id": "com.teamnemitoff.phonedialer.phonedialer",
        "file": "plugins/com.teamnemitoff.phonedialer/www/dialer.js",
        "pluginId": "com.teamnemitoff.phonedialer",
        "merges": [
            "phonedialer"
        ]
    },
    {
        "id": "ionic-plugin-keyboard.keyboard",
        "file": "plugins/ionic-plugin-keyboard/www/android/keyboard.js",
        "pluginId": "ionic-plugin-keyboard",
        "clobbers": [
            "cordova.plugins.Keyboard"
        ],
        "runs": true
    },

];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.3.2",
    "cordova-plugin-network-information": "1.3.3",
    "cordova-sms-plugin": "0.1.11",
    "com.teamnemitoff.phonedialer": "0.3.1",
    "ionic-plugin-keyboard": "2.2.1"
};
// BOTTOM OF METADATA
});


    