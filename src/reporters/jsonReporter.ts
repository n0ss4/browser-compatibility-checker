import fs from 'fs';
import chalk from 'chalk';

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

export function generateJsonReport(outputPath: string | undefined, summary: Summary): void {
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      filesScanned: summary.filesScanned,
      featuresFound: summary.featuresFound,
      incompatibleFeatures: summary.incompatibleFeatures
    },
    features: {} as Record<string, { total: number; incompatible: boolean; files: string[] }>,
    issues: summary.issuesByFile
  };

  for (const [feature, data] of Object.entries(summary.filesByFeature)) {
    report.features[feature] = {
      total: data.total,
      incompatible: data.incompatible,
      files: Array.from(data.files)
    };
  }

  const outputFile = outputPath || 'compatibility-report.json';

  try {
    fs.writeFileSync(outputFile, JSON.stringify(report, null, 2), 'utf-8');
    console.log(chalk.green(`\n✅ JSON report saved to ${outputFile}`));
  } catch (err: any) {
    console.error(chalk.red(`Error saving JSON report: ${err.message}`));
  }
}