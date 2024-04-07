import { get_data} from "./firebase.js"
$(document).ready(function(){
    get_data('dataset').then(function(data) {
    //$.getJSON('../database/gallery.json', function(data) {
        $('#main_dataset_content').html("");
            data.forEach(element => {
                console.log(data)
                $('#main_dataset_content').append(`
                <tr>
                    <td data-label="Link">`+element.link+`</td>
                    <td data-label="Name">`+element.title+`</td>
                    <td data-label="VI_name">`+not_undefined(element.name.vi)+`</td>
                    <td data-label="EN_name">`+not_undefined(element.name.en)+`</td>
                    <td data-label="JP_name">`+not_undefined(element.name.jp)+`</td>
                    <td data-label="JP_Romanized_name">`+not_undefined(element.name.jp_ro)+`</td>
                    <td data-label="Chức năng">
                        <button class="btn-Name" onclick="modify_dataset_data('`+element.id+`')">Sửa</button>
                        <button class="btn-Name" onclick="delete_dataset('`+element.id+`');">Xóa</button>
                    </td>
                </tr>
                `)
            });             
        
    });
}
)

function not_undefined(str){
    if(str !== undefined){return str}
    else return "X"
}

