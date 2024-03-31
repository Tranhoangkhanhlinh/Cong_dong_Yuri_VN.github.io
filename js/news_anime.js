var comic_db = null;
var base_img_path ="https://cdn.myanimelist.net/images/anime/";
$(document).ready(function(){
    $.getJSON('../database/anime.json', function(data) {
            data.anime.forEach(element => {
            $("#main").append(
                `
                <div class="card" tabindex="0">
                    <img src="`+base_img_path+element.cover_art+`"/>
                <div class="text">
                    <h2 class="anime_header">`+element.name+`</h2>
                    <p class="anime_des">`+element.description+`</p>
                    <p class="anime_episode">Số tập: `+element.episode+`</p>
                </div>
                </div>
                `
                
                )   
            });             

    });
}
)

