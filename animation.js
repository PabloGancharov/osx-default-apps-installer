const width = 320;
const height = 240;
const centerY = height / 2;
const amplitude = height * 0.1;
const speed = 150;
const degrees = 45;

let startTime = 0;
let previousTime = 0;
let pausedTime = 0;
let paused = false;
let canvas, ctx;
let charObjs;

let step1=0;
let step2=40;
let step3=180;
let step4=100;
let step5=0;
let step1inc=1;
let step2inc=10;
let step3inc=-10;
let step4inc=10;
let step5inc=10;

const init = () => {
  canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  ctx = canvas.getContext('2d');

  document.body.appendChild(canvas);
  window.addEventListener('blur', () => {
    if (!paused) {
      paused = true;
      pausedTime = Date.now() - startTime;
    } 
  });
  window.addEventListener('focus', () => {
    if (paused) {
      paused = false;
      startTime = Date.now() - pausedTime;
      animate();
    } 
  });
 
  charObjs = initScrollText('Brought to you by Stargate Team');
  
  startTime = Date.now();
  previousTime = getTime();
  animate();
};

const initScrollText = (text) => {
  ctx.font = 'bold 22px Courier New';
  
  let position = 0;
  
  return text.split('').map((char) => {
    const width = ctx.measureText(char).width;
    const charObj = {
      char,
      width,
      position
    };
    
    position += width;
    return charObj;
  });
};

const getTime = () => {
  return paused 
       ? pausedTime 
       : Date.now() - startTime;
};

const scrollText = (dt) => {
  ctx.fillStyle = 'white';
  
  charObjs.forEach((charObj) => {
    charObj.position -= dt * speed;
    // charObj.position += dt * speed;
    
    // if (charObj.position > width*2) {
    //   charObj.position = -charObj.width;
    // }
    
    if (charObj.position < 0) {
        charObj.position = width*2;
      }

    const y = Math.sin(charObj.position / degrees) * amplitude;
    
    ctx.fillText(charObj.char, charObj.position, centerY + y);
  }); 
};

const animate = () => {
  const now = getTime();
  const dt = (now - previousTime) * 0.001 // delta time in seconds.
  previousTime = now;

  step1 = step1+step1inc;
  step2 = step2+step2inc;
  step3 = step3+step3inc;
  step4 = step4+step4inc;
  step5 = step5+step5inc;

  if (step1>=360) {step1 = 0;};
  if (step2>=200) {step2inc =-1};
  if (step3>=200) {step3inc =-1};
  if (step4>=200) {step4inc =-1};
  if (step5>=200) {step5inc =-1};
  if (step1<=0) {step1inc =+1};
  if (step2<=0) {step2inc =+1};
  if (step3<=0) {step3inc =+1};
  if (step4<=0) {step4inc =+1};
  if (step5<=0) {step5inc =+1};

  var my_gradient=ctx.createLinearGradient(0,0,  0, 200);
  my_gradient.addColorStop(0,'rgb('+step2+', '+step3+', '+step4+')');
  my_gradient.addColorStop(1,'rgb('+step3+', '+0+', '+step2+')');
  
  ctx.fillStyle = my_gradient;
  ctx.fillRect(0, 0, width, height);
  
  scrollText(dt);
  
  if (!paused) {
    requestAnimationFrame(animate);
  }
};

init();