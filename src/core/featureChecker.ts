import browserslist from 'browserslist';
import caniuse from 'caniuse-lite';
import { featureMapping } from '../config/featureMap.js';
import { logWarning, logError } from '../utils/logger.js';

export function isFeatureSupported(feature: string, verbose = false): boolean {
  const caniuseFeature = featureMapping[feature];

  if (!caniuseFeature) {
    if (verbose) logWarning(`No compatibility data for feature: ${feature}`);
    return false;
  }

  if (!caniuse?.features) {
    if (verbose) logWarning('caniuse-lite data structure is invalid. Unable to check compatibility.');
    return false;
  }

  try {
    const featureData = caniuse.feature(caniuse.features[caniuseFeature]);
    if (!featureData?.stats) {
      if (verbose) logWarning(`No stats found for feature: ${caniuseFeature}`);
      return false;
    }

    const browsers = browserslist();
    const supportData = featureData.stats;
    const incompatibleBrowsers: string[] = [];

    for (const browser of browsers) {
      const [name, version] = browser.split(' ');

      const versionSupport = supportData[name]?.[version];
      if (!versionSupport) {
        if (verbose) logWarning(`No support data for browser: ${name} ${version}`);
        continue;
      }

      // Si no hay 'y' (yes) en el soporte de la versión, no es compatible
      if (!versionSupport.includes('y')) {
        incompatibleBrowsers.push(browser);
      }
    }

    const isSupported = incompatibleBrowsers.length === 0;

    if (!isSupported && verbose) {
      logWarning(`${feature} is not supported on: ${incompatibleBrowsers.join(', ')}`);
    }

    return isSupported;
  } catch (error: any) {
    logError(`Failed to check feature support for ${feature}: ${error.message}`);
    if (verbose) console.error(error);
    return false;
  }
}