
const { download } = require('docker-image-artifact');

const githubActionIO = require('./actions_io');

const INPUT_IMAGE = 'image';

const OUTPUT_DOWNLOAD_PATH = 'download_path';

async function runAction(getInput, writeOutput) {
    const imageName = getInput(INPUT_IMAGE, true);

    const downloadPath = await download(imageName);
    writeOutput(OUTPUT_DOWNLOAD_PATH, downloadPath);
}

runAction(githubActionIO.getInput, githubActionIO.writeOutput)
    .then(() => console.log("Uploading finished") )
    .catch((err) => githubActionIO.fail(err));
    

