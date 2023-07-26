exports.broker = {
    host: "broker.techunlimitedgroup.com",
    port: 1883,
    protocol: "tcp", //'mqtt', 'mqtts', 'tcp', 'tls', 'ws', 'wss', 'wxs', 'alis'
    clientId: 'MyClientId',
    username: '',
    password: '',
    will: { //last will message
        topic: 'SystemMQTT/errors',
        payload: 'SystemMQTT Dropped',
        QoS: 2,
        retain: true
    },
}

exports.options = {
    interval: 5000, //ineterval to poll stats and send
    netDevice: 'enp4s0', //net device to monitor
    topCpu: false, //send top cpu process list
    topMem: false, //send top mem list
    hostTopic: false, //use system hostname in topics
    messageType: 'topics', // json | topics
    logMessages: true
};


//Use this section to enable or diable reporting from node-os-utils features.
//Any value other than true or false will be parsed as the argument to the function.
//true = enabled, false = disable, missing = disabled, other = enabled with argument.
//See https://github.com/SunilWang/node-os-utils/tree/master for more information

exports.values = {
    cpu: {
        average: false,
        usage: true,
        free: true,
        count: false,
        model: false,
        loadavg: true,
        loadavgTime: 5,
    },
    drive: {
        info: true,
        free: false,
        used: false,
    },
    mem: {
        info: true,
        free: false,
        used: false,
        totalMem: false
    },
    netstat: {
        stats: false,
        inOut: true,
    },
    openfiles: {
        openFd: true
    },
    os: {
        oos: true,
        platform: false,
        uptime: true,
        ip: false,
        hostname: false,
        type: false,
        arch: false
    },
    proc: {
        totalProcesses: true,
        zombieProcesses: false
    },
    users: {
        openedCount: false
    },
    osCmd: {
        topCpu: false,
        topMem: false,
        vmstats: false,
        processUsers: false,
        diskUsage: false,
        who: false,
        whoami: false,
        openPorts: false,
        ifconfig: false
    },
}