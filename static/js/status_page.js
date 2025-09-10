async function loadStatus(){
  const r = await fetch('/api/me');
  const j = await r.json();
  if(!j.ok){ window.location='/login'; return; }
  const u = j.user;
  document.getElementById('status').innerHTML = `<p><strong>${u.username}</strong></p>
    <p>Balance: $${u.balance.toFixed(2)}</p>
    <p>Points: ${u.points_balance}</p>
    <p>Status: ${u.status}</p>
    <p>Tier points this year: ${u.tier_points_year}</p>`;
}
window.onload = loadStatus;
