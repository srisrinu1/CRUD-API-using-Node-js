const writeToFile=require('../util/write-file')
module.exports=(request,response)=>{
    let baseURL = request.url.substring(0,request.url.lastIndexOf("/")+1);
    console.log(baseURL);
    let id=request.url.split("/")[3];
    console.log(id);
    const regexV4=new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
    if(!regexV4.test(id)){
        response.writeHead(400,{"Content-Type":"application/json"});
        response.end(
            JSON.stringify(
                {"title":"Validation Failed","message":"UUID is not valid"}
                ))
      }
    else if (baseURL==="/api/songs/" && regexV4.test(id)){

        const Index=request.songs.findIndex(song=>{
            return(song.id===id);
        });
        if(Index===-1){
            response.statusCode=404;
            response.write(JSON.stringify({"title":"Not Found","message":"Song not Found"}));
            response.end();
        }
        else{
            request.songs.splice(Index,1);
            console.log('After Deletion:',request.songs);
            writeToFile(request.songs);
            response.writeHead(204,{"Content-Type":"application/json"});
            response.end(JSON.stringify(request.songs))
        }


    }

}