var comic_db = null;
var base_img_path ="https://cdn.myanimelist.net/images/manga/";
import { get_data} from "./firebase.js"
$(document).ready(function(){
    get_data('manga').then(function(data) {
            data.forEach(element => {
            $("ol").append(
                `
                <li style="--bg: url(\'`+base_img_path+element.cover_art+`\'">
                <img src="`+base_img_path+element.cover_art+`" style="max-width:90%;max-height: 300px;margin: auto"  >    
                <h2>`+element.name+`</h2>
                <p>`+element.description+`</p>
                <a href="`+element.link+`" target="_blank" rel="noopener noreferrer"><button class="button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"></path>
                </svg>
                <div class="text">
                  Đọc truyện
                </div>
              </button></a>
                </li>
                `
                
                )   
            });             

    });
}
)

