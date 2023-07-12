// const fspromise=require('fs').promises;
const fs=require('fs');
const path=require('path')
module.exports=async(data)=>{
    console.log('The data to write in the file:',data);
    const file=path.join(__dirname,"..","data","songs.json");
    console.log(file);
   try{
     await fs.writeFileSync(file, JSON.stringify(data),
     "utf-8");
   }
   catch(err){
    console.log(err)
   }
}