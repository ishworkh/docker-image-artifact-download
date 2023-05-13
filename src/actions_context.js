const github = require('@actions/github');

const context = github.context;

exports.getRepositoryName = () => {
  const { owner, repo } = context.repo;

  return [owner, repo].join("/");
};

exports.getWorkflowName = () => context.workflow.trim();

exports.isDebug = () => context.isDebug();
