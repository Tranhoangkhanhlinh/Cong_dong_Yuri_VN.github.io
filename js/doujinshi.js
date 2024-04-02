async function getJSONAsync() {

    // The await keyword saves us from having to write a .then() block.
    const { get_data } = await import('./firebase.js');

    // The result of the GET request is available in the json variable.
    // We return it just like in a regular synchronous function.
    get_data("doujinshi").then(function(data) {localStorage.setItem("doujinshi",  JSON.stringify(data))});
}

const swiper = new Swiper('.swiper-container', {
	pagination: {
		el: '.swiper-pagination',
	},
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
});

$(document).ready(function(){
    getJSONAsync().then(function(){
        JSON.parse(localStorage.getItem("doujinshi")).forEach(element => {
            swiper.appendSlide(`
            <div class="swiper-slide">
                <div class="preview_d" style="height: 100%; width: 100%;align-content: space-around;">
                    <div class="content">
                        <div class="content-overlay"></div>
                        <img class="content-image" src="`+element.page[0]+`" style="max-height: 100%; max-width: 100%; object-fit: cover">
                        <div class="content-details fadeIn-bottom">
                            <a onclick="on('`+element.link+`')"><h3 class="content-title">Nhấp vào đây để đọc tiếp</h3></a>
                            <a href="`+element.link+`" target="_blank"><p class="content-text">Nhấp vào đây để đến bài viết gốc</p></a>
                        </div>
                    </div>
                </div>
            </div>`)
        })
        swiper.update();
    })
})

function on(link) {

        JSON.parse(localStorage.getItem("doujinshi")).forEach(element => {
            if(element.link == link)
            {
                element.page.forEach(ele=>{
                    $(".mySwiper_overlay").append(`<swiper-slide><img src="`+ele+`" style="max-height: 100%; max-width:100%"></swiper-slide>`)
                })
                return;
            }
        });
  document.getElementById("overlay").style.display = "block";
  document.getElementById("swiper_container").style.display = "none";
}
 function off() {
  document.getElementById("overlay").style.display = "none";
  $(".mySwiper_overlay").html("")
  document.getElementById("swiper_container").style.display = "block";
}