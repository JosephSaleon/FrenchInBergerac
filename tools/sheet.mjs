import sharp from 'sharp'; import fs from 'fs'; import path from 'path';
const dir=process.argv[2]; const files=fs.readdirSync(dir).filter(f=>!f.includes('logo'));
const T=220; const cols=5; const rows=Math.ceil(files.length/cols);
const comps=await Promise.all(files.map(async(f,i)=>({input:await sharp(path.join(dir,f)).resize(T,T,{fit:'cover'}).toBuffer(),left:(i%cols)*T,top:Math.floor(i/cols)*T})));
await sharp({create:{width:cols*T,height:rows*T,channels:3,background:'#fff'}}).composite(comps).jpeg().toFile(process.argv[3]);
console.log(files.map((f,i)=>i+': '+f).join('\n'));
