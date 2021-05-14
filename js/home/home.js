const container = document.querySelector('.container');
const bg = document.getElementById('bg');
const moon = document.getElementById('moon');
const mountain = document.getElementById('mountain');
const man = document.getElementById('road');
const text = document.getElementById('text');
const cloud = document.getElementById('cloud');

window.addEventListener('scroll', function(){     
        var value = window.scrollY;
        bg.style.top = value  * 0.2 + 'px';
        moon.style.left = -value  * 0.8 + 'px';
        mountain.style.top = -value  * 0.01 + 'px';
        man.style.top = value  * 0.2 + 'px';
        text.style.left = value  * 1 + 'px';
        text.style.top = value  * 1 + 'px';
        cloud.style.top = value  * 0.14 + 'px';
});
