const editor = ace.edit('editor', {
mode: 'ace/mode/json',
selectionStyle: 'text',
showPrintMargin: false,
theme: 'ace/theme/chrome' });


const formatText = (spacing = 0) => {
try {
    const current = JSON.parse(editor.getValue());
    editor.setValue(JSON.stringify(current, null, spacing));
    editor.focus();
    editor.selectAll();
    document.execCommand('copy');
} catch (err) {
    alert('ERROR: Unable to parse text as JSON');
}
};

editor.on('paste', event => {
try {
    event.text = JSON.stringify(JSON.parse(event.text), null, 4);
} catch (err) {
    // meh
}
});

//   document.getElementById('minify').addEventListener('click', () => formatText());
//   document.getElementById('beautify').addEventListener('click', () => formatText(4));
//# sourceURL=pen.js
    async function set_chatbot(data_value) {
const { set_data } = await import('../js/firebase.js');
return set_data('chatbot', data_value);
}
async function get_chatbot() {
const { get_data } = await import('../js/firebase.js');
return get_data('chatbot');
}
async function delete_chatbot(data_value) {
const { delete_data } = await import('../js/firebase.js');
return delete_data('chatbot', data_value);
}
$(document).ready(function(){
    get_chatbot().then(function(data){
        var tag_chatbot=[]
        data.forEach(element => {
            tag_chatbot.push(element.tag)
        });
        //console.log(data)
        $("#tags").autocomplete({
        source: tag_chatbot,
        position: {my : "right top", at: "right bottom"},
        select: function(e, ui) {
        $('#tags').val(tag_chatbot);}})
        editor.setValue(JSON.stringify(data, null, 4))
    })
    $('#confirm_add_chatbot_data').click(function(){
        if($('#tags').val().trim()!=''){
            var JSON_chatbot = JSON.parse(editor.getValue());
            if($('#chatbot_pattern').val().trim()!='' || $('#chatbot_response').val().trim()!=''){
                var found_tag = false;
                JSON_chatbot.forEach(element=>{
                    if(element.tag == $('#tags').val().trim()){
                        found_tag = true;
                        if($('#chatbot_pattern').val().trim()!=''){
                                    element.patterns.push($('#chatbot_pattern').val().trim())
                                    element.patterns = [...new Set(element.patterns)];
                        }
                        if($('#chatbot_response').val().trim()!=''){
                                    element.responses.push($('#chatbot_response').val().trim())
                                    element.responses = [...new Set(element.responses)];
                            }
                        }
                    })
                    if(found_tag == false){
                        JSON_chatbot.push({
                            "patterns": [$('#chatbot_pattern').val().trim()],
                            "tag": $('#tags').val().trim(),
                            "responses": [$('#chatbot_response').val().trim()],
                            "id": "New_update_so_have_no_id"
                        })
                    }
                editor.setValue(JSON.stringify(JSON_chatbot, null, 4));
                $('#chatbot_pattern').val(""); $('#chatbot_response').val("")
            }else{alert("Vui lòng ít nhất nhập câu nhập của người dùng hoặc câu trả lời của bot")}
        }else{alert("Vui lòng nhập tag cho chatbot")}
    })
    $('#confirm_delete_chatbot_data').click(function(){
        if($('#delete_tag_id').val().trim()!=''){
            delete_chatbot($('#delete_tag_id').val().trim()).then(function(data){window.location.reload()});
        }else{alert('Vui lòng nhập id của tag bạn muốn xóa')}
    })
    $('#update_chatbot').click(function(){
        update_chatbot().then(function(data){document.getElementById("myNav").style.width = "100%";setTimeout(function(){window.location.reload()}, 2000);})
    })
})
async function update_chatbot(){
    JSON.parse(editor.getValue()).forEach(element=>{
        //console.log(element.id)
        if(element.id != "New_update_so_have_no_id"){
            delete_chatbot(element.id).then(function(){
            delete element.id
        set_chatbot(element)
            })}
        else{
        delete element.id
        set_chatbot(element)
        }
    })
    return "Updated"
}