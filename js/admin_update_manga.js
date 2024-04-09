function openNav() {
    document.getElementById("myNav").style.width = "100%";
    }
    
    function closeNav() {
    document.getElementById("myNav").style.width = "0%";
    $("#preview_manga_name").text("Tên manga");
    $("#preview_manga_cover_art").attr("src","https://dummyimage.com/415x600/333/ccc")
    $("#preview_manga_des").text("Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam cupiditate explicabo autem voluptatem natus fuga, iste, dicta consectetur qui commodi nemo, quisquam minima doloremque aliquam reiciendis at dolorum eius esse. Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui excepturi accusantium, voluptatem dolorem maiores possimus deleniti rerum adipisci iusto nobis consequatur reiciendis. Alias ipsa modi, ducimus esse molestiae nihil facilis? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum natus libero amet? Alias autem ab commodi iusto enim. Unde eum asperiores nobis odio voluptate, enim culpa sit! Reprehenderit, soluta? Provident. Lorem ipsum dolor sit amet consectetur, adipisicing elit. A ducimus sunt consectetur quis ratione sapiente suscipit ullam aliquam inventore. Delectus eligendi numquam nisi at rem quia aliquam. Quaerat, magnam nemo! Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque fugit dolorem totam numquam culpa quo quos itaque similique in ratione incidunt recusandae perferendis dolore hic porro enim, obcaecati cumque ipsum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias amet atque delectus quia a labore, repellendus nemo inventore cumque fugit ea voluptas voluptates laborum! Praesentium, culpa qui! Ratione, maiores reprehenderit.");
    $("#preview_manga_link").text("Số tập: XX")
    $("#manga_name").val("");
    $("#manga_cover_art").val("")
    $("#manga_des").val("");
    $("#manga_link").val("");
    $("#manga_id").val("");
    $("#add_update_manga_data").text("Xác nhận thêm");
    $("#add_update_manga_data").attr("onclick","add_update_manga_data('')");
    }
    async function add_firebase(data_value) {
    const { set_data } = await import('./firebase.js');
    set_data('manga', data_value).then(function(){window.location.reload()});
    }
    async function delete_firebase(data_value) {
    const { delete_data } = await import('./firebase.js');
    delete_data('manga', data_value).then(function(){window.location.reload()});
    }
    async function get_firebase(data_value) {
    const { get_doc_data } = await import('./firebase.js');
    return get_doc_data('manga', data_value);
    }      
    $(document).ready(function(){
      $("#manga_name").on("input", function() {
              $("#preview_manga_name").text($(this).val());
              if($(this).val() == "")
              {
                $("#preview_manga_name").text("Tên manga");
              }
            });
            $("#manga_cover_art").on("input", function() {
              $("#preview_manga_cover_art").attr("src",$(this).val());
              if($(this).val() == "")
              {
                $("#preview_manga_cover_art").attr("src","https://dummyimage.com/415x600/333/ccc");
              }
            });
            $("#manga_des").on("input", function() {
              $("#preview_manga_des").text($(this).val());
              if($(this).val() == "")
              {
                $("#preview_manga_des").text("Mô tả của manga");
              }
            });
            $("#manga_link").on("input", function() {
              $("#preview_manga_link").html("<strong>Đường dẫn:</strong> " + $(this).val());
              if($(this).val() == "")
              {
                $("#preview_manga_link").html("<strong>Đường dẫn:</strong> XX");
              }
            });
    })
    $(document).ready(function(){if(window.localStorage.getItem("admin")=== null){window.location.replace('../index.html')}})
    function add_update_manga_data(id){
          if(id!=""){
            delete_firebase(id)
          }
          if($("#manga_name").val().trim()!=''){
                if($("#manga_cover_art").val().trim()!=''){
                  if($("#manga_des").val().trim()!=''){
                    if($("#manga_link").val().trim()!=''){
                      var docData = {
                            cover_art: $("#manga_cover_art").val().substring($("#manga_cover_art").val().indexOf('manga/')+5),
                            description: $("#manga_des").val(),
                            link: $("#manga_link").val(),
                            name: $("#manga_name").val(),
                        };
                      add_firebase(docData);
                    }else{alert("Vui lòng nhập đường dẫn")}
                  }else{alert("Vui lòng nhập mô tả")}
                }else{alert("Vui lòng nhập đường dẫn đến ảnh bìa")}
              }else{alert("Vui lòng nhập tên manga")} 
        }
      function delete_database(id){
        delete_firebase(id)
      }
      function modify_manga(id){
          //console.log(id)
          get_firebase(id).then(function(data){
            $("#preview_manga_name").text(data.name);
            $("#preview_manga_cover_art").attr("src","https://cdn.myanimelist.net/images/manga/"+data.cover_art)
            $("#preview_manga_des").text(data.description);
            $("#preview_manga_link").html("<strong>Đường dẫn:</strong> "+data.link)
            $("#manga_name").val(data.name);
            $("#manga_cover_art").val("https://cdn.mymangalist.net/images/manga/"+data.cover_art)
            $("#manga_des").val(data.description);
            $("#manga_link").val(data.link);
            $("#add_update_manga_data").attr("onclick","add_update_manga_data('"+data.id+"')");
          })
          $("#add_update_manga_data").text("Xác nhận sửa");
          document.getElementById("myNav").style.width = "100%";
        }