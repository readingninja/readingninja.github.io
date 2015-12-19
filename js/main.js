var template;

if($('body').hasClass("instagram")){
  // $('.loading').hide();
}


(function() {
  jQuery('html,body').animate({scrollTop:0},0);
  window.url = "https://api.instagram.com/v1/users/1368186464/media/recent.json?count=33&access_token=4756774.1fb234f.ce5b1586fb8b4a11b5cb805b7205fbaa";
  instagramCall(window.url, true);
})();

function instagramCall(url, newsletter){
  $.ajax({
    url: url,
    dataType: 'jsonp'
  }).done(function(data) {
    window.url = data.pagination.next_url;
    var $wrapper = $(".posts");
    $.each(data.data, function( index, value ) {
      if(newsletter){
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
      template = addInstagram(value);
    });
    $('.loading').fadeOut(500, function(){
      $('.wrapper').fadeIn(200);
    });
    $('.load-more a').html("Load More");
  });
}

function addInstagram(value){
  var img = value.images.low_resolution.url;
  var link = value.link;
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
  instagramCall(window.url, false);
});

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
