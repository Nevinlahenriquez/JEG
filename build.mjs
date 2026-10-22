// Builds the shareable preview into dist/: scripts obfuscated, HTML and CSS minified.
// A deterrent against casual copying, not a lock. The readable source stays here.
import fs from 'node:fs';import path from 'node:path';
import JO from 'javascript-obfuscator';import {minify} from 'html-minifier-terser';
const OUT='dist',SKIP=new Set(['dist','node_modules','.git','.vercel']);
const obf=code=>JO.obfuscate(code,{compact:true,stringArray:true,stringArrayEncoding:['base64'],stringArrayThreshold:.75,splitStrings:true,splitStringsChunkLength:8,identifierNamesGenerator:'hexadecimal',renameGlobals:false,controlFlowFlattening:false,deadCodeInjection:false,selfDefending:false,disableConsoleOutput:true,transformObjectKeys:false}).getObfuscatedCode();
fs.rmSync(OUT,{recursive:true,force:true});
const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>SKIP.has(e.name)||e.name.startsWith('.')&&e.name!=='.well-known'?[]:e.isDirectory()?walk(path.join(d,e.name)):[path.join(d,e.name)]);
const keep=f=>/\.(html|js|jpg|jpeg|png|svg|webp|ico|txt|css)$/i.test(f)&&!/^(build\.mjs|BUILD\.md)$/.test(f);
for(const f of walk('.').filter(keep)){const dst=path.join(OUT,f);fs.mkdirSync(path.dirname(dst),{recursive:true});
 if(f.endsWith('.html')){let h=fs.readFileSync(f,'utf8');
  h=h.replace(/<script>([\s\S]*?)<\/script>/g,(m,c)=>c.trim()?'<script>'+obf(c)+'</script>':m);
  h=await minify(h,{collapseWhitespace:true,removeComments:true,minifyCSS:true,minifyJS:false});
  fs.writeFileSync(dst,h)}
 else if(f.endsWith('.js'))fs.writeFileSync(dst,obf(fs.readFileSync(f,'utf8')));
 else fs.copyFileSync(f,dst)}
console.log('built',walk(OUT).length,'files');
