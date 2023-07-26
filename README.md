## SystemMQTT

This is a simple system monitor that sends out MQTT packets.  
Data is pulled from the system using **node-os-utils** and packets are sent with **mqtt.js**.

## Instructions

*   Download and unzip into home directory.
*   Run npm install
*   Edit config.js
*   Run with node index.js or use something like PM2 for managing the process.

## Config.js

config.js has 3 sections:

*   broker - This holds data for connecting to the MQTT broker.
*   options - misc options for your running instance
*   values - configuration of which node-os-utils variables to pull from the system.

For more info see [config.js](https://github.com/johnelder/SystemMQTT/blob/v1.0/config.js)

### \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\* WARNING \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*  
Enabling all variables on a public MQTT broker may be a security risk.

Be sure you only enable variables that you need to publish.   
Enabling things like ip and users at the same time on a public broker is not advised.

### \*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*