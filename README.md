# Docker Image Artifact Download

Github action for downloading a docker image artifact. It downloads image artifact uploaded by [docker-image-artifact-upload](https://github.com/ishworkh/docker-image-artifact-upload) and loads into local docker daemon for use in a job.

It supports downloading image artifacts from
- same job
- different job in the same workflow
- different job in a different workflow in the same repository
- different job in a different workflow in a different repository

# Please update you workflows to use proper semver versions introduced since v2.0.0.

## Inputs

### `image`

**Required** Image name that is to be downloaded.

### `repository`

**Optional** Repository in form of owner/name to download image from.

### `workflow`

**Optional** Workflow name to download image from.

### `token`

**Optional** Token with enough permissions to download artifact(s) from repo and workflow. It is required if `workflow` is set to different workflow than the currently running.

### `workflow_run_id`

**Optional** Filter workflow runs based workflow event. This takes the precedence over all filters if it is set.

### `workflow_conclusion`

**Optional** Filter workflow runs based on workflow conclusion. Possible values are `success`, `failure`, `cancelled`, or `skipped`.

### `commit_sha`

**Optional** Filter workflow runs based on commit SHA.

### `branch`

**Optional** Filter workflow runs based on branch.

### `workflow_event`

**Optional** Filter workflow runs based workflow event.

## Outputs

### `download_path`

Path in node where docker image archive is downloaded. Eg. `/tmp/foo_latest` for image `foo:latest`.

## Example usage

### From a different job in the same workflow

```
...
jobs:
  download_image:
    - name: Checkout project
      uses: actions/checkout@v2

    - name: Download image
      uses: ishworkh/docker-image-artifact-download@v2.0.1
      with:
        image: "test_image:latest"

```

### From a different workflow in the same repository

```
...
jobs:
  download_image:
    - name: Checkout project
      uses: actions/checkout@v2

    - name: Download image
      uses: ishworkh/docker-image-artifact-download@v2.0.1
      with:
        image: "test_image:latest"
        workflow: "Some Another Workflow"
        token: "secrettoken"
```

### From a different workflow with run id

```
...
jobs:
  download_image:
    - name: Checkout project
      uses: actions/checkout@v2

    - name: Download image
      uses: ishworkh/docker-image-artifact-download@v2.0.1
      with:
        image: "test_image:latest"
        workflow: "Some Another Workflow"
        token: "secrettoken"
        workflow_run_id: "234343434234234"
```

### From a different workflow with other filters

```
...
jobs:
  download_image:
    - name: Checkout project
      uses: actions/checkout@v2

    - name: Download image
      uses: ishworkh/docker-image-artifact-download@v2.0.1
      with:
        image: "test_image:latest"
        workflow: "Some Another Workflow"
        token: "secrettoken"
        workflow_event: "dispatch_workflow"
        branch: "main"
        commit_sha: "8471d40bfc4d0abc8409ba9391bb592bd0f1deb4"
        workflow_conclusion: "success"
```

### From a different workflow in a different repository

```
...
jobs:
  download_image:
    - name: Checkout project
      uses: actions/checkout@v2

    - name: Download image
      uses: ishworkh/docker-image-artifact-download@v2.0.1
      with:
        image: "test_image:latest"
        repository: "owner/my-repo"
        workflow: "Some Another Workflow"
        token: "secrettoken"
```

## Changelogs

### `v2.0.0`

- Add possibility to download image from another workflow/repository.
- Introduce semver versioning for github action releases. No versions with just major segment i.e `v1` will be released from now on.

### `v1`

- Old release that supported downloading images from same workflow.

## License
This library is under the MIT license.
