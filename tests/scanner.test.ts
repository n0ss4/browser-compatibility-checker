import { runScanner } from '../src/core/scanner';
import path from 'path';

describe('runScanner', () => {
  it('should scan a valid directory without throwing', async () => {
    await expect(
      runScanner({
        dir: path.resolve(__dirname, '../core'),
        extensions: ['.ts'],
        verbose: false,
        showProgress: false,
        report: 'console',
        features: ['arrow-functions'],
      })
    ).resolves.toBeUndefined();
  });
});