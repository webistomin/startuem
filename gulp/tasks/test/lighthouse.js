const gulp = require('gulp');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

const launchChromeAndRunLighthouse = (url, flags, config = null) => {
  return chromeLauncher.launch().then((chrome) => {
    flags.port = chrome.port;
    return lighthouse(url, flags, config).then(results => chrome.kill().then(() => results));
  });
};

const handleOk = (results) => {
  console.log(results);
  return results;
};

const handleError = (e) => {
  console.error(e);
  throw e;
};

const flags = {};

gulp.task('lighthouse', () => {
  const config = { settings: { onlyCategories: ['performance'] } };
  return launchChromeAndRunLighthouse('http://localhost:3000/', flags, config)
    .then(handleOk)
    .catch(handleError);
});
