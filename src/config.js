const env = process.env.REACT_APP_ENV; // 'dev' or 'prod'

const dev = {
    SERVER_URL: "http://localhost:8080",
    TMP_USER_ID: "64cd117697db1a3018d79eb7",
};

const prod = {
    SERVER_URL: "http://10.0.0.11:8080",
    TMP_USER_ID: "6513be9bf568a1fcf6194c1f",
};

const config = {
    dev,
    prod,
};

module.exports = config[env];
