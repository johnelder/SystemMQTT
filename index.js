var osu = require('node-os-utils')


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
        console.log(systemData)
    }

}, options.interval)

async function getSysData() {

}


// var count = cpu.count() // 8

// var lodAvg = cpu.loadavg()
// var osCmd = osu.osCmd
// console.log(lodAvg)
// osCmd.whoami()
//     .then(userName => {
//         console.log(userName) // admin
//     })