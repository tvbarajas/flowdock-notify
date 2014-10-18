var AfterBuild = require('./../../after-build'),
    wercker = require('./../../wercker')
_ = require('./../../lib/underscore-min.js');


describe("Given the build has succeeded", function () {
    var afterBuild = new AfterBuild({
        send:false,
        wercker: _.extend(wercker, {
            result: 'passed'
        })
    });

    var message = afterBuild.processResult();
    it("should have sent a success message", function (done) {
        expect(message.content).toContain('successfully');
        done();
    })
});

describe("Given the build has succeeded", function () {
    var afterBuild = new AfterBuild({
        send:false,
        wercker: _.extend(wercker, {
            result: 'failed'
        })
    });

    var message = afterBuild.processResult();
    it("should have sent a success message", function (done) {
        expect(message.content).toContain('failed');
        done();
    })
});