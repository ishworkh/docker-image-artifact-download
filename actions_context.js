const github = require('@actions/github');

const context = github.context;

exports.getRepositoryName = () => context.repo.trim();

exports.getWorfklowName = () => context.workflow.trim();


