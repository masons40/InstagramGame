

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
        getArtistInfo(data_list[Math.floor(Math.random() * Object.keys(data_list).length)], "#username_one","#image_one");
        getArtistInfo(data_list[Math.floor(Math.random() * Object.keys(data_list).length)], "#username_two","#image_two");
    });


    function getArtistInfo(number, user_name, user_pic) {
        $.getJSON('getArtistValues/' + number, function (data) {

            $.each(data, function (key, value) {
                if(key==="name"){
                    $(user_name).text(value);
                    console.log(value);
                }else if(key==="profilePic"){
                    $(user_pic).attr("src", value);
                }else if(key==="popularity"){
                    popularity.push(value);
                    console.log(value);
                }

                console.log();
            });
        });
    }

    $('.profile_followers').click(function () {
       console.log(popularity);
    });
});
