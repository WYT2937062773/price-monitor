
const D={"to":"2026-11-16","build":"2026-11-16 11:58","kpi":{"rows":19048,"amount":2378267.03,"red":20,"raw":3110},"rows":[{"s":"卤校长观音桥店","m":"玉米淀粉-斤装","sup":"李正良","pr":5.0,"st":42.9,"p":"区间内","d":"2026-10-17","bill":"CGRK190927"},{"s":"耙二哥新牌坊店","m":"小葱","sup":"江北区臻艾生鲜经营部","pr":5.2,"st":-5.5,"p":"新低","d":"2026-10-17","bill":"CGRK190984"},{"s":"萍姐北京总店","m":"哈密瓜","sup":"店内自采","pr":1.9,"st":-52.6,"p":"区间内","d":"2026-10-17","bill":"CGRK191003"},{"s":"萍姐北京总店","m":"哈密瓜","sup":"店内自采","pr":1.93,"st":-51.7,"p":"区间内","d":"2026-10-17","bill":"CGRK191003"},{"s":"萍姐火锅观音桥店","m":"小葱","sup":"江北区臻艾生鲜经营部","pr":5.2,"st":-5.5,"p":"新低","d":"2026-10-17","bill":"CGRK191022"},{"s":"萍姐火锅观音桥店","m":"香菜","sup":"江北区臻艾生鲜经营部","pr":5.5,"st":-8.3,"p":"新低","d":"2026-10-17","bill":"CGRK191022"},{"s":"卤校长沙坪坝店","m":"小葱（味碟）","sup":"梁文勇","pr":1.0,"st":-80.0,"p":"区间内","d":"2026-10-17","bill":"CGRK191044"},{"s":"卤校长观音桥店","m":"生菜","sup":"李正良","pr":1.64,"st":-34.5,"p":"新低","d":"2026-10-17","bill":"CGRK191060"},{"s":"卤校长观音桥店","m":"鲜木耳","sup":"李正良","pr":1.5,"st":-62.5,"p":"新低","d":"2026-10-17","bill":"CGRK191060"},{"s":"长安亭深圳店","m":"生粉","sup":"深圳市菌多多农副产品有限公司","pr":4.0,"st":-60.0,"p":"新低","d":"2026-10-17","bill":"CGRK191246"},{"s":"萍姐火锅观音桥店","m":"小葱","sup":"江北区臻艾生鲜经营部","pr":4.5,"st":-13.5,"p":"新低","d":"2026-10-18","bill":"CGRK191083"},{"s":"耙二哥新牌坊店","m":"小葱","sup":"江北区臻艾生鲜经营部","pr":4.5,"st":-13.5,"p":"新低","d":"2026-10-18","bill":"CGRK191100"},{"s":"卤校长沙坪坝店","m":"脐橙","sup":"向复成","pr":5.54,"st":38.5,"p":"区间内","d":"2026-10-18","bill":"CGRK191105"},{"s":"萍姐北京总店","m":"蒿子秆","sup":"小菜-郑维淦","pr":3.5,"st":40.0,"p":"区间内","d":"2026-10-18","bill":"CGRK191107"},{"s":"萍姐北京总店","m":"丝瓜尖","sup":"小菜-郑维淦","pr":9.0,"st":28.6,"p":"新高","d":"2026-10-18","bill":"CGRK191107"},{"s":"萍姐北京总店","m":"丝瓜尖","sup":"小菜-郑维淦","pr":9.0,"st":28.6,"p":"新高","d":"2026-10-18","bill":"CGRK191108"},{"s":"长安亭深圳店","m":"干噎酸奶冷萃60小时","sup":"店内自采","pr":104.25,"st":-25.5,"p":"新低","d":"2026-10-18","bill":"CGRK191223"},{"s":"长安亭深圳店","m":"山竹","sup":"店内自采","pr":16.08,"st":-35.7,"p":"区间内","d":"2026-10-18","bill":"CGRK191223"},{"s":"长安亭深圳店","m":"水蛏子","sup":"店内自采","pr":15.9,"st":-11.7,"p":"新低","d":"2026-10-18","bill":"CGRK191223"},{"s":"长安亭深圳店","m":"紫菜（100g/包）","sup":"店内自采","pr":4.5,"st":-54.7,"p":"样本不足","d":"2026-10-18","bill":"CGRK191223"}]};
const rows=D.rows;
const $=s=>document.querySelector(s);
const money=v=>v.toLocaleString(undefined,{maximumFractionDigits:0});
$("#sub").textContent=`数据截至 ${D.to} · 近 31 天 · 生成 ${D.build} · 需核实 ${D.kpi.red} 条`;
$("#kpis").innerHTML=[
 ["明细行",money(D.kpi.rows),""],
 ["采购金额",money(D.kpi.amount),"元"],
 ["需核实",money(D.kpi.red),"条"],
 ["原始异常",money(D.kpi.raw),"条"],
].map(([l,v,u])=>`<div class="kpi ${l==="需核实"?"red":""}"><div class="lb">${l}</div><div class="vl">${v}${u?" "+u:""}</div></div>`).join("");

