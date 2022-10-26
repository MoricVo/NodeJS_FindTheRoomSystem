var swiper = new Swiper(".mySwiper", {
    spaceBetween: 20,
    loop: true,
    autoplay:{
        delay:2500,
        disableOnIneraction: false,
    },
    breakpoints: {
        640:{
            slidePerView: 1,
        },
        768:{
            slidePerView: 2,
        },
        1024:{
            slidePerView: 3,
        },
    },
});

var swiper = new Swiper(".brand-slider", {
    spaceBetween: 20,
    loop: true,
    autoplay:{
        delay:2500,
        disableOnIneraction: false,
    },
    breakpoints: {
        450:{
            slidePerView: 2,
        },
        768:{
            slidePerView: 3,
        },
        991:{
            slidePerView: 4,
        },
        1200:{
            slidePerView: 5,
        },
    },
});