async function check(){
  let payload={monthly_income:parseFloat(income.value),mobile_txn_count:parseInt(txn.value),utility_on_time_pct:parseFloat(util.value),months_active:parseInt(months.value)};
  let r=await fetch('http://127.0.0.1:8000/predict',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
  let d=await r.json();
  result.innerText=JSON.stringify(d);
}