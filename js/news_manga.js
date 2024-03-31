var comic_db = null;
var base_img_path ="https://cdn.myanimelist.net/images/manga/";
$(document).ready(function(){
    $.getJSON('../database/comic.json', function(data) {
            data.manga.forEach(element => {
            $("ol").append(
                `
                <li style="--bg: url(\'`+base_img_path+element.cover_art+`\'">
                <img src="`+base_img_path+element.cover_art+`" style="max-width:90%;max-height: 300px;margin: auto"  >    
                <h2>`+element.name+`</h2>
                    <p>`+element.description+`</p>
                </li>
                `
                
                )   
            });             

    });
}
)
