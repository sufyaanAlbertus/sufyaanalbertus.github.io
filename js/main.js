/* =========================================================
   Sufyaan Albertus portfolio: game layer
   - boot screen (once per visit)
   - levels cleared (remembers which project pages you opened)
   - achievement toasts
   - optional 8-bit sound effects (off by default)
   - Konami code easter egg
   ========================================================= */
(function () {
  "use strict";

  var LEVELS = {
    "buzz-together": "Buzz Together",
    "whisper-village": "Whisper Village",
    "last-watch": "Last Watch"
  };
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- safe storage (works even if storage is blocked) ---------- */
  function load(key, fallback) {
    try { var v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch (e) { return fallback; }
  }
  function save(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
  }
  function sessionGet(key) { try { return sessionStorage.getItem(key); } catch (e) { return null; } }
  function sessionSet(key) { try { sessionStorage.setItem(key, "1"); } catch (e) {} }

  /* ---------- 8-bit sound effects (generated, no files) ---------- */
  var sfxOn = load("sa-sfx", false);
  var audioCtx = null;
  function beep(freq, dur, type) {
    if (!sfxOn) return;
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      var o = audioCtx.createOscillator(), g = audioCtx.createGain();
      o.type = type || "square";
      o.frequency.value = freq;
      g.gain.setValueAtTime(0.05, audioCtx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + dur);
      o.connect(g); g.connect(audioCtx.destination);
      o.start(); o.stop(audioCtx.currentTime + dur);
    } catch (e) {}
  }
  function jingle() { [523, 659, 784, 1047].forEach(function (f, i) { setTimeout(function () { beep(f, 0.12); }, i * 90); }); }

  /* ---------- achievements ---------- */
  var unlocked = load("sa-achievements", {});
  var toastBox;
  function unlock(id, title, icon) {
    if (unlocked[id]) return;
    unlocked[id] = true;
    save("sa-achievements", unlocked);
    if (!toastBox) return;
    var t = document.createElement("div");
    t.className = "toast";
    t.innerHTML = '<div class="toast-icon" aria-hidden="true">' + (icon || "★") + '</div><div><b>ACHIEVEMENT UNLOCKED</b><span></span></div>';
    t.querySelector("span").textContent = title;
    toastBox.appendChild(t);
    jingle();
    requestAnimationFrame(function () { requestAnimationFrame(function () { t.classList.add("in"); }); });
    setTimeout(function () { t.classList.remove("in"); setTimeout(function () { t.remove(); }, 400); }, 3800);
  }

  document.addEventListener("DOMContentLoaded", function () {
    toastBox = document.querySelector(".toasts");
    if (!toastBox) {
      toastBox = document.createElement("div");
      toastBox.className = "toasts";
      toastBox.setAttribute("aria-live", "polite");
      document.body.appendChild(toastBox);
    }

    /* ----- mobile menu ----- */
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".nav");
    if (toggle && nav) {
      toggle.addEventListener("click", function () {
        var open = nav.classList.toggle("open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        beep(440, 0.06);
      });
      nav.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
          nav.classList.remove("open");
          toggle.setAttribute("aria-expanded", "false");
        });
      });
    }

    /* ----- footer year ----- */
    var year = document.getElementById("year");
    if (year) year.textContent = new Date().getFullYear();

    /* ----- SFX toggle ----- */
    document.querySelectorAll(".sfx-toggle").forEach(function (btn) {
      function paint() { btn.textContent = sfxOn ? "SFX: ON" : "SFX: OFF"; btn.setAttribute("aria-pressed", sfxOn ? "true" : "false"); }
      paint();
      btn.addEventListener("click", function () { sfxOn = !sfxOn; save("sa-sfx", sfxOn); paint(); beep(880, 0.08); });
    });
    document.querySelectorAll(".btn, .card, .nav a, .inventory li, .link-tile, .pager a").forEach(function (el) {
      el.addEventListener("mouseenter", function () { beep(660, 0.04); });
    });
    document.querySelectorAll(".btn, .card, .link-tile").forEach(function (el) {
      el.addEventListener("click", function () { beep(990, 0.08); });
    });

    /* ----- boot screen (home only, once per visit) ----- */
    var boot = document.getElementById("boot");
    if (boot && !sessionGet("sa-booted") && !reduceMotion) {
      boot.classList.add("show");
      var closed = false;
      var close = function () {
        if (closed) return; closed = true;
        sessionSet("sa-booted");
        boot.classList.add("hide");
        setTimeout(function () { boot.remove(); }, 500);
        unlock("joined", "Player 1 has joined", "▶");
        document.removeEventListener("keydown", close);
      };
      boot.addEventListener("click", close);
      document.addEventListener("keydown", close);
      setTimeout(close, 2600);
    } else if (boot) {
      boot.remove();
    }

    /* ----- levels cleared ----- */
    var cleared = load("sa-cleared", {});
    var m = location.pathname.match(/projects\/([a-z-]+)\.html/);
    if (m && LEVELS[m[1]]) {
      if (!cleared[m[1]]) {
        cleared[m[1]] = true;
        save("sa-cleared", cleared);
      }
      setTimeout(function () { unlock("clear-" + m[1], "Level cleared: " + LEVELS[m[1]], "✓"); }, 600);
    }
    var count = Object.keys(LEVELS).filter(function (k) { return cleared[k]; }).length;
    document.querySelectorAll(".card[data-level]").forEach(function (card) {
      if (cleared[card.getAttribute("data-level")]) card.classList.add("cleared");
    });
    var countEl = document.querySelector(".cleared-count");
    var fill = document.querySelector(".xp-fill");
    if (countEl) countEl.textContent = count + " / 3";
    if (fill) setTimeout(function () { fill.style.width = (count / 3 * 100) + "%"; }, 300);
    if (count === 3) setTimeout(function () { unlock("completionist", "100% complete: every level cleared", "🏆"); }, 1400);

    /* ----- scroll achievements (home) ----- */
    if ("IntersectionObserver" in window) {
      var watch = [
        ["#work", "explorer", "Explorer: found the level select", "◆"],
        ["#about", "lore", "Lore hunter: read the player profile", "❖"],
        ["#contact", "end-credits", "Reached the end credits", "⚑"]
      ];
      watch.forEach(function (w) {
        var el = document.querySelector(w[0]);
        if (!el || !document.body.classList.contains("home")) return;
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (en) { if (en.isIntersecting) { unlock(w[1], w[2], w[3]); io.disconnect(); } });
        }, { threshold: 0.35 });
        io.observe(el);
      });
    }

    /* ----- contact achievement ----- */
    document.querySelectorAll('a[href^="mailto:"]').forEach(function (a) {
      a.addEventListener("click", function () { unlock("party", "Party invite sent", "✉"); });
    });

    /* ----- Konami code ----- */
    var code = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
    var pos = 0;
    document.addEventListener("keydown", function (e) {
      var k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      pos = (k === code[pos]) ? pos + 1 : (k === code[0] ? 1 : 0);
      if (pos === code.length) {
        pos = 0;
        unlock("konami", "Cheat code activated: gold rush", "$");
        if (reduceMotion) return;
        for (var i = 0; i < 40; i++) {
          var c = document.createElement("span");
          c.className = "coin";
          c.style.left = Math.random() * 100 + "vw";
          c.style.animationDuration = (1.6 + Math.random() * 1.6) + "s";
          c.style.animationDelay = (Math.random() * 0.8) + "s";
          document.body.appendChild(c);
          setTimeout(function (el) { return function () { el.remove(); }; }(c), 4000);
        }
      }
    });
  });
})();
