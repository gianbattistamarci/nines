/* Nines: the game code. The course content lives in questions.js. */
"use strict";
/* ---------------------------------------------------------------- content */
/* The lessons and exams (NOTICE, COURSE and LATER) live in questions.js, loaded just above this script. */
if(typeof COURSE === "undefined"){ document.getElementById("root").textContent = "The file questions.js could not be loaded. It must sit in the same folder as index.html."; throw new Error("questions.js missing"); }
/* Ranks are earned by passing checkpoints, so each title says what the player can now do. */
var RANKS = [
 { name:"Newcomer" },
 { exam:"x-a", cp:"Checkpoint A", name:"Observer", can:"You can say what reliable means from the user's side." },
 { exam:"x-b", cp:"Checkpoint B", name:"Planner", can:"You can set a target and read an error budget." },
 { exam:"x-c", cp:"Checkpoint C", name:"Watchkeeper", can:"You know what to monitor and what deserves an alarm." },
 { exam:"x-d", cp:"Checkpoint D", name:"Responder", can:"You can run an incident and learn from it." },
 { exam:"x-e", cp:"Checkpoint E", name:"Practitioner", can:"You understand safe change, resilient design and team setup." },
 { exam:"x-final", cp:"the final exam", name:"Reliability Engineer", can:"You see the whole picture." }
];

var SEQ = [];
COURSE.forEach(function(u){ u.nodes.forEach(function(n){ n.unit = u; SEQ.push(n); }); });
var MAX_STARS = SEQ.filter(function(n){ return n.type === "lesson"; }).length * 3;

/* ------------------------------------------------------------------ state */
/* Progress lives only in this browser's local storage. The game sends nothing anywhere.
   Whatever is read back from storage is rebuilt field by field, so a damaged or edited save cannot
   put unexpected values or keys into the game. */
var VERSION = "1.0";
var LS_KEY = "reliability-line-v1", PREF_KEY = "reliability-line-prefs", UNDO_KEY = "nines-undo";
function blank(){ return { v:1, xp:0, streak:{n:0,last:""}, done:{}, exams:{}, updatedAt:0 }; }
function num(v, max){ v = +v; return (isFinite(v) && v > 0) ? Math.min(Math.floor(v), max) : 0; }
function own(o, k){ return !!o && typeof o === "object" && Object.prototype.hasOwnProperty.call(o, k) && !!o[k] && typeof o[k] === "object" ? o[k] : null; }
function clean(o){
  var s = blank(); if(!o || typeof o !== "object") return s;
  s.xp = num(o.xp, 1e7); s.updatedAt = num(o.updatedAt, 1e14);
  var st = own(o, "streak");
  if(st){ var last = String(st.last || ""); s.streak = { n:num(st.n, 1e5), last:/^\d{4}-\d{2}-\d{2}$/.test(last) ? last : "" }; }
  var done = own(o, "done"), exams = own(o, "exams");
  SEQ.forEach(function(n){
    var d = own(n.type === "exam" ? exams : done, n.id); if(!d) return;
    if(n.type === "exam") s.exams[n.id] = { best:num(d.best, 100), passed:d.passed === true, tries:num(d.tries, 1e6) };
    else s.done[n.id] = { stars:Math.max(1, num(d.stars, 3)), best:num(d.best, 100), plays:num(d.plays, 1e6) };
  });
  return s;
}
function readSave(){ try { var raw = localStorage.getItem(LS_KEY); return raw ? clean(JSON.parse(raw)) : blank(); } catch(e){ localOk = false; return blank(); } }
var localOk = true, S = readSave();
function save(){ S.updatedAt = Date.now(); try { localStorage.setItem(LS_KEY, JSON.stringify(S)); localOk = true; } catch(e){ localOk = false; } paintSave(); }

/* Clear game data: one click wipes the saved progress and settings, refreshes the browser's stored
   copies of the game files, and reloads. The old save is kept until this tab closes, so it can be undone. */
