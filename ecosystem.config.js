const config = require('./config.js')

module.exports = {
    apps: [{
            name: 'SystemMQTT',
            script: 'index.js',
            watch: true,
            // ignore_watch: ["node_modules", "output", "public/css/style.css", "src/plugins/plugins.json", "src/themes/themes.json", ".git", ".gitignore", "\S+\.css|\S+\.json"],
            ignore_watch: ["./**/*.ejs", "./**/*.css", "./**/*.json", "public", "node_modules", "output", ".git", ".gitignore"],
            env: {
                /* Variables changed here will overide variables in config/config.js
                   We suggest keeping all settings in config.js */
                // "PORT": config.server.port
            },
            instances: "1",
            exec_mode: "fork"
        },

    ],


};