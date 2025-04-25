export const defaultFeatures: string[] = [
  'array.includes',
  'object-entries',
  'promise.allsettled',
  'async-functions',
  'arrow-functions',
  'const',
  'let',
  'template-literals',
  'string-padstart-padend',
  'object-values',
  'rest-parameters',
  'spread-syntax',
  'destructuring',
  'optional-chaining',
  'nullish-coalescing'
];

export const featureMapping: Record<string, string> = {
  'array.includes': 'array-includes',
  'object-entries': 'object-entries',
  'promise.allsettled': 'mdn-javascript_builtins_promise_allsettled',
  'async-functions': 'async-functions',
  'arrow-functions': 'arrow-functions',
  'const': 'const',
  'let': 'let',
  'template-literals': 'template-literals',
  'string-padstart-padend': 'pad-start-end',
  'object-values': 'object-values',
  'rest-parameters': 'rest-parameters',
  'spread-syntax': 'spread',
  'destructuring': 'mdn-javascript_operators_destructuring',
  'optional-chaining': 'mdn-javascript_operators_optional_chaining',
  'nullish-coalescing': 'mdn-javascript_operators_nullish_coalescing'
};

export const featureRegexMapping: Record<string, RegExp> = {
  'array.includes': /\.\s*includes\s*\(/g,
  'object-entries': /Object\s*\.\s*entries\s*\(/g,
  'promise.allsettled': /Promise\s*\.\s*allSettled\s*\(/g,
  'async-functions': /async\s+function|\basync\s*\(/g,
  'arrow-functions': /\([^)]*\)\s*=>\s*\{|\([^)]*\)\s*=>/g,
  'const': /\bconst\b/g,
  'let': /\blet\b/g,
  'template-literals': /`[^`]*`/g,
  'string-padstart-padend': /\.\s*pad(Start|End)\s*\(/g,
  'object-values': /Object\s*\.\s*values\s*\(/g,
  'rest-parameters': /\.\.\.([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\)/g,
  'spread-syntax': /\.\.\.([a-zA-Z_$][a-zA-Z0-9_$]*)/g,
  'destructuring': /\{[^{}]*\}\s*=|\[[^\[\]]*\]\s*=/g,
  'optional-chaining': /\?\./g,
  'nullish-coalescing': /\?\?/g
};