var clearing = false, cleared = null;
try { var u = sessionStorage.getItem(UNDO_KEY); if(u){ cleared = JSON.parse(u); if(!cleared || typeof cleared !== "object") cleared = null; } } catch(e){ cleared = null; }
function clearGameData(){
  if(clearing) return;
  clearing = true;
  try { sessionStorage.setItem(UNDO_KEY, JSON.stringify({ save:localStorage.getItem(LS_KEY), prefs:localStorage.getItem(PREF_KEY) })); } catch(e){}
  try { localStorage.removeItem(LS_KEY); localStorage.removeItem(PREF_KEY); } catch(e){}
  renderHome();
  var jobs = [];
  try {
    if(window.caches && caches.keys) jobs.push(caches.keys().then(function(keys){ return Promise.all(keys.map(function(k){ return caches.delete(k); })); }));
    if(window.fetch && /^https?:$/.test(location.protocol)) [location.pathname, "game.js", "questions.js"].forEach(function(f){ jobs.push(fetch(f, { cache:"reload" })); });
  } catch(e){}
  var go = function(){ location.reload(); };
  Promise.race([ Promise.all(jobs.map(function(j){ return Promise.resolve(j).catch(function(){}); })),
                 new Promise(function(res){ setTimeout(res, 4000); }) ]).then(go, go);
}
function undoClear(){
  try {
    if(cleared && typeof cleared.save === "string") localStorage.setItem(LS_KEY, cleared.save);
    if(cleared && typeof cleared.prefs === "string") localStorage.setItem(PREF_KEY, cleared.prefs);
    sessionStorage.removeItem(UNDO_KEY);
  } catch(e){}
  cleared = null; S = readSave(); loadPrefs(); applyPrefs(); renderHome();
}
function dismissClear(){ try { sessionStorage.removeItem(UNDO_KEY); } catch(e){} cleared = null; renderHome(); }

/* ---------------------------------------------------------------- helpers */
var root = document.getElementById("root");
function h(tag, attrs){
  var e = document.createElement(tag), k, i;
  for(k in (attrs || {})){ var v = attrs[k];
    if(v == null || v === false) continue;
    if(k === "class") e.className = v; else if(k === "text") e.textContent = v;
    else if(k.slice(0,2) === "on") e.addEventListener(k.slice(2), v);
    else if(k === "disabled") e.disabled = true; else e.setAttribute(k, v === true ? "" : v); }
  for(i = 2; i < arguments.length; i++){ var c = arguments[i];
    if(Array.isArray(c)) c.forEach(function(x){ if(x != null && x !== false) e.append(x); });
    else if(c != null && c !== false) e.append(c); }
  return e;
}
/* Icons are built as DOM nodes from fixed path data. The game never turns a string into HTML. */
var SVG_NS = "http://www.w3.org/2000/svg";
var ICONS = {
  bolt:"M13 2 4 14h6l-1 8 9-12h-6z",
  flame:"M12 2c1 4 6 6 6 12a6 6 0 0 1-12 0c0-2 1-4 2-5 0 2 1 3 2 3 0-3 0-6 2-10z",
  star:"M12 2l3 7 7 .6-5.3 4.8L18.4 22 12 18.2 5.6 22l1.7-7.6L2 9.6 9 9z",
  lock:"M7 10V8a5 5 0 0 1 10 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2zm2 0h6V8a3 3 0 0 0-6 0z",
  cup:"M7 3h10v2h3v3a4 4 0 0 1-4 4h-.4A5 5 0 0 1 13 14.9V18h3v3H8v-3h3v-3.1A5 5 0 0 1 8.4 12H8a4 4 0 0 1-4-4V5h3zm0 4H6v1a2 2 0 0 0 1 1.7zm10 0v2.7A2 2 0 0 0 18 8V7z",
  check:"M5 12.5l4.5 4.5L19 7",
  cross:"M6 6l12 12M18 6 6 18"
};
var STROKED = { check:true, cross:true };
function icon(name){
  var s = document.createElementNS(SVG_NS, "svg"), p = document.createElementNS(SVG_NS, "path");
  s.setAttribute("viewBox", "0 0 24 24"); s.setAttribute("class", "ic"); s.setAttribute("aria-hidden", "true"); s.setAttribute("fill", "currentColor");
  p.setAttribute("d", ICONS[name]);
  if(STROKED[name]){ p.setAttribute("fill", "none"); p.setAttribute("stroke", "currentColor"); p.setAttribute("stroke-width", "3.5");
    p.setAttribute("stroke-linecap", "round"); p.setAttribute("stroke-linejoin", "round"); }
  s.appendChild(p); return s;
}
function shuffle(a){ a = a.slice(); for(var i = a.length - 1; i > 0; i--){ var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t; } return a; }
function pick(a){ return a[Math.floor(Math.random() * a.length)]; }
function day(d){ return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2); }
function isDone(n){ return n.type === "exam" ? !!(S.exams[n.id] && S.exams[n.id].passed) : !!S.done[n.id]; }
function isOpen(n){ var i = SEQ.indexOf(n); return i === 0 || isDone(SEQ[i - 1]); }
function nextNode(){ for(var i = 0; i < SEQ.length; i++) if(!isDone(SEQ[i])) return SEQ[i]; return null; }
function rankInfo(){
  var i = 0; while(RANKS[i + 1] && S.exams[RANKS[i + 1].exam] && S.exams[RANKS[i + 1].exam].passed) i++;
  var cur = RANKS[i], nx = RANKS[i + 1] || null, frac = nx ? 0 : 1, built = false, from = 0, to = -1;
  if(nx){
    SEQ.forEach(function(n, k){ if(n.id === nx.exam) to = k; if(cur.exam && n.id === cur.exam) from = k + 1; });
    if(to >= 0){ built = true; var done = 0; for(var k = from; k <= to; k++) if(isDone(SEQ[k])) done++; frac = done / (to - from + 1); }
  }
  return { name:cur.name, next:nx, frac:frac, built:built };
}
function liveStreak(){ var t = new Date(), y = new Date(t.getTime() - 864e5);
  return (S.streak.last === day(t) || S.streak.last === day(y)) ? S.streak.n : 0; }
