const http=require('http');
require('dotenv').config();
const getRequest=require('./methods/get-request');
const postRequest=require('./methods/post-request')
const putRequest=require('./methods/put-request');
const deleteRequest=require('./methods/delete-request')
let songs=require('./data/songs.json')

const PORT=process.env.PORT||5001;

const server=http.createServer((request,response)=>{
    request.songs=songs;

    switch(request.method){
        case 'GET':
            getRequest(request,response);
            break;
        case 'POST':
            postRequest(request,response);
            break;
        case 'PUT':
            putRequest(request,response);
            break;
        case 'DELETE':
            deleteRequest(request,response);
            break;
        default:
            response.statusCode=401
            response.setHeader('Content-Type','application/json');
            response.write(JSON.stringify({title:'Not Found',message:'Route not Found'}));
            response.end();
            break;

    }
});

server.listen(PORT,()=>{
    console.log(`Server Started on: ${PORT}`)
})