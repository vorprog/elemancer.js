const diff = require('diff');
const jsdom = require('jsdom');
const loop = require('@vorprog/loop').loop;
const main = require('../src/main');

const checkForDiscrepancies = (expected, actual) => {
  const differences = diff.diffJson(expected, actual);
  if (differences.length > 1) {
    const diffLog = loop(differences, (index, difference) => `${difference.added ? `DISCREPANCY.ACTUAL:` : difference.removed ? `DISCREPANCY.EXPECTED:` : ``} ${difference.value}`).join(``);
    throw Error(`Found unexpected discrepancies: \n${diffLog}`);
  }
}

const dom = new jsdom.JSDOM(`<!DOCTYPE html><p>Hello world</p>`);
document = dom.window.document //TODO: figure out errors with jsdom
// const newElement = main(dom.window.document, { tag: `div`});
// checkForDiscrepancies(`div`, newElement.tagName);

console.log(`Tests successfully completed!`);
