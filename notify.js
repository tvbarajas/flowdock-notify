var https = require('https')
    , querystring = require('querystring')
    , _ = require('./lib/underscore-min.js')
    , util = require('util');

var result = process.env['WERCKER_RESULT'];
var application = process.env['WERCKER_APPLICATION_NAME'];
var branch = process.env['WERCKER_GIT_BRANCH'];
var started_by = process.env['WERCKER_STARTED_BY'];
var build_id = process.env['WERCKER_BUILD_ID'];
var step_name = process.env['WERCKER_FAILED_STEP_DISPLAY_NAME'];
var step_message = process.env['WERCKER_FAILED_STEP_DISPLAY_MESSAGE'];
var commit_id = process.env['WERCKER_GIT_COMMIT'];

var from_address = process.env["WERCKER_FLOWDOCK_NOTIFY_FROM_ADDRESS"];
var flow_api_token = process.env["WERCKER_FLOWDOCK_NOTIFY_FLOW_API_TOKEN"];


module.exports = exports = Flowdock;

function Flowdock() {
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
    this.request({action: 'inbox-message', slugs: {'flow_api_token': flow_api_token}}, message, callback)
};

subject = util.format("%s: build of %s by %s %s", application, branch, started_by, result);

var flowDockAPI = new Flowdock();

if (result.toLowerCase() == 'failed') {
    content = util.format("<p>Step <strong>'%s'</strong> failed.</p>" +
        "<p>Commit ID %s. Message:</p>" +
        "<pre>%s</pre>", step_name, commit_id, step_message);
    message = {
        "from_address": from_address,
        "from_name": "Wercker",
        'source': 'Wercker',
        "subject": subject,
        "content": content,
        "tags": ["build"],
        "project": application,
        "link": util.format("https://app.wercker.com/#build/%s", build_id)
    }

    flowDockAPI.pushInboxMessage(message, function (err, results) {
        if (err) console.log('Error: ' + err);
        console.log('Notification sent');
        console.log(results);
    });
} else {
    content = util.format("Commit ID ", commit_id);
    message = {
        "from_address": from_address,
        "from_name": "Wercker",
        "source": 'Wercker',
        "subject": subject,
        "content": content,
        "tags": ["build"],
        "project": application,
        "link": util.format("https://app.wercker.com/#build/%s", build_id)
    }

    flowDockAPI.pushInboxMessage(message, function (err, results) {
        if (err) console.log('Error: ' + err);
        console.log('Notification sent');
        console.log('Results: ',results);
    });
}

