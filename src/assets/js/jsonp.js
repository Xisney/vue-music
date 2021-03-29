import originJsonp from "jsonp"

export default function(url,data,option){
  Object.keys(data).forEach(el=>{
    url=addParam(url,el,data[el])
  })
  return new Promise((resolve,reject)=>{
    originJsonp(url,option,(err,data)=>{
      if(err){
        reject(err)
      }else{
        resolve(data)
      }
    })
  })
}

function addParam(url,key,value){
  url+=url.indexOf('?')===-1?'?':"&"
  url+=`${encodeURIComponent(key)}=${encodeURIComponent(value)}`
  return url
}