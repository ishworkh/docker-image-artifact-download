const core = require('@actions/core');

exports.getInput = (name, mandatory = false) => core.getInput(name, { required: mandatory });

exports.writeOutput = (name, val) => core.setOutput(name, val);

exports.fail = (msg) => core.setFailed(msg);

exports.debug = (msg) => core.debug(msg);
