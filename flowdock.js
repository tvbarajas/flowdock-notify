var https = require('https')
    , _ = require('./lib/underscore-min.js')

module.exports = exports = Flowdock;

function Flowdock(token) {
    this.token = token;
    return this;
}

Flowdock.prototype.actions = {
    'inbox-message': {method: 'POST', path: '/v1/messages/team_inbox/:flow_api_token'}
};

Flowdock.prototype.request = function (request, data, callback) {
    var action = this.actions[request.action];
    var path = action.path;
    if (path.indexOf(':') > 0) {
        _.each(request.slugs, function (value, key, list) {
            path = path.replace(':' + key, value)
        }, this)
    }

    var message = JSON.stringify(data);

    var options = {
        hostname: 'api.flowdock.com',
        path: path,
        method: action.method,
        headers: {"Content-Type": "application/json", "Content-Length": message.length}
    };
    var req = https.request(options, function (res) {
        res.setEncoding('utf-8');

        res.on('data', function (d) {
            var data = null;
            data = JSON.parse(d);
            callback(null, data);
        });
    });
    req.write(message);
    req.end();

    req.on('error', function (e) {
        callback(null, {error: e});
    });
};

Flowdock.prototype.pushInboxMessage = function (message, callback) {
    this.request({action: 'inbox-message', slugs: {'flow_api_token': this.token}}, message, callback)
};


