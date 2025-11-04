document.getElementById("submitSub").addEventListener("click", ()=>{
  const form = document.getElementById("subForm");
  const O = form.O.value;
  const C = form.C.value;
  const E = form.E.value;
  const A = form.A.value;
  const N = form.N.value;
  const subcode = `${O}${C}${E}${A}${N}`;

  const maincode = sessionStorage.getItem("maincode") || "Medium-Medium-Medium-Medium-Medium";

  document.getElementById("subResult").innerHTML =
    `Subtype code: <strong>${subcode}</strong><br>
     <a href="/report?code=${encodeURIComponent(maincode)}&sub=${subcode}">
       View Detailed Report
     </a>`;
});