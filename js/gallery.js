var comic_db = null;
$(document).ready(function(){
    $.getJSON('../database/gallery.json', function(data) {
        $('body').html("")
        $('body').append(`<div class="page-wrapper"><div class="content">`)
        $('.content').append(`<div class="page">`)
            data.photo.forEach(element => {
                $('.page').append(`<div class="item"><img src="https://pbs.twimg.com/media/`+element.link+`"></div>`)
            });             
        
    });
}
)

