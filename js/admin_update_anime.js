async function setJSONAsync(data_value) {
    const { set_data } = await import('./firebase.js');
    set_data('anime', data_value).then(function(){window.location.reload()});
    }
    async function delete_firebase(data_value) {
    const { delete_data } = await import('./firebase.js');
    delete_data('anime', data_value).then(function(){window.location.reload()});
    }
    async function get_firebase(data_value) {
    const { get_doc_data } = await import('./firebase.js');
    return get_doc_data('anime', data_value);
    }
    $(document).ready(function(){if(window.localStorage.getItem("admin")=== null){window.location.replace('../index.html')}})
    $(document).ready(function(){
        $("#confirm_add").on('click', function(){
            add_update_anime($("#anime_id").val())
        })
        $('#toggle').click(function() {
          $("#preview_anime_name").text("Tên Anime");
          $("#preview_anime_cover_art").attr("src","https://dummyimage.com/415x600/333/ccc")
          $("#preview_anime_des").text("Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veniam cupiditate explicabo autem voluptatem natus fuga, iste, dicta consectetur qui commodi nemo, quisquam minima doloremque aliquam reiciendis at dolorum eius esse. Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui excepturi accusantium, voluptatem dolorem maiores possimus deleniti rerum adipisci iusto nobis consequatur reiciendis. Alias ipsa modi, ducimus esse molestiae nihil facilis? Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolorum natus libero amet? Alias autem ab commodi iusto enim. Unde eum asperiores nobis odio voluptate, enim culpa sit! Reprehenderit, soluta? Provident. Lorem ipsum dolor sit amet consectetur, adipisicing elit. A ducimus sunt consectetur quis ratione sapiente suscipit ullam aliquam inventore. Delectus eligendi numquam nisi at rem quia aliquam. Quaerat, magnam nemo! Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque fugit dolorem totam numquam culpa quo quos itaque similique in ratione incidunt recusandae perferendis dolore hic porro enim, obcaecati cumque ipsum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias amet atque delectus quia a labore, repellendus nemo inventore cumque fugit ea voluptas voluptates laborum! Praesentium, culpa qui! Ratione, maiores reprehenderit.");
          $("#preview_anime_episode").text("Số tập: XX")
          $("#anime_name").val("");
          $("#anime_cover_art").val("")
          $("#anime_des").val("");
          $("#anime_episode").val("");
          $("#anime_id").val("")
          $(this).toggleClass('active');
          $('#overlay').toggleClass('open');
        });
        $("#add_data_btn").click(function() { 
          if ($("#add_data_btn").html() == "Hủy Thêm dữ liệu<span></span>") { 
              $("#add_data_btn").html("Thêm dữ liệu<span></span>"); 
          } else { 
          if ($("#add_data_btn").html() == "Chỉnh sửa dữ liệu<span></span>") { 
              $("#add_data_btn").html("Thêm dữ liệu<span></span>"); 
          } else { 
              $("#add_data_btn").html("Hủy Thêm dữ liệu<span></span>"); 
          }; 
        }
      });
        $("#anime_name").on("input", function() {
          $("#preview_anime_name").text($(this).val());
          if($(this).val() == "")
          {
            $("#preview_anime_name").text("Tên Anime");
          }
        });
        $("#anime_cover_art").on("input", function() {
          $("#preview_anime_cover_art").attr("src",$(this).val());
          if($(this).val() == "")
          {
            $("#preview_anime_cover_art").attr("src","https://dummyimage.com/415x600/333/ccc");
          }
        });
        $("#anime_des").on("input", function() {
          $("#preview_anime_des").text($(this).val());
          if($(this).val() == "")
          {
            $("#preview_anime_des").text("Mô tả của anime");
          }
        });
        $("#anime_episode").on("input", function() {
          $("#preview_anime_episode").text("Số tập: " + $(this).val());
          if($(this).val() == "")
          {
            $("#preview_anime_episode").text("Số tập: XX");
          }
        });
    })
    
    function modify_anime(id){
      //console.log(id)
      get_firebase(id).then(function(data){
        $("#preview_anime_name").text(data.name);
        $("#preview_anime_cover_art").attr("src","https://cdn.myanimelist.net/images/anime/"+data.cover_art)
        $("#preview_anime_des").text(data.description);
        $("#preview_anime_episode").text("Số tập: "+data.episode)
        $("#anime_name").val(data.name);
        $("#anime_cover_art").val("https://cdn.myanimelist.net/images/anime/"+data.cover_art)
        $("#anime_des").val(data.description);
        $("#anime_episode").val(data.episode);
        $("#anime_id").val(data.id)
      })
      $("#toggle").toggleClass('active');
      $('#overlay').toggleClass('open');
      $("#add_data_btn").html("Chỉnh sửa dữ liệu<span></span>");
    }
    
    function delete_database(id){
      delete_firebase(id)
    }
    
    function add_update_anime(id){
      if(id!=""){
        delete_firebase(id)
      }
      if($("#anime_name").val().trim()!=''){
            if($("#anime_cover_art").val().trim()!=''){
              if($("#anime_des").val().trim()!=''){
                if($("#anime_episode").val().trim()!=''){
                  var docData = {
                        cover_art: $("#anime_cover_art").val().substring($("#anime_cover_art").val().indexOf('anime/')+5),
                        description: $("#anime_des").val(),
                        episode: $("#anime_episode").val(),
                        name: $("#anime_name").val(),
                    };
                  setJSONAsync(docData);
                }else{alert("Vui lòng nhập số tập")}
              }else{alert("Vui lòng nhập mô tả")}
            }else{alert("Vui lòng nhập đường dẫn đến ảnh bìa")}
          }else{alert("Vui lòng nhập tên anime")} 
    }