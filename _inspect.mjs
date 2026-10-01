const url=process.env.DATABASE_URL;
async function q(sql){
  const r=await fetch(url.replace(/^postgresql/,()=>'https') ,{}).catch(()=>null);
  return r;
}
