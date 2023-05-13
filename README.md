# Docker Image Artifact Download

Github action for downloading a docker image artifact. It downloads image artifact uploaded by [docker-image-artifact-upload](https://github.com/ishworkh/docker-image-artifact-upload) and loads into local docker daemon for use in a job.

TO BE UPDATED RANDOM

## Inputs

### `image`

**Required** Image name that is to be downloaded.


## Outputs

### `download_path`

Path in node where docker image archive is downloaded. Eg. `/tmp/foo_latest` for image `foo:latest`.

## Example usage

```
...
jobs:
  download_image:
    - name: Checkout project
      uses: actions/checkout@v2

    - name: Download image
      uses: ishworkh/docker-image-artifact-download@v1
      with:
        image: "test_image:latest"

```

## License
This library is under the MIT license.
