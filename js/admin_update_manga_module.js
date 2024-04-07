var comic_db = null;
var base_img_path ="https://cdn.myanimelist.net/images/manga/";
import {set_data,get_data} from "./firebase.js"
$(document).ready(function(){
    get_data('manga').then(function(data) {
            data.forEach(element => {
            $("#main_content").append(
                `
                <div class="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-md m-10">
                    <div class="md:shrink-0 self-center">
                        <img class="h-48 w-full object-cover md:h-full md:w-48" src="`+base_img_path+element.cover_art+`">
                    </div>
                    <div class="p-6">
                    <h5 class="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                    `+element.name+`
                    </h5>
                    <p class="block font-sans text-base font-light leading-relaxed text-inherit antialiased h-96 overflow-y-auto">
                    `+element.description+`
                    </p>
                    </div>
                    <div id="manga_id" style="display: none;">`+element.id+`</div>
                    <div class="p-6 pt-0">
                    <button onclick="modify_manga('`+element.id+`')" data-ripple-light="true" type="button" class="select-none rounded-lg bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                        Chỉnh sửa
                    </button>
                    <button onclick="delete_database('`+element.id+`')" data-ripple-light="true" type="button" class="select-none rounded-lg bg-red-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                        Xóa
                    </button>
                    </div>
                </div>
                `
                
                )   
            });             

    });
}
)

