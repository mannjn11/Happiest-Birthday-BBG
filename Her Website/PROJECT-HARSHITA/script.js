const $ = s => document.querySelector(s);
const P = n => `assets/photos/${n}.jpg`;

// ---- Content (edit freely) ----
const gallery = ['laugh', 'arch', 'booth', 'curtain', 'grey', 'trio', 'fun', 'terrace', 'cafe'];
const memories = [
   ['rose', 'The rose', 'It started as a joke. But maybe, just maybe, it could have been real.'],
   ['pair', 'The blue and yellow day', 'No plan, no script. A random photoshoot that turned into pure fun.'],
   ['cheek', 'The cheek pinch', 'One sudden idea, one pinch, and it became a memory. It was the last day of our Group 1 class in Pune, and it felt like we would never meet again.'],
   ['sky', 'Sky selfie', 'Parvati Hills, Pune. Morning. We said, "Let\'s just have fun one last time."']
];
// TODO: replace with real questions about her favourites and inside jokes
const quiz = [
   ['Birthday morning. What comes first?', [
      ['Cake', 'Excellent priorities.'],
      ['Photos', 'Of course. The camera roll must be fed.'],
      ['More sleep', 'Respect. Birthdays can wait five minutes.']
   ]],
   ['Pick a birthday mood.', [
      ['Dreamy', 'Petals, soft light and zero stress.'],
      ['Loud', 'Music up. Everyone invited.'],
      ['Cozy', 'Small plans, big smiles.']
   ]],
   ['How many photos until the perfect one?', [
      ['One', 'Born photogenic.'],
      ['Ten', 'Dedication to the craft.'],
      ['Lost count', 'The best answer, honestly.']
   ]]
];
const gifts = [
   ['🎁', 'Your smile makes every photo better. We have the evidence.', 'laugh'],
   ['🎀', 'Parvati Hills, one last morning, and we still had fun.', 'sky'],
   ['💝', 'May every day this year feel like a good photo day.', 'curtain']
];
const letter = [
   `To Harshita, on her special day… 🌷`,
   `Happy Birthday, Harshiiiiiii hehe 🤭!! 🎂💗`,
   `You know, some people make the world a little brighter just by being themselves. And today, I hope the world gives a little of that brightness back to you. ✨`,
   `I hope you never forget how special you are. Not just today, when everyone is wishing you, but on those ordinary days too, when life gets busy and you forget to appreciate yourself.`,
   `I hope this new chapter brings you countless reasons to smile, unexpected happiness, beautiful memories and dreams that slowly turn into reality. May you always find the courage to chase what your heart wants, the strength to overcome difficult days and the people who make even the simplest moments feel magical. 🦋`,
   `And hey, never stop being you. Keep your little quirks, your laughter, your craziness and everything that makes you uniquely Harshita.`,
   `I don't know what the coming year has planned for you, but I genuinely hope it's beautiful. You deserve happiness that doesn't need a reason, smiles that don't fade quickly and memories that make you think, "I'm really glad this happened." 🥹`,
   `And before I end this little birthday note, here's something just for you…`,
   `~🌸 A Little Birthday Poem 🌸`,
   `~May your skies forever shine,<br>May your stars align with mine—<br>Not every wish needs wings to fly,<br>Some just bloom beneath the sky. 🦋`,
   `~May laughter find you every day,<br>And chase the gloomy clouds away.<br>And wherever life's paths may start,<br>Keep that sunshine in your heart. 🌷`,
   `So here's to you, Harshita! 🥂`,
   `To another year of growing, glowing, laughing, learning and collecting beautiful little moments.`,
   `Keep smiling, birthday girl. The world is a little more beautiful with you in it. ❤️`,
   `Happy Birthday once again! 🎀`,
   `With lots of wishes,<br>Someone who genuinely wishes you the best. 💗`
];

// ---- Gate and petals ----
$('#enter').onclick = () => {
   $('#gate').classList.add('out');
   $('main').hidden = false;
   scrollTo(0, 0);
   petals()
};

