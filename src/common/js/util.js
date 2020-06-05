export function urlParse() {
  let url=window.location.search;
  let obj={};
  let reg=/[?&][^?&]+=[^?&]+/g;
  let arr=url.match(reg);
  if(arr){
      arr.forEach((item)=>{
        let tempArr=item.substring(1).split('=');
        obj[decodeURIComponent(tempArr[0])]=decodeURIComponent(tempArr[1]);//可对 encodeURIComponent() 函数编码的 URI 进行解码，返回值URIstring 的副本，其中的十六进制转义序列将被它们表示的字符替换。
      })
  };
  return obj;
}