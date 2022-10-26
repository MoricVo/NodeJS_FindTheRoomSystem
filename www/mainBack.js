const nav = document.querySelector('.nav')
window.addEventListener('scroll', fixNav)

function fixNav(){
    if(window.scrollY > nav.offsetHeight + 150){
        nav.classList.add('active')
    }else {
        nav.classList.remove('active')
    }
}

let subMenu = document.getElementById('subMenu');

function toggleMenu(){
    subMenu.classList.toggle('open-menu');
}

$(document).ready(function(){
    $('.dropdown').click(function(){
        $('.dropdown-list ul').toggleClass('active')
    })

    $('.dropdown-list ul li').click(function(){
        var text = $(this).html()
        $('.default-option').html(text)
    })

    $(document).on('click', function(event){
        if(!$(event.target).closest('.dropdown').length){
            $('.dropdown-list ul').removeClass('active')
    
        }
    })
})

// with masonry
new Masonry("#posts .grid", {
    itemSelector: '.grid-item',
    gutter:20,
});

//load more

