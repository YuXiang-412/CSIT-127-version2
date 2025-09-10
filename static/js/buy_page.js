async function loadFlights(){
  const r = await fetch('/api/flights');
  const j = await r.json();
  if(!j.ok) return;
  const flights = j.flights;
  const c = document.getElementById('flights');
  c.innerHTML = flights.map(f=>`<div class="card">
    <p><strong>${f.id}</strong> ${f.from} → ${f.to} | $${f.price} | ${f.base_miles} miles</p>
    <p>
      Cabin: <select id="cabin_${f.id}"><option value="Y">Economy</option><option value="J">Business</option><option value="F">First</option></select>
      <button onclick="buy('${f.id}')">Buy</button>
    </p>
  </div>`).join('');
}
async function buy(flightId){
  const cabin = document.getElementById('cabin_'+flightId).value;
  const res = await fetch('/api/buy', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({flight_id: flightId, cabin})});
  const j = await res.json();
  alert(JSON.stringify(j));
  if(j.ok) loadFlights();
}
window.onload = loadFlights;
