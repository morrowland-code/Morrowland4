// ----- 50 questions: 10 per trait -----
const QUESTIONS = [
  // Openness (10)
  { t:"openness", q:"I enjoy exploring unfamiliar ideas.", reverse:false },
  { t:"openness", q:"I actively seek new experiences.", reverse:false },
  { t:"openness", q:"I dislike trying new things.", reverse:true },
  { t:"openness", q:"Abstract thinking appeals to me.", reverse:false },
  { t:"openness", q:"I avoid unconventional viewpoints.", reverse:true },
  { t:"openness", q:"I like creative problem solving.", reverse:false },
  { t:"openness", q:"I prefer routine over novelty.", reverse:true },
  { t:"openness", q:"Art, music or literature interest me.", reverse:false },
  { t:"openness", q:"I question traditions and norms.", reverse:false },
  { t:"openness", q:"I’m uncomfortable with ambiguity.", reverse:true },

  // Conscientiousness (10)
  { t:"conscientiousness", q:"I plan tasks before starting.", reverse:false },
  { t:"conscientiousness", q:"I leave things to the last minute.", reverse:true },
  { t:"conscientiousness", q:"I keep things organized.", reverse:false },
  { t:"conscientiousness", q:"I stick to schedules I set.", reverse:false },
  { t:"conscientiousness", q:"I’m careless with details.", reverse:true },
  { t:"conscientiousness", q:"I finish what I start.", reverse:false },
  { t:"conscientiousness", q:"I struggle to follow through.", reverse:true },
  { t:"conscientiousness", q:"I prepare carefully.", reverse:false },
  { t:"conscientiousness", q:"I often misplace things.", reverse:true },
  { t:"conscientiousness", q:"I like having clear structure.", reverse:false },

  // Extraversion (10)
  { t:"extraversion", q:"I feel energized by social events.", reverse:false },
  { t:"extraversion", q:"I prefer being alone most of the time.", reverse:true },
  { t:"extraversion", q:"I’m talkative around new people.", reverse:false },
  { t:"extraversion", q:"I avoid the spotlight.", reverse:true },
  { t:"extraversion", q:"I seek excitement and activity.", reverse:false },
  { t:"extraversion", q:"I feel drained by group conversations.", reverse:true },
  { t:"extraversion", q:"I easily start conversations.", reverse:false },
  { t:"extraversion", q:"I keep to myself in groups.", reverse:true },
  { t:"extraversion", q:"I like being the center of attention.", reverse:false },
  { t:"extraversion", q:"I find it hard to express myself verbally.", reverse:true },

  // Agreeableness (10)
  { t:"agreeableness", q:"I try to see things from others’ perspectives.", reverse:false },
  { t:"agreeableness", q:"I enjoy competition more than cooperation.", reverse:true },
  { t:"agreeableness", q:"I am considerate and kind to most people.", reverse:false },
  { t:"agreeableness", q:"I am skeptical of people’s motives.", reverse:true },
  { t:"agreeableness", q:"I forgive people who have wronged me.", reverse:false },
  { t:"agreeableness", q:"I prioritize my needs over others’ feelings.", reverse:true },
  { t:"agreeableness", q:"I avoid hurting others’ feelings.", reverse:false },
  { t:"agreeableness", q:"I’m blunt even if it upsets people.", reverse:true },
  { t:"agreeableness", q:"I value harmony in groups.", reverse:false },
  { t:"agreeableness", q:"I hold grudges.", reverse:true },

  // Neuroticism (10)
  { t:"neuroticism", q:"I often feel anxious or tense.", reverse:false },
  { t:"neuroticism", q:"I stay calm in stressful situations.", reverse:true },
  { t:"neuroticism", q:"My mood changes frequently.", reverse:false },
  { t:"neuroticism", q:"I rarely worry about things.", reverse:true },
  { t:"neuroticism", q:"I’m easily irritated.", reverse:false },
  { t:"neuroticism", q:"I bounce back quickly after setbacks.", reverse:true },
  { t:"neuroticism", q:"I often feel overwhelmed.", reverse:false },
  { t:"neuroticism", q:"I keep emotions steady most days.", reverse:true },
  { t:"neuroticism", q:"I’m sensitive to stress.", reverse:false },
  { t:"neuroticism", q:"I rarely feel nervous.", reverse:true },
];

function average(a){ return a.reduce((x,y)=>x+y,0)/a.length; }
function reverseScore(v){ return 6 - v; }
function bucket(avg){ if (avg <= 2.5) return "Low"; if (avg <= 3.8) return "Medium"; return "High"; }

// Render quiz
const quizDiv = document.getElementById("quiz");
quizDiv.innerHTML = QUESTIONS.map((item, i) => `
  <div class="q">
    <div class="qtext">${i+1}. ${item.q}</div>
    <div class="scale">
      ${[1,2,3,4,5].map(v => `
        <label><input type="radio" name="q${i}" value="${v}"> ${v}</label>
      `).join("")}
    </div>
  </div>
`).join("");

function scoreAll(){
  const byTrait = { openness:[], conscientiousness:[], extraversion:[], agreeableness:[], neuroticism:[] };
  for (let i=0;i<QUESTIONS.length;i++){
    const radios = document.getElementsByName(`q${i}`);
    let v = null; for (const r of radios){ if (r.checked){ v = Number(r.value); break; } }
    if (v == null) throw new Error("Please answer all questions.");
    const it = QUESTIONS[i];
    byTrait[it.t].push(it.reverse ? reverseScore(v) : v);
  }
  const avgs = {
    openness: average(byTrait.openness),
    conscientiousness: average(byTrait.conscientiousness),
    extraversion: average(byTrait.extraversion),
    agreeableness: average(byTrait.agreeableness),
    neuroticism: average(byTrait.neuroticism),
  };
  const code = [bucket(avgs.openness), bucket(avgs.conscientiousness), bucket(avgs.extraversion), bucket(avgs.agreeableness), bucket(avgs.neuroticism)].join("-");
  return { code };
}

document.getElementById("submitBtn").addEventListener("click", async () => {
  try {
    const { code } = scoreAll();
    console.log("Final Big 5 Code:", code);

    // ✅ Skip any payment or JSON parsing — just show results page
    window.location.href = "/report?code=" + encodeURIComponent(code);

  } catch (e) {
    alert(e.message);
  }
});