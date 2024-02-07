 let isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (
        isMobile.Android() ||
        isMobile.BlackBerry() ||
        isMobile.iOS() ||
        isMobile.Opera() ||
        isMobile.Windows()
      );
    },
  };
  const mobiletouchMenuHandler = () => {
    if (isMobile.any()) {
      document.body.classList.add('touch');
      let submenus = document.querySelectorAll('.sub-menu__list');
      let links = document.querySelectorAll('.header__menu-link-sub');
      const arrows = document.querySelectorAll('.header__arrow');
      for (const link of links) {
        const arrow = link.querySelector('.header__arrow');
        const id = arrow.dataset.subarrow;
        const subMenus = document.querySelectorAll(`.sub-menu__list[data-submenu="${id}"]`);
        link.addEventListener('click', function () {
          let isOpened = false;
          submenus.forEach((curSubMenu) => {
            if (subMenus[0] === curSubMenu && subMenus[0].classList.contains('open')) {
              isOpened = true;
            }
            curSubMenu.classList.remove('open');
          });
          arrows.forEach((curArrow) => curArrow.classList.remove('chosen-menu'))
          links.forEach((curLink) => curLink.classList.remove('chosen-menu'));
          if (isOpened) {
            link.classList.remove('chosen-menu');
            arrow.classList.remove('chosen-menu');
            subMenus[0].classList.remove('open');
            subMenus[1].classList.remove('open');
          } else {
            link.classList.add('chosen-menu');
            arrow.classList.add('chosen-menu');
            subMenus[0].classList.add('open');
            subMenus[1].classList.add('open');
          }
        });
      }
    } else {
      document.body.classList.add('mouse');
    }
  };
  mobiletouchMenuHandler();

document.addEventListener("click", documentActions);

function documentActions(e) {
	const targetElement = e.target;

	if (targetElement.closest('.icon-menu')) {
		document.body.classList.toggle('menu-open');
	}
	if (targetElement.closest('[data-spoller]')) {
		const currentElement = targetElement.closest('[data-spoller]');
		if (!currentElement.nextElementSibling.classList.contains('--sliding')) {
			currentElement.classList.toggle('active');
		}
		slideToggle(currentElement.nextElementSibling);
	}
}

const spollers = document.querySelectorAll('[data-spoller]');

if (spollers.length) {
	spollers.forEach(spoller => {
		spoller.nextElementSibling.hidden = true;
	});
}

let slideDown = (target, duration = 500) => {
	if (!target.classList.contains('--sliding')) {
		target.classList.add('--sliding');
		target.hidden = false;
		let height = target.offsetHeight;

		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;

		target.style.overflow = 'hidden';
		target.style.height = 0;

		target.offsetHeight;

		target.style.transitionProperty = `height, margin, padding`;
		target.style.transitionDuration = `${duration}ms`;

		target.style.height = `${height}px`;

		target.style.removeProperty('padding-top')
		target.style.removeProperty('padding-bottom')
		target.style.removeProperty('margin-bottom')
		target.style.removeProperty('margin-top')

		setTimeout(() => {
			target.style.removeProperty('height')
			target.style.removeProperty('overflow')
			target.style.removeProperty('transition-duration')
			target.style.removeProperty('transition-property')
			target.classList.remove('--sliding');
		}, duration);
	}
}
let slideUp = (target, duration = 500) => {
	if (!target.classList.contains('--sliding')) {
		target.classList.add('--sliding');
		let height = target.offsetHeight;

		target.style.transitionProperty = `height, margin, padding`;
		target.style.transitionDuration = `${duration}ms`;
		target.style.height = `${height}px`;

		target.offsetHeight;

		target.style.overflow = 'hidden';
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;

		target.style.height = 0;

		setTimeout(() => {
			target.style.removeProperty('padding-top')
			target.style.removeProperty('padding-bottom')
			target.style.removeProperty('margin-bottom')
			target.style.removeProperty('margin-top')

			target.style.removeProperty('height')
			target.style.removeProperty('overflow')
			target.style.removeProperty('transition-duration')
			target.style.removeProperty('transition-property')
			target.classList.remove('--sliding');

			target.hidden = true;
		}, duration);
	}
}
let slideToggle = (target, duration = 500) => {
	target.hidden ? slideDown(target, duration) : slideUp(target, duration)
}


// Слайдери
const heroSlider = document.querySelector('.hero');
if (heroSlider) {
	new Swiper('.hero', {
		// Optional parameters
		loop: true,
		autoHeight: true,
		speed: 800,
		parallax: true,

		// If we need pagination
		pagination: {
			el: '.hero__pagination',
			clickable: true
		},
		// Navigation arrows
		navigation: {
			nextEl: '.hero__arrow--next',
			prevEl: '.hero__arrow--prev',
		},
	});
}

// const newSlider = document.querySelector('.new');
// if (newSlider) {
// 	new Swiper('.new__slider', {
// 		// Optional parameters
// 		loop: true,
// 		autoHeight: true,
// 		speed: 800,
// 		spaceBetween: 38,
// 		slidesPerView: 3,
// 		// Navigation arrows
// 		navigation: {
// 			nextEl: '.new__arrow--right',
// 			prevEl: '.new__arrow--left',
// 		},
// 		// Responsive breakpoints
// 		breakpoints: {
// 			// when window width is >= 320px
// 			320: {
// 				slidesPerView: 1.5,
// 				spaceBetween: 15
// 			},
// 			480: {
// 				slidesPerView: 2,
// 				spaceBetween: 15
// 			},
// 			// when window width is >= 480px
// 			650: {
// 				slidesPerView: 3,
// 				spaceBetween: 25
// 			},
// 			// when window width is >= 640px
// 			991: {
// 				slidesPerView: 3,
// 				spaceBetween: 38
// 			}
// 		}
// 	});
// }

$(document).ready(function(){
	$('.slider').slick({
		arrows:true,
		dots:true,
		slidesToShow:3,
		autoplay:true,
		speed:1000,
		autoplaySpeed:800,
		responsive:[
			{
				breakpoint: 768,
				settings: {
					slidesToShow:2
				}
			},
			{
				breakpoint: 550,
				settings: {
					slidesToShow:1
				}
			}
		]
	});
});