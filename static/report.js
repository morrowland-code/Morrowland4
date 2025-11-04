function qs(k){ return new URL(location.href).searchParams.get(k); }

async function verify(session_id){
  const r = await fetch(`/verify-payment?session_id=${encodeURIComponent(session_id)}`);
  const data = await r.json();
  return !!data.paid;
}

(async function init(){
  const gate = document.getElementById("gate");
  const reportDiv = document.getElementById("report");
  const session_id = qs("session_id");
  const code = qs("code") || "Medium-Medium-Medium-Medium-Medium";
  const sub = qs("sub"); // optional 5-level subtype like "14325"

  const fromSubtype = document.referrer.includes("/subtype");
if ((!session_id || !(await verify(session_id))) && !fromSubtype) {
  gate.innerHTML = `<p>Payment not verified. <a href="/">Back to quiz</a></p>`;
  return;
}

  const html = await fetch(`/api/render-report?code=${encodeURIComponent(code)}${sub?`&sub=${encodeURIComponent(sub)}`:""}`).then(r=>r.text());

  gate.classList.add("hidden");
  reportDiv.classList.remove("hidden");
  reportDiv.innerHTML = html;
})();