function bumpStreak(){ var t = new Date(), y = new Date(t.getTime() - 864e5), td = day(t);
  if(S.streak.last === td) return; S.streak.n = (S.streak.last === day(y)) ? S.streak.n + 1 : 1; S.streak.last = td; }
function starRow(n, cls){ var w = h("span", {class:cls || "stars", role:"img", "aria-label":n + " of 3 stars"});
  for(var i = 0; i < 3; i++) w.append(h("span", {"aria-hidden":"true", text: i < n ? "★" : "☆"})); return w; }
var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function confetti(){
  if(reduceMotion) return;
  var box = h("div", {class:"confetti", "aria-hidden":"true"}), cols = ["var(--sun)","var(--blue)","var(--good-solid)","var(--grape)","var(--teal)"];
  for(var i = 0; i < 48; i++) box.append(h("i", {style:"left:" + (Math.random() * 100) + "%;background:" + cols[i % cols.length] +
    ";animation-duration:" + (1.8 + Math.random() * 1.8) + "s;animation-delay:" + (Math.random() * 0.6) + "s"}));
  document.body.append(box); setTimeout(function(){ box.remove(); }, 4500);
}
var prefs = { big:false };
function loadPrefs(){ prefs.big = false; try { var o = JSON.parse(localStorage.getItem(PREF_KEY) || "{}"); prefs.big = !!o && o.big === true; } catch(e){} }
loadPrefs();
function applyPrefs(){ document.documentElement.classList.toggle("big", prefs.big); }

/* ----------------------------------------------------------- score chips */
var sess = null;
function chips(){
  var stars = 0, k; for(k in S.done) stars += S.done[k].stars;
  var live = sess && sess.phase !== "result";
  var pts = S.xp + (live ? sess.xp : 0), st = liveStreak();
  var gain = sess && sess.phase === "feedback" && sess.last ? sess.last.gain : 0;
  var out = [ h("span", {class:"chip c-pts" + (gain ? " pop" : "")}, icon("bolt"), h("b", {text:String(pts)}), h("span", {class:"lbl", text:"points"}),
    gain ? h("span", {class:"fly", "aria-hidden":"true", text:"+" + gain}) : null) ];
  if(live && sess.combo >= 2) out.push(h("span", {class:"chip c-combo"}, h("b", {text:String(sess.combo)}), h("span", {class:"lbl", text:"in a row"})));
  out.push(h("span", {class:"chip c-streak"}, icon("flame"), h("b", {text:String(st)}), h("span", {class:"lbl", text:"day streak"})));
  out.push(h("span", {class:"chip c-stars"}, icon("star"), h("b", {text:stars + "/" + MAX_STARS}), h("span", {class:"lbl", text:"stars"})));
  return h("div", {class:"chips", role:"group", "aria-label":"Your score"}, out);
}
function rankBar(){
  var r = rankInfo(), pct = Math.round(r.frac * 100);
  var tip = !r.next ? "Top rank reached" : (r.built ? "Next: " + r.next.name + ". Pass " + r.next.cp + "." : "Next: " + r.next.name + ", in the full version.");
  return h("div", {class:"rank"}, h("span", {text:"Rank: " + r.name}),
    h("span", {class:"meter", role:"img", "aria-label":pct + "% of the way to the next rank"}, h("i", {style:"width:" + pct + "%"})),
    h("span", {text:tip}));
}

