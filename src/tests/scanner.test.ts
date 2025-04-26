import { describe, it, expect } from '@jest/globals';
import { runScanner } from '../core/scanner.js';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('runScanner', () => {
  it('should scan a valid directory without throwing', async () => {
    await runScanner({
      dir: path.resolve(__dirname, '../core'),
      extensions: ['.ts'],
      verbose: false,
      showProgress: false,
      report: 'console',
      features: ['arrow-functions'],
    });
  });
});
