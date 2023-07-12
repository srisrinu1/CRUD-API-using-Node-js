module.exports=(data,newObject)=>{
  return data.some(obj=>{
    return (
        obj.song.toLowerCase()===newObject.song.toLowerCase()
    )
  });
}