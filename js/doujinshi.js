$(document).ready(function(){
    $.getJSON('../database/doujinshi.json', function(data) {
        data.doujinshi.forEach(element => {
            $(".mySwiper").append(`
            <swiper-slide>
                <div class="preview_d" style="height: 100%; width: 100%;">
                    <div class="content">
                        <div class="content-overlay"></div>
                        <img class="content-image" src="`+element.page[0]+`" style="max-height: 100%; max-width: auto;">
                        <div class="content-details fadeIn-bottom">
                            <a onclick="on('`+element.link+`')"><h3 class="content-title">Nhấp vào đây để đọc tiếp</h3></a>
                            <a href="`+element.link+`"><p class="content-text">Nhấp vào đây để đến bài viết gốc</p></a>
                        </div>
                    </div>
                </div>
            </swiper-slide>
            `)
        })
    })
})

function on(link) {
    $.getJSON('../database/doujinshi.json', function(data) {
        data.doujinshi.forEach(element => {
            if(element.link == link)
            {
                element.page.forEach(ele=>{
                    $(".mySwiper_overlay").append(`<swiper-slide><img src="`+ele+`" style="max-height: 100%;"></swiper-slide>`)
                })
            }
        });
    });
  document.getElementById("overlay").style.display = "block";
}

function off() {
  document.getElementById("overlay").style.display = "none";
  $(".mySwiper_overlay").html("")
}