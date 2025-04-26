import fs from 'fs';
import { featureRegexMapping } from '../config/featureMap.js';
import { logError, logWarning } from '../utils/logger.js';

export interface Match {
  line: number;
  column: number;
  context: string;
}

export function searchFeatureInFile(filePath: string, feature: string, verbose = false): Match[] {
  try {
    const featureRegex = featureRegexMapping[feature];
    if (!featureRegex) {
      if (verbose) logWarning(`No regex defined for searching: ${feature}`);
      return [];
    }

    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    const matches: Match[] = [];
    const regex = new RegExp(featureRegex.source, featureRegex.flags);

    let match;
    while ((match = regex.exec(content)) !== null) {
      let lineIndex = 0;
      let currentPos = 0;

      while (currentPos <= match.index && lineIndex < lines.length) {
        currentPos += lines[lineIndex].length + 1;
        lineIndex++;
      }

      const line = lineIndex;
      const column = match.index - (currentPos - lines[lineIndex - 1].length - 1);
      const context = lines[line - 1]?.trim().substring(0, 100) || '';

      matches.push({ line, column, context });
    }

    return matches;
  } catch (err: any) {
    logError(`Error analyzing ${filePath}: ${err.message}`);
    return [];
  }
}