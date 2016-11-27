//LOAD PAGE
$(document).ready(function() {
  var tab_template = $('#tab-template').html();
  var content_template = $('#'+ptype+'-template').html();
  var overview_template = $('#overview-template').html();
  var cp_template = $('#cp-template').html();
  for (i = 1; i <= numEntities; i++) {
    $('body').append(cp_template.replace(/##/g, i.toString()));
    $('ul').append(tab_template.replace(/##/g, i.toString()));
    $('.container').append(content_template.replace(/##/g, i.toString()));
    $('#ov').append(overview_template.replace(/##/g, i.toString()));
  }
  setInterval(refresh("Updated!"), 300000);
/*
  $('.overview').css('display', 'block');
  $('#overview').addClass('active');
  */
  $('#id1-content').css('display', 'block'); //TODO switch to overview before pushing final
  // Alternatively, add cookies to keep track of which tab person was on


});

//TAB SELECTION
$(function() {
  $('.tabs').on('click', 'li', function() {
    $(this).addClass('active').siblings().removeClass('active');
    var tablinks = document.getElementsByClassName("tab");
    var tabcontent = document.getElementsByClassName("content");
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
    var color = data.feed.entry[7]['gsx$type']['$t'];
    var name = data.feed.entry[0]['gsx$data']['$t'];
    var cp = data.feed.entry[3]['gsx$cp']['$t'];
    var totalhp = data.feed.entry[1]['gsx$hp']['$t'];
    var currhp = data.feed.entry[0]['gsx$hp']['$t'];
    var atk = data.feed.entry[1]['gsx$atk']['$t'];
    var def = data.feed.entry[1]['gsx$def']['$t'];
    var img = data.feed.entry[4]['gsx$data']['$t'];
    // Apply accent colors
    if(color.toLowerCase()=="dead"){
      color = "gray";
      $("#overview"+id).addClass("accent"+id);
    }
    var els = document.getElementsByClassName('accent' + id);
    var bg_els = document.getElementsByClassName('accent'+id+"-bg");
    for (i = 0; i < els.length; i++) {
      els[i].style.color = color;
    }

    //Determine whether to use white or black text
    //Luma value is only an estimate; will require testing
    var rgb = color_convert.to_rgba_array(color);
    var luma = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
    var text_color = "black";
    if(luma <= 125){
      text_color = "white";
    }
    // Fill in background colors and apply appropriate text color
    for (i = 0; i < bg_els.length; i++) {
      bg_els[i].style.background = color;
      bg_els[i].style.color = text_color;
    }
    //Fill in text fields
    //document.getElementById('id' + id + '-name').innerHTML = name;
    document.getElementById('id' + id + '-tab').innerHTML = name;
    document.getElementById('id' + id + '-name').innerHTML = name;
    document.getElementById('ov'+id+'-name').innerHTML = name;
    $('#ov'+id+'-cp').val(cp);
    document.getElementById('ov'+id+'-hp').innerHTML = currhp.substring(0, currhp.length - 3) + "/" + totalhp;
    document.getElementById('ov'+id+'-atk').innerHTML = atk;
    document.getElementById('ov'+id+'-def').innerHTML = def;
    document.getElementById('id'+id+'-fullname').innerHTML = data.feed.entry[1]['gsx$data']['$t'];
    document.getElementById('id'+id+'-pronouns').innerHTML = data.feed.entry[2]['gsx$data']['$t'];
    document.getElementById('id'+id+'-age').innerHTML = data.feed.entry[3]['gsx$data']['$t'];
    if(img != ""){
      document.getElementById('id'+id+'-image').src = img;
    }
    else{
      document.getElementById('id'+id+'-image').src = "http://placehold.it/200";
    }
    document.getElementById('id'+id+'-p').innerHTML = data.feed.entry[9]['gsx$data']['$t'];
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
//COLOR RESOLUTION -- nicked from here:
// https://gist.github.com/njvack/02ad8efcb0d552b0230d
color_convert = function() {
  var pub = {}, canvas, context;
  canvas = document.createElement('canvas');
  canvas.height = 1;
  canvas.width = 1;
  context = canvas.getContext('2d');

  pub.to_rgba_array = function(color) {
    /**
     * Turns any valid canvas fillStyle into a 4-element Uint8ClampedArray with bytes
     * for R, G, B, and A. Invalid styles will return [0, 0, 0, 0]. Examples:
     * color_convert.to_rgb_array('red')  # [255, 0, 0, 255]
     * color_convert.to_rgb_array('#ff0000')  # [255, 0, 0, 255]
     * color_convert.to_rgb_array('garbagey')  # [0, 0, 0, 0]
     */
    // Setting an invalid fillStyle leaves this unchanged
    context.fillStyle = 'rgba(0, 0, 0, 0)';
    // We're reusing the canvas, so fill it with something predictable
    context.clearRect(0, 0, 1, 1);
    context.fillStyle = color;
    context.fillRect(0, 0, 1, 1);
    return context.getImageData(0, 0, 1, 1).data;
  }
  return pub;
}();




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