function petals() {
   if (matchMedia('(prefers-reduced-motion:reduce)').matches) return;
   for (let i = 0; i < 16; i++) {
      const p = document.createElement('i');
      p.className = 'petal';
      p.style.cssText = `left:${Math.random()*100}vw;animation-duration:${8+Math.random()*8}s;animation-delay:${-Math.random()*10}s`;
      document.body.append(p)
   }
}

// ---- Gallery and lightbox ----
gallery.forEach((n, i) => {
   const b = document.createElement('button');
   b.className = 'pol';
   b.style.setProperty('--r', ((i % 3) - 1) * 1.8 + 'deg');
   b.innerHTML = `<img src="${P(n)}" alt="Harshita" loading="lazy">`;
   b.onclick = () => {
      $('#lb img').src = P(n);
      $('#lb').hidden = false
   };
   $('#wall').append(b)
});
$('#lb').onclick = () => $('#lb').hidden = true;
addEventListener('keydown', e => {
   if (e.key === 'Escape') $('#lb').hidden = true
});

// ---- Memory lane ----
memories.forEach(([img, t, c]) => {
   const d = document.createElement('article');
   d.className = 'mem';
   d.innerHTML = `<img src="${P(img)}" alt="${t}" loading="lazy"><div><h3>${t}</h3><p>${c}</p></div>`;
   $('#lane').append(d)
});

// ---- Quiz ----
let qi = 0;

function ask() {
   const [q, o] = quiz[qi];
   $('#qtext').textContent = q;
   $('#qopts').innerHTML = '';
   $('#qfb').textContent = '';
   o.forEach(([a, r]) => {
      const b = document.createElement('button');
      b.textContent = a;
      b.onclick = () => {
         $('#qopts').innerHTML = '';
         $('#qfb').textContent = r;
         qi++;
         setTimeout(() => qi < quiz.length ? ask() : done(), 1800)
      };
      $('#qopts').append(b)
   })
}

function done() {
   $('#qtext').textContent = 'Result: certified birthday legend.';
   $('#qfb').textContent = 'No wrong answers. Only good vibes.'
}
ask();

// ---- Hidden surprises ----
gifts.forEach(([e, t, im]) => {
   const b = document.createElement('button');
   b.className = 'box';
   b.textContent = e;
   b.setAttribute('aria-label', 'Open surprise');
   b.onclick = () => {
      b.classList.add('open');
      $('#gnote').textContent = t;
      $('#gimg').src = P(im);
      $('#gimg').hidden = false
   };
   $('#boxes').append(b)
});

// ---- Letter ----
$('#env').onclick = () => {
   const p = $('#paper');
   p.innerHTML = letter.map(l => l[0] === '~' ? `<p class="poem">${l.slice(1)}</p>` : `<p>${l}</p>`).join('');
   p.hidden = false;
   $('#env').hidden = true
};

// ---- Finale ----
let lit = 5;
for (let i = 0; i < 5; i++) {
   const c = document.createElement('button');
   c.className = 'candle';
   c.setAttribute('aria-label', 'Blow out candle');
   c.onclick = () => {
      if (c.classList.contains('off')) return;
      c.classList.add('off');
      if (--lit === 0) celebrate()
   };
   $('#candles').append(c)
}

function celebrate() {
   $('#cmsg').textContent = 'Wish made. 🌷';
   $('#fimg').hidden = false;
   $('#fin').hidden = false;
   for (let i = 0; i < 40; i++) {
      const s = document.createElement('span');
      s.className = 'conf';
      s.textContent = ['🎉', '✨', '🌸', '🎀', '💛'][i % 5];
      s.style.cssText = `left:${Math.random()*100}vw;animation-delay:${Math.random()*1.5}s`;
      document.body.append(s);
      setTimeout(() => s.remove(), 5000)
   }
}

// ---- Music (optional, never autoplays) ----
// Put your song at assets/music/song.mp3 and the button appears by itself.
const song = new Audio('assets/music/song.mp3');
song.loop = true;
song.addEventListener('canplaythrough', () => $('#mus').hidden = false, {
   once: true
});
$('#mus').onclick = () => {
   if (song.paused) {
      song.play();
      $('#mus').classList.add('on')
   } else {
      song.pause();
      $('#mus').classList.remove('on')
   }
};