function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();
  
    var costs = new Array();
    for (var i = 0; i <= s1.length; i++) {
      var lastValue = i;
      for (var j = 0; j <= s2.length; j++) {
        if (i == 0)
          costs[j] = j;
        else {
          if (j > 0) {
            var newValue = costs[j - 1];
            if (s1.charAt(i - 1) != s2.charAt(j - 1))
              newValue = Math.min(Math.min(newValue, lastValue),
                costs[j]) + 1;
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
      }
      if (i > 0)
        costs[s2.length] = lastValue;
    }
    return costs[s2.length];
  }

  function similarity(s1, s2) {
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
      longer = s2;
      shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
      return 1.0;
    }
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
  }

  
function get_bot_answer(user_str, data)
{
    var tag = "";
    var max_simi_point = 0;
    var list_answer = [];
    for(var i = 0; i< data.length; i++){
        for(var j = 0; j < data[i].patterns.length; j++)
        {
            //console.log(data[i].patterns[j]);
            var simi_point = similarity(user_str, data[i].patterns[j]);
            if(max_simi_point < simi_point)
            {
                max_simi_point = simi_point;
                tag = data[i].tag;
                list_answer = data[i].responses;
            }
        }
    }
    return [tag, list_answer[Math.floor(Math.random()*list_answer.length)]]
}