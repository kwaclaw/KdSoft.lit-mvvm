/* eslint-disable no-console */

/*
Arguments:
- [0]: glob identifying all css files to wrap
- [1]: directory where the generated js files should be written to, default '.' if missing
- [2]: root path that determines the relative path for each css file, used for js file name generation, default '.' if missing

*/
import { readFile, writeFile, mkdirSync } from 'fs';
import { glob } from 'glob';
import { basename, dirname, relative, sep, normalize, join } from 'path';

function wrap(source) {
  return `import { css } from '@kdsoft/lit-mvvm';

export default css\`

${source.replace(/(`|\\|\${)/g, '\\$1')}\n\`;
`;
}

function writeWrappedFile(inFile, outFile) {
  readFile(inFile, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }

    const wrapped = wrap(data);

    mkdirSync(dirname(outFile), { recursive: true });
    writeFile(outFile, wrapped, err2 => {
      if (err2) console.log(err2);
    });
  });
}

// makes single file name from file path, replacing separators with '_'
function makeJsFileName(cssRoot, cssFile) {
  const cssBaseName = basename(cssFile, '.css');
  const jsFileName = `${cssBaseName}-styles.js`;

  const cssDir = dirname(cssFile);
  const cssRelativeDir = relative(cssRoot, cssDir);

  let jsBaseFileName = cssRelativeDir.replace(sep, '_');
  if (jsBaseFileName) jsBaseFileName += '_';
  return jsBaseFileName + jsFileName;
}

// makes file path for js file based on relative path of css file
function makeJsFilePath(cssRoot, cssFile) {
  const cssBaseName = basename(cssFile, '.css');
  const jsFileName = `${cssBaseName}-styles.js`;

  const cssDir = dirname(cssFile);
  const cssRelativeDir = relative(cssRoot, cssDir);

  return join(cssRelativeDir, jsFileName);
}

const args = process.argv.slice(2);
const cssGlob = args[0];
const targetDir = normalize(args[1] || '.');
const cssRoot = normalize(args[2] || '.');

const cssFiles = await glob(cssGlob);
cssFiles.forEach(cssFilePath => {
  const jsRelativePath = makeJsFilePath(cssRoot, cssFilePath);
  const jsFilePath = join(targetDir, jsRelativePath);
  console.log(jsFilePath);
  writeWrappedFile(cssFilePath, jsFilePath);
});
