let images = [
    'url("js/skills/1.png")',
    'url("js/skills/2.png")',
    'url("js/skills/3.png")',
    'url("js/skills/4.png")',
    'url("js/skills/5.png")',
    'url("js/skills/6.png")',
    'url("js/skills/7.png")',
    'url("js/skills/8.png")',
    'url("js/skills/9.png")',
    'url("js/skills/10.png")',
    'url("js/skills/11.png")',
    'url("js/skills/12.png")',
    'url("js/skills/13.png")',
    'url("js/skills/14.png")',
    'url("js/skills/15.png")',
    'url("js/skills/16.png")',
    'url("js/skills/17.png")',
    

];

function dropImage(){
    let section = document.querySelector('.sets')
    let drop = document.createElement('span')
    //drop.style.left = Math.random() * innerWidth + 'px';
    drop.style.top = Math.random() * innerHeight + 'px';

    let bg = images[Math.floor(Math.random() * images.length)];

    let size = Math.random() * 200;
    drop.style.width = 50 + size + 'px';
    drop.style.height = 50 + size + 'px';
    drop.style.backgroundImage = bg;
    section.appendChild(drop);
    console.log("I am working")

    setInterval(() => {
        drop.remove();
    }, 6000);
}
setInterval(dropImage, 50);