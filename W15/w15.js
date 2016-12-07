var count = 0;
/* Templates */
var overview_template = '<tr>\
<td class="alignleft"><span class="accent##">&block;&ensp;</span><span id="ov##-name">Loading...</span></td>\
<td><span id="ov##-hp"></span><span class="shrink"> HP</span></td>\
<td><span id="ov##-atk"></span><span class="shrink"> ATK</span></td>\
<td><span id="ov##-def"></span><span class="shrink"> DEF</span></td>\
<td><button class="btn noshadow" data-clipboard-target="#ov##-cp">\
<i class="fa fa-clipboard accent##" aria-hidden="true" title="Stat C/P"></i>\
</button></td></tr>';
var tab_template = '<li id="id##"><a href="#" class="tab accent##" id="id##-tab">Loading...</a></li>';
var cp_template = '<textarea rows="1" type="hidden" readonly="true" class="cp-target" id="ov##-cp" value="LOADING..."></textarea>';
var noisecp_template = '<textarea rows="1" type="hidden" readonly="true" class="cp-target" id="noise##-cp" value="LOADING..."></textarea>';
var munfo_template = '<div class="tooltip">\
<i class="fa fa-ICONID accent##" aria-hidden="true" title="TYPE"></i>\
<div class="tooltiptext sal">???</div></div>';
var food_template = '<tr><td>FOOD</td><td>BOOSTS</td><td>HEAL</td><td>QUANTITY</td></tr>';
var pin_template = '<tr><td class="smal scol">ID</td><td class="w100">PIN</td>\
<td class="w50">ATK</td><td class="w300">EFFECT</td></tr>';
var thread_template = '<tr><td class="smal scol">ID</td><td class="w120">THREAD</td><td class="smal scol">TYPE</td>\
<td class="smal w120">STATS</td><td class="w300">EFFECT</td><td class="smal w50">BRV</td></tr>';
var swag_template = '<tr><td class="swegl">SWAG</td><td class="swegr">DESC</td></tr>';
var hover_template = '<div class="tooltip">BASE<span class="tooltiptext toptt">HOVERTEXT</span></div>';
var maxdef_template = 'DEF<div class="tooltip"><sup><i class="fa fa-info-circle" aria-hidden="true" alt="MAXDEF"></i></sup><span class="tooltiptext toptt">MAXDEF</span></div>';

