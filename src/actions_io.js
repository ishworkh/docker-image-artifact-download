const core = require('@actions/core');
const isDebug = require("./actions_context");

exports.getInput = (name, mandatory = false) => {
    return core.getInput(name, { required: mandatory });
}

exports.writeOutput = (name, val) => {
    core.setOutput(name, val);
}

exports.fail = (msg) => core.setFailed(msg);

exports.debug = (msg) => {
    if (!isDebug) {
        return;
    }
    core.debug(msg);
}
