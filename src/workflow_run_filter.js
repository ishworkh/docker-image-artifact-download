class WorkflowRunFilterBuilder {
  constructor() {
    this.workflowRunId = null;
    this.workflowConclusion = null;
    this.commitSHA = null;
    this.branch = null;
    this.workflowEvent = null;
  }

  setWorkflowConclusion(conclusion) {
    this.workflowConclusion = conclusion;
    return this;
  }

  setCommitSHA(sha) {
    this.commitSHA = sha;
    return this;
  }

  setBranch(branch) {
    this.branch = branch;
    return this;
  }

  setWorkflowRunId(runId) {
    this.workflowRunId = parseInt(runId);
    return this;
  }

  setWorkflowEvent(event) {
    this.workflowEvent = event;
    return this;
  }

  build() {
    if (this.workflowRunId != null) {
      return (workflowRun) => {
        return this.workflowRunId == workflowRun.id;
      }
    }

    return (workflowRun) => {
      let retVal = true;

      if (this.conclusion != null) {
        retVal = retVal && this.conclusion == workflowRun.conclusion;
      }

      if (this.commitSHA != null) {
        retVal = retVal && this.commitSHA == workflowRun.head_sha;
      }
      if (this.branch != null) {
        retVal = retVal && this.branch == workflowRun.head_branch;
      }
      if (this.event) {
        retVal = retVal && this.workflowEvent == workflowRun.event;
      }

      return retVal;
    }
  }
}

exports.createFilterBuilder = () => {
  return new WorkflowRunFilterBuilder();
}
