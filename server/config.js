const env = process.env.NODE_ENV; // 'dev' or 'prod'
const dbPassword = process.env.DB_PASS

const dev = {
    app: {
        port: parseInt(process.env.DEV_APP_PORT) || 3000,
        host: "0.0.0.0"
    },
    db: {
        connectionString: 'mongodb://localhost:27017/gifkeep',
        options: {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
        }
    }
};

const prod = {};

const config = {
    dev,
    prod
};

module.exports = config[env];