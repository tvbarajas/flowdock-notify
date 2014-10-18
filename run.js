var wercker = require('./wercker.js');
var AfterBuild = require('./after-build');
var options = {
    send:true,
    wercker:wercker
};
console.log("options", options)
var afterBuild = new AfterBuild(options);
afterBuild.processResult();