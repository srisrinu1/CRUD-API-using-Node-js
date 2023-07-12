module.exports=(request,response)=>{
    let baseURL = request.url.substring(0,request.url.lastIndexOf("/")+1);
    console.log(baseURL);
    let id=request.url.split("/")[3];
    console.log(id);
    const regexV4=new RegExp(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);

  if(request.url==="/api/songs/"){
    response.statusCode=200;
    response.setHeader('Content-Type','application/json');
    response.write(JSON.stringify(request.songs));
    response.end()
  }
  else if(!regexV4.test(id)){
    response.writeHead(400,{"Content-Type":"application/json"});
    response.end(JSON.stringify({"title":"Validation Failed","message":"UUID is not valid"}))
  }
  else if(baseURL==="/api/songs/" && regexV4.test(id)){
    response.setHeader("Content-Type","application/json");
    let filteredSong=request.songs.filter(song=>{
        return(song.id===id);
    });
    if(filteredSong.length>0){
        response.statusCode=200;
        response.write(JSON.stringify(filteredSong));
        response.end()
    }
    else{
        response.statusCode=404;
        response.write(JSON.stringify({"title":"Not Found","message":"Song not Found"}));
        response.end();

    }


  }
  else{
    response.writeHead(404,{"Content-Type":"application/json"});
    response.end(JSON.stringify({"title":"Not Found","message":"Route not Found"}))
  }
}