class WorkflowRunFilterBuilder {
  constructor() {
    this.workflowRunId = null;
    this.workflowConclusion = "success";
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
      debug(`Exact run ID ${workflowRunId} wast set. Taking precedence over other filters.`);
      return (workflowRun) => {
        return this.workflowRunId == workflowRun.id;
      }
    }

    return (workflowRun) => {
      debug(`Workflow conclusion filter set to "${conclusion}"`);
      let retVal = this.conclusion == workflowRun.conclusion;

      if (this.commitSHA != null) {
        debug(`Commit SHA filter set - ${commitSHA} .`);
        retVal = retVal && this.commitSHA == workflowRun.head_sha;
      }
      if (this.branch != null) {
        debug(`Branch filter set - ${branch} .`);
        retVal = retVal && this.branch == workflowRun.branch;
      }
      if (this.event) {
        debug(`Workflow event filter set - ${workflowEvent} .`);
        retVal = retVal && this.workflowEvent == workflow.event;
      }

      return retVal;
    }
  }
}

exports.createFilterBuilder = () => {
  return new WorkflowRunFilterBuilder();
}
