function openNav() {
    document.getElementById("myNav").style.height = "100%";
  }
  
  function closeNav() {
      document.getElementById("myNav").style.height = "0%";
      $('#confirm_btn').text("Xác nhận thêm");
      $("#link").val("");
      $("#title").val("");
      $("#VN").val("");
      $("#EN").val("");
      $("#JP").val("");
      $("#JP_ro").val("");
  }
  $(document).ready(function(){if(window.localStorage.getItem("admin")=== null){window.location.replace('../index.html')}})
  async function add_dataset(data_value) {
    const { set_data } = await import('./firebase.js');
    set_data("dataset", data_value);
  }
  async function get_doc_dataset(data_value) {
    const { get_doc_data } = await import('./firebase.js');
    return get_doc_data("dataset", data_value);
  }
  async function delete_dataset(data_value) {
      const { delete_data } = await import('./firebase.js');
      delete_data('dataset', data_value).then(function(){window.location.reload()});
      }
  function add_dataset_data(id){
      if($("#link").val().trim()!=''){
              if($("#title").val().trim()!=''){
                    var docData = {
                          link: $("#link").val().trim(),
                          name: {
                              en : ($('#EN').val().trim()!='') ? $('#EN').val().trim() : 'X',
                              vi : ($('#VN').val().trim()!='') ? $('#VN').val().trim() : 'X',
                              jp : ($('#JP').val().trim()!='') ? $('#JP').val().trim() : 'X',
                              jp_ro : ($('#JP_ro').val().trim()!='') ? $('#JP_ro').val().trim() : 'X'
                          },
                          title: $("#title").val().trim()
                      };
                      if(id!='')
                      {
                          delete_dataset(id);
                      }
                      add_dataset(docData);
              }else{alert("Vui lòng nhập đường dẫn Anime/Manga")}
            }else{alert("Vui lòng nhập tên tên tựa đề Anime/Manga")} 
  }
  function modify_dataset_data(id){
      get_doc_dataset(id).then(function(data){
          console.log(data)
          $('#confirm_btn').text("Xác nhận sửa");
          $('#confirm_btn').attr("onclick", "add_dataset_data('"+id+"')");
          $("#link").val(data.link);
          $("#title").val(data.title);
          $("#VN").val(data.name.vi!='X' ? data.name.vi : '');
          $("#EN").val(data.name.en!='X' ? data.name.en : '');
          $("#JP").val(data.name.jp!='X' ? data.name.jp : '');
          $("#JP_ro").val(data.name.jp_ro!='X' ? data.name.jp_ro : '');
          document.getElementById("myNav").style.height = "100%";
      })
  }