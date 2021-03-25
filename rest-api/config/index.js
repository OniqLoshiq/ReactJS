const env = process.env.NODE_ENV || 'development';

module.exports = {
    development: {
        PORT: process.env.PORT || 5050
    },
    production: {
        PORT: process.env.PORT || 80
    }
}[env]