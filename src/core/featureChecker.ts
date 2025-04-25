import browserslist from 'browserslist';
import caniuse from 'caniuse-lite';
import { featureMapping } from '../config/featureMap';
import { logVerbose, logWarning, logError } from '../utils/logger';

export function isFeatureSupported(feature: string, verbose = false): boolean {
  const caniuseFeature = featureMapping[feature];

  if (!caniuseFeature) {
    if (verbose) logWarning(`No compatibility data for: ${feature}`);
    return true;
  }

  if (!caniuse || !caniuse.features) {
    logWarning('caniuse-lite data structure is not as expected. Unable to check compatibility.');
    return true;
  }

  try {
    const featureData = caniuse.feature(caniuse.features[caniuseFeature]);
    if (!featureData?.stats) {
      if (verbose) logWarning(`No compatibility data found for: ${caniuseFeature}`);
      return true;
    }

    const browsers = browserslist();
    const supportData = featureData.stats;
    let supported = true;
    const incompatibleBrowsers: string[] = [];

    for (const browser of browsers) {
      const [name, version] = browser.split(' ');

      if (!supportData[name] || !supportData[name][version]) {
        if (verbose) logWarning(`No data for ${name} ${version}`);
        continue;
      }

      if (!supportData[name][version].includes('y')) {
        supported = false;
        incompatibleBrowsers.push(browser);
      }
    }

    if (!supported && verbose) {
      logWarning(`${feature} is not compatible with: ${incompatibleBrowsers.join(', ')}`);
    }

    return supported;
  } catch (err: any) {
    logError(`Error checking compatibility for ${feature}: ${err.message}`);
    if (verbose) console.error(err);
    return true;
  }
}
