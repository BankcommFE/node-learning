const env = process.env.NODE_ENV;

// 配置
let MYSQL_CONF = {}

if (env === 'dev') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'ShiHui%_666',
        port: '3306',
        database: 'nodedb'
    };
} else if (env === 'prd') {
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'ShiHui%_666',
        port: '3306',
        database: 'nodedb'
    };
}

module.exports = {
    MYSQL_CONF
}