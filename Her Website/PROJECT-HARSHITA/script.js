const $=s=>document.querySelector(s);
const P=n=>`assets/photos/${n}.jpg`;

// ---- Content (edit freely) ----
const gallery=['laugh','arch','booth','curtain','grey','trio','fun','terrace','cafe'];
// Captions shown when a photo is enlarged. Edit freely.
const caps={laugh:'Caught mid-laugh, the best kind of photo. 😄',arch:'Flowers, a chandelier and a smile that fits right in. 🌸',booth:'A flower booth that finally met someone prettier. 💐',curtain:'Main character energy, hair flying. ✨',grey:'Elegance, with a little sparkle. 💎',trio:'Three smiles, one golden alley. 💛',fun:'Mid-laugh with the gang, no pose needed. 😄',terrace:'Golden hour looked good on you. 🌇',cafe:'Looking away, still the best photo in the room. 🌷'};
const memories=[
 ['rose','The rose','It started as a joke. But maybe, just maybe, it could have been real.'],
 ['pair','The blue and yellow day','No plan, no script. A random photoshoot that turned into pure fun.'],
 ['cheek','The cheek pinch','One sudden idea, one pinch, and it became a memory. It was the last day of our Group 1 class in Pune, and it felt like we would never meet again.'],
 ['sky','Sky selfie','Parvati Hills, Pune. Morning. We said, "Let\'s just have fun one last time."']
];
// TODO: replace with real questions about her favourites and inside jokes
const quiz=[
 ['Birthday morning. What comes first?',[['Cake','Excellent priorities.'],['Photos','Of course. The camera roll must be fed.'],['More sleep','Respect. Birthdays can wait five minutes.']]],
 ['Pick a birthday mood.',[['Dreamy','Petals, soft light and zero stress.'],['Loud','Music up. Everyone invited.'],['Cozy','Small plans, big smiles.']]],
 ['How many photos until the perfect one?',[['One','Born photogenic.'],['Ten','Dedication to the craft.'],['Lost count','The best answer, honestly.']]]
];
const gifts=[['🎁','Your smile makes every photo better. We have the evidence.','laugh'],['🎀','Parvati Hills, one last morning, and we still had fun.','sky'],['💝','May every day this year feel like a good photo day.','curtain']];
const letter=[
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
$('#enter').onclick=()=>{$('#gate').classList.add('out');$('main').hidden=false;petals();$('#nav').hidden=false;show(0)};
function petals(){if(matchMedia('(prefers-reduced-motion:reduce)').matches)return;
 for(let i=0;i<16;i++){const p=document.createElement('i');p.className='petal';
  p.style.cssText=`left:${Math.random()*100}vw;animation-duration:${8+Math.random()*8}s;animation-delay:${-Math.random()*10}s`;document.body.append(p)}}

// ---- Gallery and lightbox ----
gallery.forEach((n,i)=>{const b=document.createElement('button');b.className='pol';b.style.setProperty('--r',((i%3)-1)*1.8+'deg');
 b.innerHTML=`<img src="${P(n)}" alt="Harshita" loading="lazy">`;b.onclick=()=>{$('#lb img').src=P(n);$('#lbc').textContent=caps[n]||'';$('#lb').hidden=false};$('#wall').append(b)});
$('#lb').onclick=()=>$('#lb').hidden=true;
addEventListener('keydown',e=>{if(e.key==='Escape')$('#lb').hidden=true});

// ---- Memory lane ----
memories.forEach(([img,t,c])=>{const d=document.createElement('article');d.className='mem';
 d.innerHTML=`<img src="${P(img)}" alt="${t}" loading="lazy"><div><h3>${t}</h3><p>${c}</p></div>`;$('#lane').append(d)});

// ---- Quiz ----
let qi=0;
function ask(){const [q,o]=quiz[qi];$('#qtext').textContent=q;$('#qopts').innerHTML='';$('#qfb').textContent='';
 o.forEach(([a,r])=>{const b=document.createElement('button');b.textContent=a;
  b.onclick=()=>{$('#qopts').innerHTML='';$('#qfb').textContent=r;qi++;
   setTimeout(()=>qi<quiz.length?ask():done(),1800)};$('#qopts').append(b)})}
function done(){$('#qtext').textContent='Result: certified birthday legend.';$('#qfb').textContent='No wrong answers. Only good vibes.'}
ask();

// ---- Hidden surprises ----
gifts.forEach(([e,t,im])=>{const b=document.createElement('button');b.className='box';b.textContent=e;b.setAttribute('aria-label','Open surprise');
 b.onclick=()=>{b.classList.add('open');$('#gnote').textContent=t;$('#gimg').src=P(im);$('#gimg').hidden=false};$('#boxes').append(b)});

// ---- Letter ----
$('#env').onclick=()=>{const p=$('#paper');p.innerHTML=letter.map(l=>l[0]==='~'?`<p class="poem">${l.slice(1)}</p>`:`<p>${l}</p>`).join('');p.hidden=false;$('#env').hidden=true};

// ---- Finale ----
let lit=5;
for(let i=0;i<5;i++){const c=document.createElement('button');c.className='candle';c.setAttribute('aria-label','Blow out candle');
 c.onclick=()=>{if(c.classList.contains('off'))return;c.classList.add('off');if(--lit===0)celebrate()};$('#candles').append(c)}
function celebrate(){$('#cmsg').textContent='Wish made. 🌷';$('#fimg').hidden=false;$('#fin').hidden=false;
 for(let i=0;i<40;i++){const s=document.createElement('span');s.className='conf';s.textContent=['🎉','✨','🌸','🎀','💛'][i%5];
  s.style.cssText=`left:${Math.random()*100}vw;animation-delay:${Math.random()*1.5}s`;document.body.append(s);setTimeout(()=>s.remove(),5000)}}

// ---- Music (optional, never autoplays) ----
// Put your song at assets/music/song.mp3 and the button appears by itself.
const song=new Audio('assets/music/song.mp3');song.loop=true;
song.addEventListener('canplaythrough',()=>$('#mus').hidden=false,{once:true});
$('#mus').onclick=()=>{if(song.paused){song.play();$('#mus').classList.add('on')}else{song.pause();$('#mus').classList.remove('on')}};

// ---- Lock screen ----
const CODE='0501';let pin='';
const dots=document.querySelectorAll('#dots i');
['1','2','3','4','5','6','7','8','9','','0','⌫'].forEach(k=>{if(!k){$('#pad').append(document.createElement('span'));return}
 const b=document.createElement('button');b.textContent=k;b.onclick=()=>key(k);$('#pad').append(b)});
addEventListener('keydown',e=>{if($('#lock').hidden)return;if(/^\d$/.test(e.key))key(e.key);if(e.key==='Backspace')key('⌫')});
function key(k){if(k==='⌫')pin=pin.slice(0,-1);else if(pin.length<4)pin+=k;
 dots.forEach((d,i)=>d.classList.toggle('on',i<pin.length));
 if(pin.length===4){if(pin===CODE)$('#lock').hidden=true;
  else{$('#dots').classList.add('bad');setTimeout(()=>{$('#dots').classList.remove('bad');pin='';dots.forEach(d=>d.classList.remove('on'))},450)}}}

// ---- Countdown ----
(()=>{const n=new Date(),t=new Date(2027,0,5),d=Math.round((t-new Date(n.getFullYear(),n.getMonth(),n.getDate()))/864e5);
 $('#cd').textContent=d>1?`${d} days until 05 January 2027`:d===1?'Tomorrow is your day. 🎉':d===0?'Today is your day! Happy birthday! 🎂':'Your birthday has passed, but the celebration never ends. ✨'})();

// ---- Compliment machine ----  TODO: personalise these together
const nice=['You make ordinary days feel brighter.','Your smile wins every photo.','You have a laugh people remember.','You are easy to be happy around.','You deserve every good thing coming your way.'];
let ci=-1;$('#cbtn').onclick=()=>{let r;do{r=Math.floor(Math.random()*nice.length)}while(r===ci);ci=r;$('#cline').textContent=nice[r]};

// ---- Wish jar ----
function wish(){const v=$('#wi').value.trim();if(!v)return;const s=document.createElement('span');s.className='wish';s.textContent='✨ '+v;
 s.style.left=(15+Math.random()*70)+'%';$('#sky').append(s);setTimeout(()=>s.remove(),6200);$('#wi').value=''}
$('#wb').onclick=wish;$('#wi').addEventListener('keydown',e=>{if(e.key==='Enter')wish()});

// ---- Balloons ----
const NAME='HARSHITA',got=Array(8).fill('_');let popped=0;
$('#word').textContent=got.join(' ');
for(let i=0;i<8;i++){const b=document.createElement('button');b.className='bl';b.textContent='🎈';b.setAttribute('aria-label','Pop balloon');
 b.onclick=()=>{if(b.classList.contains('popped'))return;b.classList.add('popped');b.textContent=NAME[i];got[i]=NAME[i];
  $('#word').textContent=got.join(' ');if(++popped===8){$('#word').textContent=NAME+' 🎉';confetti()}};$('#bal').append(b)}
function confetti(){for(let i=0;i<30;i++){const s=document.createElement('span');s.className='conf';s.textContent=['🎉','✨','🌸','🎀','💛'][i%5];
 s.style.cssText=`left:${Math.random()*100}vw;animation-delay:${Math.random()}s`;document.body.append(s);setTimeout(()=>s.remove(),5000)}}

// ---- Fortune cookie ---- TODO: personalise these together
const fort=['2027 will bring good news when you least expect it.','Something you have been waiting for is closer than you think.','A small, happy surprise is on its way this year.','This year, your smile will open a door for you.','You will collect many more beautiful moments in 2027.'];
let fi=-1;$('#fbtn').onclick=()=>{let r;do{r=Math.floor(Math.random()*fort.length)}while(r===fi);fi=r;$('#fline').textContent=fort[r]};

// ---- Pages: one slide at a time with Back / Next ----
const pages=[...document.querySelectorAll('main>section')];let pi=0;
function show(i){pi=Math.max(0,Math.min(pages.length-1,i));pages.forEach((p,k)=>p.classList.toggle('active',k===pi));
 $('#pg').textContent=`${pi+1} / ${pages.length}`;$('#back').style.visibility=pi?'visible':'hidden';
 $('#next').style.visibility=pi<pages.length-1?'visible':'hidden';scrollTo(0,0)}
$('#next').onclick=()=>show(pi+1);$('#back').onclick=()=>show(pi-1);
addEventListener('keydown',e=>{if($('main').hidden||!$('#lb').hidden||document.activeElement.tagName==='INPUT')return;
 if(e.key==='ArrowRight')show(pi+1);if(e.key==='ArrowLeft')show(pi-1)});
