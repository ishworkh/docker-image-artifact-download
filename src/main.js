
const { download, createArtifactDownloader, createOctokitArtifactDownloader } = require('docker-image-artifact');

const { getInput, writeOutput, debug, fail } = require('./actions_io');
const { getRepositoryName, getWorkflowName } = require('./actions_context');

const INPUT_IMAGE = 'image';

const INPUT_REPOSITORY = 'repository';
const INPUT_WORKFLOW = 'workflow';
const INPUT_TOKEN = 'token';

// Optional Filters
const INPUT_WORKFLOW_CONCLUSION = "workflow_conclusion";
const INPUT_COMMIT_SHA = "commit_sha";
const INPUT_BRANCH = "branch";
const INPUT_WORKFLOW_EVENT = "workflow_event";
const INPUT_WORKFLOW_RUN_ID = "workflow_run_id";

const OUTPUT_DOWNLOAD_PATH = 'download_path';

const createFilter = (commitSHA, branch, workflowRunId, workflowEvent, workflowConclusion) => {
    if (workflowRunId != "") {
        debug(`Exact run ID ${workflowRunId} wast set. Taking precedence over other filters.`);
        return (workflowRun) => {
            return workflowRun.id == parseInt(workflowRunId);
        }
    }
    const setCommitSHA = commitSHA != ""
    const setBranch = branch != ""
    const setEvent = workflowEvent != ""

    return (workflowRun) => {
        debug(`Workflow conclusion filter set to "${workflowConclusion}"`);
        let retVal = workflowConclusion == workflowRun.conclusion;

        if (setCommitSHA) {
            debug(`Commit SHA filter set - ${commitSHA} .`);
            retVal = retVal && commitSHA == workflowRun.head_sha;
        }
        if (setBranch) {
            debug(`Branch filter set - ${branch} .`);
            retVal = retVal && branch == workflowRun.branch;
        }
        if (setEvent) {
            debug(`Workflow event filter set - ${workflowEvent} .`);
            retVal = retVal && workflowEvent == workflow.event;
        }

        return retVal;
    }
}

async function runAction() {
    const imageName = getInput(INPUT_IMAGE, true);

    const repository = getInput(INPUT_REPOSITORY) || getRepositoryName();
    const workflow = getInput(INPUT_WORKFLOW) || getWorkflowName();

    if (getRepositoryName() == repository && getWorkflowName() == repository) {
        debug(`Downloading image artifact from the same workflow. `)
        const downloadPath = await download(imageName, createArtifactDownloader());

        writeOutput(OUTPUT_DOWNLOAD_PATH, downloadPath);
        return;
    }

    const token = getInput(INPUT_TOKEN);
    if (token == "") {
        throw new Error(`Input variable: token should be provided for downloading image from another workflow`);
    }

    const [owner, repo] = repository.split("/");
    if (owner == undefined || repo == undefined) {
        throw new Error(`Invalid repository name. Should be in format of owner/repo`);
    }

    debug(`Donwloading image from the repo - ${repository}, workflow - ${workflow}. `)
    const downloadPath = await download(
        imageName,
        createOctokitArtifactDownloader(
            token, owner, repo, workflow,
            createFilter(
                getInput(INPUT_COMMIT_SHA),
                getInput(INPUT_BRANCH),
                getInput(INPUT_WORKFLOW_RUN_ID),
                getInput(INPUT_WORKFLOW_EVENT),
                getInput(INPUT_WORKFLOW_CONCLUSION)
            )
        )
    );
    writeOutput(OUTPUT_DOWNLOAD_PATH, downloadPath);
}

runAction()
    .then(() => console.log("Download finished"))
    .catch((err) => fail(err));


