const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");
// Icons made by Freepik from www.flaticon.com
const BOT_IMG = "https://image.flaticon.com/icons/svg/327/327779.svg";
const PERSON_IMG = "https://image.flaticon.com/icons/svg/145/145867.svg";
const BOT_NAME = "    ChatBot";
const PERSON_NAME = "Bạn";
var JSON_file = null;

$(function() {
    $.getJSON("./database/chatbot.json", function(json) {
        JSON_file = json; // this will show the info it in firebug console
    });

    $('#msger-chat').on('submit', function(event) {
        event.preventDefault();
        if(msgerInput.value != ""){
        appendMessage(PERSON_NAME, PERSON_IMG, "right", msgerInput.value);
        //console.log(get_bot_answer(msgerInput.value,JSON_file.intents));
        var bot_answer_info = get_bot_answer(msgerInput.value,JSON_file.intents);
        if(bot_answer_info.constructor === Array)
        {
        //$('#alert').html('<div class="alert alert-success">Thank you for your message!</div>').show();
        msgerInput.value = "";
        //appendMessage(BOT_NAME, BOT_IMG, "left", response.bot_content);
        appendMessage(BOT_NAME, BOT_IMG, "left", bot_answer_info[1]);
        //Check tag for chatbot
        if(bot_answer_info[0]=="new_anime")
        {
            $.getJSON("./database/anime.json", function(json) {
                if(json.anime !== undefined)
                {
                    json.anime.slice(0,10).forEach(element => {
                        appendMessage(BOT_NAME, BOT_IMG, "left", element.name);
                    });
                }
            });
        }
        else if(bot_answer_info[0]=="new_manga")
        {
            $.getJSON("./database/comic.json", function(json) {
                if(json.manga !== undefined)
                {
                    json.manga.slice(0,10).forEach(element => {
                        appendMessage(BOT_NAME, BOT_IMG, "left", element.name);
                    });
                }
            });
        }
        else if(bot_answer_info[0]=="suggest_anime")
        {
            $.getJSON("./database/anime.json", function(json) {
                if(json.anime !== undefined)
                {
                    var list_anime = json.anime;
                    var list_suggest_anime = [];
                    for (var i = 0; i<5; i++){
                        var get_anime = list_anime[Math.floor(Math.random()*list_anime.length)];
                        list_anime.splice(list_anime.indexOf(get_anime), 1);
                        list_suggest_anime.push(get_anime)
                    }
                    list_suggest_anime.filter(function( element ) {return element !== undefined;}).forEach(element => {
                        appendMessage(BOT_NAME, BOT_IMG, "left", element.name);
                    });
                }
            });
        }
        else if(bot_answer_info[0]=="suggest_manga")
        {
            $.getJSON("./database/comic.json", function(json) {
                if(json.manga !== undefined)
                {
                    var list_manga = json.manga;
                    var list_suggest_manga = [];
                    for (var i = 0; i<5; i++){
                        var get_manga = list_manga[Math.floor(Math.random()*list_manga.length)];
                        list_manga.splice(list_manga.indexOf(get_manga), 1);
                        list_suggest_manga.push(get_manga)
                    }
                    list_suggest_manga.filter(function( element ) {return element !== undefined;}).forEach(element => {
                        appendMessage(BOT_NAME, BOT_IMG, "left", element.name);
                    });
                }
            });
        }
        } else {
        $('#alert').html('<div class="alert alert-danger">' + "Something went wrong" + '</div>').show();
        }
        // $.ajax({
        // url: "{% url 'bot_response' %}",
        // type: 'GET',
        // data: $(this).serialize(),
        // dataType: 'json',
        // success: function(response) {
        //     if (response.success) {
        //     //$('#alert').html('<div class="alert alert-success">Thank you for your message!</div>').show();
        //     msgerInput.value = "";
        //     console.log(response.bot_content)
        //     //appendMessage(BOT_NAME, BOT_IMG, "left", response.bot_content);
        //     appendMessage(BOT_NAME, BOT_IMG, "left", response.bot_content);
        //     } else {
        //     $('#alert').html('<div class="alert alert-danger">' + response.errors + '</div>').show();
        //     }
        // }
        // });
        msgerInput.value = "";}
    });
});

function appendMessage(name, img, side, text) {
var msgHTML =``;
if(name == BOT_NAME)
{
//   Simple solution for small apps
msgHTML = `
    <div class="msg ${side}-msg">
    
    <div class="msg-bubble">
        <div class="msg-info">
        <div class="msg-info-name">${name}</div>
        <div class="msg-info-time">${formatDate(new Date())}</div>
        </div>
        <div class="msg-text">${text}</div>
    </div>
    </div>
        `}
        else
        {
        msgHTML = `<div class="msg ${side}-msg">
            
            <div class="msg-bubble">
            <div class="msg-info">
                <div class="msg-info-name">${name}</div>
                <div class="msg-info-time">${formatDate(new Date())}</div>
            </div>
            <div class="msg-text">${text}</div>
            </div>
        </div>`
        };
msgerChat.insertAdjacentHTML("beforeend", msgHTML);
msgerChat.scrollTop += 500;
}
// Utils
function get(selector, root = document) {
return root.querySelector(selector);
}
function formatDate(date) {
const h = "0" + date.getHours();
const m = "0" + date.getMinutes();
return `${h.slice(-2)}:${m.slice(-2)}`;
}

//Chatbot popup chat
function openChatbot() {
    document.getElementById("popup_chat").style.display = "block";
    document.getElementById("popup_image").style.display = "none";
  }
  
  function closeChatbot() {
    document.getElementById("popup_chat").style.display = "none";
    document.getElementById("popup_image").style.display = "block";
  }