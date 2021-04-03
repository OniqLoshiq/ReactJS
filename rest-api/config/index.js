const env = process.env.NODE_ENV || 'development';

module.exports = {
    development: {
        PORT: process.env.PORT || 5050,
        SALT_ROUNDS: 10,
        SECRET: process.env.JWT_SECRET,
        COOKIE_NAME: 'auth-token'
    },
    production: {
        PORT: process.env.PORT || 80,
        SALT_ROUNDS: 10,
        SECRET: process.env.JWT_SECRET,
        COOKIE_NAME: 'auth-token'
    }
}[env]