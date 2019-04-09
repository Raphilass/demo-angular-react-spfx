const restProxy = require('sp-rest-proxy');
const minimist = require('minimist');

let _args = minimist(process.argv.slice(2),{
 alias:{
   p:'port',
   c:'config'
 },
 default:{
   port:8080
 }
});

console.log(`using port ${_args.p}, and config file ${_args.c}`);
const settings = {
  configPath: _args.c,
  port: _args.h 
};

let proxy = new restProxy(settings);
proxy.serve();