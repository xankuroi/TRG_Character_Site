//LOAD PAGE
$(document).ready(function() {
  tab_template = $('#tab-template').html();
  content_template = $('#'+ptype+'-template').html();
  overview_template = $('#overview-template').html();
  for (i = 1; i <= numEntities; i++) {
    $('ul').append(tab_template.replace(/##/g, i.toString()));
    $('.container').append(content_template.replace(/##/g, i.toString()));
    $('tbody').append(overview_template.replace(/##/g, i.toString()));
    fill(i);
  }
  setInterval(refresh("Updated!"), 300000);
/*
  $('.overview').css('display', 'block');
  $('#overview').addClass('active');
  */
  $('#id1-content').css('display', 'block'); //TODO switch to overview before pushing final


});

//TAB SELECTION
$(function() {
  $('.tabs').on('click', 'li', function() {
    $(this).addClass('active').siblings().removeClass('active');
    tablinks = document.getElementsByClassName("tab");
    tabcontent = document.getElementsByClassName("content");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tabcontent[$(this).index()].style.display = "block";
  });
});


// Fill in the damn information.
function fill(id) {
  var sheet = id + 5;
  $.getJSON("https://spreadsheets.google.com/feeds/list/"+key+"/" + sheet + "/public/values?alt=json", function(data) {
    /* collect data that shows up multiple times */
    color = data.feed.entry[7]['gsx$type']['$t'];
    name = data.feed.entry[0]['gsx$data']['$t'];
    cp = data.feed.entry[3]['gsx$cp']['$t'];
    totalhp = data.feed.entry[1]['gsx$hp']['$t'];
    currhp = data.feed.entry[0]['gsx$hp']['$t'];
    atk = data.feed.entry[1]['gsx$atk']['$t'];
    def = data.feed.entry[1]['gsx$def']['$t'];
    img = data.feed.entry[4]['gsx$data']['$t'];
    // Apply accent colors
    if(color.toLowerCase()=="dead"){
      color = "gray";
      $("#overview"+id).addClass("accent"+id);
    }
    els = document.getElementsByClassName('accent' + id);
    for (i = 0; i < els.length; i++) {
      els[i].style.color = color;
    }
    //Fill in text fields
    //document.getElementById('id' + id + '-name').innerHTML = name;
    document.getElementById('id' + id + '-tab').innerHTML = name;
    document.getElementById('id' + id + '-name').innerHTML = name;
    document.getElementById('overview'+id+'-name').innerHTML = name;
    $('#overview'+id+'-cp').val(cp);
    document.getElementById('overview'+id+'-hp').innerHTML = currhp.substring(0, currhp.length - 3) + "/" + totalhp;
    document.getElementById('overview'+id+'-atk').innerHTML = atk;
    document.getElementById('overview'+id+'-def').innerHTML = def;
    document.getElementById('id'+id+'-fullname').innerHTML = data.feed.entry[1]['gsx$data']['$t'];
    document.getElementById('id'+id+'-pronouns').innerHTML = data.feed.entry[2]['gsx$data']['$t'];
    document.getElementById('id'+id+'-age').innerHTML = data.feed.entry[3]['gsx$data']['$t'];
    if(img != ""){
      document.getElementById('id'+id+'-image').src = img;
    }
    else{
      document.getElementById('id'+id+'-image').src = "http://placehold.it/200";
    }
    document.getElementById('id'+id+'-partner').innerHTML = data.feed.entry[9]['gsx$data']['$t'];
            /*
    document.getElementById('id'+id+'-personality').innerHTML = data.feed.entry[5]['gsx$data']['$t'];
    document.getElementById('id'+id+'-fee').innerHTML = data.feed.entry[6]['gsx$data']['$t'];
    document.getElementById('id'+id+'-reason').innerHTML = data.feed.entry[7]['gsx$data']['$t'];
    document.getElementById('id'+id+'-appearance').innerHTML = data.feed.entry[8]['gsx$data']['$t'];
    d
    document.getElementById('id'+id+'-mun').innerHTML = data.feed.entry[10]['gsx$data']['$t'];
    document.getElementById('id'+id+'-timezone').innerHTML = data.feed.entry[11]['gsx$data']['$t'];
    document.getElementById('id'+id+'-skype').innerHTML = data.feed.entry[12]['gsx$data']['$t'];
    document.getElementById('id'+id+'-blog').innerHTML = data.feed.entry[13]['gsx$data']['$t'];
    */
    /* Food */
    /*
    for(i = 1; i < 14; i++){
    document.getElementById('id'+id+'-food'+i).innerHTML = data.feed.entry[14+i]['gsx$data']['$t'];
    document.getElementById('id'+id+'-foodn'+i).innerHTML = data.feed.entry[14+i]['gsx$n']['$t'];
    document.getElementById('id'+id+'-foodb'+i).innerHTML = data.feed.entry[14+i]['gsx$b']['$t']
  }
  */
  /*Threads*/
  /*
  for(i = 1; i < 10; i++){
  equip = data.feed.entry[10+i]['gsx$data']['$t'];
  if(!isNaN(Integer.parseInt(equip)))
  {
  document.getElementById('id'+id+'-threadename'+equip).innerHTML = data.feed.entry
}
}
*/
/*Pins*/
/*
for(i = 1; i < 10; i++){
}
*/

});
}

//REFRESH
$(document).ready(function(){
  $(".refresh").click(function(){
    refresh("Updated!");
  });
});
function refresh(message) // TODO refresh button
{
  for (i = 1; i <= numEntities; i++) {
    fill(i);
  }
  toast(message, 1000);
}


//BUTTON LISTENER
var clipboard = new Clipboard('.btn');

function toast(text, time) {
  $('.toast').text(text).fadeIn(200).delay(time).fadeOut(200);
}

clipboard.on('success', function(e) {
  toast("Copied to clipboard!", 1000);
  e.clearSelection();
});

clipboard.on('error', function(e) {
  toast("Click the button again and CTRL+C immediately aftereward to copy your stats!", 4000);
});
//Prevent backspace from taking page back if stuff in input is highlighted
$('textarea[readonly]').keydown(function(event) {
  if (event.which === 8) {
    event.preventDefault();
  }
});
