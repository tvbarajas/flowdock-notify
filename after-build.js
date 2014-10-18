var util = require('util'),
    Flowdock = require('./flowdock'),
    _ = require('./lib/underscore-min.js');


module.exports = AfterBuild;

function AfterBuild(options) {
    this.opts = options;
    this.wercker = options.wercker;
    this.processResult = processResult;
    this.subject = util.format("%s: Build of %s by %s %s", this.wercker.application, this.wercker.branch, this.wercker.started_by, this.wercker.result);
    this.flowDockAPI = new Flowdock(this.wercker.flow_api_token);

}

function processResult() {
    if (this.wercker.result.toLowerCase() == 'failed') {
        var faileContent = util.format("<p>Step <strong>'%s'</strong> failed.</p>" +
        "<p>Commit ID %s. Message:</p>" +
        "<pre>%s</pre>", this.wercker.step_name, this.wercker.commit_id, this.wercker.step_message);
        var message = {
            "from_address": this.wercker.from_address,
            "from_name": "Wercker",
            'source': 'Wercker',
            "subject": this.subject,
            "content": faileContent,
            "tags": ["build"],
            "project": this.wercker.application,
            "link": util.format("https://app.wercker.com/#build/%s", this.wercker.build_id)
        }

        if (this.opts.send) {
            this.flowDockAPI.pushInboxMessage(message, function (err, results) {
                if (err) console.log('Error: ' + err);
                console.log('Notification sent');
                console.log(results);
            });
        }
        return message;
    } else if (this.wercker.result.toLocaleLowerCase() == 'passed') {
        var passedContent = util.format("Built successfully for commit ID %s", this.wercker.commit_id);
        var message = {
            "from_address": this.wercker.from_address,
            "from_name": "Wercker",
            "source": 'Wercker',
            "subject": this.subject,
            "content": passedContent,
            "tags": ["build"],
            "project": this.wercker.application,
            "link": util.format("https://app.wercker.com/#build/%s", this.wercker.build_id)
        }

        if (this.opts.send) {
            this.flowDockAPI.pushInboxMessage(message, function (err, results) {
                if (err) console.log('Error: ' + err);
                console.log('Notification sent');
                console.log('Results: ', results);
            });
        }
        return message;
    } else {
        console.log("No results")
    }
}