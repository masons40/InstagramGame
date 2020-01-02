

$("document").ready(function(){

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyA56d-JVdrYYJbhhWzH_7jHFSl-YDux1X8",
    authDomain: "spotifygame-34d95.firebaseapp.com",
    databaseURL: "https://spotifygame-34d95.firebaseio.com",
    projectId: "spotifygame-34d95",
    storageBucket: "spotifygame-34d95.appspot.com",
    messagingSenderId: "603965963816",
    appId: "1:603965963816:web:9cc9f52eb7434e2d54ff1d"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


    var data_list , successJson;
    var popularity = [];
    var score=0;
    var artistOne, artistTwo;

    var rootRef = firebase.database().ref();

     $("#save-button").click(function () {
        var newScore = {};
        newScore.name = document.getElementById("name").value;
        newScore.score = parseInt(document.getElementById("score").value);
        rootRef.push(newScore);
             });


    rootRef.orderByChild("score").limitToLast(10).on("child_added", function(data)  {
      childScore = data.val();
      document.getElementById("scores").innerHTML += childScore.name + " - " + childScore.score + "<br>";

    });

    $('#play-button').click(function () {

        var playlistArea = $("#category-area");
        $("#begin-area").slideToggle();

        $.getJSON('getPlaylist', function (data) {

            $.each(data, function (key, value) {
                var name = value.name;
                playlistArea.append(
                    $("<div />",{class:"category-box"}).append(
                        $("<h3 />", {text:name}),
                        $("<img />", {src:value.pics[0]}),
                        $("<button/>", {href:"getArtists/" + value.id, type:"button", text:"Play Category", class:"start-button"})
                    )
                );
            });
        });
    });

    $('#end-screen').click(function () {

        $("#end-area").slideToggle();
        $("#score-area").slideToggle();
        $("#main-area").slideToggle();
//        $("#secondary-play-button-area").slideToggle();

    });


    $("body").on('click', ".start-button" ,function() {
        var datalink = $(this).attr("href");
        $("#category-area").slideToggle();
        successJson = $.getJSON(datalink, function (data) {
            // $.each(data, function (key, value) {
            // });
            data_list=data;
        });

        beginGame()
    });


    function beginGame(){
            $("#score-area").slideToggle();
            $("#main-area").slideToggle();
            $("#secondary-play-button-area").slideToggle();
    }

    $("#secondary-play-button").click(function () {
        $("#secondary-play-button-area").slideToggle();
        findArtist(artistOne);
        findArtist(artistTwo);
        getArtistInfo(artistOne, "#username_one","#image_one");
        getArtistInfo(artistTwo, "#username_two","#image_two");
    });


    function getArtistInfo(number, user_name, user_pic) {
        $.getJSON('getArtistValues/' + number, function (data) {

            $.each(data, function (key, value) {
                if(key==="name"){
                    $(user_name).text(value);
                }else if(key==="profilePic"){
                    console.log("pic", value);
                    $(user_pic).attr("src", value);
                }else if(key==="popularity"){
                    popularity.push(value);
                }

            });
        });
    }

    $('.profile_followers').click(function () {
       var profile = $(this).attr("data-id");
       if(profile==="followers_one"){
           if(popularity[0] >= popularity[1]){
               $(this).css("border", "6px solid #68d968");
               score+=1;
               $("#user-score").text(score);
           }else{
               $(this).css("border", "6px solid #d92929");
           }
           deleteVal(data_list, artistOne);
           findArtist(artistOne);

       }else{
           if(popularity[1] >= popularity[0]){
               $(this).css("border", "6px solid #68d968");
               score+=1;
               $("#user-score").text(score);
           }else{
               $(this).css("border", "6px solid #d92929");
           }
           deleteVal(data_list, artistTwo);
           findArtist(artistTwo);
       }

       $(this).css("border", "none");
    });

    function deleteVal(arr, value){
        for( var i = 0; i < arr.length; i++){
            if ( arr[i] === value) {
                arr[i] = "empty";
            }
        }
    }

    function findArtist(val) {
        if(val === artistOne){
            artistOne = data_list[Math.floor(Math.random() * data_list.length)];
        }else{
            artistTwo = data_list[Math.floor(Math.random() * data_list.length)];
        }
    }
});
