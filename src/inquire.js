const inquirer = require('inquirer-promise');

module.exports = function inquire() {

  const config = {};
  const mergeConfig = answers => Object.assign(config, answers);

  return new Promise((resolve, reject) => {
    ask([TECH_STACK])()
      .then(mergeConfig)
      .then(ask([REPO_NAME]))
      .then(mergeConfig)
      .then(ask([USE_REPO]))
      .then(mergeConfig)
      .then(askRepoDetails)
      .then(mergeConfig)
      .then(resolve)
      .then(null, reject);
  });

};

const ask = questions => () => inquirer.prompt(questions);

const TECH_STACK = {
  type: 'list',
  name: 'techStack',
  message: 'Please choose a tech stack.',
  choices: [
    { name: 'Angular 1/TypeScript/Redux', value: 'angular-redux-starter' },
    { name: 'Angular 2/TypeScript/Redux', value: 'angular2-redux-starter' },
    { name: 'React/ES6/Redux', value: 'react-redux-starter' },
    { name: 'React/TypeScript/Redux', value: 'typescript-react-redux-starter' }
  ]
};

const REPO_NAME = {
  validate: validateGitName,
  name: 'repoName',
  message: 'Please enter the name of your new project'
};

const USE_REPO = {
  type: 'confirm',
  name: 'useRepo',
  message: 'Would you like to setup a Github repo for this project ?',
  choices: [ 'Yes', 'No' ]
};

function askRepoDetails(config) {
  if (!config.useRepo) {
    return {};
  }
  return inquirer.prompt([REPO_ORG, REPO_FORK_ORG]);
}

const REPO_ORG = {
  name: 'repoOrg',
  message: 'Please enter the git account that this project will belong to'
};

const REPO_FORK_ORG = {
  name: 'repoForkOrg',
  message: `Please enter your git account to create a personal fork
( leave empty to skip ):`
};

const allowedRegexp = /^[a-zA-Z0-9-_]+$/;
const validationErrorMessage =
  'Name can only contain letters, numbers dashes and underscores';
function validateGitName(str) {
  return str.search(allowedRegexp) !== -1 ?
    true : validationErrorMessage;
}
