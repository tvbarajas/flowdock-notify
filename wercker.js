var result = process.env['WERCKER_RESULT'] || 'Build result unknown';
var application = process.env['WERCKER_APPLICATION_NAME'];
var branch = process.env['WERCKER_GIT_BRANCH'];
var started_by = process.env['WERCKER_STARTED_BY'];
var build_id = process.env['WERCKER_BUILD_ID'];
var step_name = process.env['WERCKER_FAILED_STEP_DISPLAY_NAME'];
var step_message = process.env['WERCKER_FAILED_STEP_DISPLAY_MESSAGE'];
var commit_id = process.env['WERCKER_GIT_COMMIT'];

var from_address = process.env["WERCKER_FLOWDOCK_NOTIFY_FROM_ADDRESS"];
var flow_api_token = process.env["WERCKER_FLOWDOCK_NOTIFY_FLOW_API_TOKEN"];

module.exports = function(){
    return {
        result:result,
        application:application,
        branch:branch,
        started_by:started_by,
        build_id:build_id,
        step_name:step_name,
        step_message:step_message,
        commit_id: commit_id,
        from_address:from_address,
        flow_api_token:flow_api_token
    }
}()