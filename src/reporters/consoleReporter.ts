import chalk from 'chalk';
import figlet from 'figlet';
import Table from 'cli-table3';
import { truncatePath } from '../utils/pathUtils.js';

interface Issue {
  feature: string;
  line: number;
  column: number;
  context: string;
}

interface Summary {
  filesScanned: number;
  featuresFound: number;
  incompatibleFeatures: number;
  filesByFeature: Record<string, {
    total: number;
    incompatible: boolean;
    files: Set<string>;
  }>;
  issuesByFile: Record<string, Issue[]>;
}

export function displayConsoleReport(summary: Summary): void {
  console.log('\n');
  console.log(chalk.blue.bold(figlet.textSync('Results', { horizontalLayout: 'full' })));

  console.log(chalk.cyan('\n📊 Statistics:'));
  console.log(chalk.white(`- Files scanned: ${chalk.bold(summary.filesScanned)}`));
  console.log(chalk.white(`- Features found: ${chalk.bold(summary.featuresFound)}`));
  console.log(chalk.white(`- Incompatible features: ${chalk.bold(summary.incompatibleFeatures)}`));

  if (Object.keys(summary.filesByFeature).length > 0) {
    console.log(chalk.cyan('\n📋 Feature Compatibility:'));

    const table = new Table({
      head: [chalk.bold('Feature'), chalk.bold('Total'), chalk.bold('Files'), chalk.bold('Compatible')]
    });

    Object.entries(summary.filesByFeature).forEach(([feature, data]) => {
      table.push([
        chalk.cyan(feature),
        data.total,
        data.files.size,
        data.incompatible ? chalk.red('❌') : chalk.green('✅')
      ]);
    });

    console.log(table.toString());
  }

  if (Object.keys(summary.issuesByFile).length > 0) {
    console.log(chalk.cyan('\n⚠️ Issues by File:'));

    Object.entries(summary.issuesByFile).forEach(([file, issues]) => {
      console.log(chalk.magenta(`\n${truncatePath(file, 80)}`));

      const issueTable = new Table({
        head: [chalk.bold('Feature'), chalk.bold('Line:Col'), chalk.bold('Context')]
      });

      issues.forEach(issue => {
        issueTable.push([
          chalk.cyan(issue.feature),
          chalk.gray(`${issue.line}:${issue.column}`),
          issue.context
        ]);
      });

      console.log(issueTable.toString());
    });
  } else {
    console.log(chalk.green('\n✅ No compatibility issues found!'));
  }

  console.log('\n');
}
