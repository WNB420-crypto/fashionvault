const http = require('http');
const fs = require('fs');
const path = require('path');
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.png':'image/png'};
http.createServer((req,res)=>{
 let url;try{url=decodeURIComponent(new URL(req.url,'http://localhost').pathname)}catch{res.writeHead(400);return res.end('Bad request')}
 const file=path.resolve(__dirname,'.'+(url==='/'?'/index.html':url));
 const allowed=file===path.join(__dirname,'index.html')||file===path.join(__dirname,'styles.css')||file.startsWith(path.join(__dirname,'assets')+path.sep);
 if(!allowed){res.writeHead(404);return res.end('Not found')}
 fs.readFile(file,(err,data)=>{if(err){res.writeHead(404);return res.end('Not found')}res.writeHead(200,{'Content-Type':types[path.extname(file)]||'application/octet-stream','X-Content-Type-Options':'nosniff'});res.end(data)});
}).listen(process.env.PORT||3000);
