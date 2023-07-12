const crypto=require('crypto');
const fspromise=require('fs').promises;
const bodyParser=require('../util/body-parser');
const writeFile=require('../util/write-file');
const filterDuplicate=require('../util/filter-duplicate');
module.exports=async(request,response)=>{
 if(request.url==="/api/songs"){
  try{
//    let file=path.join(__dirname,'..');
//    console.log(file);
   const body=await bodyParser(request);
   body.id=crypto.randomUUID();
   console.log("Body:",body);
   console.log("songs:",request.songs)

   let Duplicate=filterDuplicate(request.songs,body);
   console.log("Duplicate:",Duplicate);
   if(Duplicate){
     response.writeHead(409,{"Content-Type":"application/json"});
     response.end(
        JSON.stringify(
            {
                "title":"Validation Failed",
                "message":"Duplicate Object"
            }
        )
     )
   }
   else{
    console.log('POST request:',body)
    request.songs.push(body);
    response.writeHead(201,{"Content-Type":"application/json"});
    writeFile(request.songs)
    response.end();


   }

  }
  catch(err){
    response.writeHead(400,{"Content-Type":"application/json"});
    response.end(
        JSON.stringify(
            {
                "title":"Validation Failed",
                "message":"Request body is not valid"

            }
        )
    );
  }
 }
}