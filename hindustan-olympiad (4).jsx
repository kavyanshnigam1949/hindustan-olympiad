import { useState, useEffect, useRef, useCallback } from "react";

/* ─────────────────────────── STYLES ─────────────────────────── */
const injectStyles = () => {
  if (document.getElementById("ho-styles")) return;
  const el = document.createElement("style");
  el.id = "ho-styles";
  el.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Yatra+One&family=Poppins:wght@300;400;500;600;700&family=Tiro+Devanagari+Hindi&display=swap');
    
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    
    :root {
      --navy: #0B1D3A;
      --navy2: #132444;
      --saffron: #FF6B00;
      --gold: #F5C518;
      --cream: #FFF8F0;
      --green: #138808;
      --red: #e53e3e;
      --glass: rgba(255,255,255,0.07);
      --glass-border: rgba(255,255,255,0.14);
      --text: #FFF8F0;
      --text-muted: rgba(255,248,240,0.6);
      --card: rgba(19,36,68,0.95);
      --accent: #FF8C42;
    }
    
    body { font-family: 'Poppins', sans-serif; background: var(--navy); color: var(--text); overflow-x: hidden; }
    
    .app-root { min-height: 100vh; background: var(--navy); }

    /* SPLASH */
    .splash { position: fixed; inset: 0; background: var(--navy); display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 999; }
    .splash-chakra { width: 100px; height: 100px; border: 4px solid var(--gold); border-radius: 50%; position: relative; animation: spin 4s linear infinite; margin-bottom: 24px; }
    .splash-chakra::before { content:''; position:absolute; inset:-8px; border: 2px solid var(--saffron); border-radius:50%; opacity:0.4; animation: spin 2s linear reverse infinite; }
    .splash-spokes { position:absolute; inset:0; }
    .splash-spokes span { position:absolute; top:50%; left:50%; width:46px; height:2px; background:var(--gold); transform-origin:left center; border-radius:1px; }
    .splash-logo { font-family:'Yatra One', cursive; font-size: 2.4rem; color: var(--saffron); text-align:center; letter-spacing:1px; }
    .splash-sub { color: var(--gold); font-size:0.9rem; letter-spacing:3px; margin-top:6px; text-transform:uppercase; }
    .splash-dots { display:flex; gap:8px; margin-top:32px; }
    .splash-dots span { width:8px;height:8px;border-radius:50%;background:var(--gold);animation: dot 1.4s infinite both; }
    .splash-dots span:nth-child(2){animation-delay:.2s}
    .splash-dots span:nth-child(3){animation-delay:.4s}

    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes dot { 0%,80%,100%{transform:scale(0);opacity:0} 40%{transform:scale(1);opacity:1} }
    @keyframes fadeIn { from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none} }
    @keyframes slideIn { from{opacity:0;transform:translateX(-30px)}to{opacity:1;transform:none} }
    @keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.6} }
    @keyframes shimmer { 0%{background-position:-200% 0}100%{background-position:200% 0} }

    /* AUTH */
    .auth-page { min-height:100vh; display:flex; align-items:center; justify-content:center; padding:20px;
      background: radial-gradient(ellipse at 20% 30%, rgba(255,107,0,0.15) 0%, transparent 60%),
                  radial-gradient(ellipse at 80% 70%, rgba(245,197,24,0.1) 0%, transparent 60%), var(--navy); }
    .auth-card { background:var(--card); border:1px solid var(--glass-border); border-radius:20px; padding:40px; width:100%; max-width:420px; animation:fadeIn .5s ease; backdrop-filter:blur(20px); }
    .auth-header { text-align:center; margin-bottom:32px; }
    .auth-logo { font-family:'Yatra One',cursive; font-size:1.8rem; color:var(--saffron); }
    .auth-title { font-size:1.4rem; font-weight:600; margin-top:12px; }
    .auth-sub { color:var(--text-muted); font-size:0.85rem; margin-top:4px; }
    .input-group { margin-bottom:18px; }
    .input-group label { display:block; font-size:0.8rem; font-weight:600; color:var(--gold); margin-bottom:6px; letter-spacing:1px; text-transform:uppercase; }
    .input-group input { width:100%; background:rgba(255,255,255,0.06); border:1px solid var(--glass-border); border-radius:10px; padding:12px 16px; color:var(--text); font-family:'Poppins',sans-serif; font-size:0.95rem; transition:border .2s; outline:none; }
    .input-group input:focus { border-color:var(--saffron); }
    .btn-primary { width:100%; background:linear-gradient(135deg, var(--saffron), #FF4500); border:none; border-radius:10px; padding:14px; color:#fff; font-family:'Poppins',sans-serif; font-size:1rem; font-weight:600; cursor:pointer; transition:all .2s; letter-spacing:0.5px; }
    .btn-primary:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(255,107,0,0.35); }
    .btn-primary:disabled { opacity:0.6; cursor:not-allowed; transform:none; }
    .auth-switch { text-align:center; margin-top:20px; font-size:0.85rem; color:var(--text-muted); }
    .auth-switch button { background:none; border:none; color:var(--gold); cursor:pointer; font-weight:600; font-size:0.85rem; }
    .error-msg { background:rgba(229,62,62,0.15); border:1px solid rgba(229,62,62,0.4); border-radius:8px; padding:10px 14px; font-size:0.85rem; color:#fc8181; margin-bottom:16px; }

    /* NAV */
    .nav { position:sticky; top:0; z-index:100; background:rgba(11,29,58,0.95); border-bottom:1px solid var(--glass-border); backdrop-filter:blur(20px); padding:0 24px; display:flex; align-items:center; justify-content:space-between; height:60px; }
    .nav-logo { font-family:'Yatra One',cursive; font-size:1.3rem; color:var(--saffron); cursor:pointer; }
    .nav-actions { display:flex; gap:12px; align-items:center; }
    .nav-btn { background:var(--glass); border:1px solid var(--glass-border); border-radius:8px; padding:7px 14px; color:var(--text); font-size:0.82rem; cursor:pointer; font-family:'Poppins',sans-serif; transition:all .2s; }
    .nav-btn:hover { background:rgba(255,255,255,0.12); }
    .nav-btn.active { background:var(--saffron); border-color:var(--saffron); color:#fff; }

    /* HOME */
    .home { max-width:1200px; margin:0 auto; padding:32px 20px; }
    .hero { text-align:center; padding:40px 20px; animation:fadeIn .6s ease; }
    .hero-badge { display:inline-block; background:rgba(245,197,24,0.15); border:1px solid rgba(245,197,24,0.4); border-radius:20px; padding:6px 16px; font-size:0.78rem; color:var(--gold); letter-spacing:2px; text-transform:uppercase; margin-bottom:16px; }
    .hero h1 { font-family:'Yatra One',cursive; font-size:clamp(2rem,5vw,3.2rem); color:var(--cream); line-height:1.2; }
    .hero h1 span { color:var(--saffron); }
    .hero p { color:var(--text-muted); max-width:600px; margin:12px auto 0; line-height:1.7; }

    .section-title { font-size:1.2rem; font-weight:700; color:var(--cream); margin-bottom:20px; display:flex; align-items:center; gap:10px; }
    .section-title::after { content:''; flex:1; height:1px; background:var(--glass-border); }

    .classes-grid { display:grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap:14px; margin-bottom:40px; }
    .class-card { background:var(--card); border:1px solid var(--glass-border); border-radius:14px; padding:22px 16px; text-align:center; cursor:pointer; transition:all .25s; animation:fadeIn .4s ease both; }
    .class-card:hover { transform:translateY(-4px); border-color:var(--saffron); box-shadow:0 12px 32px rgba(255,107,0,0.2); }
    .class-card .class-num { font-family:'Yatra One',cursive; font-size:2rem; color:var(--saffron); line-height:1; }
    .class-card .class-label { font-size:0.72rem; color:var(--text-muted); margin-top:6px; letter-spacing:1px; text-transform:uppercase; }
    .class-card .class-badge { display:inline-block; margin-top:8px; background:rgba(245,197,24,0.15); border-radius:10px; padding:2px 8px; font-size:0.68rem; color:var(--gold); }

    /* STREAM SELECT */
    .page { max-width:900px; margin:0 auto; padding:32px 20px; animation:fadeIn .4s ease; }
    .page-header { margin-bottom:32px; }
    .back-btn { background:none; border:none; color:var(--text-muted); cursor:pointer; font-size:0.85rem; display:flex; align-items:center; gap:6px; margin-bottom:16px; font-family:'Poppins',sans-serif; transition:color .2s; }
    .back-btn:hover { color:var(--gold); }
    .page-title { font-family:'Yatra One',cursive; font-size:1.8rem; color:var(--cream); }
    .page-sub { color:var(--text-muted); font-size:0.9rem; margin-top:4px; }

    .stream-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(240px,1fr)); gap:18px; }
    .stream-card { background:var(--card); border:2px solid var(--glass-border); border-radius:18px; padding:28px; cursor:pointer; transition:all .25s; }
    .stream-card:hover { transform:translateY(-4px); }
    .stream-card.science:hover { border-color:#4299e1; box-shadow:0 12px 32px rgba(66,153,225,0.2); }
    .stream-card.commerce:hover { border-color:#48bb78; box-shadow:0 12px 32px rgba(72,187,120,0.2); }
    .stream-card.humanities:hover { border-color:#ed8936; box-shadow:0 12px 32px rgba(237,137,54,0.2); }
    .stream-icon { font-size:2.4rem; margin-bottom:14px; }
    .stream-name { font-size:1.2rem; font-weight:700; margin-bottom:8px; }
    .stream-subjects { font-size:0.78rem; color:var(--text-muted); line-height:1.6; }

    .subject-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); gap:14px; }
    .subject-card { background:var(--card); border:1px solid var(--glass-border); border-radius:14px; padding:22px; cursor:pointer; transition:all .25s; text-align:center; }
    .subject-card:hover { transform:translateY(-3px); border-color:var(--gold); box-shadow:0 8px 24px rgba(245,197,24,0.15); }
    .subject-icon { font-size:2rem; margin-bottom:10px; }
    .subject-name { font-size:1rem; font-weight:600; }
    .subject-topics { font-size:0.73rem; color:var(--text-muted); margin-top:6px; line-height:1.5; }

    .level-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); gap:16px; }
    .level-card { border-radius:16px; padding:28px; cursor:pointer; transition:all .25s; text-align:center; border:2px solid transparent; position:relative; overflow:hidden; }
    .level-card.beginner { background:linear-gradient(135deg,rgba(72,187,120,0.15),rgba(72,187,120,0.05)); border-color:rgba(72,187,120,0.3); }
    .level-card.intermediate { background:linear-gradient(135deg,rgba(245,197,24,0.15),rgba(245,197,24,0.05)); border-color:rgba(245,197,24,0.3); }
    .level-card.advanced { background:linear-gradient(135deg,rgba(255,107,0,0.15),rgba(255,107,0,0.05)); border-color:rgba(255,107,0,0.3); }
    .level-card:hover { transform:translateY(-4px) scale(1.02); }
    .level-card.beginner:hover { border-color:#48bb78; box-shadow:0 12px 32px rgba(72,187,120,0.25); }
    .level-card.intermediate:hover { border-color:var(--gold); box-shadow:0 12px 32px rgba(245,197,24,0.25); }
    .level-card.advanced:hover { border-color:var(--saffron); box-shadow:0 12px 32px rgba(255,107,0,0.25); }
    .level-icon { font-size:2.8rem; margin-bottom:12px; }
    .level-name { font-size:1.1rem; font-weight:700; }
    .level-desc { font-size:0.78rem; color:var(--text-muted); margin-top:6px; }
    .level-qs { font-size:0.72rem; margin-top:10px; font-weight:600; letter-spacing:1px; text-transform:uppercase; }

    /* EXAM */
    .exam-page { max-width:860px; margin:0 auto; padding:24px 20px; }
    .exam-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:24px; padding:16px 20px; background:var(--card); border-radius:14px; border:1px solid var(--glass-border); flex-wrap:wrap; gap:12px; }
    .exam-info h3 { font-size:1rem; font-weight:600; }
    .exam-info p { font-size:0.8rem; color:var(--text-muted); }
    .exam-timer { display:flex; align-items:center; gap:8px; }
    .timer-box { background:rgba(255,107,0,0.15); border:1px solid rgba(255,107,0,0.4); border-radius:10px; padding:8px 16px; font-family:monospace; font-size:1.2rem; font-weight:700; color:var(--saffron); letter-spacing:2px; }
    .timer-box.warning { background:rgba(229,62,62,0.15); border-color:rgba(229,62,62,0.5); color:#fc8181; animation:pulse 1s infinite; }
    .progress-bar-wrap { height:6px; background:rgba(255,255,255,0.1); border-radius:3px; margin-bottom:24px; overflow:hidden; }
    .progress-bar { height:100%; background:linear-gradient(90deg,var(--saffron),var(--gold)); border-radius:3px; transition:width .3s; }
    .question-nav { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:20px; }
    .q-dot { width:32px; height:32px; border-radius:8px; border:1px solid var(--glass-border); background:var(--glass); font-size:0.75rem; font-weight:600; cursor:pointer; display:flex; align-items:center; justify-content:center; transition:all .15s; color:var(--text-muted); }
    .q-dot.answered { background:rgba(72,187,120,0.25); border-color:#48bb78; color:#48bb78; }
    .q-dot.current { background:var(--saffron); border-color:var(--saffron); color:#fff; }
    .question-card { background:var(--card); border:1px solid var(--glass-border); border-radius:18px; padding:32px; margin-bottom:20px; }
    .q-num { font-size:0.78rem; color:var(--gold); font-weight:600; letter-spacing:2px; text-transform:uppercase; margin-bottom:12px; }
    .q-text { font-size:1.05rem; line-height:1.7; color:var(--cream); margin-bottom:24px; }
    .options { display:grid; gap:12px; }
    .option { display:flex; align-items:center; gap:14px; padding:14px 18px; background:var(--glass); border:1.5px solid var(--glass-border); border-radius:12px; cursor:pointer; transition:all .2s; }
    .option:hover { border-color:var(--saffron); background:rgba(255,107,0,0.08); }
    .option.selected { border-color:var(--saffron); background:rgba(255,107,0,0.15); }
    .option.correct { border-color:#48bb78; background:rgba(72,187,120,0.15); }
    .option.wrong { border-color:#fc8181; background:rgba(229,62,62,0.12); }
    .opt-label { width:30px; height:30px; min-width:30px; border-radius:8px; border:1.5px solid var(--glass-border); display:flex; align-items:center; justify-content:center; font-weight:700; font-size:0.85rem; transition:all .2s; }
    .option.selected .opt-label { background:var(--saffron); border-color:var(--saffron); color:#fff; }
    .option.correct .opt-label { background:#48bb78; border-color:#48bb78; color:#fff; }
    .option.wrong .opt-label { background:#fc8181; border-color:#fc8181; color:#fff; }
    .opt-text { font-size:0.95rem; }
    .exam-actions { display:flex; gap:12px; justify-content:space-between; align-items:center; flex-wrap:wrap; }
    .btn-outline { background:var(--glass); border:1px solid var(--glass-border); border-radius:10px; padding:12px 24px; color:var(--text); font-family:'Poppins',sans-serif; font-size:0.9rem; cursor:pointer; transition:all .2s; }
    .btn-outline:hover { border-color:var(--gold); }
    .btn-gold { background:linear-gradient(135deg,var(--gold),#e6b000); border:none; border-radius:10px; padding:12px 28px; color:var(--navy); font-family:'Poppins',sans-serif; font-size:0.95rem; font-weight:700; cursor:pointer; transition:all .2s; }
    .btn-gold:hover { transform:translateY(-2px); box-shadow:0 6px 20px rgba(245,197,24,0.35); }
    .btn-danger { background:rgba(229,62,62,0.15); border:1px solid rgba(229,62,62,0.4); border-radius:10px; padding:12px 24px; color:#fc8181; font-family:'Poppins',sans-serif; font-size:0.9rem; cursor:pointer; transition:all .2s; }
    .btn-danger:hover { background:rgba(229,62,62,0.25); }

    /* GENERATING */
    .generating { display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:50vh; gap:24px; text-align:center; }
    .gen-spinner { width:60px; height:60px; border:4px solid rgba(255,107,0,0.2); border-top:4px solid var(--saffron); border-radius:50%; animation:spin 1s linear infinite; }
    .gen-text { font-size:1.1rem; color:var(--text-muted); }
    .gen-sub { font-size:0.82rem; color:var(--text-muted); margin-top:-12px; }

    /* RESULTS */
    .results-page { max-width:860px; margin:0 auto; padding:32px 20px; animation:fadeIn .5s ease; }
    .score-card { background:linear-gradient(135deg,rgba(255,107,0,0.2),rgba(245,197,24,0.15)); border:1px solid rgba(255,107,0,0.3); border-radius:20px; padding:40px; text-align:center; margin-bottom:32px; position:relative; overflow:hidden; }
    .score-card::before { content:''; position:absolute; inset:0; background:url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='20' fill='none' stroke='rgba(245,197,24,0.05)' stroke-width='1'/%3E%3C/svg%3E"); }
    .score-big { font-family:'Yatra One',cursive; font-size:5rem; color:var(--saffron); line-height:1; }
    .score-total { font-size:1.5rem; color:var(--text-muted); }
    .score-pct { font-size:1.1rem; color:var(--gold); margin-top:8px; }
    .score-msg { margin-top:12px; font-size:1rem; line-height:1.6; color:var(--cream); }
    .score-grade { display:inline-block; margin-top:12px; padding:6px 20px; border-radius:20px; font-weight:700; font-size:0.9rem; }
    .grade-a { background:rgba(72,187,120,0.2); color:#48bb78; border:1px solid rgba(72,187,120,0.4); }
    .grade-b { background:rgba(245,197,24,0.2); color:var(--gold); border:1px solid rgba(245,197,24,0.4); }
    .grade-c { background:rgba(255,107,0,0.2); color:var(--saffron); border:1px solid rgba(255,107,0,0.4); }
    .grade-f { background:rgba(229,62,62,0.2); color:#fc8181; border:1px solid rgba(229,62,62,0.4); }

    .stats-row { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-bottom:28px; }
    .stat-box { background:var(--card); border:1px solid var(--glass-border); border-radius:14px; padding:18px; text-align:center; }
    .stat-num { font-size:2rem; font-weight:700; }
    .stat-num.green { color:#48bb78; }
    .stat-num.red { color:#fc8181; }
    .stat-num.muted { color:var(--text-muted); }
    .stat-label { font-size:0.75rem; color:var(--text-muted); margin-top:4px; text-transform:uppercase; letter-spacing:1px; }

    .review-list { display:grid; gap:16px; }
    .review-item { background:var(--card); border:1px solid var(--glass-border); border-radius:14px; padding:20px; }
    .review-item.correct { border-left:3px solid #48bb78; }
    .review-item.wrong { border-left:3px solid #fc8181; }
    .review-q { font-size:0.95rem; font-weight:500; margin-bottom:12px; }
    .review-answers { display:flex; flex-wrap:wrap; gap:10px; margin-bottom:12px; font-size:0.82rem; }
    .rev-ans { padding:4px 12px; border-radius:6px; }
    .rev-ans.correct-ans { background:rgba(72,187,120,0.15); color:#48bb78; border:1px solid rgba(72,187,120,0.3); }
    .rev-ans.wrong-ans { background:rgba(229,62,62,0.12); color:#fc8181; border:1px solid rgba(229,62,62,0.3); }
    .review-exp { font-size:0.85rem; color:var(--text-muted); line-height:1.6; padding-top:12px; border-top:1px solid var(--glass-border); }
    .review-exp strong { color:var(--gold); }
    .result-actions { display:flex; gap:14px; justify-content:center; flex-wrap:wrap; margin-top:32px; }

    /* AI CHAT */
    .chat-page { max-width:860px; margin:0 auto; padding:24px 20px; display:flex; flex-direction:column; height:calc(100vh - 60px); }
    .chat-messages { flex:1; overflow-y:auto; padding:8px 0; display:flex; flex-direction:column; gap:16px; }
    .chat-messages::-webkit-scrollbar { width:4px; }
    .chat-messages::-webkit-scrollbar-thumb { background:var(--glass-border); border-radius:2px; }
    .chat-bubble { max-width:75%; padding:14px 18px; border-radius:16px; font-size:0.9rem; line-height:1.6; animation:fadeIn .3s ease; }
    .chat-bubble.user { background:linear-gradient(135deg,rgba(255,107,0,0.3),rgba(255,107,0,0.15)); border:1px solid rgba(255,107,0,0.3); align-self:flex-end; border-bottom-right-radius:4px; }
    .chat-bubble.ai { background:var(--card); border:1px solid var(--glass-border); align-self:flex-start; border-bottom-left-radius:4px; }
    .chat-bubble.ai .ai-label { font-size:0.72rem; color:var(--gold); font-weight:600; letter-spacing:1px; text-transform:uppercase; margin-bottom:6px; }
    .chat-input-row { display:flex; gap:12px; padding:16px 0; }
    .chat-input { flex:1; background:var(--card); border:1px solid var(--glass-border); border-radius:12px; padding:14px 18px; color:var(--text); font-family:'Poppins',sans-serif; font-size:0.95rem; outline:none; transition:border .2s; }
    .chat-input:focus { border-color:var(--saffron); }
    .chat-send { background:linear-gradient(135deg,var(--saffron),#FF4500); border:none; border-radius:12px; padding:14px 20px; color:#fff; cursor:pointer; font-size:1.1rem; transition:all .2s; }
    .chat-send:hover { transform:scale(1.05); }
    .chat-send:disabled { opacity:0.5; cursor:not-allowed; transform:none; }

    /* SETTINGS */
    .settings-page { max-width:600px; margin:0 auto; padding:32px 20px; animation:fadeIn .4s ease; }
    .settings-section { background:var(--card); border:1px solid var(--glass-border); border-radius:18px; padding:28px; margin-bottom:20px; }
    .settings-section h3 { font-size:1rem; font-weight:700; color:var(--gold); margin-bottom:6px; }
    .settings-section p { font-size:0.82rem; color:var(--text-muted); margin-bottom:18px; line-height:1.5; }
    .api-key-input { width:100%; background:rgba(255,255,255,0.06); border:1px solid var(--glass-border); border-radius:10px; padding:12px 16px; color:var(--text); font-family:monospace; font-size:0.9rem; outline:none; transition:border .2s; }
    .api-key-input:focus { border-color:var(--saffron); }
    .privacy-note { display:flex; gap:10px; background:rgba(245,197,24,0.08); border:1px solid rgba(245,197,24,0.2); border-radius:10px; padding:12px 16px; margin-top:14px; font-size:0.8rem; color:var(--text-muted); line-height:1.5; }
    .success-msg { background:rgba(72,187,120,0.15); border:1px solid rgba(72,187,120,0.3); border-radius:8px; padding:10px 14px; font-size:0.85rem; color:#48bb78; margin-top:12px; }

    /* MODAL */
    .modal-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.7); display:flex; align-items:center; justify-content:center; z-index:200; padding:20px; }
    .modal { background:var(--navy2); border:1px solid var(--glass-border); border-radius:20px; padding:32px; max-width:440px; width:100%; animation:fadeIn .3s ease; text-align:center; }
    .modal h3 { font-size:1.2rem; font-weight:700; margin-bottom:10px; }
    .modal p { font-size:0.9rem; color:var(--text-muted); line-height:1.6; margin-bottom:24px; }
    .modal-actions { display:flex; gap:12px; justify-content:center; }

    .tab-bar { display:flex; gap:4px; background:rgba(255,255,255,0.05); border-radius:12px; padding:4px; margin-bottom:24px; }
    .tab { flex:1; padding:10px; border:none; background:none; color:var(--text-muted); font-family:'Poppins',sans-serif; font-size:0.85rem; cursor:pointer; border-radius:8px; transition:all .2s; }
    .tab.active { background:var(--saffron); color:#fff; font-weight:600; }

    @media(max-width:600px){
      .stats-row { grid-template-columns:1fr 1fr; }
      .auth-card { padding:28px 20px; }
    }
  `;
  document.head.appendChild(el);
};

/* ─────────────────────────── CONSTANTS ─────────────────────────── */
const SUBJECTS_1_10 = {
  Mathematics: { icon: "📐", topics: "Arithmetic, Algebra, Geometry, Statistics" },
  Science: { icon: "🔬", topics: "Physics, Chemistry, Biology basics" },
  English: { icon: "📚", topics: "Grammar, Vocabulary, Comprehension" },
  "Logical Reasoning": { icon: "🧠", topics: "Patterns, Sequences, Puzzles" },
  "General Knowledge": { icon: "🌍", topics: "India, World, Current Affairs" },
};

const STREAMS = {
  Science: {
    icon: "⚗️",
    color: "science",
    desc: "Physics, Chemistry, Math/Bio, English, Logical Reasoning",
    subjects: {
      Physics: { icon: "⚡", topics: "Mechanics, Thermodynamics, Waves, Optics" },
      Chemistry: { icon: "🧪", topics: "Atomic Structure, Bonding, Organic Chemistry" },
      Mathematics: { icon: "📐", topics: "Algebra, Calculus, Coordinate Geometry" },
      Biology: { icon: "🧬", topics: "Cell Biology, Genetics, Ecology, Physiology" },
      English: { icon: "📚", topics: "Grammar, Vocabulary, Comprehension" },
      "Logical Reasoning": { icon: "🧠", topics: "Critical Thinking, Patterns, Puzzles" },
    },
  },
  Commerce: {
    icon: "💹",
    color: "commerce",
    desc: "Accountancy, Economics, Business Studies, English, Logical Reasoning",
    subjects: {
      Accountancy: { icon: "📊", topics: "Trial Balance, P&L, Balance Sheet, GST" },
      Economics: { icon: "📈", topics: "Micro, Macro, Indian Economy, Statistics" },
      "Business Studies": { icon: "🏢", topics: "Management, Marketing, Finance, HRM" },
      English: { icon: "📚", topics: "Grammar, Vocabulary, Comprehension" },
      "Logical Reasoning": { icon: "🧠", topics: "Critical Thinking, Patterns, Puzzles" },
    },
  },
  Humanities: {
    icon: "🏛️",
    color: "humanities",
    desc: "History, Political Science, Geography, English, Logical Reasoning",
    subjects: {
      History: { icon: "📜", topics: "Ancient, Medieval, Modern India, World History" },
      "Political Science": { icon: "⚖️", topics: "Indian Constitution, Polity, IR, Governance" },
      Geography: { icon: "🗺️", topics: "Physical, Human, Economic, Indian Geography" },
      English: { icon: "📚", topics: "Grammar, Vocabulary, Comprehension" },
      "Logical Reasoning": { icon: "🧠", topics: "Critical Thinking, Patterns, Puzzles" },
    },
  },
};

const LEVELS = [
  { name: "Beginner", icon: "🌱", desc: "Foundational concepts & basic recall", color: "beginner", difficulty: "easy" },
  { name: "Intermediate", icon: "🔥", desc: "Applied knowledge & moderate reasoning", color: "intermediate", difficulty: "medium" },
  { name: "Advanced", icon: "🚀", desc: "High-order thinking & competitive level", color: "advanced", difficulty: "hard" },
];

/* ─────────────────────── SIMPLE LOCAL DB ─────────────────────── */
const DB = {
  get: (k, d = null) => { try { const v = sessionStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set: (k, v) => { try { sessionStorage.setItem(k, JSON.stringify(v)); } catch {} },
};

/* ─────────────────────── GEMINI API ─────────────────────── */
async function callGeminiAPI(prompt, systemPrompt = "", userApiKey = "") {
  const key = userApiKey || "";
  if (!key) throw new Error("NO_KEY");
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`;
  const body = {
    system_instruction: { parts: [{ text: systemPrompt || "You are an expert educational AI for the Hindustan Olympiad. Respond in JSON only." }] },
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: { maxOutputTokens: 4000, temperature: 0.7 },
  };
  const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const data = await res.json();
  if (data.error) throw new Error(data.error.message || "Gemini API error");
  return data.candidates?.[0]?.content?.parts?.map(p => p.text || "").join("") || "";
}

/* ─────────────────────── QUESTION GENERATOR ─────────────────────── */
async function generateQuestions({ cls, subject, level, stream = "", topics = "" }, apiKey) {
  const cached = DB.get(`qs_${cls}_${subject}_${level}`);
  if (cached && cached.length >= 20) return cached;

  const levelMap = { Beginner: "easy", Intermediate: "medium", Advanced: "hard (HOTS)" };
  const prompt = `Generate exactly 20 MCQ questions for NCERT Class ${cls} ${subject}${stream ? ` (${stream} Stream)` : ""}${topics ? `, topics: ${topics}` : ""} at ${levelMap[level] || level} difficulty for the Hindustan Olympiad.

Rules:
- Focus on NCERT curriculum
- 4 options each (A, B, C, D)
- Include a clear explanation for the correct answer
- Vary question types: direct recall, application, analysis
- For ${levelMap[level]} level: ${level === "Advanced" ? "include HOTS, multi-step reasoning" : level === "Intermediate" ? "application and moderate reasoning" : "basic concepts and recall"}

Return ONLY valid JSON array (no markdown, no backticks):
[{"id":1,"question":"...","options":["A. ...","B. ...","C. ...","D. ..."],"correct":0,"explanation":"..."},...]

correct is 0-indexed (0=A,1=B,2=C,3=D)`;

  const raw = await callGeminiAPI(prompt, "You are an expert NCERT curriculum question generator for Hindustan Olympiad. Return only valid JSON arrays, no markdown.", apiKey);
  const clean = raw.replace(/```json|```/g, "").trim();
  const qs = JSON.parse(clean);
  DB.set(`qs_${cls}_${subject}_${level}`, qs);
  return qs;
}

/* ─────────────────────── AI CHAT ─────────────────────── */
async function askAI(messages, apiKey) {
  const key = apiKey || "";
  if (!key) throw new Error("NO_KEY");
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`;
  // Convert message history to Gemini format
  const contents = messages.map(m => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));
  const body = {
    system_instruction: { parts: [{ text: "You are a friendly, expert educational tutor for the Hindustan Olympiad, covering NCERT curriculum for classes 1-12. Answer student doubts clearly and concisely. Use simple language and examples." }] },
    contents,
    generationConfig: { maxOutputTokens: 1000, temperature: 0.8 },
  };
  const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  return data.candidates?.[0]?.content?.parts?.map(p => p.text || "").join("") || "Sorry, I couldn't process that.";
}

/* ─────────────────────── TIMER HOOK ─────────────────────── */
function useTimer(totalSeconds, onExpire) {
  const [timeLeft, setTimeLeft] = useState(totalSeconds);
  const ref = useRef(null);
  useEffect(() => {
    ref.current = setInterval(() => {
      setTimeLeft(t => { if (t <= 1) { clearInterval(ref.current); onExpire(); return 0; } return t - 1; });
    }, 1000);
    return () => clearInterval(ref.current);
  }, []);
  const fmt = s => `${String(Math.floor(s / 3600)).padStart(2,"0")}:${String(Math.floor((s % 3600) / 60)).padStart(2,"0")}:${String(s % 60).padStart(2,"0")}`;
  return { timeLeft, display: fmt(timeLeft), isWarning: timeLeft < 600 };
}

/* ══════════════════════════ SCREENS ══════════════════════════ */

/* SPLASH */
function Splash() {
  return (
    <div className="splash">
      <div className="splash-chakra">
        <div className="splash-spokes">
          {Array.from({length:24},(_,i)=>(
            <span key={i} style={{transform:`rotate(${i*15}deg)`}}/>
          ))}
        </div>
      </div>
      <div className="splash-logo">Hindustan Olympiad</div>
      <div className="splash-sub">Knowledge · Excellence · Bharat</div>
      <div className="splash-dots"><span/><span/><span/></div>
    </div>
  );
}

/* AUTH */
function Auth({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name:"", email:"", password:"" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handle = async () => {
    setError(""); setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    if (!form.email || !form.password) { setError("Please fill all fields."); setLoading(false); return; }
    if (form.password.length < 6) { setError("Password must be at least 6 characters."); setLoading(false); return; }
    const users = DB.get("users", {});
    if (mode === "signup") {
      if (!form.name) { setError("Please enter your name."); setLoading(false); return; }
      if (users[form.email]) { setError("Account already exists. Please login."); setLoading(false); return; }
      users[form.email] = { name: form.name, password: form.password };
      DB.set("users", users);
    } else {
      if (!users[form.email] || users[form.email].password !== form.password) {
        setError("Invalid email or password."); setLoading(false); return;
      }
    }
    onLogin({ email: form.email, name: users[form.email]?.name || form.email.split("@")[0] });
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">🇮🇳 Hindustan Olympiad</div>
          <div className="auth-title">{mode === "login" ? "Welcome Back!" : "Join the Olympiad"}</div>
          <div className="auth-sub">{mode === "login" ? "Login to continue your journey" : "Start your competitive journey"}</div>
        </div>
        {error && <div className="error-msg">{error}</div>}
        {mode === "signup" && (
          <div className="input-group">
            <label>Full Name</label>
            <input placeholder="Arjun Sharma" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
          </div>
        )}
        <div className="input-group">
          <label>Email Address</label>
          <input type="email" placeholder="student@example.com" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input type="password" placeholder="••••••••" value={form.password} onChange={e=>setForm({...form,password:e.target.value})}
            onKeyDown={e=>e.key==="Enter"&&handle()} />
        </div>
        <button className="btn-primary" onClick={handle} disabled={loading}>
          {loading ? "Please wait..." : mode === "login" ? "Login →" : "Create Account →"}
        </button>
        <div className="auth-switch">
          {mode === "login" ? <>New here? <button onClick={()=>{setMode("signup");setError("")}}>Create Account</button></> 
            : <>Already have an account? <button onClick={()=>{setMode("login");setError("")}}>Login</button></>}
        </div>
      </div>
    </div>
  );
}

/* HOME */
function Home({ user, onSelectClass, onChat, onSettings, onLogout }) {
  const [tab, setTab] = useState("classes");
  return (
    <div>
      <nav className="nav">
        <div className="nav-logo">🇮🇳 HO</div>
        <div className="nav-actions">
          <button className={`nav-btn ${tab==="classes"?"active":""}`} onClick={()=>setTab("classes")}>Exams</button>
          <button className={`nav-btn ${tab==="chat"?"active":""}`} onClick={onChat}>Ask AI</button>
          <button className="nav-btn" onClick={onSettings}>⚙️</button>
          <button className="nav-btn" onClick={onLogout}>Logout</button>
        </div>
      </nav>
      <div className="home">
        <div className="hero">
          <div className="hero-badge">🏆 Hindustan Olympiad 2025</div>
          <h1>Namaste, <span>{user.name.split(" ")[0]}</span>! 🙏<br/>Choose Your Class</h1>
          <p>AI-powered adaptive exam preparation following NCERT curriculum. 100 questions per level, 3 difficulty levels per class.</p>
        </div>
        <div className="section-title">Classes 1 – 10 <span style={{fontSize:"0.75rem",color:"var(--text-muted)",fontWeight:400}}>5 subjects · 3 levels · 100 questions each</span></div>
        <div className="classes-grid">
          {Array.from({length:10},(_,i)=>i+1).map(c=>(
            <div key={c} className="class-card" onClick={()=>onSelectClass(c)} style={{animationDelay:`${c*0.04}s`}}>
              <div className="class-num">{c}</div>
              <div className="class-label">Class {c}</div>
              <div className="class-badge">5 Subjects</div>
            </div>
          ))}
        </div>
        <div className="section-title">Classes 11 – 12 <span style={{fontSize:"0.75rem",color:"var(--text-muted)",fontWeight:400}}>Stream-based · 3 levels · 100 questions each</span></div>
        <div className="classes-grid">
          {[11,12].map(c=>(
            <div key={c} className="class-card" onClick={()=>onSelectClass(c)} style={{animationDelay:`${(c-10)*0.08}s`}}>
              <div className="class-num">{c}</div>
              <div className="class-label">Class {c}</div>
              <div className="class-badge">3 Streams</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* STREAM SELECT (11 & 12) */
function StreamSelect({ cls, onSelect, onBack }) {
  return (
    <div className="page">
      <div className="page-header">
        <button className="back-btn" onClick={onBack}>← Back to Classes</button>
        <div className="page-title">Class {cls} — Choose Your Stream</div>
        <div className="page-sub">Select your academic stream to begin subject-wise preparation</div>
      </div>
      <div className="stream-grid">
        {Object.entries(STREAMS).map(([name, info]) => (
          <div key={name} className={`stream-card ${info.color}`} onClick={()=>onSelect(name)}>
            <div className="stream-icon">{info.icon}</div>
            <div className="stream-name">{name} Stream</div>
            <div className="stream-subjects">{info.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* SUBJECT SELECT */
function SubjectSelect({ cls, stream, onSelect, onBack }) {
  const subjects = stream ? STREAMS[stream].subjects : SUBJECTS_1_10;
  return (
    <div className="page">
      <div className="page-header">
        <button className="back-btn" onClick={onBack}>← {stream ? `Back to Streams` : "Back to Classes"}</button>
        <div className="page-title">Class {cls}{stream ? ` · ${stream} Stream` : ""}</div>
        <div className="page-sub">Choose a subject to start your exam preparation</div>
      </div>
      <div className="subject-grid">
        {Object.entries(subjects).map(([name, info]) => (
          <div key={name} className="subject-card" onClick={()=>onSelect(name)}>
            <div className="subject-icon">{info.icon}</div>
            <div className="subject-name">{name}</div>
            <div className="subject-topics">{info.topics}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* LEVEL SELECT */
function LevelSelect({ cls, stream, subject, onSelect, onBack }) {
  return (
    <div className="page">
      <div className="page-header">
        <button className="back-btn" onClick={onBack}>← Back to Subjects</button>
        <div className="page-title">{subject}</div>
        <div className="page-sub">Class {cls}{stream ? ` · ${stream} Stream` : ""} · Choose difficulty level</div>
      </div>
      <div className="level-grid">
        {LEVELS.map(l => (
          <div key={l.name} className={`level-card ${l.color}`} onClick={()=>onSelect(l)}>
            <div className="level-icon">{l.icon}</div>
            <div className="level-name">{l.name}</div>
            <div className="level-desc">{l.desc}</div>
            <div className="level-qs" style={{color: l.color==="beginner"?"#48bb78":l.color==="intermediate"?"#F5C518":"#FF6B00"}}>100 Questions</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* EXAM SCREEN */
function ExamScreen({ cls, stream, subject, level, apiKey, onFinish, onBack }) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [phase, setPhase] = useState(0); // 0=generating, 1=exam
  // Load 100 questions in batches of 20
  const allQsRef = useRef([]);
  const [allQs, setAllQs] = useState([]);
  const [batchProgress, setBatchProgress] = useState(0);

  useEffect(()=>{
    loadAllQuestions();
  },[]);

  const loadAllQuestions = async () => {
    setLoading(true);
    setError("");
    try {
      const cacheKey = `exam_${cls}_${stream}_${subject}_${level.name}`;
      const cached = DB.get(cacheKey);
      if (cached && cached.length >= 100) {
        setAllQs(cached); setLoading(false); setPhase(1); return;
      }
      const topics = stream ? STREAMS[stream]?.subjects[subject]?.topics : SUBJECTS_1_10[subject]?.topics;
      let collected = [];
      // Generate 5 batches of 20
      for (let i = 0; i < 5; i++) {
        setBatchProgress(i);
        const batch = await generateQuestions({ cls, subject, level: level.name, stream, topics }, apiKey);
        // Re-index
        const reindexed = batch.map((q, idx) => ({ ...q, id: collected.length + idx + 1 }));
        collected = [...collected, ...reindexed];
        setAllQs([...collected]);
      }
      DB.set(cacheKey, collected);
      setLoading(false); setPhase(1);
    } catch(e) {
      if (e.message === "NO_KEY") {
        setError("⚙️ No Gemini API key found. Please go to Settings and enter your API key first.");
      } else {
        setError(`Failed to generate questions: ${e.message}. Please check your API key in Settings.`);
      }
      setLoading(false);
    }
  };

  const { timeLeft, display, isWarning } = useTimer(7200, ()=>handleSubmit(true));

  const handleAnswer = (optIdx) => {
    if (answers[current] !== undefined) return;
    setAnswers(a => ({...a, [current]: optIdx}));
  };

  const handleSubmit = (auto = false) => {
    if (!auto && Object.keys(answers).length < allQs.length) {
      setShowModal(true); return;
    }
    onFinish({ questions: allQs, answers, timeLeft, level, subject, cls, stream });
  };

  if (loading) return (
    <div className="exam-page">
      <div className="generating">
        <div className="gen-spinner"/>
        <div className="gen-text">🤖 AI is generating your questions…</div>
        <div className="gen-sub">Batch {batchProgress+1}/5 · {batchProgress*20} questions ready</div>
        {allQs.length > 0 && <div style={{color:"var(--gold)",fontSize:"0.85rem"}}>{allQs.length} questions generated so far</div>}
      </div>
    </div>
  );

  if (error) return (
    <div className="exam-page">
      <div className="generating">
        <div style={{fontSize:"3rem"}}>⚠️</div>
        <div className="gen-text">{error}</div>
        <button className="btn-primary" style={{maxWidth:200,marginTop:8}} onClick={loadAllQuestions}>Retry</button>
        <button className="btn-outline" onClick={onBack}>Go Back</button>
      </div>
    </div>
  );

  const q = allQs[current];
  const pct = (Object.keys(answers).length / allQs.length) * 100;

  return (
    <div className="exam-page">
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div style={{fontSize:"2rem",marginBottom:12}}>⚠️</div>
            <h3>Submit with unanswered questions?</h3>
            <p>You have answered {Object.keys(answers).length} of {allQs.length} questions. Unanswered questions will be marked as wrong.</p>
            <div className="modal-actions">
              <button className="btn-outline" onClick={()=>setShowModal(false)}>Continue Exam</button>
              <button className="btn-gold" onClick={()=>onFinish({questions:allQs,answers,timeLeft,level,subject,cls,stream})}>Submit Now</button>
            </div>
          </div>
        </div>
      )}
      <div className="exam-header">
        <div className="exam-info">
          <h3>{subject} · Class {cls}{stream?` · ${stream}`:""}</h3>
          <p>{level.name} Level · {allQs.length} Questions · {Object.keys(answers).length} answered</p>
        </div>
        <div className="exam-timer">
          <div className={`timer-box ${isWarning?"warning":""}`}>⏱ {display}</div>
        </div>
      </div>
      <div className="progress-bar-wrap"><div className="progress-bar" style={{width:`${pct}%`}}/></div>
      <div className="question-nav">
        {allQs.map((_,i)=>(
          <div key={i} className={`q-dot ${answers[i]!==undefined?"answered":""} ${current===i?"current":""}`}
            onClick={()=>setCurrent(i)}>{i+1}</div>
        ))}
      </div>
      <div className="question-card">
        <div className="q-num">Question {current+1} of {allQs.length}</div>
        <div className="q-text">{q.question}</div>
        <div className="options">
          {q.options.map((opt,i)=>(
            <div key={i} className={`option ${answers[current]===i?"selected":""}`} onClick={()=>handleAnswer(i)}>
              <div className="opt-label">{["A","B","C","D"][i]}</div>
              <div className="opt-text">{opt.replace(/^[A-D]\.\s*/,"")}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="exam-actions">
        <button className="btn-danger" onClick={onBack}>🚪 Exit Exam</button>
        <div style={{display:"flex",gap:10}}>
          {current > 0 && <button className="btn-outline" onClick={()=>setCurrent(c=>c-1)}>← Prev</button>}
          {current < allQs.length-1
            ? <button className="btn-gold" onClick={()=>setCurrent(c=>c+1)}>Next →</button>
            : <button className="btn-gold" onClick={()=>handleSubmit(false)}>Submit Exam ✓</button>}
        </div>
      </div>
    </div>
  );
}

/* RESULTS */
function Results({ data, onRetry, onHome }) {
  const { questions, answers, timeLeft, level, subject, cls, stream } = data;
  const correct = questions.filter((q,i)=>answers[i]===q.correct).length;
  const wrong = questions.filter((q,i)=>answers[i]!==undefined&&answers[i]!==q.correct).length;
  const skipped = questions.filter((q,i)=>answers[i]===undefined).length;
  const pct = Math.round((correct/questions.length)*100);
  const timeUsed = 7200 - timeLeft;
  const timeFmt = s=>`${Math.floor(s/3600)}h ${Math.floor((s%3600)/60)}m`;

  const grade = pct>=90?"A+":pct>=75?"A":pct>=60?"B":pct>=45?"C":"F";
  const gradeClass = pct>=75?"grade-a":pct>=60?"grade-b":pct>=45?"grade-c":"grade-f";
  const msg = pct>=90?"Outstanding! You're exam ready 🌟":pct>=75?"Excellent work! Keep it up 💪":pct>=60?"Good effort! Review weak areas 📚":pct>=45?"Fair attempt. More practice needed 📖":"Keep practicing. Every expert was once a beginner 🌱";

  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? questions : questions.slice(0,10);

  return (
    <div className="results-page">
      <div className="score-card">
        <div style={{fontSize:"0.82rem",color:"var(--text-muted)",letterSpacing:"2px",textTransform:"uppercase",marginBottom:8}}>{subject} · Class {cls}{stream?` · ${stream}`:""} · {level.name}</div>
        <div className="score-big">{correct}</div>
        <div className="score-total">out of {questions.length}</div>
        <div className="score-pct">{pct}% Score</div>
        <div className={`score-grade ${gradeClass}`}>Grade {grade}</div>
        <div className="score-msg">{msg}</div>
      </div>
      <div className="stats-row">
        <div className="stat-box"><div className="stat-num green">{correct}</div><div className="stat-label">Correct</div></div>
        <div className="stat-box"><div className="stat-num red">{wrong}</div><div className="stat-label">Wrong</div></div>
        <div className="stat-box"><div className="stat-num muted">{skipped}</div><div className="stat-label">Skipped</div></div>
      </div>
      <div style={{textAlign:"center",color:"var(--text-muted)",fontSize:"0.82rem",marginBottom:28}}>⏱ Time used: {timeFmt(timeUsed)}</div>

      <div className="section-title">Question Review</div>
      <div className="review-list">
        {displayed.map((q,i)=>{
          const isCorrect = answers[i]===q.correct;
          const userAns = answers[i];
          return (
            <div key={i} className={`review-item ${isCorrect?"correct":"wrong"}`}>
              <div className="review-q">{i+1}. {q.question}</div>
              <div className="review-answers">
                {userAns!==undefined && <span className={`rev-ans ${isCorrect?"correct-ans":"wrong-ans"}`}>Your answer: {["A","B","C","D"][userAns]}</span>}
                {!isCorrect && <span className="rev-ans correct-ans">Correct: {["A","B","C","D"][q.correct]}</span>}
                {userAns===undefined && <span style={{fontSize:"0.8rem",color:"var(--text-muted)"}}>⟳ Skipped</span>}
              </div>
              <div className="review-exp"><strong>💡 Explanation:</strong> {q.explanation}</div>
            </div>
          );
        })}
      </div>
      {questions.length > 10 && (
        <button className="btn-outline" style={{width:"100%",marginTop:16}} onClick={()=>setShowAll(s=>!s)}>
          {showAll?"Show Less ↑":`Show All ${questions.length} Questions ↓`}
        </button>
      )}
      <div className="result-actions">
        <button className="btn-outline" onClick={onHome}>🏠 Home</button>
        <button className="btn-gold" onClick={onRetry}>🔄 Try Again</button>
      </div>
    </div>
  );
}

/* AI CHAT */
function AIChat({ user, onBack, apiKey }) {
  const [msgs, setMsgs] = useState([{ role:"ai", text:"Namaste! 🙏 I'm your AI tutor for the Hindustan Olympiad. Ask me any doubts about your subjects — Mathematics, Science, History, or anything NCERT-related. I'm here to help!" }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(()=>{ bottomRef.current?.scrollIntoView({behavior:"smooth"}); },[msgs]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMsgs(m=>[...m,{role:"user",text:userMsg}]);
    setLoading(true);
    try {
      const history = msgs.filter(m=>m.role!=="ai"||msgs.indexOf(m)>0).map(m=>({role:m.role==="ai"?"assistant":"user",content:m.text}));
      history.push({role:"user",content:userMsg});
      const reply = await askAI(history, apiKey);
      setMsgs(m=>[...m,{role:"ai",text:reply}]);
    } catch(e) {
      const msg = e.message === "NO_KEY"
        ? "⚙️ No API key set! Please go to Settings and enter your Gemini API key."
        : "Sorry, I couldn't connect. Please check your API key in Settings.";
      setMsgs(m=>[...m,{role:"ai",text:msg}]);
    }
    setLoading(false);
  };

  return (
    <div>
      <nav className="nav">
        <button className="back-btn" onClick={onBack} style={{margin:0,color:"var(--text-muted)"}}>← Back</button>
        <div className="nav-logo">🤖 Ask with AI</div>
        <div style={{width:60}}/>
      </nav>
      <div className="chat-page">
        <div className="chat-messages">
          {msgs.map((m,i)=>(
            <div key={i} className={`chat-bubble ${m.role==="ai"?"ai":"user"}`}>
              {m.role==="ai"&&<div className="ai-label">🤖 AI Tutor</div>}
              <div style={{whiteSpace:"pre-wrap"}}>{m.text}</div>
            </div>
          ))}
          {loading&&<div className="chat-bubble ai"><div className="ai-label">🤖 AI Tutor</div><div style={{animation:"pulse 1s infinite"}}>Thinking…</div></div>}
          <div ref={bottomRef}/>
        </div>
        <div className="chat-input-row">
          <input className="chat-input" placeholder="Ask your doubt… e.g. Explain Newton's 3rd Law" value={input}
            onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&!e.shiftKey&&send()} />
          <button className="chat-send" onClick={send} disabled={loading||!input.trim()}>➤</button>
        </div>
      </div>
    </div>
  );
}

/* SETTINGS */
function Settings({ onBack, apiKey, onSaveKey }) {
  const [key, setKey] = useState(apiKey || "");
  const [saved, setSaved] = useState(false);
  const save = ()=>{ onSaveKey(key); setSaved(true); setTimeout(()=>setSaved(false),3000); };
  return (
    <div>
      <nav className="nav">
        <button className="back-btn" onClick={onBack} style={{margin:0,color:"var(--text-muted)"}}>← Back</button>
        <div className="nav-logo">⚙️ Settings</div>
        <div style={{width:60}}/>
      </nav>
      <div className="settings-page">
        <div className="settings-section">
          <h3>🔑 Gemini API Key</h3>
          <p>Enter your Google Gemini API key to power AI question generation and the AI tutor. Get a free key at <strong style={{color:"var(--gold)"}}>aistudio.google.com</strong></p>
          <input className="api-key-input" type="password" placeholder="AIza..." value={key} onChange={e=>setKey(e.target.value)} />
          <button className="btn-primary" style={{marginTop:14}} onClick={save}>Save API Key</button>
          {saved && <div className="success-msg">✓ Gemini API key saved for this session!</div>}
          <div className="privacy-note">
            <span>🔒</span>
            <span><strong style={{color:"var(--gold)"}}>Privacy Note:</strong> Your API key is stored only in session memory — never hardcoded, never logged. It's sent directly to Google's Gemini API and clears when you close the tab. This is the safest client-side approach. For full server-side privacy, use a backend proxy.</span>
          </div>
        </div>
        <div className="settings-section">
          <h3>📖 How to Get a Free Gemini API Key</h3>
          <p>Follow these steps to get your free key:</p>
          <div style={{fontSize:"0.82rem",color:"var(--text-muted)",lineHeight:2}}>
            <div>1. Go to <strong style={{color:"var(--gold)"}}>aistudio.google.com</strong></div>
            <div>2. Sign in with your Google account</div>
            <div>3. Click <strong style={{color:"var(--cream)"}}>Get API Key → Create API Key</strong></div>
            <div>4. Copy the key (starts with <code style={{color:"var(--saffron)"}}>AIza...</code>)</div>
            <div>5. Paste it above and click Save</div>
          </div>
        </div>
        <div className="settings-section">
          <h3>🏆 About Hindustan Olympiad</h3>
          <p>AI-powered exam prep platform covering NCERT curriculum for Classes 1–12. Features 100 questions per level, 3 difficulty levels, stream-wise subjects for 11–12, and an AI tutor for instant doubt resolution.</p>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════ MAIN APP ══════════════════════════ */
export default function App() {
  injectStyles();
  const [screen, setScreen] = useState("splash");
  const [user, setUser] = useState(null);
  const [apiKey, setApiKey] = useState("");
  const [nav, setNav] = useState({ cls:null, stream:null, subject:null, level:null });
  const [examResult, setExamResult] = useState(null);

  useEffect(() => {
    const t = setTimeout(()=>setScreen("auth"), 2800);
    return ()=>clearTimeout(t);
  }, []);

  const go = (s, extra={}) => { setNav(n=>({...n,...extra})); setScreen(s); };

  if (screen==="splash") return <div className="app-root"><Splash/></div>;
  if (screen==="auth") return <div className="app-root"><Auth onLogin={u=>{setUser(u);setScreen("home");}}/></div>;

  if (screen==="settings") return <div className="app-root"><Settings onBack={()=>setScreen("home")} apiKey={apiKey} onSaveKey={k=>{setApiKey(k);}}/></div>;
  if (screen==="chat") return <div className="app-root"><AIChat user={user} onBack={()=>setScreen("home")} apiKey={apiKey}/></div>;

  if (screen==="home") return (
    <div className="app-root">
      <Home user={user}
        onSelectClass={c=>{ setNav({cls:c,stream:null,subject:null,level:null}); setScreen(c>=11?"stream":"subject"); }}
        onChat={()=>setScreen("chat")} onSettings={()=>setScreen("settings")} onLogout={()=>setScreen("auth")}/>
    </div>
  );

  if (screen==="stream") return (
    <div className="app-root">
      <nav className="nav"><div className="nav-logo">🇮🇳 HO</div></nav>
      <StreamSelect cls={nav.cls} onSelect={s=>go("subject",{stream:s})} onBack={()=>setScreen("home")}/>
    </div>
  );

  if (screen==="subject") return (
    <div className="app-root">
      <nav className="nav"><div className="nav-logo">🇮🇳 HO</div></nav>
      <SubjectSelect cls={nav.cls} stream={nav.stream} onSelect={s=>go("level",{subject:s})}
        onBack={()=>setScreen(nav.cls>=11?"stream":"home")}/>
    </div>
  );

  if (screen==="level") return (
    <div className="app-root">
      <nav className="nav"><div className="nav-logo">🇮🇳 HO</div></nav>
      <LevelSelect cls={nav.cls} stream={nav.stream} subject={nav.subject} onSelect={l=>go("exam",{level:l})}
        onBack={()=>setScreen("subject")}/>
    </div>
  );

  if (screen==="exam") return (
    <div className="app-root">
      <ExamScreen {...nav} apiKey={apiKey}
        onFinish={result=>{ setExamResult(result); setScreen("results"); }}
        onBack={()=>setScreen("level")}/>
    </div>
  );

  if (screen==="results") return (
    <div className="app-root">
      <nav className="nav"><div className="nav-logo">🇮🇳 HO</div></nav>
      <Results data={examResult}
        onRetry={()=>setScreen("exam")}
        onHome={()=>{ setNav({cls:null,stream:null,subject:null,level:null}); setExamResult(null); setScreen("home"); }}/>
    </div>
  );

  return <div className="app-root"><div style={{padding:40,textAlign:"center"}}>Loading...</div></div>;
}
