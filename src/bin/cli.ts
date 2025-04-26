import { Command } from 'commander';
import path from 'path';
import figlet from 'figlet';
import { runScanner } from '../core/scanner.js';

const program = new Command();

program
  .name('browser-compatibility-checker')
  .description('Check compatibility of JavaScript/TypeScript features with target browsers')
  .version('1.0.0')
  .option('-d, --dir <directory>', 'Directory to scan for files', './src')
  .option('-e, --extensions <extensions>', 'File extensions to scan (comma separated)', '.js,.jsx,.ts,.tsx')
  .option('-f, --features <features>', 'Specific features to check (comma separated)')
  .option('-v, --verbose', 'Show detailed information', false)
  .option('--no-progress', 'Disable progress indicator')
  .option('--report <type>', 'Report type (console, json)', 'console')
  .option('--output <file>', 'Output file for JSON report')
  .parse(process.argv);

const options = program.opts();

console.log(figlet.textSync('Compatibility Checker', { font: 'Standard' }));

runScanner({
  dir: path.resolve(process.cwd(), options.dir),
  extensions: options.extensions.split(',').map((ext: string) => ext.trim()),
  features: options.features?.split(',').map((f: string) => f.trim()),
  verbose: options.verbose,
  showProgress: options.progress,
  report: options.report,
  outputFile: options.output
});
