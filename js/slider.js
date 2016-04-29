
function next_slide(sh_btns){
  var slide_num = 0;
  setInterval(function(){
    if(slide_num == sh_btns.length)
      slide_num = 0;

    sh_btns[slide_num].click();
    slide_num++;
  },6000);
}

(function(){
  var radios = "";
        
  var sheet_slider = document.querySelector(".sheet-slider");
  var conten_c_tab = document.querySelectorAll(".conten>.tab");

  sheet_slider.innerHTML += "<div class='sh-btns'></div><div class='sh-arrows'></div>"
        
  var sh_btns = document.querySelector(".sh-btns");
  var sh_arrows = document.querySelector(".sh-arrows");

  sh_btns.innerHTML = "";
  sh_arrows.innerHTML = "";

  forEach(conten_c_tab, function(index, tab){
    sh_btns.innerHTML += "<label for='s"+(index+1)+"'></label>";
    sh_arrows.innerHTML += "<label for='s"+(index+1)+"'></label>";

    if(index == 0)
      radios = "<input id='s1' class='slide' type='radio' name='slide' checked='checked'/>";
    else
      radios += "<input id='s"+(index+1)+"' class='slide' type='radio' name='slide'/>";
    });

    sheet_slider.innerHTML = radios + sheet_slider.innerHTML;
    sheet_slider.className = "sheet-slider n" + conten_c_tab.length;


    //next_slide(document.querySelectorAll(".sh-arrows>label"));
})();