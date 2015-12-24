var template;
var base_url = "https://parkerbarker-api.herokuapp.com/readingninjas";
// var base_url = "http://localhost:3000/readingninjas";

if($('body').hasClass("instagram")){
  // $('.loading').hide();
}


(function() {
  jQuery('html,body').animate({scrollTop:0},0);
  window.url = base_url;
  apiCall(window.url, true);
})();

function apiCall(url, newsletter){
  $.ajax({
    url: url,
    dataType: 'json'
  }).done(function(data) {
    window.url = base_url + "?page=" + data.next_page;
    $.each(data.data, function( index, value ) {
      if(newsletter){showNewletter(index);}
      template = addPost(value);
    });
    $('.loading').fadeOut(500, function(){
      $('.wrapper').fadeIn(200);
    });
    $('.load-more a').html("Load More");
  });
}

function addPost(value){
  var img = value.image;
  var link = value.url;
  if($(window).width() > 1000){
    $('.wrapper').removeClass("container-fluid").addClass("container");
    template = '<div class="col-xs-3 post"><a href="' + link + '"><img src="' + img  + '" alt="" class="full-width"/></a></div>';
  }else{
    $('.wrapper').removeClass("container").addClass("container-fluid");
    template = '<div class="col-xs-4 post"><a href="' + link + '"><img src="' + img  + '" alt="" class="full-width"/></a></div>';
  }
  var $wrapper = $(".posts");
  $wrapper.append(template);
}

$(".load-more a").on("click", function(e){
  e.preventDefault();
  $(this).html("Loading...");
  apiCall(window.url, false);
});

function showNewletter(index){
  var $wrapper = $(".posts");
  if($(window).width() > 1000){
    if(index == 4){
      $wrapper.append($('#newsletter-template').html());
    }
  }
  else{
      if(index == 3){
        $wrapper.append($('#newsletter-template').html());
      }
  }
}

$(".header a").on("click", function(e){
  e.preventDefault();
  openInsta();
});

var iOS = ( navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false );
function openInsta(){
    if(iOS){
        setTimeout(function (){
            if(window.document.hasFocus()){
                window.location = "http://instagram.com/thereadingninja";
            }
        }, 1620);
        window.location = "instagram://user?username=thereadingninja";
    }else
        window.location = "http://instagram.com/thereadingninja";
}

// function parseInstagram(value){
//   var image, handle, name, template, side;
//   var last_photo = $('.right .body .photos .photo:last');
//   template = '<div class="clearfix">&nbsp;</div><div class="photo whichside"><img src="imagesrc" alt="" /><span>handle fullname</span></div>';
//   image = value.images.standard_resolution.url;
//   handle = "@" + value.user.username;
//   name = value.user.full_name;
//   if(last_photo.hasClass("pullleft")){
//     side = "pullright";
//   }else{
//     side = "pullleft";
//   }
//
//   updatedTemplate = template.replace("whichside", side).replace("imagesrc", image).replace("handle", handle).replace("fullname", name);
//   return updatedTemplate;
// }
