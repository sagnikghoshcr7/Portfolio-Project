const container = document.querySelector('.container');
const bg = document.getElementById('bg');
const moon = document.getElementById('moon');
const mountain = document.getElementById('mountain');
const man1 = document.getElementById('road1');
const man2 = document.getElementById('road2');
const text1 = document.getElementById('text1');
const text2 = document.getElementById('text2');
const cloud = document.getElementById('cloud');

window.addEventListener('scroll', function(){     
        var value = window.scrollY;
        bg.style.top = value  * 0.2 + 'px';
        moon.style.left = -value  * 0.8 + 'px';
        mountain.style.top = -value  * 0.01 + 'px';
        man1.style.top = value  * 0.2 + 'px';
        man2.style.top = value  * 0.2 + 'px';
        text1.style.left = value  * 1 + 'px';
        text1.style.top = value  * 1 + 'px';
        text2.style.left = value  * 1 + 'px';
        text2.style.top = value  * 1 + 'px';
        cloud.style.top = value  * 0.14 + 'px';
});
              