/* ------------------------------------------------------------------- home */
function paintSave(){
  var el = document.getElementById("save"); if(!el) return;
  el.replaceChildren(h("span", {class:"dot " + (localOk ? "ok" : "bad")}),
    h("span", {text: localOk ? "Progress saved on this device" : "Progress cannot be saved in this window"}));
}
function renderHome(){
  sess = null;
  var nx = nextNode(), items = [], zig = [0, 1, 2, 1], zi = 0;
  COURSE.forEach(function(u){
    items.push(h("li", null, h("div", {class:"banner u" + ((u.n - 1) % 3 + 1)}, h("div", {class:"k", text:"Unit " + u.n}), h("h2", {text:u.title}), h("p", {text:u.blurb}))));
    u.nodes.forEach(function(n, ni){
      var done = isDone(n), op = isOpen(n), cur = op && !done, ex = n.type === "exam";
      var cls = "stop" + (ex ? " exam" : "") + (done ? " done" : (cur ? " now" : " locked"));
      var badge = h("span", {class:"badge"}, done ? icon("check") : (!op ? icon("lock") : (ex ? icon("cup") : n.code)));
      var right = h("span", {class:"stop-r"});
      if(!op) right.append("Locked");
      else {
        if(!ex && S.done[n.id]) right.append(starRow(S.done[n.id].stars));
        if(ex && S.exams[n.id]) right.append(h("span", {text:"Best " + S.exams[n.id].best + "%"}));
        if(cur) right.append(h("span", {class:"go", text: ex ? (S.exams[n.id] ? "Retake" : "Take exam") : "Start"}));
        else right.append(h("span", {text: ex ? "Tap to retake" : "Tap to practise"}));
      }
      var body = [badge, h("span", null, h("span", {class:"stop-t", text:n.title}), h("span", {class:"stop-s", text:n.sub})), right];
      var card = op ? h("button", {class:cls, type:"button", onclick:function(){ start(n); }}, body) : h("div", {class:cls}, body);
      items.push(h("li", {class:"stop-li", style:"--sx:calc(var(--step) * " + zig[zi++ % 4] + ")"},
        ni > 0 ? h("span", {class:"conn" + (op ? " on" : "")}) : null, card));
    });
  });

  var hero;
  if(!nx) hero = [h("strong", {text:"You have completed the course."}), h("p", {text:"You hold the top rank: " + RANKS[RANKS.length - 1].name + ". Practise any stop to collect all the stars."})];
  else if(!S.updatedAt) hero = [h("strong", {text:"Learn site reliability engineering, from zero"}),
    h("p", {text:"How do the apps you rely on stay up and running? Short stops, plain language, a few minutes each. No experience needed."}),
    h("button", {class:"btn btn-primary btn-big", type:"button", text:"Start learning", onclick:function(){ start(nx); }})];
  else hero = [h("strong", {text:"Welcome back."}), h("p", {text:"Next stop: " + nx.title + "."}),
    h("button", {class:"btn btn-primary btn-big", type:"button", text:"Continue", onclick:function(){ start(nx); }})];

  var notice = null;
  if(clearing) notice = h("div", {class:"confirm", role:"status"}, h("span", {text:"Clearing game data and loading the newest version..."}));
  else if(cleared) notice = h("div", {class:"confirm", role:"status"},
    h("span", {text: typeof cleared.save === "string" ? "Game data cleared. Your old progress can be put back until you close this tab." : "Game data cleared. The newest version is loaded."}),
    typeof cleared.save === "string" ? h("button", {class:"btn btn-small", type:"button", text:"Undo", onclick:undoClear}) : null,
    h("button", {class:"btn btn-small", type:"button", text:"OK", onclick:dismissClear}));

  root.replaceChildren(
    h("header", {class:"hud"},
      h("div", {class:"hud-row"}, h("h1", {class:"logo", text:"Nines"}), chips()),
      rankBar()),
    notice || "",
    h("section", {class:"hero"}, h("div", {class:"bubble"}, hero)),
    h("ol", {class:"path"}, items),
    LATER.length ? h("section", {class:"later"}, h("h2", {text:"More stops are being built"}),
      h("ul", null, LATER.map(function(l){ return h("li", null, icon(l.exam ? "cup" : "lock"), h("span", {text:l.k + ": " + l.t})); }))) : "",
    h("footer", {class:"foot"}, h("span", {class:"save", id:"save"}),
      h("span", {class:"foot-r"},
        h("button", {class:"linkish", type:"button", "aria-pressed":String(prefs.big), text: prefs.big ? "Normal text size" : "Larger text",
          onclick:function(){ prefs.big = !prefs.big; applyPrefs(); try { localStorage.setItem(PREF_KEY, JSON.stringify(prefs)); } catch(e){} renderHome(); }}),
        h("button", {class:"linkish", type:"button", disabled:clearing, text:"Clear game data", title:"Erase saved progress and settings on this device, and load the newest version of the game", onclick:clearGameData}),
        h("span", {class:"ver", text:"Version " + VERSION}))));
  paintSave();
}

