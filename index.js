var osu = require('node-os-utils')
const mqtt = require('mqtt')
var options = require('./config.js').options
var values = require('./config').values
var broker = require('./config').broker

console.log('Started')

var connectString = broker.protocol + '://' + broker.host + ":" + broker.port
const client = mqtt.connect(broker)
//TODO add error handling for connection



client.on('connect', function(packet, err) {
    if (!err) {
        console.log('Connected to ' + connectString)
    } else {
        console.error(err)
    }
})

client.on('error', function(err) {
    console.warn(err)
})



setInterval(function() {
    var hostname = osu.os.hostname();
    getStats().then(systemData => {
        options.logMessages ? console.log(systemData) : null
        options.rootTopic = options.rootTopic ? options.rootTopic : 'SystemMQTT';
        options.idTopic = options.hostTopic ? hostname : broker.clientId;

        if (options.messageType === 'json') {
            client.publish(options.rootTopic + '/' + options.idTopic, JSON.stringify(systemData))
            // client.publish('SystemMQTT', 'test')
        } else {

            for (const key in systemData) {
                if (typeof(systemData[key]) == 'object') {
                    for (const i in systemData[key]) {
                        if (typeof(systemData[key][i]) == 'object') {
                            for (const j in systemData[key][i]) {
                                if (typeof(systemData[key][i][j]) == 'object') {
                                    for (const k in systemData[key][i][j]) {
                                        client.publish(options.rootTopic + '/' + options.idTopic + '/' + key + '/' + i + '/' + j + '/' + k, JSON.stringify(systemData[key][i][j][k]))
                                    }
                                } else {
                                    client.publish(options.rootTopic + '/' + options.idTopic + '/' + key + '/' + i + '/' + j, JSON.stringify(systemData[key][i][j]))
                                }
                            }
                        } else {
                            client.publish(options.rootTopic + '/' + options.idTopic + '/' + key + '/' + i, JSON.stringify(systemData[key][i]))
                        }
                    }
                } else {
                    client.publish(options.rootTopic + '/' + options.idTopic + '/' + key, JSON.stringify(systemData[key]))
                }

            }

        }
    });




}, options.interval)

client.on('message', function(topic, message) {
    // message is Buffer
    console.log(message.toString())
    client.end()
})

client.on('disconnect', function() {
    console.log('disconnected')
})


async function getStats() {
    var stats = {};

    var calls = [];

    for (cat in values) {
        if (cat != 'parameters') {
            var category = values[cat];
            for (cmd in category) {
                if (category[cmd]) {
                    if (category[cmd] !== true) {
                        calls.push(osu[cat][cmd](category[cmd]))
                    } else {
                        calls.push(osu[cat][cmd]())
                    }
                }
            }
        }
    }

    await Promise.all(calls).then(res => {
        var count = 0;
        for (cat in values) {
            if (cat != 'parameters') {
                var category = values[cat];
                for (cmd in category) {
                    if (category[cmd]) {
                        stats[cat] ? null : stats[cat] = {}
                        stats[cat][cmd] = res[count];
                        count++;
                    }
                }
            }
        }
    })
    return stats;
}