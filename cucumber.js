module.exports = {
  default: [
    '--require-module ts-node/register',
    '--require ./tests/steps/**/*.ts',
    '--format progress-bar',
    'features/**/*.feature'
  ].join(' ')
};