/* ----------------------------------------------------------------- player */
var CHEER = ["Correct.", "Spot on.", "Exactly right.", "That is it."];
var NUDGE = ["Not quite.", "Not this time.", "Close, but no."];
function prep(q){
  var p = { q:q, type:q.type };
  if(q.type === "choice"){ p.sel = null;
    p.opts = q.opts.length > 2 ? shuffle(q.opts) : q.opts.slice().sort(function(a, b){ return a.t === "True" ? -1 : (b.t === "True" ? 1 : 0); }); }
  if(q.type === "sort"){ p.items = shuffle(q.items); p.sel = p.items.map(function(){ return null; }); }
  if(q.type === "order"){ var pool; do { pool = shuffle(q.items); } while(pool.join("|") === q.items.join("|")); p.pool = pool; p.sel = []; }
  return p;
}
/* An entry in a lesson's qs is one question, or a list of versions of the same idea. Each play draws one
   version per idea and avoids the version shown last time, so a replay is not a repeat. */
var lastDraw = {};
function draw(key, slot){
  if(!Array.isArray(slot)) return slot;
  var i = Math.floor(Math.random() * slot.length);
  if(slot.length > 1 && i === lastDraw[key]) i = (i + 1) % slot.length;
  lastDraw[key] = i;
  return slot[i];
}
function start(node){
  var ex = node.type === "exam";
  var qs = node.qs.map(function(slot, i){ return draw(node.id + ":" + i, slot); });
  if(ex) qs = shuffle(qs);
  sess = { node:node, exam:ex, full: ex ? !(S.exams[node.id] && S.exams[node.id].passed) : !S.done[node.id], qs:qs,
    queue: qs.map(function(_, i){ return i; }), total:qs.length, resolved:0, mistakes:0, missed:{}, results:[],
    xp:0, combo:0, phase:"intro", cur:null, p:null, last:null, quit:false, fresh:false };
  renderPlay();
  window.scrollTo(0, 0);
}
function ready(){ var p = sess.p; if(!p) return false;
  if(p.type === "choice") return p.sel != null;
  if(p.type === "sort") return p.sel.every(function(x){ return x != null; });
  return p.sel.length === p.q.items.length; }
