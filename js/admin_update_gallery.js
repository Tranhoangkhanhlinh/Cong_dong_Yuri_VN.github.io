async function add_image(data_value) {
    const { set_data } = await import('./firebase.js');
    set_data('image', data_value).then(function(){window.location.reload()});
    }
async function delete_image(data_value) {
    const { delete_data } = await import('./firebase.js');
    delete_data('image', data_value).then(function(){window.location.reload()});
    }
function openNav() {
  document.getElementById("myNav").style.width = "100%";
  document.getElementById("myNav").style.height = "100%";
}

function closeNav() {
  document.getElementById("myNav").style.width = "0%";
  document.getElementById("myNav").style.height = "0%";
  $("#image_preview_link").attr("src","https://dummyimage.com/415x600/333/ccc");
  $("#image_link").val("");
}
$(document).ready(function(){
	$("#image_link").on("input", function() {
          $("#image_preview_link").attr("src",$(this).val());
          if($(this).val() == "")
          {
            $("#image_preview_link").attr("src","https://dummyimage.com/415x600/333/ccc");
          }
        });
})
function add_image_data(){
		if($("#post_link").val().trim()!=''){
			if($("#image_link").val().trim()!=''){
					var docData = {
						link: $("#post_link").val(),
						link_img: $("#image_link").val(),
					};
					add_image(docData);
			}else{alert("Vui lòng nhập đường dẫn đến ảnh")}
			}else{alert("Vui lòng nhập đường dẫn đến bài viết")} 
	}