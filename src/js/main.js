const toggleClassMenu = () => {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.menu');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('is-active');
    nav.classList.toggle('mobile-menu');
  });
};

toggleClassMenu();

const fixedHeader = () => {
  const minWidth900 = window.matchMedia('(min-width:900px)');
  const header = document.querySelector('.header-fixed');

  if (window.scrollY > 120) {
    if (minWidth900) {
      header.classList.add('header-fixed--active');
    }
  } else if (minWidth900) {
    header.classList.remove('header-fixed--active');
  }
};

window.addEventListener('scroll', fixedHeader);

const mediaQueryMax499 = window.matchMedia('(max-width:499px)');
const mediaQueryMax899 = window.matchMedia('(min-width:500px) and (max-width:899px)');
const mediaQueryMax1199 = window.matchMedia('(min-width:900px) and (max-width: 1199px)');
const mediaQueryMin1200 = window.matchMedia('(min-width:1200px)');

mediaQueryMax499.offset = 49;
mediaQueryMax899.offset = 66;
mediaQueryMax1199.offset = 74;
mediaQueryMin1200.offset = 90;

const listMediaQuery = [mediaQueryMax499, mediaQueryMax899, mediaQueryMax1199, mediaQueryMin1200];
const hashObj = {
  home: {
    hash: '#home',
  },
  about: {
    hash: '#about',
  },
  services: {
    hash: '#services',
  },
  gallery: {
    hash: '#gallery',
  },
  blog: {
    hash: '#blog',
  },
  contact: {
    hash: '#contact',
  },
};

const navigation = (hashObj) => {
  const menu = document.querySelector('.menu');
  const hamburger = document.querySelector('.hamburger');

  $('.menu-list-item__link').click(function (e) {
    e.preventDefault();
    for (const key in hashObj) {
      if (hashObj.hasOwnProperty(key)) {
        if (this.hash == hashObj[key].hash) {
					if(this.hash == '#home'){
						$('html, body').animate({
							scrollTop: 0
						}, 1000);
					}
					else{
						for (let i = 0; i < listMediaQuery.length; i++) {
							if (listMediaQuery[i].matches) {
								$('html, body').animate({
									scrollTop: $(this.hash).offset().top - listMediaQuery[i].offset,
								}, 1000);
							}
						}
					}

        }
      }
    }
    menu.classList.remove('mobile-menu');
    hamburger.classList.remove('is-active');
  });
};

navigation(hashObj);

const toggleInfo = () => {
  const text = document.querySelector('.about-item-text');

  $('.about-item-header').click(function () {
    $('.about-item-header').removeClass('about-item-header--active');
    $(this).addClass('about-item-header--active');
    $('.about-item-text').addClass('text-hidden');
    $(this).parent().children()[1].classList.remove('text-hidden');
  });
};

toggleInfo();
