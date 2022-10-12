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