
$("document").ready(function(){

  var name_one = "nasa";
  var name_two = "anderson._paak";
  var url = "https://www.instagram.com/";
  var url_end = "/?__a=1";
  var followers_one, followers_two, score=0;

  $("#play-button").click(function(){
    $("#begin-area").slideToggle();
    $("#score-area").slideToggle();
    $("#main-area").slideToggle();
    $("#user-score").text(score);

    var instaPageOne = url+name_one+url_end;
    var instaPagetwo = url+name_two+url_end;

    $.getJSON(instaPageOne).fail(function(){
        console.log("fail");
    }).done(function(json) {
        var username_one = json["graphql"]["user"]["username"];
        followers_one = json["graphql"]["user"]["edge_followed_by"]["count"];
        var profile_pic_one = json["graphql"]["user"]["profile_pic_url_hd"];
        $("#username_one").text(username_one);
        $("#image_one").attr("src",String(profile_pic_one));
    });


    $.getJSON(instaPagetwo).fail(function(){
        console.log("fail");
    }).done(function(json) {
        var username_two = json["graphql"]["user"]["username"];
        followers_two = json["graphql"]["user"]["edge_followed_by"]["count"];
        var profile_pic_two = json["graphql"]["user"]["profile_pic_url_hd"];
        $("#username_two").text(username_two);
        $("#image_two").attr("src",String(profile_pic_two));
    });
  });

  $(".profile_followers").click(function(){
    if($(this).attr("data-id")=="followers_one"){
      if(followers_one>followers_two){
        console.log("correct");
        score+=1;
        increaseScore(score);
      }else{
        console.log("incorrect");
      }
    }else{
      if(followers_two>followers_one){
        score+=1;
        increaseScore(score);
      }else{
        console.log("incorrect");
      }
    }
  });

});


function increaseScore(score){
  $("#user-score").text(score);
} 