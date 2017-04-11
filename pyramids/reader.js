const fs = require('fs');

module.exports = {
  checkConfigExists() {
    try {
      fs.accessSync('/code/pyramid.json');
    } catch (err) {
      console.error(err);
      return false;
    }
    return true;
  },
  getConfig() {
    const response = fs.readFileSync('/code/pyramid.json', 'utf-8');
    return JSON.parse(response);
  },
  unitTestCount(pyramid, test) {
    const re = new RegExp('it\\(\'', 'g');
    const testCount = test.match(re).length;
    const pyramidObj = pyramid;
    pyramidObj.unitTestCount = testCount;
    return pyramidObj;
  },
  integrationTestCount(pyramid, test) {
    const re = new RegExp('it\\(\'', 'g');
    const testCount = test.match(re).length;
    const pyramidObj = pyramid;
    pyramidObj.integrationTestCount = testCount;
    return pyramidObj;
  },
  planPyramid() {
    let pyramid = {};
    const response = this.getConfig();
    pyramid = this.unitTestCount(pyramid, fs.readFileSync(response.unitTestPath, 'utf-8'));
    return this.integrationTestCount(pyramid, fs.readFileSync(response.integrationTestPath, 'utf-8'));
  },
};
