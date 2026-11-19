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

const botConversation=document.querySelector('.bot-conversation');
let botService='';
botConversation?.addEventListener('click',event=>{
  const button=event.target.closest('button');
  if(!button)return;
  const current=button.closest('[data-bot-stage]');
  if(button.dataset.botAction==='reset'){
    botConversation.querySelectorAll('[data-bot-stage]').forEach(stage=>stage.hidden=stage.dataset.botStage!=='0');
    botService='';
  }else{
    if(button.dataset.botService)botService=button.dataset.botService;
    if(button.dataset.botTime)botConversation.querySelector('[data-bot-summary]').textContent=`${botService.toLowerCase()}, ${button.dataset.botTime.toLowerCase()}`;
    current.hidden=true;
    botConversation.querySelector(`[data-bot-stage="${Number(current.dataset.botStage)+1}"]`).hidden=false;
  }
  botConversation.scrollTop=botConversation.scrollHeight;
});

document.querySelectorAll('[data-mini-service],[data-mini-time]').forEach(button=>button.addEventListener('click',()=>{
  const key=button.dataset.miniService?'miniService':'miniTime';
  document.querySelectorAll(`[data-${key==='miniService'?'mini-service':'mini-time'}]`).forEach(item=>{
    const selected=item===button;
    item.classList.toggle('selected',selected);
    item.setAttribute('aria-pressed',String(selected));
  });
  document.querySelector('.mini-feedback').textContent='Демонстрация интерфейса; запрос не отправляется.';
}));
document.querySelector('.mini-submit')?.addEventListener('click',()=>{
  const service=document.querySelector('[data-mini-service][aria-pressed="true"]').dataset.miniService;
  const time=document.querySelector('[data-mini-time][aria-pressed="true"]').dataset.miniTime;
  document.querySelector('.mini-feedback').textContent=`Вы выбрали «${service}», ${time}. Это прототип — запрос не отправляется.`;
});

const formaNames=['каталог услуг','выбор мастера и времени','предстоящие визиты'];
document.querySelectorAll('[data-forma-screen]').forEach(button=>button.addEventListener('click',()=>{
  const number=Number(button.dataset.formaScreen);
  const image=document.querySelector('.forma-screen');
  image.src=`assets/forma-${number}.webp`;
  image.alt=`Концепция FORMA: ${formaNames[number-1]}`;
  document.querySelectorAll('[data-forma-screen]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
}));

document.querySelectorAll('.task-list input').forEach(input=>input.addEventListener('change',()=>{
  const checked=document.querySelectorAll('.task-list input:checked').length;
  document.querySelector('[data-task-count]').textContent=checked;
  document.querySelector('.task-bar span').style.width=`${checked/3*100}%`;
}));
