import http from 'http';
import fs from 'fs';
import url from 'url';

const server = http.createServer((req,res)=>{

    if(req.url === '/favicon.ico'){
        res.end();
    }
    else{
        const myurl = url.parse(req.url,true); // true represents convert query string to object
        console.log(myurl);

        const log = `${Date.now()} : ${req.url} received \n`;
        fs.appendFile('log.txt',log,()=>{
        switch(myurl.pathname){
            case '/':
                res.end('Home page');
                break; 
            case '/about':
                res.end('About page');
                break; 
            case '/contact':
                res.end('Contact page'); 
                break; 
            case '/product':
                res.end(`We sell products and bakery items \n
                    Request Received for ${myurl.query.product || 'Product not found'} 
                    Price : ${myurl.query.price || 'Price not found'}`); 
                break;   
            default:
                res.end('Error 404 not found');      
        }
        })
    }   
});

server.listen(8080,()=>{
    console.log(`Connected`);
})