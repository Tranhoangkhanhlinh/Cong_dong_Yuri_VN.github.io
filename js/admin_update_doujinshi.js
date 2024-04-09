async function get_doujinshi() {
    const { get_data } = await import('./firebase.js');
    return get_data("doujinshi");
}
async function add_doujinshi(data_value) {
  const { set_data } = await import('./firebase.js');
  set_data("doujinshi", data_value).then(function(){window.location.reload()});
}
async function delete_doujinshi(data_value) {
  const { delete_data } = await import('./firebase.js');
  delete_data('doujinshi', data_value).then(function(){window.location.reload()});
  }
  $(document).ready(function(){if(window.localStorage.getItem("admin")=== null){window.location.replace('../index.html')}})
  async function get_doc_doujinshi(data_value) {
    const { get_doc_data } = await import('./firebase.js');
    return get_doc_data('doujinshi', data_value);
    }
var swiper = new Swiper(".swiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 3,
      slideShadows: false
    },
    keyboard: {
      enabled: true
    },
    mousewheel: {
      thresholdDelta: 70
    },
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    breakpoints: {
      640: {
        slidesPerView: 2
      },
      768: {
        slidesPerView: 1
      },
      1024: {
        slidesPerView: 2
      },
      1560: {
        slidesPerView: 3
      }
    }
  });

$(document).ready(function(){
    get_doujinshi().then(function(data){
        data.forEach(element => {
            console.log(element)
            swiper.appendSlide(`
            <div class="swiper-slide">
        <img loading="lazy" src="`+if_drive(element.page[0])+`" class="image">
        <div class="overlay_img">
            <div class="text" style="display: grid; ">
                <button class="btn" style="--text_color: white; --bg_color: orange" onclick="javascript:window.open('`+element.link+`')">Đi đến bài viết</button>
                <button onclick="modify_doujinshi_data('`+element.id+`')" class="btn" style="--text_color: white; --bg_color: blue; margin-top: 10px;">Sửa</button>
                <button onclick="delete_doujinshi_data('`+element.id+`')" class="btn" style="--text_color: white; --bg_color: red; margin-top: 10px;">Xóa</button>
            </div>
        </div>
      </div>`)
        })
        swiper.update();
    })
})

function if_drive(str){
    if(str.indexOf("drive.google.com")!= -1){
    return "https://drive.google.com/thumbnail?id="+ str.substring(str.indexOf('file/d/')+7, (str.indexOf('/view?'))) + "&sz=w1000"
    }
    else{
        return str;
    }
}

function openNav() {
    document.getElementById("myNav").style.display = "block";
  }
  
  function closeNav() {
    document.getElementById("myNav").style.display = "none";
    $('.preview').html("");  
    $('.page').html(""); 
    $(".doujinshi_data input").val("");
  }

  function add_doujinshi_data(){
    if($(".doujinshi_data input").val().trim()!=''){
      if($('input[name^=doujinshi_link]').length !=0){
        var list_doujinshi_image = [];
        $('input[name^=doujinshi_link]').each(function(){
          list_doujinshi_image.push($(this).val())
        })
        add_doujinshi({
          link: $(".doujinshi_data input").val().trim(),
          page: list_doujinshi_image
        })
      }else{alert("Vui lòng nhập đường dẫn ảnh")}
			}else{alert("Vui lòng nhập đường dẫn đến bài viết")} 
  }

  function delete_doujinshi_data(id){
    delete_doujinshi(id);
  }

  function modify_doujinshi_data(id){
    get_doc_doujinshi(id).then(function(data){
      console.log(data);
      $(".doujinshi_data input").val(data.link);
      $('.preview').html("");  
      $('.page').html("");  
      data.page.forEach(element => {
        $('.page').append(`
            <div class="doujinshi_data" display="flex">
                    <input value="`+element+`" type="text" name="doujinshi_link[]" required="" style="width: calc(100% - 50px);">
                    <label>Đường dẫn trang `+$('.doujinshi_data').length+`</label>
                    <button onclick="this.parentNode.remove();remove_preview_image_doujinshi()" style="color: white; font-size: 50px">&times;</button>
                  </div>
        `);
        $('.preview').append(`
            <img loading="lazy" src="`+if_drive(element)+`" style="margin: 10px; object-fit: contain;">
        `)
      })
      $('#confirm_doujinshi').text("Xác nhận sửa");
      document.getElementById("myNav").style.display = "block";
    })
  }
  function add_doujinshi_page(){
    $('.page').append(`
        <div class="doujinshi_data" display="flex">
                <input type="text" name="doujinshi_link[]" required="" style="width: calc(100% - 50px);">
                <label>Đường dẫn trang `+$('.doujinshi_data').length+`</label>
                <button onclick="this.parentNode.remove();remove_preview_image_doujinshi()" style="color: white; font-size: 50px">&times;</button>
              </div>
    `)
}
$(function(){
$(document.body).on("change",function(){
    var doujinshi_link = [];    
    $('.preview').html("");        
    $('input[name^=doujinshi_link]').each(function(){
        $('.preview').append(`
        <img src="`+$(this).val()+`" style="margin: 10px; object-fit: contain;">
    `)
    });
    console.log(doujinshi_link);
    return false;
});
});

function remove_preview_image_doujinshi(){
$('.preview').html("");        
    $('input[name^=doujinshi_link]').each(function(){
        $('.preview').append(`
        <img src="`+$(this).val()+`" style="margin: 10px; object-fit: contain;">
    `)
    });
}