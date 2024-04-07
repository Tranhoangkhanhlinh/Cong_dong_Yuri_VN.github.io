var comic_db = null;
var base_img_path ="https://cdn.myanimelist.net/images/anime/";
import {set_data,get_data} from "./firebase.js"
$(document).ready(function(){
    get_data('anime').then(function(data) {
            data.forEach(element => {
            $("#main_content").append(
                `
                <div id="`+element.id+`">
                <button type="button" class="btn-close" aria-label="Close" onclick="delete_database('`+element.id+`')"></button>
                <img src="`+base_img_path+element.cover_art+`">
                <h2>`+element.name+`</h2>
                <p>`+element.description+`</p>
                <p>Số tập: `+element.episode+`</p>
                <button onclick="modify_anime('`+element.id+`')" style="position: absolute;bottom: 0px;width: 100%;">Chinh sửa</button>
                </div>
                `
                
                )   
            });             

    });
}
)

