const menuButton=document.querySelector('.menu-button');
const navigation=document.querySelector('.nav');
menuButton?.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Закрыть меню':'Открыть меню');navigation.classList.toggle('open',open)});
navigation?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{navigation.classList.remove('open');menuButton?.setAttribute('aria-expanded','false');menuButton?.setAttribute('aria-label','Открыть меню')}));
document.querySelectorAll('.preview-switch').forEach(group=>{
  const frame=group.closest('.project-image');
  const image=frame?.querySelector('img');
  if(!image)return;
  group.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>{
    const mobile=button.dataset.view==='mobile';
    image.src=mobile?image.dataset.mobile:image.dataset.desktop;
    image.alt=mobile?image.dataset.mobileAlt:image.dataset.desktopAlt;
    frame.classList.toggle('mobile-view',mobile);
    group.querySelectorAll('button').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
  }));
});
