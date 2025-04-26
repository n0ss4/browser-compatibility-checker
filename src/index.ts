import { runScanner } from "./core/scanner.js";
import { defaultFeatures } from "./config/featureMap.js";

export { runScanner };

if (require.main === module) {
  runScanner({
    dir: "./src",
    extensions: [".ts", ".js"],
    features: defaultFeatures,
    verbose: true,
    showProgress: true,
    report: "console",
    outputFile: undefined,
  });
}