function advance(){
  if(!sess.queue.length){ sess.phase = "result"; finish(); }
  else { sess.cur = sess.queue.shift(); sess.p = prep(sess.qs[sess.cur]); sess.phase = "question"; sess.fresh = true; }
  renderPlay();
  window.scrollTo(0, 0);
}
function check(){
  if(sess.phase !== "question" || !ready()) return;
  var p = sess.p, q = p.q, ok, gain = 0;
  if(p.type === "choice") ok = !!p.opts[p.sel].ok;
  else if(p.type === "sort") ok = p.items.every(function(it, i){ return it.b === p.sel[i]; });
  else ok = p.sel.join("|") === q.items.join("|");
  sess.combo = ok ? sess.combo + 1 : 0;
  if(sess.exam){
    sess.results.push({ q:q, ok:ok }); sess.resolved++;
    if(ok) gain = sess.full ? 15 : 3;
  } else if(ok){
    sess.resolved++; gain = sess.full ? (sess.missed[sess.cur] ? 5 : 10) : 2;
  } else { sess.mistakes++; sess.missed[sess.cur] = true; sess.queue.push(sess.cur); }
  var bonus = (ok && sess.full && sess.combo >= 3) ? 2 : 0;
  gain += bonus; sess.xp += gain;
  sess.last = { ok:ok, gain:gain, bonus:bonus, msg:pick(ok ? CHEER : NUDGE) }; sess.phase = "feedback";
  renderPlay();
}
function finish(){
  var n = sess.node, r = sess;
  if(r.exam){
    var right = r.results.filter(function(x){ return x.ok; }).length;
    r.pct = Math.round(right / r.total * 100); r.right = right; r.passed = r.pct >= n.pass;
    var prev = S.exams[n.id] || { best:0, passed:false, tries:0 };
    r.bonus = (r.passed && !prev.passed) ? 50 : 0;
    r.newRank = r.bonus ? RANKS.filter(function(x){ return x.exam === n.id; })[0] : null;
    S.exams[n.id] = { best:Math.max(prev.best, r.pct), passed:prev.passed || r.passed, tries:prev.tries + 1 };
  } else {
    var missed = Object.keys(r.missed).length;
    r.first = r.total - missed; r.stars = missed === 0 ? 3 : (missed <= 2 ? 2 : 1);
    r.bonus = (missed === 0 && r.full) ? 20 : 0;
    var pd = S.done[n.id] || { stars:0, best:0, plays:0 };
    S.done[n.id] = { stars:Math.max(pd.stars, r.stars), best:Math.max(pd.best, Math.round(r.first / r.total * 100)), plays:pd.plays + 1 };
  }
  r.unitDone = n.unit.nodes[n.unit.nodes.length - 1] === n && (r.exam ? r.passed : true);
  if(r.unitDone) confetti();
  r.xp += r.bonus; S.xp += r.xp; bumpStreak(); save();
}

