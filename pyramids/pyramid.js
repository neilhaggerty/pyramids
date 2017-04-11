#!/usr/bin/env node

const program = require('commander');

const build = () => {
  console.log('Let\'s build');
};

program
  .version('0.0.1')
  .command('build')
  .description('Build pyramid')
  .option('-i, --init', 'Add pyramid.json')
  .action(build);

program.parse(process.argv);
