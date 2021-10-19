if (process.env.NODE_ENV === 'production') {
    //배포용
    module.exports = require('./prod');
} else {
    //로컬용
    module.exports = require('./dev');
}