function viewQuestion(locked){
  var p = sess.p, q = p.q, box = h("div", {class:"opts"});
  if(p.type === "choice"){
    box.setAttribute("role", "radiogroup"); box.setAttribute("aria-label", "Answers");
    p.opts.forEach(function(o, i){
      var cls = "opt", key = "ABCD".charAt(i), mark = null;
      if(locked){ if(o.ok){ cls += " is-right"; key = icon("check"); mark = "Right answer: "; }
                  else if(i === p.sel){ cls += " is-wrong"; key = icon("cross"); mark = "Your answer, not right: "; } }
      box.append(h("button", {class:cls, type:"button", role:"radio", "aria-checked": String(i === p.sel), disabled:locked,
        onclick:function(){ p.sel = i; renderPlay(); var b = document.querySelectorAll(".opt")[i]; if(b) b.focus(); }},
        h("span", {class:"key", "aria-hidden":"true"}, key), mark ? h("span", {class:"sr", text:mark}) : null, h("span", {text:o.t})));
    });
    return [box];
  }
  if(p.type === "sort"){
    p.items.forEach(function(it, i){
      var good = it.b === p.sel[i], cls = "sortrow"; if(locked) cls += good ? " is-right" : " is-wrong";
      box.append(h("div", {class:cls, role:"group", "aria-label":it.t},
        h("span", {class:"mark"}, locked ? icon(good ? "check" : "cross") : null, locked ? h("span", {class:"sr", text: good ? "Right: " : "Not right: "}) : null, h("span", {text:it.t})),
        h("div", {class:"pick"}, q.buckets.map(function(b, bi){
          return h("button", {type:"button", "aria-pressed": String(p.sel[i] === bi), disabled:locked, text:b,
            onclick:function(){ p.sel[i] = bi; renderPlay(); }}); }))));
    });
    return [h("p", {class:"hint", text:"Pick one for each line."}), box];
  }
  var slots = h("ol", {class:"slots"}), pool = h("div", {class:"pool"});
  q.items.forEach(function(_, i){
    var v = p.sel[i], cls = v ? "filled" : "";
    if(locked) cls = (v === q.items[i]) ? "is-right" : "is-wrong";
    slots.append(h("li", {class:cls}, v ? h("button", {type:"button", disabled:locked, text:v, "aria-label": locked ? v : "Take back: " + v,
      onclick:function(){ p.sel.splice(i, 1); renderPlay(); }}) : h("span", {class:"hint", text:"Tap an item below"})));
  });
  p.pool.forEach(function(t){ if(p.sel.indexOf(t) < 0) pool.append(h("button", {type:"button", disabled:locked, text:t,
    onclick:function(){ p.sel.push(t); renderPlay(); }})); });
  return [h("p", {class:"hint", text:"Tap the items in order. Tap a placed item to take it back."}), slots, locked ? null : pool];
}
function viewFeedback(){
  var p = sess.p, q = p.q, L = sess.last, ok = L.ok;
  var kids = [h("div", {class:"fb-head"}, h("h3", null, icon(ok ? "check" : "cross"), L.msg))];
  if(!ok){
    if(p.type === "choice"){
      var right = p.opts.filter(function(o){ return o.ok; })[0];
      kids.push(h("p", null, h("span", {class:"lab", text:"Why not that one?"}), p.opts[p.sel].why));
      kids.push(h("p", null, h("span", {class:"lab", text:"The answer"}), right.t));
    } else if(p.type === "sort"){
      var ul = h("ul");
      p.items.forEach(function(it, i){ if(it.b !== p.sel[i]) ul.append(h("li", {text:"\"" + it.t + "\" goes under \"" + q.buckets[it.b] + "\". " + it.why})); });
      kids.push(h("div", null, h("span", {class:"lab", text:"What to change"}), ul));
    } else {
      kids.push(h("p", null, h("span", {class:"lab", text:"The right order"}), q.items.join(", then ") + "."));
    }
  }
  if(q.point) kids.push(h("p", null, h("span", {class:"lab", text:"The point"}), q.point));
  kids.push(h("p", null, h("span", {class:"lab", text:"Picture it"}), q.ex));
  if(ok && L.gain) kids.push(h("span", {class:"note", text:"+" + L.gain + " points" + (L.bonus ? " (includes +" + L.bonus + " for " + sess.combo + " in a row)" : "")}));
  if(!ok && !sess.exam) kids.push(h("span", {class:"note", text:"You will get another go at this one before the stop ends."}));
  return h("div", {class:"fb " + (ok ? "ok" : "no"), role:"status", "aria-live":"polite"}, kids);
}
function viewResult(){
  var r = sess, n = r.node, c = [];
  if(r.unitDone) c.push(h("p", {class:"unitdone", text:"Unit " + n.unit.n + " complete: " + n.unit.title}));
  function tally(a){ return h("dl", {class:"tally"}, a.map(function(x){ return h("div", null, h("dt", {text:x[0]}), h("dd", {text:x[1]})); })); }
  if(r.exam){
    c.push(h("div", {class:"bigscore", text:r.right + " / " + r.total}));
    c.push(h("h2", null, h("span", {class: r.passed ? "pass" : "fail", text: r.passed ? "Passed." : "Not yet."}),
      " " + r.pct + "% (you need " + n.pass + "%)"));
    if(!r.passed) c.push(h("p", {text:"Review the stops listed below, then try again."}));
    if(r.newRank) c.push(h("p", {class:"take"}, h("b", {text:"New rank: " + r.newRank.name}), r.newRank.can));
    c.push(tally([["Points earned", "+" + r.xp], ["Pass bonus", r.bonus ? "+" + r.bonus : "0"], ["Best score", S.exams[n.id].best + "%"]]));
    var rev = h("ul", {class:"review"}), weak = {};
    r.results.forEach(function(x){ if(!x.ok) weak[x.q.from] = 1;
      rev.append(h("li", {class: x.ok ? "y" : "n"}, icon(x.ok ? "check" : "cross"), h("span", {class:"sr", text: x.ok ? "Right: " : "Wrong: "}),
        h("span", {style:"color:var(--ink)", text:x.q.q}))); });
    c.push(rev);
    var names = SEQ.filter(function(s){ return weak[s.id]; }).map(function(s){ return s.title; });
    if(names.length) c.push(h("p", {class:"take"}, h("b", {text: r.passed ? "Worth another look" : "Practise these first"}), names.join(", ") + "."));
  } else {
    c.push(starRow(r.stars, "bigstars"));
    c.push(h("h2", {text: r.stars === 3 ? "Perfect run." : (r.stars === 2 ? "Well done." : "Stop complete.")}));
    if(r.stars < 3) c.push(h("p", {text:"The repeats are how it sticks. Practise again any time to earn all three stars."}));
    c.push(tally([["Points earned", "+" + r.xp], ["Right first time", r.first + " of " + r.total], ["Perfect bonus", r.bonus ? "+" + r.bonus : "0"]]));
    c.push(h("p", {class:"take"}, h("b", {text:"Remember"}), n.take));
  }
  return c;
}
function renderPlay(){
  var s = sess, n = s.node, card, actions = [];
  var where = s.exam ? n.title : "Stop " + n.code + ": " + n.title;
  if(s.phase === "intro"){
    card = h("section", {class:"card intro"},
      h("div", null, h("p", {class:"where", text:where}), h("h2", {text:n.intro.h}), h("p", {text:n.intro.p})));
    actions.push(h("button", {class:"btn btn-primary btn-big", type:"button", id:"main", text:"Begin", onclick:advance}));
  } else if(s.phase === "result"){
    card = h("section", {class:"card result"}, h("p", {class:"where", text:where}), viewResult());
    var nx = nextNode();
    if(s.exam && !s.passed) actions.push(h("button", {class:"btn", type:"button", text:"Try again", onclick:function(){ start(n); }}));
    actions.push(h("button", {class:"btn" + (nx && nx !== n && !(s.exam && !s.passed) ? "" : " btn-primary"), type:"button", text:"Back to the path", onclick:renderHome,
      id: (nx && nx !== n && !(s.exam && !s.passed)) ? null : "main"}));
    if(nx && nx !== n && !(s.exam && !s.passed)) actions.push(h("button", {class:"btn btn-primary btn-big", type:"button", id:"main", text:"Next stop", onclick:function(){ start(nx); }}));
  } else {
    var locked = s.phase === "feedback";
    card = h("section", {class:"card"}, h("p", {class:"where", text:where}), h("h2", {class:"q", id:"q", tabindex:"-1", text:s.p.q.q}), viewQuestion(locked), locked ? viewFeedback() : null);
    actions.push(locked
      ? h("button", {class:"btn btn-primary btn-big", type:"button", id:"main", text: s.queue.length ? "Continue" : "Finish", onclick:advance})
      : h("button", {class:"btn btn-primary btn-big", type:"button", id:"main", text:"Check", disabled:!ready(), onclick:check}));
  }
  var pct = s.phase === "intro" ? 0 : Math.round(s.resolved / s.total * 100);
  var hud = h("header", {class:"hud"},
    h("div", {class:"hud-row"},
      s.phase === "result" ? null : h("button", {class:"xbtn", type:"button", "aria-label":"Leave this stop", onclick:function(){ s.quit = !s.quit; renderPlay(); }}, icon("cross")),
      h("div", {class:"bar", role:"progressbar", "aria-label":"Progress in this stop", "aria-valuemin":"0", "aria-valuemax":"100", "aria-valuenow":String(pct)}, h("i", {style:"width:" + pct + "%"})),
      h("span", {class:"count", text:s.resolved + " of " + s.total})),
    chips());
  var quit = (s.quit && s.phase !== "result") ? h("div", {class:"confirm"}, h("span", {text:"Leave this stop? Your answers here will not be kept."}),
    h("button", {class:"btn btn-small", type:"button", text:"Leave", onclick:renderHome}),
    h("button", {class:"btn btn-small btn-primary", type:"button", text:"Keep playing", onclick:function(){ s.quit = false; renderPlay(); }})) : null;
  root.replaceChildren(hud, quit || "", card, h("div", {class:"p-actions"}, actions));
  if(s.phase === "question"){ if(s.fresh){ s.fresh = false; var qh = document.getElementById("q"); if(qh) qh.focus({preventScroll:true}); } }
  else { var m = document.getElementById("main"); if(m) m.focus({preventScroll: s.phase !== "feedback"}); }
}
document.addEventListener("keydown", function(e){
  if(!sess || e.metaKey || e.ctrlKey || e.altKey) return;
  if(sess.phase === "question" && sess.p.type === "choice"){
    var i = "1234".indexOf(e.key); if(i < 0) i = "abcd".indexOf(e.key.toLowerCase());
    if(i >= 0 && e.key.length === 1 && i < sess.p.opts.length){ sess.p.sel = i; renderPlay(); e.preventDefault(); return; }
  }
  var a = document.activeElement;
  if(e.key === "Enter" && sess.phase === "question" && ready() && !(a && a.id === "main")
     && !(a && a.tagName === "BUTTON" && sess.p.type !== "choice")){ check(); e.preventDefault(); }
});

applyPrefs();
renderHome();
