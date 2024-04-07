import { get_data} from "./firebase.js"
$(document).ready(function(){
    get_data('dataset').then(function(data) {
    data.forEach(element => {
        var alternative_title = [];
        console.log(element)
        if (element.name.vi != "X"){ alternative_title.push(element.name.vi)};
        if (element.name.en != "X"){ alternative_title.push(element.name.en)};
        if (element.name.jp != "X"){ alternative_title.push(element.name.jp)};
        if (element.name.jp_ro != "X"){ alternative_title.push(element.name.jp_ro)};

        if(alternative_title.length != 0) {$('#list').append(`<a href="`+element.link+`" target="_blank"><li class="in"><strong>`+element.title +`</strong> (`+alternative_title.join(" - ")+`)</li></a>`)}
        
    });
    $('#list').append(`<span class="empty-item">no results</span>`)
    var jobCount = $('ul#list > a').length;
    $('.list-count').text(jobCount + ' items');
})



$("#search-text").keyup(function () {
    //$(this).addClass('hidden');

    var searchTerm = $("#search-text").val();
    var listItem = $('#list').children('li');


    var searchSplit = searchTerm.replace(/ /g, "'):containsi('");

    //extends :contains to be case insensitive
    $.extend($.expr[':'], {
    'containsi': function (elem, i, match, array)
    {
        return (elem.textContent || elem.innerText || '').toLowerCase().
        indexOf((match[3] || "").toLowerCase()) >= 0;
    } });



    $("#list li").not(":containsi('" + searchSplit + "')").each(function (e) {
    $(this).addClass('hiding out').removeClass('in');
    setTimeout(function () {
        $('.out').addClass('hidden');
    }, 300);
    });

    $("#list li:containsi('" + searchSplit + "')").each(function (e) {
    $(this).removeClass('hidden out').addClass('in');
    setTimeout(function () {
        $('.in').removeClass('hiding');
    }, 1);
    });


    var jobCount = $('#list .in').length;
    $('.list-count').text(jobCount + ' items');

    //shows empty state text when no jobs found
    if (jobCount == '0') {
    $('#list').addClass('empty');
    } else
    {
    $('#list').removeClass('empty');
    }

});



/*  
An extra! This function implements
jQuery autocomplete in the searchbox.
Uncomment to use :)


function searchList() {                
//array of list items
var listArray = [];
    $("#list li").each(function() {
var listText = $(this).text().trim();
    listArray.push(listText);
});
    $('#search-text').autocomplete({
    source: listArray
});
    
}
                                
searchList();
*/



});