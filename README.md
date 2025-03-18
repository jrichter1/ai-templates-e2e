# AI templates e2e tests

This is a template for e2e tests for RHDH AI templates, allowing for quick e2e test creation for different configurations.

## Creating a test suite

By default, the test files are expected in the `tests` folder, any files with the `.test.ts` suffix are considered.

Start by creating one such file, e.g. `tests/chatbot.test.ts`.
Next, we need to specify the template to use, and the values it takes. There are interfaces available to create type-safe objects that serve as template inputs:
 - `AITemplate` - enum of available tempalte names  
 - `ApplicationInfo`, `DeploymentInformation`, `RepositoryInfo` - each refers to values for one step of the template

This is what a template definition might look like:
```typescript
import { ApplicationInfo, DeploymentInformation, RepositoryInfo } from '../../API/types';
import { generateComponentName, templateSuite } from '../../suite/template';

const template = 'chatbot' // choose a template from the available names
const name = generateComponentName(template); // generates a unique component name (optional, but recommended)
const appInfo: ApplicationInfo = {
  name: name,
  modelServer: 'llama.cpp',
  modelNameDeployed: 'instructlab/granite-7b-lab'
};
const repoInfo: RepositoryInfo = {
  branch: 'main',
  githubServer: 'github.com',
  hostType: 'GitHub',
  repoName: name,
  repoOwner: 'myOrg'
};
const deploymentInfo: DeploymentInformation = {
  imageName: 'myImage',
  imageOrg: 'myQuayOrg',
  imageRegistry: 'quay.io',
  namespace: 'rhdh-app',
  rhoaiSelected: false
};
```
The above set of objects constitutes a setup of the `chatbot` template with the chosen model to be deployed, using github as the source hosting, and quay.io for image hosting.
All that is left now is to generate a test suite for these options using the `templateSuite` function:

```typescript
templateSuite(template, appInfo, repoInfo, deploymentInfo);
```

At this point, the file `tests/chatbot.test.ts` becomes a test suite and will be loaded by the jest framework.

## Environment setup & variables

In order to run the tests successfully, several requirements must be met:
 - RHDH test instance, with `backend.auth.dangerouslyDisableDefaultAuthPolicy` set to true
 - `DEVELOPER_HUB_URL` environment variable containing the base URL of your RHDH instance
 - `GITHUB_TOKEN` environment variable containing your github token when using github as source host
 - `GITLAB_TOKEN` environment variable containing your gitlab token when using gitlab as source host
 - `GIT_WEBHOOK_SECRET` environment variable containing PaC secret for webhooks, when using gitlab
 - `MODEL_SECRET` environment variable containing the bearer token for any secured existing model

## Running the tests

With the test suite(s) defined and requirements met, run the tests by running `npm test` from terminal.
Note that different test files are going to be run in parallel.

After the test run finishes, reports will be placed in `artifacts` folder.
