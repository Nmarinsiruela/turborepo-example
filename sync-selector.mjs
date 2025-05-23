import inquirer from 'inquirer';
import { exec } from 'node:child_process';

const AVAILABLE_REPOSITORIES = {
  AVAILABLE_REPO_1: 'reponame1',
  AVAILABLE_REPO_2: 'reponame2',
};

const AVAILABLE_PACKAGES = {
  BACKEND: 'backend',
  FRONTEND: 'frontend',
};

function runCommand(command) {
  const child = exec(command);

  child.stdout?.on('data', (data) => {
    console.log(data.toString());
  });

  child.stderr?.on('data', (data) => {
    console.error(data.toString());
  });

  child.on('exit', (code) => {
    console.log(`Child process exited with code ${code}`);
  });
}

const getRepo = async () => {
  const selected = await inquirer.prompt({
    type: 'list',
    name: 'repository',
    message: 'Select the target repo:',
    choices: Object.keys(AVAILABLE_REPOSITORIES).map((repository) => {
      return { name: repository, value: AVAILABLE_REPOSITORIES[repository] };
    }),
    default: AVAILABLE_REPOSITORIES.AVAILABLE_REPO_1,
  });

  return selected.repository;
};

const getPackage = async () => {
  const selected = await inquirer.prompt({
    type: 'list',
    name: 'pkg',
    message: 'Select the package to sync',
    choices: Object.keys(AVAILABLE_PACKAGES).map((pkg) => {
      return { name: pkg, value: AVAILABLE_PACKAGES[pkg] };
    }),
    default: AVAILABLE_PACKAGES.BACKEND,
  });

  return selected.pkg;
};

const main = async () => {
  const pkg = await getPackage();
  const repo = await getRepo();

  const basicRouteJson = `packages/${pkg}/package.json`;

  const targetRoute = `../target_monorepo/${repo}/node_modules/@monorepo-${pkg}`;

  const basicRoute = `packages/${pkg}/dist/*`;

  const targetRouteDist = `${targetRoute}/dist`;

  runCommand(
    `npm run build && rsync --progress -r ${basicRouteJson} ${targetRoute} && rsync --progress -r ${basicRoute} ${targetRouteDist} && cd -`
  );
};

main();
