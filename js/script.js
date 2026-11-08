/* Animations and interactions for the portfolio. Loaded by index.html with: <script src="script.js" defer></script> */
(function(){
var $=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
var tg=document.getElementById('tg'),menu=document.getElementById('menu');
tg.onclick=function(){var o=menu.classList.toggle('open');tg.setAttribute('aria-expanded',o)};
$('a',menu).forEach(function(a){a.onclick=function(){menu.classList.remove('open')}});
var bar=document.getElementById('bar');
addEventListener('scroll',function(){var h=document.documentElement;bar.style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100)+'%'},{passive:true});
var words=['Full Stack Dev','Java Engineer','Data Analyst','Scalable Apps'],sw=document.getElementById('swap'),i=0;
if(!reduce){setInterval(function(){var cur=sw.lastChild;cur.className='out';i=(i+1)%words.length;
var n=document.createElement('span');n.textContent=words[i];n.className='pre';sw.appendChild(n);
setTimeout(function(){n.className=''},30);setTimeout(function(){cur.remove()},760)},2800)}
var hero=document.getElementById('home'),sp=document.getElementById('spot');
if(!reduce)hero.addEventListener('pointermove',function(e){var r=hero.getBoundingClientRect();sp.style.setProperty('--x',(e.clientX-r.left)+'px');sp.style.setProperty('--y',(e.clientY-r.top)+'px')});
$('.gc').forEach(function(c){c.addEventListener('pointermove',function(e){var r=c.getBoundingClientRect();c.style.setProperty('--mx',(e.clientX-r.left)+'px');c.style.setProperty('--my',(e.clientY-r.top)+'px')})});
function count(el){var end=+el.dataset.n,t0=performance.now();(function f(t){var p=Math.min((t-t0)/1200,1);el.textContent=Math.round(end*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)})(t0)}
if(!('IntersectionObserver' in window)||reduce){$('.rv').forEach(function(e){e.classList.add('in')});$('[data-n]').forEach(function(e){e.textContent=e.dataset.n});return}
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;e.target.classList.add('in');$('[data-n]',e.target).forEach(count);io.unobserve(e.target)})},{threshold:.12});
$('.rv').forEach(function(el,k){el.style.transitionDelay=(k%4)*80+'ms';io.observe(el)});
})();