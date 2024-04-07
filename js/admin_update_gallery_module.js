import { get_data} from "./firebase.js"
$(document).ready(function(){
    get_data('image').then(function(data) {
    //$.getJSON('../database/gallery.json', function(data) {
        $('.gallery').html("");
            data.forEach(element => {
                $('.gallery').append(`
                <div class="gallery-item" style="align-content: center;">
                <div class="content">
                    <div class="content-overlay"></div>
                    <img class="content-image" src="`+element.link_img+`" alt="">
                    <div class="content-details fadeIn-top">
                        <button class="button" style="--color: #00FFFF" onclick="javascript:window.open('`+element.link+`')">Đi đến nguồn ảnh</button><br>
                        <button onclick="delete_image('`+element.id+`')" class="button" style="margin-top: 10px; --color:red">Xóa</button>
                    </div>
                </div>
                </div>
                `)
            });             
        
    });
}
)

