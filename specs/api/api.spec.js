var AfterBuild = require('./../../after-build'),
    wercker = require('./../../wercker')
_ = require('./../../lib/underscore-min.js');


describe("Given the build has succeeded", function () {
    var afterBuild = new AfterBuild({
        send:true,
        wercker: _.extend(wercker, {
            result:'passed',
            application:'Flowdock Notify Test',
            branch:'master',
            started_by:'tvbarajas',
            build_id:123456,
            step_name:'Run tests',
            step_message:'Run test step failed',
            commit_id: '3adsf33asdfd',
            from_address:'build@flowdockNotify.com',
            flow_api_token:''
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
        send:true,
        wercker: _.extend(wercker, {
            result:'failed',
            application:'Flowdock Notify Test',
            branch:'master',
            started_by:'tvbarajas',
            build_id:123456,
            step_name:'Run tests',
            step_message:'Run test step failed',
            commit_id: '3adsf33asdfd',
            from_address:'build@flowdockNotify.com',
            flow_api_token:''
        })
    });

    var message = afterBuild.processResult();
    it("should have sent a success message", function (done) {
        expect(message.content).toContain('failed');
        done();
    })
});