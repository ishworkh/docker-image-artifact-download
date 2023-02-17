
const { download, downloadFromWorkflow } = require('docker-image-artifact');

const githubActionIO = require('./actions_io');
const githubActionContext = require('./actions_context');

const INPUT_IMAGE = 'image';
const INPUT_REPOSITORY = 'repository';
const INPUT_WORKFLOW = 'workflow';
const INPUT_TOKEN = 'token';

const OUTPUT_DOWNLOAD_PATH = 'download_path';

async function runAction(getInput, writeOutput) {
    const imageName = getInput(INPUT_IMAGE, true);

    const workflow = getInput(INPUT_WORKFLOW);
    if (workflow == "") {
        const downloadPath = await download(imageName);
        writeOutput(OUTPUT_DOWNLOAD_PATH, downloadPath);

        return;
    }

    const token = getInput(INPUT_TOKEN);
    if (workflow != "" && token == "") {
        throw new Error(`Input variable: token should be provided for downloading image from another workflow`);
    }

    const inputRepository = getInput(INPUT_REPOSITORY).trim();
    var { owner, repo } = githubActionContext.getRepository();
    if (inputRepository != "") {
        [owner, repo] = inputRepository.split("/");
    }

    const downloadPath = await downloadFromWorkflow(token)(owner, repo, workflow, imageName);
    writeOutput(OUTPUT_DOWNLOAD_PATH, downloadPath);
}

runAction(githubActionIO.getInput, githubActionIO.writeOutput)
    .then(() => console.log("Download finished"))
    .catch((err) => githubActionIO.fail(err));