const cnt={},pos={};
rows.forEach(r=>{cnt[r.s]=(cnt[r.s]||0)+1;pos[r.p]=(pos[r.p]||0)+1;});
const top=Object.entries(cnt).sort((a,b)=>b[1]-a[1]).slice(0,8);
const mx=top.length?top[0][1]:1;
$("#chart1").innerHTML=top.map(([n,v])=>`<div class="bar"><div class="nm" title="${n}">${n}</div><div class="tr"><i style="width:${Math.round(v/mx*100)}%"></i></div><div class="vv">${v}</div></div>`).join("");
const tot=Object.values(pos).reduce((a,b)=>a+b,0)||1;
const cols={新高:"#E23D3D",新低:"#12A06D",区间内:"#DE8A0B",样本不足:"#9B6BD6"};
$("#chart2").innerHTML=Object.entries(pos).sort((a,b)=>b[1]-a[1]).map(([n,v])=>
  `<div class="tag" style="border-left-color:${cols[n]||"#2F5FD0"}"><div class="n">${n}</div><div class="v">${v} <span class="sm">${Math.round(v/tot*100)}%</span></div></div>`).join("");

[...new Set(rows.map(r=>r.s))].sort().forEach(s=>$("#fstore").insertAdjacentHTML("beforeend",`<option>${s}</option>`));
[...new Set(rows.map(r=>r.p))].sort().forEach(s=>$("#fpos").insertAdjacentHTML("beforeend",`<option>${s}</option>`));

function filtered(){
  const st=$("#fstore").value,ps=$("#fpos").value,k=$("#kw").value.trim().toLowerCase();
  return rows.filter(r=>(!st||r.s===st)&&(!ps||r.p===ps)&&(!k||(r.m+r.sup).toLowerCase().includes(k)));
}
function render(){
  const list=filtered();
  $("#cnt").textContent=`共 ${list.length} 条`;
  $("#tb").innerHTML=list.map(r=>`<tr>
    <td>${r.s}</td><td>${r.m}</td><td>${r.sup}</td>
    <td class="r">${r.pr.toFixed(2)}</td>
    <td class="r ${r.st>0?"up":"down"}">${r.st>0?"+":""}${r.st.toFixed(1)}%</td>
    <td><span class="pill ${r.p==="新高"?"new":r.p==="区间内"?"mid":""}">${r.p}</span></td>
    <td>${r.d}</td><td class="sm">${r.bill}</td></tr>`).join("");
}
$("#fstore").onchange=$("#fpos").onchange=$("#kw").oninput=render;
$("#csv").onclick=()=>{
  const list=filtered();
  const head=["门店","物料","供货商","单价","单步%","位置","日期","单据"];
  const esc=v=>`"${String(v??"").replace(/"/g,'""')}"`;
  const lines=[head.map(esc).join(",")].concat(list.map(r=>[r.s,r.m,r.sup,r.pr,r.st,r.p,r.d,r.bill].map(esc).join(",")));
  const blob=new Blob(["\ufeff"+lines.join("\r\n")],{type:"text/csv;charset=utf-8"});
  const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=`需核实明细_${D.to}.csv`;a.click();
};
render();
