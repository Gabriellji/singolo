// const MENU = document.getElementById('menu');
// const anchors = document.querySelectorAll('a[href*="#"]');

// MENU.addEventListener('click', (event) => {
//     MENU.querySelectorAll('a').forEach(el => el.classList.remove('active'));
//     event.target.classList.add('active');
// });



;(function() {
	'use strict';
 
})();

 
// обеспечиваем короссбраузерноть для использования встроенного
// в браузеры API requestAnimationFrame
var requestAnimationFrame = window.requestAnimationFrame ||
							window.mozRequestAnimationFrame ||
							window.webkitRequestAnimationFrame ||
							window.msRequestAnimationFrame;
window.requestAnimationFrame = requestAnimationFrame;

 
	// получаем объект menu
var menu = document.querySelector('#menu'),
	// коллекция объектов SPAN, которые используются, как
	// управляющие элементы для прокручивания страницы
	items = menu.querySelectorAll('span'),
	// коллекция объектов DIV, до которых прокручивается страница
    containers = document.querySelectorAll('.wrap');
    
 
var pageHeight = Math.max(
		document.body.scrollHeight, document.documentElement.scrollHeight,
		document.body.offsetHeight, document.documentElement.offsetHeight,
		document.body.clientHeight, document.documentElement.clientHeight
	);

    menu.onclick = function(e) {
        // используя делегирование основанное на всплытии событий,
        // находим элемент SPAN по которому был сделан клик
        if (e.target.tagName != 'SPAN') return;
        // переключаем элемент SPAN в активное состояние и
        // получаем его индекс в составе коллекции 'items'
        var current = switchLinks(e.target);
        // на основании полученного индекса находим DIV из 
        // коллекции 'containers', который и будем прокручивать
        // до верхнего края экрана
        // из этой же функции запускаем скролл страницы
        selectContainer(current);
    }

    function switchLinks(el) {
        var current;
        // перебираем коллекцию элементов SPAN
        [].forEach.call(items, function(item, index) {
            // у каждого элемента удаляем класс 'active',
            // если он был прописан
            item.classList.remove('active');
            // если элемент в текущей итерации совпадает с
            // элементом, по которому был сделан клик, то
            // добавляем ему класс 'active'
            if (item === el) {
                item.classList.add('active');
                // запоминаем индекс этого элемента
                // по этому индексу будет найден DIV из коллекции
                // containers, к которому применим анимацию
                current = index;
            }
        });
        return current;
    }

     
function selectContainer(current) {
	// перебираем коллекцию элементов DIV
	[].forEach.call(containers, function(container, index) {
		// индекс элемента в текущей итерации совпадает
		// с полученным ранее индексом элемента меню, по
		// которому был сделан клик
		if (index == current) {
				// Y-координата верхней границы выбранного элемента относительно
				// верхнего края окна браузера с учётом высоты шапки
			var startY = container.getBoundingClientRect().top -96,
				// направление прокрутки зависит от положения верхней границы контейнера
				// относительно верхней границы окна браузера
				// нужный нам контейнер может находится выше или ниже окна браузера,
				// соответственно, страницу нужно прокручивать вверх или вниз
				// для этого необходимо вычислить коэффициент, от которого будет зависеть
				// направление прокрутки
				direction = (startY < 0) ? -1 : (startY > 0) ? 1 : 0;
			// верхняя граница контейнера, к которому собираемся перейти, находится
			// сразу под шапкой - нет необходимости прокручивать страницу
			if (direction == 0) return;
			// запускаем функцию прокручивания страницы до выбранного контейнера
			scroll(container, direction);
		}
	});
}



function scroll(el, direction) {
    // длительность прокручивания страницы
var duration = 900,
    // старт анимации прокручивания страницы
    start = new Date().getTime();

var fn = function() {
        // текущее положение верхней границы контейнера с учётом высоты шапки с меню
        // при прокрутке контейнер не должен заходить под шапку
    var top = el.getBoundingClientRect().top - 96,
        // время прошедшее от начала прокрутки страницы
        now = new Date().getTime() - start,
        // на сколько должна быть прокручена страница
        result = Math.round(top * now / duration);

    // корректируем значение 'result', чтобы контейнер остановился
    // точно по нижней границе шапки
    result = (result > direction * top) ? top : (result == 0) ? direction : result;

    // определяем есть необходимость прокручивать страницу дальше или нет
    // применение этого условия необходимо, когда высота последнего контейнера
    // меньше высоты экрана и верхняя граница контейнера физически не может
    // достигнуть верхней границы экрана, в нашей вёрстке - это container 6
    // window.pageYOffset - текущая прокрутка страницы
    // document.documentElement.clientHeigh - размер видимой части окна
    if (direction * top > 0 && (pageHeight - window.pageYOffset) > direction * document.documentElement.clientHeight) {
        window.scrollBy(0,result);
        // рекурсивно запускаем функцию анимации прокрутки страницы
        requestAnimationFrame(fn);
    }
}
// старт прокрутки страницы
requestAnimationFrame(fn);
}

















// document.querySelectorAll('a[href*="#"]').addEventListener('click', function(){
//     var scrolled = window.pageYOffset;
//     scrollTop(scrolled,1);
// });

// function scrollTop(endPos,i){
//     setTimeout(function(){
//         if(parseInt(endPos) > 0) {
//             var y = parseInt(endPos) - 5 * parseInt(i);
//             window.scroll(0, 200); //Устанавливаем новую позицию вертикального скрола
//             scrollTop(y,parseInt(i)+2);//Рекурсивный вызов функции
//         }
//     },10000);

// }

// for (let anchor of anchors) {
//   anchor.addEventListener('click', function (e) {
//     e.preventDefault();
//     const blockID = anchor.getAttribute('href').substr(1);
//     document.getElementById(blockID).scrollIntoView({
//       behavior: 'smooth',
//       block: 'start'
//     });
//   });
// };

