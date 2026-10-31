/* Theme toggle: overrides the OS setting and remembers the choice. */
(function(){
  var d=document.documentElement, KEY='stetwood-theme', mem=null;
  var mq=window.matchMedia ? matchMedia('(prefers-color-scheme: dark)') : null;
  function saved(){ try{ var t=localStorage.getItem(KEY); return (t==='light'||t==='dark')?t:mem; }catch(e){ return mem; } }
  function current(){ return saved() || (mq && mq.matches ? 'dark' : 'light'); }
  function apply(){
    var t=saved(), eff=current();
    if(t) d.setAttribute('data-theme',t); else d.removeAttribute('data-theme');
    d.classList.toggle('theme-dark',eff==='dark'); d.classList.toggle('theme-light',eff!=='dark');
    // theme-color: follow the choice, or restore OS-based variants.
    document.querySelectorAll('meta[name="theme-color"]').forEach(function(m){
      var isDarkMeta = m.getAttribute('content')==='#0f2219' || m.dataset.variant==='dark';
      if(!m.dataset.variant) m.dataset.variant = isDarkMeta ? 'dark' : 'light';
      m.media = t ? (m.dataset.variant===t ? 'all' : 'not all') : '(prefers-color-scheme: '+m.dataset.variant+')';
    });
    var b=document.querySelector('.theme-toggle');
    if(b){
      var next = eff==='dark' ? 'light' : 'dark';
      b.setAttribute('aria-label','Switch to '+next+' theme');
      b.setAttribute('title','Switch to '+next+' theme');
    }
  }
  function toggle(){
    var next = current()==='dark' ? 'light' : 'dark';
    mem=next; try{ localStorage.setItem(KEY,next); }catch(e){}
    apply();
  }
  var b=document.querySelector('.theme-toggle');
  if(b) b.addEventListener('click',toggle);
  if(mq && mq.addEventListener) mq.addEventListener('change',function(){ if(!saved()) apply(); });
  apply();
})();
