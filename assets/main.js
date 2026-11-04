// M13 Advisory — progressive enhancement: mobile menu, header state, scroll reveals.
(function(){
  var doc=document.documentElement, body=document.body, btn=document.querySelector('.menu-toggle'), header=document.querySelector('.site-header');
  if(btn){
    btn.addEventListener('click',function(){
      var open=body.classList.toggle('menu-open');
      btn.setAttribute('aria-expanded',open); btn.setAttribute('aria-label',open?'Close menu':'Open menu');
    });
    document.querySelectorAll('.site-nav a').forEach(function(a){a.addEventListener('click',function(){body.classList.remove('menu-open');btn.setAttribute('aria-expanded','false');});});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&body.classList.contains('menu-open')){btn.click();}});
  }
  var lastY=0;
  function onScroll(){
    var y=window.scrollY;
    if(header){
      header.classList.toggle('scrolled', y>40);
      header.classList.toggle('tucked', y>420 && y>lastY && !body.classList.contains('menu-open'));
    }
    lastY=y;
  }
  window.addEventListener('scroll',onScroll,{passive:true}); onScroll();

  // Scroll reveals (inner-page elements get the class automatically)
  var auto='.page-hero .wrap > *, .page-hero .prose > *, .svc, .sectors li, .pillars li, .steps li, .models li, .stats li, .questions li, .contact-form, .ticks';
  document.querySelectorAll(auto).forEach(function(el){ if(!el.closest('.reveal')) el.classList.add('reveal'); });
  var els=[].slice.call(document.querySelectorAll('.reveal'));
  var reduce=window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce || !('IntersectionObserver' in window)){ els.forEach(function(el){el.classList.add('in');}); return; }
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } });
  },{rootMargin:'0px 0px -8% 0px',threshold:0.08});
  els.forEach(function(el){ io.observe(el); });
})();
