const Promise = require('./dist/index').default
module.exports = {
    resolved: function(value) {
        return Promise.resolve(value);
    },
    rejected: function(reason) {
        return Promise.reject(reason);
    },
    deferred: Promise.deferred
};