import { get_data} from "./firebase.js"
$(document).ready(function(){
    get_data('image').then(function(data) {
    //$.getJSON('../database/gallery.json', function(data) {
        $('body').html("")
        $('body').append(`<div class="page-wrapper"><div class="content">`)
        $('.content').append(`<div class="page">`)
            data.forEach(element => {
                $('.page').append(`<a href="`+element.link+`" target="_blank"><div class="item"><img src="`+element.link_img+`"></div></a>`)
            });             
        
    });
}
)

