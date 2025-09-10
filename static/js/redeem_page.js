async function loadRedeem(){
  const r = await fetch('/api/gifts_and_discounts');
  const j = await r.json();
  const gifts = j.gifts || [];
  const discounts = j.discounts || {};
  const upgrades = j.upgrade_costs || {};
  document.getElementById('gifts').innerHTML = gifts.map(g=>`<div class="row"><span>${g.name} — ${g.cost_points} pts</span> <button onclick="redeemGift('${g.id}')">Redeem</button></div>`).join('');
  document.getElementById('discounts').innerHTML = Object.keys(discounts).map(k=>`<div class="row"><span>${k} pts => $${discounts[k]}</span> <button onclick="redeemDiscount(${k})">Convert</button></div>`).join('');
  document.getElementById('upgrades').innerHTML = Object.keys(upgrades).map(k=>`<div class="row"><span>Pay ${upgrades[k]} pts => Upgrade to ${k}</span> <button onclick="payUpgrade('${k}')">Upgrade</button></div>`).join('');
}
async function redeemGift(id){
  const res = await fetch('/api/redeem_gift', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({gift_id: id})});
  const j = await res.json();
  alert(JSON.stringify(j));
  loadRedeem();
}
async function redeemDiscount(points){
  const res = await fetch('/api/redeem_discount', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({points})});
  const j = await res.json();
  alert(JSON.stringify(j));
  loadRedeem();
}
async function payUpgrade(target){
  const res = await fetch('/api/upgrade_status', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({target})});
  const j = await res.json();
  alert(JSON.stringify(j));
  loadRedeem();
}
window.onload = loadRedeem;
