const CONST = {
    URL_CLIENT: 'http://localhost:4200',
    TOKEN_EXPIRE_SEC : 60 * 60 * 2,
    TOKEN_SECRET: 'secretkey'/*require('crypto').randomBytes(64).toString('hex')*/
};

module.exports = CONST;

