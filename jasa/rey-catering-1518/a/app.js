
(function(){
 var b=document.querySelector('.mn'),n=document.getElementById('nav');
 if(!b||!n)return;
 b.addEventListener('click',function(){var o=n.classList.toggle('buka');b.setAttribute('aria-expanded',o);b.setAttribute('aria-label',o?'Tutup menu':'Buka menu');});
 n.addEventListener('click',function(e){if(e.target.tagName==='A'){n.classList.remove('buka');b.setAttribute('aria-expanded','false');}});
})();
