const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");
// Icons made by Freepik from www.flaticon.com
const BOT_IMG = "https://image.flaticon.com/icons/svg/327/327779.svg";
const PERSON_IMG = "https://image.flaticon.com/icons/svg/145/145867.svg";
const BOT_NAME = "    ChatBot";
const PERSON_NAME = "Bạn";
var JSON_file = null;
async function getJSONAsync() {

    // The await keyword saves us from having to write a .then() block.
    const { get_data } = await import('./firebase.js');

    // The result of the GET request is available in the json variable.
    // We return it just like in a regular synchronous function.
    get_data("chatbot").then(function(data) {localStorage.setItem("chatbot",  JSON.stringify(data))});
    get_data("anime").then(function(data) {localStorage.setItem("anime",  JSON.stringify(data))});
    get_data("manga").then(function(data) {localStorage.setItem("manga",  JSON.stringify(data))});
}

$(function() {
    getJSONAsync().then( function(json) {
        //console.log(JSON.parse(localStorage.getItem("chatbot")));
        JSON_file = JSON.parse(localStorage.getItem("chatbot")); // this will show the info it in firebug console
    });

    $('#msger-chat').on('submit', function(event) {
        event.preventDefault();
        if(msgerInput.value != ""){
        appendMessage(PERSON_NAME, PERSON_IMG, "right", msgerInput.value);
        //console.log(get_bot_answer(msgerInput.value,JSON_file.intents));
        var bot_answer_info = get_bot_answer(msgerInput.value,JSON_file);
        if(bot_answer_info.constructor === Array)
        {
        //$('#alert').html('<div class="alert alert-success">Thank you for your message!</div>').show();
        msgerInput.value = "";
        //appendMessage(BOT_NAME, BOT_IMG, "left", response.bot_content);
        appendMessage(BOT_NAME, BOT_IMG, "left", bot_answer_info[1]);
        //Check tag for chatbot
        if(bot_answer_info[0]=="new_anime")
        {
                if(JSON.parse(localStorage.getItem("anime")) !== undefined)
                {
                    JSON.parse(localStorage.getItem("anime")).slice(0,10).forEach(element => {
                        appendMessage(BOT_NAME, BOT_IMG, "left", element.name);
                    });
                }   
        }
        else if(bot_answer_info[0]=="new_manga")
        {
                if(JSON.parse(localStorage.getItem("manga")) !== undefined)
                {
                    JSON.parse(localStorage.getItem("manga")).slice(0,10).forEach(element => {
                        appendMessage(BOT_NAME, BOT_IMG, "left", element.name);
                    });
                }
        }
        else if(bot_answer_info[0]=="suggest_anime")
        {
                if(JSON.parse(localStorage.getItem("anime")) !== undefined)
                {
                    var list_anime = JSON.parse(localStorage.getItem("anime"));
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
        }
        else if(bot_answer_info[0]=="suggest_manga")
        {
                if(JSON.parse(localStorage.getItem("manga")) !== undefined)
                {
                    var list_manga = JSON.parse(localStorage.getItem("manga"));
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