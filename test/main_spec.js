/* eslint-env node, mocha */
/* eslint no-unused-expressions: 0 */

const chai = require('chai');
const mock = require('mock-fs');
const reader = require('../pyramids/reader');

const expect = chai.expect;

mock({
  '/code': {
    'pyramid.json': JSON.stringify({
      unitTestPath: '/code/test/unit.js',
      integrationTestPath: '/code/test/integration.js',
    }),
    test: {
      'unit.js': `
        describe('pyramid.json', () =>  {
          it('should locate file if exists', () =>  {
              expect(reader.checkConfigExists()).to.be.true;
          });
          it('should read file paths from file', () =>  {
              response = reader.getConfig();
              expect(response.unitTestPath).to.equal('/test/unit.js');
          });
          it('should read file paths from file', () =>  {
              response = reader.getConfig();
              expect(response.unitTestPath).to.equal('/test/unit.js');
          });
     `,
      'integration.js': `
        describe('pyramid.json', () =>  {
          it('should locate file if exists', () =>  {
              expect(reader.checkConfigExists()).to.be.true;
          });
          it('should read file paths from file', () =>  {
              response = reader.getConfig();
              expect(response.unitTestPath).to.equal('/test/unit.js');
          });
     `,
    },
  },
});

describe('Create Test Pyramid', () => {
  describe('pyramid.json', () => {
    it('should locate file if exists', () => {
      expect(reader.checkConfigExists()).to.be.true;
    });
    it('should read file paths from file', () => {
      const response = reader.getConfig();
      expect(response.unitTestPath).to.equal('/code/test/unit.js');
    });
  });
  describe('Generate report', () => {
    it('should have a count of unit tests', () => {
      let pyramid = {
        unitTestCount: 0,
      };
      pyramid = reader.unitTestCount(pyramid,
        `describe('pyramid.json', () =>  {
            it('should locate file if exists', () =>  {
                expect(reader.checkConfigExists()).to.be.true;
            });
            it('should read file paths from file', () =>  {
                response = reader.getConfig();
                expect(response.unitTestPath).to.equal('/test/unit.js');
            });
            it('should read file paths from file', () =>  {
                response = reader.getConfig();
                expect(response.unitTestPath).to.equal('/test/unit.js');
            });`
      );
      expect(pyramid.unitTestCount).to.equal(3);
    });
    it('should have a count of integration tests', () => {
      let pyramid = {
        unitTestCount: 0,
      };
      pyramid = reader.integrationTestCount(pyramid,
        `describe('pyramid.json', () =>  {
            it('should locate file if exists', () =>  {
                expect(reader.checkConfigExists()).to.be.true;
            });
            it('should read file paths from file', () =>  {
                response = reader.getConfig();
                expect(response.unitTestPath).to.equal('/test/unit.js');
            });`
      );
      expect(pyramid.integrationTestCount).to.equal(2);
    });
    it('should generate pyramid object from file paths', () => {
      const pyramid = reader.planPyramid();
      expect(pyramid).to.be.deep.equal({
        unitTestCount: 3,
        integrationTestCount: 2,
      });
    });
  });
  describe('Build pyramid', () => {
    it('should generate html report from pyramid', () => {
      const report = `
        <!DOCTYPE html>
        <html>
        <body onload="draw();">
          <canvas id="canvas" width="300" height="300"></canvas>
          </body>
        <script>
          function draw() {
            var canvas = document.getElementById('canvas');
            if (canvas.getContext) {
              var ctx = canvas.getContext('2d');

              ctx.beginPath();
              ctx.moveTo(150, 0);
              ctx.lineTo(0, 300);
              ctx.lineTo(300, 300);
              ctx.fill();
            }
          }
        </script>
        </html>
      `;
      expect(report);
    });
  });
});
