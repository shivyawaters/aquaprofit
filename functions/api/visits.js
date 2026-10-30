// Cloudflare Pages Function. Bind a KV namespace named VISITOR_COUNTS in Pages settings.
// GET returns total page views since activation, plus the requested display baseline.
// POST counts one visit per browser session (client holds sessionStorage marker).
const BASELINE=9998;
const HEADERS={'content-type':'application/json; charset=utf-8','cache-control':'no-store','x-content-type-options':'nosniff'};
function reply(body,status=200){return new Response(JSON.stringify(body),{status,headers:HEADERS})}
export async function onRequest({request,env}){
  if(!env.VISITOR_COUNTS)return reply({available:false,message:'Visitor counter storage not configured'},503);
  const key='aquaprofit:pageviews:v1';
  try{
    if(request.method==='POST'){
      // KV does not provide atomic increments: high concurrency may undercount.
      const previous=Number(await env.VISITOR_COUNTS.get(key)||0);
      const next=Math.max(0,previous)+1;
      await env.VISITOR_COUNTS.put(key,String(next));
      return reply({available:true,visits:next,display:BASELINE+next});
    }
    if(request.method==='GET'){
      const visits=Math.max(0,Number(await env.VISITOR_COUNTS.get(key)||0));
      return reply({available:true,visits,display:BASELINE+visits});
    }
    return reply({error:'Method not allowed'},405);
  }catch{return reply({available:false,message:'Visitor counter unavailable'},503)}
}
