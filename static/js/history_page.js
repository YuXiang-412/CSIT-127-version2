async function loadHistory(){
  const r = await fetch('/api/history');
  const j = await r.json();
  if(!j.ok){ window.location='/login'; return; }
  const h = j.history || [];
  const t = j.tickets || [];
  const rdm = j.redemptions || [];
  let html = '<h3>History Events</h3>' + h.map(x=>`<div class="row"><small>${x.ts}</small> <div>${x.type}: ${x.details}</div></div>`).join('');
  html += '<h3>Tickets</h3>' + t.map(x=>`<div class="row">${x.date} | ${x.type} | ${x.flight_id} | ${x.miles} miles | $${x.price}</div>`).join('');
  html += '<h3>Redemptions</h3>' + rdm.map(x=>`<div class="row">${x.ts} | ${x.type || 'gift'} | ${x.name || x.flight_id || ''} | ${x.points || ''} pts</div>`).join('');
  document.getElementById('history').innerHTML = html;
}
window.onload = loadHistory;
