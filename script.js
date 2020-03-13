
// active menu

const MENU = document.getElementById('menu');
const anchors = document.querySelectorAll('a[href*="#"]');

MENU.addEventListener('click', (event) => {
    MENU.querySelectorAll('a').forEach(el => el.classList.remove('active'));
    event.target.classList.add('active');
});

// scroll

document.querySelectorAll('a[href^="#"').forEach(link => {

    link.addEventListener('click', function(e) {
        e.preventDefault();
        let href = this.getAttribute('href').substring(1);
        const scrollTarget = document.getElementById(href);
        const topOffset = document.querySelector('.header').offsetHeight;
        const elementPosition = scrollTarget.getBoundingClientRect().top;
        const offsetPosition = elementPosition - topOffset;

        window.scrollBy({
            top: offsetPosition,
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// slider

let items = document.querySelectorAll('.item');
let currentItem = 0;
let isEnabled = true;

function changeCurrentItem(n) {
    currentItem = ( n  + items.length ) % items.length;
}

function hideItem(direction) {
    isEnabled = false;
    items[currentItem].classList.add(direction);
    items[currentItem].addEventListener('animationend', function() {
        this.classList.remove('activated', direction);
    });
}

function showItem(direction) {
    items[currentItem].classList.add('next', direction);
    items[currentItem].addEventListener('animationend', function() {
        this.classList.remove('next', direction);
        this.classList.add('activated');
        isEnabled = true;

    });
}


function previousItem(n) {
    hideItem('to-right');
    changeCurrentItem(n - 1);
    showItem('from-left');
}

function nextItem(n) {
    hideItem('to-left');
    changeCurrentItem(n + 1);
    showItem('from-right');
}

document.querySelector('.control.left').addEventListener('click', function() {
     if (isEnabled) {
         previousItem(currentItem);
     }
    
    });

    document.querySelector('.control.right').addEventListener('click', function() {
        if (isEnabled) {
            nextItem(currentItem);
        }
       
       });

// turn off phone

       let phone = document.querySelector('.transperent');
       let blackScreen = document.querySelector('.iphone-black');

       phone.addEventListener('click', function(){
           blackScreen.classList.toggle('visible');
       });

       let phone2 = document.querySelector('.transperent-2');
       let blackScreen2 = document.querySelector('.iphone-black-2');

       phone2.addEventListener('click', function(){
           blackScreen2.classList.toggle('visible');
       });


   // swiper    
       

   const swipedetect = (el) => {

    let surface = el;
    let startX = 0;
    let startY = 0;
    let distX = 0;
    let distY = 0;
    let dist = 0;


    
    let startTime = 0;
    let elapsedTime = 0;

    let threshold = 150;
    let restraint = 100;
    let allowedTime = 300;


    surface.addEventListener('mousedown', function(e){
        startX = e.pageX;
        startY = e.pageY;
        startTime = new Date().getTime();
        e.preventDefault();
    });

    surface.addEventListener('mouseup', function(e){
		distX = e.pageX - startX;
		distY = e.pageY - startY;
		elapsedTime = new Date().getTime() - startTime;
		if (elapsedTime <= allowedTime){
			if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){
				if ((distX > 0)) {
					if (isEnabled) {
						previousItem(currentItem);
					}
				} else {
					if (isEnabled) {
						nextItem(currentItem);
					}
				}
			}
		}
     
        e.preventDefault();
    });

    surface.addEventListener('touchstart', function(e){
		if (e.target.classList.contains('arrow') || e.target.classList.contains('control')) {
			if (e.target.classList.contains('left')) {
				if (isEnabled) {
					previousItem(currentItem);
				}
			} else if (e.target.classList.contains('right')) {
				if (isEnabled) {
					nextItem(currentItem);
				}
			}
		}

        let touchObj = e.changedTouches[0];
        startX = touchObj.pageX;
        startY = touchObj.pageY;
        startTime = new Date().getTime();
        e.preventDefault();
    });

    surface.addEventListener('touchmove', function(e){
        e.preventDefault();
    });

    surface.addEventListener('touchend', function(e){
        let touchObj = e.changedTouches[0];
		distX = touchObj.pageX - startX;
		distY = touchObj.pageY - startY;
		elapsedTime = new Date().getTime() - startTime;
		if (elapsedTime <= allowedTime){
			if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){
				if ((distX > 0)) {
					if (isEnabled) {
						previousItem(currentItem);
					}
				} else {
					if (isEnabled) {
						nextItem(currentItem);
					}
				}
			}
		}
     
        e.preventDefault();
    });

   }
   let el = document.querySelector('.inner-slider');
   swipedetect(el);