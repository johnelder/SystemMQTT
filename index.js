var osu = require('node-os-utils')
const mqtt = require('mqtt')
var options = require('./config.js').options

console.log('Started')

var systemData = {
    hostname: '',
    processes: 0,
    cpuUsage: 0,
    loadAvg: [],
    driveUsed: 0,
    driveFree: 0,
    driveTotal: 0,
    drivePercent: 0,
    memUsed: 0,
    memFree: 0,
    memTotal: 0,
    memPercent: 0,
    osName: '',
    netStat: []
}


const client = mqtt.connect(options.protocol + '://' + options.host + ":" + options.port)

client.on('connect', function() {

})

setInterval(function() {
    osu.cpu.usage().then(cpuUsage => {
        systemData.cpuUsage = cpuUsage
    })
    osu.drive.info().then(driveInfo => {
        systemData.driveUsed = driveInfo.usedGb;
        systemData.driveFree = driveInfo.freeGb;
        systemData.driveTotal = driveInfo.totalGb;
        systemData.drivePercent = driveInfo.usedPercentage;
    })
    osu.mem.info().then(memInfo => {
        systemData.memFree = memInfo.freeMemMb;
        systemData.memUsed = memInfo.usedMemMb;
        systemData.memTotal = memInfo.totalMemMb;
        systemData.memPercent = memInfo.usedMemPercentage;
    })
    osu.netstat.inOut().then(stats => {
        systemData.netStat = stats[options.netDevice];
    })
    osu.os.oos().then(osName => {
        systemData.osName = osName;
    })

    osu.proc.totalProcesses().then(proc => {
        systemData.processes = proc
    })

    if (options.topCpu) {

        osu.osCmd.topCpu().then(topCpu => {
            systemData.topCpu = topCpu;
        })
    }
    if (options.topMem) {
        osu.osCmd.topMem().then(topMem => {
            systemData.topMem = topMem;
        })
    }

    systemData.hostname = osu.os.hostname();
    systemData.loadAvg = osu.cpu.loadavg();

    if (systemData.processes > 0) {
        client.publish('SystemMQTT', JSON.stringify(systemData))
        // client.publish('SystemMQTT', 'test')
        console.log(systemData.processes)
    }

}, options.interval)

client.on('message', function(topic, message) {
    // message is Buffer
    console.log(message.toString())
    client.end()
})

client.on('disconnect', function() {
    console.log('disconnected')
})