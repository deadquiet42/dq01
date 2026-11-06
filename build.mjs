import fs from 'fs';
import { minify } from 'terser';
import { Packer } from 'roadroller';

let src = fs.readFileSync('dq01-source.js', 'utf8');
if (/\/\//.test(src.match(/`([^`]*)`/)[1])) throw 'comment in shader';
src = src.replace(/`([^`]*)`/, (_, g) => '`' + g.replace(/\n\s*/g, m => '').replace(/precision highp float;/, 'precision highp float;\n').replace(/\s*([=+\-*\/<>(),;{}?:&|])\s*/g, '$1').replace(/\n/g, '\\n') + '`');
src = src.replace('precision highp float;\\n', 'precision highp float;');

let min = (await minify(src, { toplevel: true, compress: { passes: 3, unsafe: true, unsafe_math: true, unsafe_arrows: true }, mangle: true, format: { comments: false } })).code;
fs.writeFileSync('min.js', min);

const packer = new Packer([{ data: min, type: 'js', action: 'eval' }], {});
await packer.optimize(Number(process.env.LEVEL || 2));
const { firstLine, secondLine } = packer.makeDecoder();

const shell = (js) => `<body style=margin:0;background:#000;overflow:hidden;cursor:none><canvas id=c style=position:fixed></canvas><p id=d style="position:fixed;bottom:8%;width:100%;text-align:center;color:#fff;font:200 3vh monospace;letter-spacing:.6em;padding-left:.6em;margin:0">click<script>${js}</script>`;

fs.writeFileSync('dev.html', shell(fs.readFileSync('dq01-source.js', 'utf8')));
fs.writeFileSync('dq01.html', shell(firstLine + '\n' + secondLine));
console.log('minified js', min.length, 'packed html', fs.statSync('dq01.html').size);
