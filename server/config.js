const env = process.env.NODE_ENV; // 'dev' or 'prod'
const dbPassword = process.env.DB_PASS;

const dev = {
    app: {
        port: parseInt(process.env.DEV_APP_PORT) || 8080,
        host: "0.0.0.0",
    },
    db: {
        connectionString: "mongodb://0.0.0.0:27017/mybaile",
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    },
};

const prod = {
    app: {
        port: parseInt(process.env.DEV_APP_PORT) || 8080,
        host: "0.0.0.0",
    },
    db: {
        connectionString: "mongodb://0.0.0.0:27017/mybaile",
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    },
};

const config = {
    dev,
    prod,
};

module.exports = config[env];
