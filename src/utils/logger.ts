import chalk from 'chalk';

export function logTitle(message: string): void {
  console.log(chalk.blue.bold(message));
}

export function logInfo(message: string): void {
  console.log(chalk.white(message));
}

export function logSuccess(message: string): void {
  console.log(chalk.green(message));
}

export function logWarning(message: string): void {
  console.warn(chalk.yellow(message));
}

export function logError(message: string): void {
  console.error(chalk.red(message));
}

export function logVerbose(message: string): void {
  console.debug(chalk.gray(message));
}