//LOAD PAGE
$(document).ready(function() {
  updateHeight();
  var content_template = $('#'+ptype+'-template').html();
  for (var i = 0; i < numEntities; i++) {
    var istr = i.toString();
    $('body').append(cp_template.replace(/##/g, istr));
    if(ptype == "reaper"){
      $('body').append(noisecp_template.replace(/##/g, istr));
    }
    $('ul').append(tab_template.replace(/##/g, istr));
    $('.container').append(content_template.replace(/##/g, istr));
    $('#ov').append(overview_template.replace(/##/g, istr));
  }
  setInterval(refresh("Loaded!"), 300000);

  $('.overview').css('display', 'block');
  $('#overview').css('border-bottom', 'solid')
  $('#ovli').addClass('active');
});

//TAB SELECTION
$(function() {
  $('.tabs').on('click', 'li', function() {
    $(this).addClass('active').siblings().removeClass('active');
    var tablinks = document.getElementsByClassName("tab");
    var tabcontent = document.getElementsByClassName("content");
    for(var i = 0; i < tablinks.length; i++){
      tablinks[i].style.borderBottom = "hidden";
    }
    for (var i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tabcontent[$(this).index()].style.display = "block";
    tablinks[$(this).index()].style.borderBottom = "solid";
  });
});


// Fill in the damn information.
function fill(id, message) {
  var sheet = id + 7;
  $.getJSON("https://spreadsheets.google.com/feeds/list/"+key+"/" + sheet + "/public/values?alt=json", function(data) {
    /* collect data that shows up multiple times */
    var color = data.feed.entry[7]['gsx$type']['$t'];
    var name = data.feed.entry[0]['gsx$data']['$t'];
    var cp = data.feed.entry[3]['gsx$cp']['$t'];
    var totalhp = trim(data.feed.entry[1]['gsx$hp']['$t'], 3);
    var currhp = trim(data.feed.entry[0]['gsx$hp']['$t'], 3);
    var atk = trim(data.feed.entry[1]['gsx$atk']['$t'], 4);
    var def = trim(data.feed.entry[1]['gsx$def']['$t'], 4);
    var img = data.feed.entry[4]['gsx$data']['$t'];
    var part = data.feed.entry[9]['gsx$data']['$t'];
    if(color.toLowerCase()=="dead"){
      color = "gray";
      $("#overview"+id).addClass("accent"+id);
      name += " (erased)";
    }
    //Fill in text fields
    /* Tab */
    document.getElementById('id' + id + '-tab').innerHTML = name;
    /* Overview */
    document.getElementById('ov'+id+'-name').innerHTML = name;
    $('#ov'+id+'-cp').val(cp);
    document.getElementById('ov'+id+'-hp').innerHTML = currhp + "/" + totalhp;
    document.getElementById('ov'+id+'-atk').innerHTML = atk;
    document.getElementById('ov'+id+'-def').innerHTML = def;

    /* Top card */
    if(img != ""){
      document.getElementById('id'+id+'-image').src = img;
      document.getElementById('id'+id+'-imagecpy').src = img;
      $('#id'+id+'-imagecpy').addClass("accent"+id+"-out");
    }
    else{
      document.getElementById('id'+id+'-image').src = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Placeholder_no_text.svg/200px-Placeholder_no_text.svg.png";
      $('#id'+id+'-imagecpy').removeClass("accent"+id+"-out");
    }
    document.getElementById('id' + id + '-name').innerHTML = name;
    document.getElementById('id'+id+'-fullname').innerHTML = data.feed.entry[1]['gsx$data']['$t'];
    document.getElementById('id'+id+'-pronouns').innerHTML = data.feed.entry[2]['gsx$data']['$t'];
    document.getElementById('id'+id+'-age').innerHTML = data.feed.entry[3]['gsx$data']['$t'];
    document.getElementById('id'+id+'-part').innerHTML = part;
    /* Stats */
    document.getElementById('id'+id+'-currhp').innerHTML = currhp;
    document.getElementById('id'+id+'-totalhp').innerHTML = totalhp;
    document.getElementById('id'+id+'-rawhp').innerHTML = trim(data.feed.entry[2]['gsx$hp']['$t'], 3);
    document.getElementById('id'+id+'-thrdhp').innerHTML = trim(data.feed.entry[3]['gsx$hp']['$t'], 3);
    document.getElementById('id'+id+'-mischp').innerHTML = trim(data.feed.entry[4]['gsx$hp']['$t'], 3);
    document.getElementById('id'+id+'-totalatk').innerHTML = atk;
    document.getElementById('id'+id+'-rawatk').innerHTML = trim(data.feed.entry[2]['gsx$atk']['$t'], 4);
    document.getElementById('id'+id+'-thrdatk').innerHTML = trim(data.feed.entry[3]['gsx$atk']['$t'], 4);
    document.getElementById('id'+id+'-miscatk').innerHTML = trim(data.feed.entry[4]['gsx$atk']['$t'], 4);
    document.getElementById('id'+id+'-totaldef').innerHTML = def;
    document.getElementById('id'+id+'-rawdef').innerHTML = trim(data.feed.entry[2]['gsx$def']['$t'], 4);
    document.getElementById('id'+id+'-thrddef').innerHTML = trim(data.feed.entry[3]['gsx$def']['$t'], 4);
    document.getElementById('id'+id+'-miscdef').innerHTML = trim(data.feed.entry[4]['gsx$def']['$t'], 4);
    if(ptype == 'reaper'){
      if(part == 'Active Reaper' || part == 'Support Reaper'){
        document.getElementById('id'+id+'-maxdef').innerHTML = maxdef_template.replace(/MAXDEF/g, "MAX 30 DEF");
      }
      else if(part == 'Composer' || part == 'Producer'){
        document.getElementById('id'+id+'-maxdef').innerHTML = "DEF";
      }
      else{
        document.getElementById('id'+id+'-maxdef').innerHTML = maxdef_template.replace(/MAXDEF/g, "MAX 35 DEF");
      }
    }
    /* Currency */
    document.getElementById('id'+id+'-yen').innerHTML = data.feed.entry[7]['gsx$hp']['$t'];
    document.getElementById('id'+id+'-rpp').innerHTML = data.feed.entry[8]['gsx$hp']['$t'];
    document.getElementById('id'+id+'-brv').innerHTML = data.feed.entry[7]['gsx$def']['$t'];
    document.getElementById('id'+id+'-syncbp').innerHTML = data.feed.entry[8]['gsx$def']['$t'];
    /* About */
    document.getElementById('id'+id+'-personality').innerHTML = data.feed.entry[5]['gsx$data']['$t'];
    if(ptype == "player"){
      document.getElementById('id'+id+'-fee').innerHTML = data.feed.entry[6]['gsx$data']['$t'];
      document.getElementById('id'+id+'-reason').innerHTML = data.feed.entry[7]['gsx$data']['$t'];
    }
    document.getElementById('id'+id+'-appearance').innerHTML = data.feed.entry[8]['gsx$data']['$t'];
    /* Mun Information */
    document.getElementById('id'+id+'-munfo').innerHTML = "";
    var mun = data.feed.entry[10]['gsx$data']['$t'];
    var zone = data.feed.entry[11]['gsx$data']['$t'];
    var skype = data.feed.entry[12]['gsx$data']['$t'];
    var blog = data.feed.entry[13]['gsx$data']['$t'];
    mun_template = munfo_template.replace(/##/g, id);
    var entries = new Array(4);
    entries[0] = mun_template.replace("ICONID", "user");
    entries[0] = entries[0].replace("TYPE", "Mun ");
    entries[1] = mun_template.replace("ICONID", "clock-o");
    entries[1] = entries[1].replace("TYPE", " Timezone");
    if(mun != ""){
      entries[0] = entries[0].replace("???", mun);
    }
    if(zone != ""){
      entries[1] = entries[1].replace("???", zone);
    }
    if(skype != ""){
      entries[2] = mun_template.replace("ICONID", "skype");
      entries[2] = entries[2].replace("TYPE", " Skype");
      entries[2] = entries[2].replace("???", skype);
    }
    if(blog != ""){
      entries[3] = mun_template.replace("ICONID", "tumblr-square");
      entries[3] = entries[3].replace("TYPE", " Blog");
      if(blog.indexOf(".") != -1){
        var index = blog.indexOf('.');
        blog = blog.substring(0, index);
      }
      entries[3] = entries[3].replace("???", blog);
      entries[3] = entries[3].replace("<i", "<a href='http://"+blog+".tumblr.com' target='_blank'><i");
      entries[3] = entries[3].replace("</i>", "</i></a>");
    }
    for(var i = 0 ; i < 4; i++){
      $('#id'+id+'-munfo').append(entries[i]);
    }
    /* Food */
    $("#id"+id+"-food tr").remove();
    for(var i = 0; i < 13; i++){
      var food = data.feed.entry[15+i]['gsx$data']['$t'];
      var quantity = data.feed.entry[15+i]['gsx$n']['$t'];
      if(food != "" && quantity != "")
      {
        var healio = data.feed.entry[7+i]['gsx$heal']['$t'];
        healio = healio.replace("HP", "<span class='rink'>HP</span>");
        var entry = food_template.replace("FOOD", food);
        entry = entry.replace("BOOSTS", prep(data.feed.entry[15+i]['gsx$b']['$t']));
        entry = entry.replace("QUANTITY", quantity);
        entry = entry.replace("HEAL", healio);
        $('#id'+id+'-food').append(entry);
      }
    }
    /* Pins and Threads and Swag */
    // Clear out the current tables
    $("#id"+id+"-tinventory tr").remove();
    $("#id"+id+"-pinventory tr").remove();
    $("#id"+id+"-threquip tr").remove();
    $("#id"+id+"-pinquip tr").remove();
    $("#id"+id+"-swag tr").remove();
    var equipped_threads = new Array(4);
    var equipped_pins = new Array(6);
    for(var i = 0; i < 9; i++){
      //Pins
      var pid = data.feed.entry[11+i]['gsx$id']['$t'];
      if(pid != ""){
        var equipslot = data.feed.entry[11+i]['gsx$e']['$t'];
        var entry = pin_template.replace("ID", pid);
        entry = entry.replace("PIN", data.feed.entry[11+i]['gsx$name']['$t']);
        entry = entry.replace("ATK", data.feed.entry[11+i]['gsx$atk']['$t']);
        entry = entry.replace("EFFECT", data.feed.entry[11+i]['gsx$effect']['$t']);
        var track = 0;
        if(data.feed.entry[11+i]['gsx$def']['$t'].indexOf("y") != -1){//res pin boost
          var saa = hover_template.replace("BASE", "<sup class='uline accent"+id+"'><i class='fa fa-chevron-circle-up' aria-hidden='true'></i></sup>");
          saa = saa.replace("HOVERTEXT", "Boosted by resonance pin!");
          entry = entry.replace(" ATK", saa+" ATK");
          track++;
        }
        if(data.feed.entry[11+i]['gsx$hp']['$t'].indexOf("y") != -1){//CD boost
          var saa = hover_template.replace("BASE", "<sup class='uline accent"+id+"'><i class='fa fa-play-circle-o' aria-hidden='true'></i></sup>");
          saa = saa.replace("HOVERTEXT", "Boosted by CD!");
          entry = entry.replace(" ATK", saa+" ATK");
          track++;
        }
        if(track == 2){
          entry = entry.replace('<div class="tooltip"', '<div class="line"><div class="tooltip"');
          entry = entry.replace(" ATK", "</div> ATK");
        }
        if(equipslot == ""){ //not equipped; put it in the inventory
          $('#id'+id+'-pinventory').append(entry);
        }
        else{ // equip it
          equipped_pins[parseInt(equipslot)] = entry;
        }
      }
      //Threads and Swag
      if(i < 7){
        //Threads
        var eid = data.feed.entry[21+i]['gsx$id']['$t'];
        if(eid != ""){
          var equipslot = data.feed.entry[21+i]['gsx$e']['$t'];
          var entry = thread_template.replace("ID", eid);
          entry = entry.replace("THREAD", data.feed.entry[21+i]['gsx$name']['$t']);
          entry = entry.replace("TYPE", thread_type(data.feed.entry[21+i]['gsx$type']['$t']));
          entry = entry.replace("EFFECT", data.feed.entry[21+i]['gsx$effect']['$t']);
          var ehp = data.feed.entry[21+i]['gsx$hp']['$t'];
          var eatk = data.feed.entry[21+i]['gsx$atk']['$t'];
          var edef = data.feed.entry[21+i]['gsx$def']['$t'];
          entry = entry.replace("STATS", stat(ehp, eatk, edef));
          entry = entry.replace("BRV", data.feed.entry[21+i]['gsx$cp']['$t'] + " BRV");
          if(data.feed.entry[21+i]['gsx$equip']['$t'] == "no"){
            var saa = hover_template.replace("BASE", "<sup class='uline accent"+id+"'><i class='fa fa-times' aria-hidden='true'></i></sup>");
            saa = saa.replace("HOVERTEXT", "Not enough BRV!");
            entry = entry.replace(" BRV", saa+" BRV");
          }
          if(equipslot == ""){ //not equipped; put it in the inventory
            $('#id'+id+'-tinventory').append(entry);
          }
          else{ //equip it
            equipped_threads[parseInt(equipslot)] = entry;
          }
        }
        var sweg = data.feed.entry[29+i]['gsx$b']['$t'];
        if(sweg != ""){
          var entry = swag_template.replace("SWAG", sweg);
          entry = entry.replace("DESC", data.feed.entry[29+i]['gsx$data']['$t']);
          $("#id"+id+"-swag").append(entry);
        }
      }
    }

    /* Equip */
    for(var i = 0; i < equipped_pins.length; i++){
      $('#id'+id+'-pinquip').append(equipped_pins[i]);
    }
    for(var i = 0; i < equipped_threads.length; i++){
      $('#id'+id+'-threquip').append(equipped_threads[i]);
    }

    $("#empty"+id+"-food").removeClass("blenk").html("");
    $("#empty"+id+"-tinventory").removeClass("blenk").html("");
    $("#empty"+id+"-pinventory").removeClass("blenk").html("");
    $("#empty"+id+"-threquip").removeClass("blenk").html("");
    $("#empty"+id+"-pinquip").removeClass("blenk").html("");
    $("#empty"+id+"-swag").removeClass("blenk").html("");
    $("#id"+id+"-fhead").removeClass("hide");
    if(!($("#id"+id+"-food tr").exists())){
      $("#empty"+id+"-food").addClass("blenk").html("EMPTY");
      $("#id"+id+"-fhead").addClass("hide");
    }
    if(!($("#id"+id+"-tinventory tr").exists())){
      $("#empty"+id+"-tinventory").addClass("blenk").html("EMPTY");
    }
    if(!($("#id"+id+"-pinventory tr").exists())){
      $("#empty"+id+"-pinventory").addClass("blenk").html("EMPTY");
    }
    if(!($("#id"+id+"-threquip tr").exists())){
      $("#empty"+id+"-threquip").addClass("blenk").html("EMPTY");
    }
    if(!($("#id"+id+"-pinquip tr").exists())){
      $("#empty"+id+"-pinquip").addClass("blenk").html("EMPTY");
    }
    if(!($("#id"+id+"-swag tr").exists())){
      $("#empty"+id+"-swag").addClass("blenk").html("EMPTY");
    }

    /* Noise Form */
    if(ptype == "reaper"){
      document.getElementById('noise'+id+'-name').innerHTML = data.feed.entry[29]['gsx$def']['$t'];
      document.getElementById('noise'+id+'-species').innerHTML = data.feed.entry[30]['gsx$def']['$t'];
      var noiseimg = data.feed.entry[29]['gsx$type']['$t'];
      if(noiseimg == ""){
        document.getElementById('noise'+id+'-image').src = "http://i.imgur.com/fMgAHKF.png";
      }
      else{document.getElementById('noise'+id+'-image').src = noiseimg;}
      $('#noise'+id+'-cp').val(data.feed.entry[6]['gsx$cp']['$t']);

      // Stats
      var noisehp = trim(data.feed.entry[32]['gsx$hp']['$t'], 3);
      document.getElementById('noise'+id+'-totalhp').innerHTML = noisehp;
      document.getElementById('noise'+id+'-currhp').innerHTML = noisehp;
      document.getElementById('noise'+id+'-rawhp').innerHTML = trim(data.feed.entry[33]['gsx$hp']['$t'], 3);
      document.getElementById('noise'+id+'-trainhp').innerHTML = trim(data.feed.entry[34]['gsx$hp']['$t'], 3);
      document.getElementById('noise'+id+'-mischp').innerHTML = trim(data.feed.entry[35]['gsx$hp']['$t'], 3);
      document.getElementById('noise'+id+'-totalatk').innerHTML = trim(data.feed.entry[32]['gsx$atk']['$t'], 4);
      document.getElementById('noise'+id+'-rawatk').innerHTML = trim(data.feed.entry[33]['gsx$atk']['$t'], 4);
      document.getElementById('noise'+id+'-trainatk').innerHTML = trim(data.feed.entry[34]['gsx$atk']['$t'], 4);
      document.getElementById('noise'+id+'-miscatk').innerHTML = trim(data.feed.entry[35]['gsx$atk']['$t'], 4);
      document.getElementById('noise'+id+'-totaldef').innerHTML = trim(data.feed.entry[32]['gsx$def']['$t'], 4);
      document.getElementById('noise'+id+'-rawdef').innerHTML = trim(data.feed.entry[33]['gsx$def']['$t'], 4);
      document.getElementById('noise'+id+'-traindef').innerHTML = trim(data.feed.entry[34]['gsx$def']['$t'], 4);
      document.getElementById('noise'+id+'-miscdef').innerHTML = trim(data.feed.entry[35]['gsx$def']['$t'], 4);
      if(part == 'Composer' || part == 'Conductor' || part == 'Producer' || part == 'Game Master'){
        document.getElementById('noise'+id+'-maxdef').innerHTML = "DEF";
        document.getElementById('noise'+id+'-maxatk').innerHTML = "ATK";
      }
      else{
        document.getElementById('noise'+id+'-maxdef').innerHTML = maxdef_template.replace(/MAXDEF/g, "MAX 35 DEF");
        document.getElementById('noise'+id+'-maxatk').innerHTML = maxdef_template.replace(/MAXDEF/g, "MAX 250 ATK").replace("DEF", "ATK");
      }

      // Abilities
      $('#noise'+id+'-abilities tr').remove();
      for(var i = 0; i < 5; i++){
        var ability = data.feed.entry[31+i]['gsx$name']['$t'];
        var desc = data.feed.entry[31+i]['gsx$type']['$t'];
        if(ability != "" || desc != ""){
          var entry = swag_template.replace("SWAG", ability);
          entry = entry.replace("DESC", desc);
          $('#noise'+id+'-abilities').append(entry);
        }
      }
    }



    // Apply accent color
    if(color == ""){color = "#383838";}
    var els = document.getElementsByClassName('accent' + id);
    for (var i = 0; i < els.length; i++) {
      els[i].style.color = color;
    }
    $('.tab.accent'+id).css("border-bottom", "3px hidden " + color);

    //Determine whether to use white or black text
    //Luma value is only an estimate; will require testing
    /*
    var rgb = color_convert.to_rgba_array(color);
    var luma = 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
    var text_color = "#383838";
    var bgcolor = "black"; */
    //if(luma < 130){
    var text_color = "white";
    var bgcolor = "white";
    //}
    // Fill in background colors and apply appropriate text color
    var bg_els = document.getElementsByClassName('accent'+id+"-bg");
    $('.table-title.accent'+id).css("background-color", bgcolor);
    $('#id'+id+'-fhead>tr>th').css("background-color", color);
    $('#id'+id+'-fhead>tr>th').css("color", text_color);
    for (var i = 0; i < bg_els.length; i++) {
      bg_els[i].style.backgroundColor = color;
      bg_els[i].style.color = text_color;
    }
    var outs = document.getElementsByClassName('accent'+id+'-out');
    for(var i = 0; i < outs.length; i++){
      outs[i].style.border = "1px solid "+color;
    }

    if(ptype == "reaper"){
      $('#id'+id+'-ahead>tr>th').css("background-color", color);
      $('#id'+id+'-ahead>tr>th').css("color", text_color);
    }

    count++;
    $('.active>a').css("border-bottom", "3px solid");
    if(count >= numEntities-1){
      toast('.toast', message, 1000);
      count = 0;
      $(".refresh").prop("disabled", false);
      $(".refresh i").removeClass("fa-spin");
      recalculate();
    }
  });
}
$.fn.exists = function () {
  return this.length !== 0;
}
//TRIM (remove last few characters)
function trim(str, num){
  return str.substring(str, str.length - num);
}
//BOOST PREP
function prep(str){
  var tokens = str.split(",");
  if(tokens.length == 1){
    return str;
  }
  var ans = "";
  for(var i = 0; i < tokens.length - 2; i++){
    ans += "<span class='nobreak'>" + tokens[i] +",</span> ";
  }
  return ans + "<span class='nobreak'>" + tokens[i] +"</span> ";;
}
// STAT COMPILATION
function stat(hp, atk, def){
  var ans = "";
  if(hp.charAt(0) == '-'){ans += "<span class='nobreak'>" + hp + ",</span> ";}
  else if(hp.length > 0){ans += "<span class='nobreak'>" + "+" + hp + ",</span> ";}

  if(atk.charAt(0) == '-'){ans += "<span class='nobreak'>" + atk + ",</span> ";}
  else if(atk.length > 0){ans += "<span class='nobreak'>" + "+" + atk + ",</span> ";}

  if(def.charAt(0) == '-'){ans += "<span class='nobreak'>" + def + ",</span> ";}
  else if(def.length > 0){ans += "<span class='nobreak'>" + "+" + def + ",</span> ";}

  if(ans.length > 0){return ans.substring(0, ans.length-9) + "</span>";}

  return ans;
}
// Return a less lengthy version of the string
function thread_type(str){
  if(str.charAt(0) == "T"){
    if(str.length > 3){return "T&B";}
    else{return "Top";}
  }
  if(str.charAt(0) == "H"){return "Head";}
  if(str.charAt(0) == "A"){return "Acc";}
  if(str.charAt(0) == "F"){return "Foot";}
  if(str.charAt(0) == "P"){return "Psy";}
  return str;
}
//COLOR RESOLUTION -- nicked from here:
// https://gist.github.com/njvack/02ad8efcb0d552b0230d
/*
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
    **
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
*/

// TOGGLE
$(function () {
  $('.toggle-heading').on('click', function() {
    //var iku = false;
    var toslide = $(this).next('.toggle-content');
    var h = toslide.height();
    if(toslide.is(":hidden")){
      //iku = true;
      h = getHeight(toslide);
    }
    toslide.slideToggle(h);
    /*
    if(iku) {
      var heyo = $('.simplebar-content').offset().top + $('.simplebar-content').height();
      $('.simplebar-scroll-content, .simplebar-content').animate({
          scrollTop: heyo
       }, h+50);
    }
    */
  });
});

// GETHEIGHT
function getHeight(item){
  var previousCss = $(item).attr("style");
  $(item)
      .css({
          position:   'absolute',
          visibility: 'hidden',
          display:    'block'
      });
  var h = $(item).height();
  $(item).attr("style", previousCss ? previousCss : "");
  return h;
}



//REFRESH
$(".refresh").click(function(){
  $(".refresh").prop("disabled", true);
  $(".refresh i").addClass("fa-spin");
  refresh("Loaded!");
});
function refresh(message)
{
  toastin("Loading content...");
  for (var i = 0; i < numEntities; i++) {
    fill(i, message);
  }
}

//BUTTON LISTENER
var clipboard = new Clipboard('.btn');

function toast(t, text, time) {
  $(t).text(text).fadeIn(200).delay(time).fadeOut(200);
}
function toastin(text){
  $('.toast').text(text).fadeIn(200);
}

clipboard.on('success', function(e) {
  toast('.cptoast', "Copied to clipboard!", 1000);
  e.clearSelection();
});

clipboard.on('error', function(e) {
  toast('.cptoast', "Stats selected! Press CTRL+C now to copy your stats!", 4000);
});
//Prevent backspace from taking page back if stuff in input is highlighted
$('textarea[readonly]').keydown(function(event) {
  if (event.which === 8) {
    event.preventDefault();
  }
});

// Adjust content height
function updateHeight(){
  $('.container').css("height", ($( window ).height() - 140)+"px");
}
$( window ).resize(function(){
  updateHeight();
  recalculate();
});
function recalculate(){
  $(".tabs").simplebar('recalculate');
  $(".content").simplebar('recalculate');
}
