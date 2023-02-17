const github = require('@actions/github');

const context = github.context;

exports.getRepository = () => context.repo;

exports.getWorfklowName = () => context.workflow.trim();


