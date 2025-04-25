import fs from 'fs';
import path from 'path';
import ora from 'ora';
import { defaultFeatures } from '../config/featureMap';
import { isFeatureSupported } from './featureChecker';
import { searchFeatureInFile } from './fileAnalyzer';
import { displayConsoleReport } from '../reporters/consoleReporter';
import { generateJsonReport } from '../reporters/jsonReporter';
import { logInfo, logTitle, logWarning, logError } from '../utils/logger';

export interface ScanOptions {
  dir: string;
  extensions: string[];
  features?: string[];
  verbose: boolean;
  showProgress: boolean;
  report: 'console' | 'json';
  outputFile?: string;
}

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

const summary: Summary = {
  filesScanned: 0,
  featuresFound: 0,
  incompatibleFeatures: 0,
  filesByFeature: {},
  issuesByFile: {}
};

function getAllFiles(dir: string, extensions: string[]): string[] {
  const allFiles: string[] = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    if (item.startsWith('.') || item === 'node_modules' || item === 'dist' || item === 'build') continue;

    try {
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        allFiles.push(...getAllFiles(fullPath, extensions));
      } else if (extensions.some(ext => fullPath.endsWith(ext))) {
        allFiles.push(fullPath);
      }
    } catch (err: any) {
      logError(`Error accessing ${fullPath}: ${err.message}`);
    }
  }

  return allFiles;
}

export function runScanner(options: ScanOptions): void {
  const featuresToCheck = options.features || defaultFeatures;

  logTitle('📋 Configuration:');
  logInfo(`- Directory: ${options.dir}`);
  logInfo(`- Extensions: ${options.extensions.join(', ')}`);
  logInfo(`- Features: ${featuresToCheck.length}`);

  const allFiles = getAllFiles(options.dir, options.extensions);
  summary.filesScanned = allFiles.length;
  const spinner = options.showProgress ? ora('Analyzing files...').start() : null;

  allFiles.forEach((filePath, idx) => {
    featuresToCheck.forEach(feature => {
      const matches = searchFeatureInFile(filePath, feature, options.verbose);
      if (matches.length === 0) return;

      if (!summary.filesByFeature[feature]) {
        summary.filesByFeature[feature] = { total: 0, incompatible: false, files: new Set() };
      }

      summary.filesByFeature[feature].total += matches.length;
      summary.filesByFeature[feature].files.add(filePath);
      summary.featuresFound += matches.length;

      const supported = isFeatureSupported(feature, options.verbose);

      if (!supported) {
        summary.filesByFeature[feature].incompatible = true;
        summary.incompatibleFeatures++;

        matches.forEach(match => {
          const issue: Issue = { feature, line: match.line, column: match.column, context: match.context };
          summary.issuesByFile[filePath] = summary.issuesByFile[filePath] || [];
          summary.issuesByFile[filePath].push(issue);
        });
      }
    });

    if (spinner && idx % 10 === 0) {
      spinner.text = `Analyzing ${idx + 1}/${allFiles.length} files`;
    }
  });

  if (spinner) spinner.succeed(`Analyzed ${allFiles.length} files`);

  if (options.report === 'json') {
    generateJsonReport(options.outputFile, summary);
  } else {
    displayConsoleReport(summary);
  }
}