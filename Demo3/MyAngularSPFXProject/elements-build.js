const concat = require('concat');

(async function build() {
  const files = [
    './dist/MyAngularSPFXProject/runtime.js',
    './dist/MyAngularSPFXProject/polyfills.js',
    './dist/MyAngularSPFXProject/scripts.js',
    './dist/MyAngularSPFXProject/main.js'
  ];
  await concat(files, './dist/MyAngularSPFXProject/bundle.js');
})();
