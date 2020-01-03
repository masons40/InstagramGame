

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


    var data_list = new Set([]);
    var popularity = new Map();
    var score=0;
    var artistOne, artistTwo;

    var rootRef = firebase.database().ref();

    $("#save-button").click(function () {
        var newScore = {};
        newScore.name = document.getElementById("name").value;
        newScore.score = score;
        rootRef.push(newScore);
        $("#save-button").slideToggle();
        $("#scores").slideToggle();
    });

      var i = 10;

    rootRef.orderByChild("score").limitToLast(10).on("child_added", function(data)  {
      childScore = data.val();
      if (i!=0)   {

            document.getElementById("scores").innerHTML += i+ "   " + childScore.name + " - " + childScore.score + "<br>";
            i = i-1;
      }
      else {
       document.getElementById("scores").innerHTML += "<br><br>Your Score:" + childScore.name + " - " + childScore.score + "<br>";

      }

    });

    $('#play-button').click(function () {

        var playlistArea = $("#category-area");
        $("#begin-area").slideToggle();

        $.getJSON('getPlaylist', function (data) {

            $.each(data, function (key, value) {
                playlistArea.append(
                    $("<div />",{class:"category-box"}).append(
                        $("<img />", {src:value.pics[0], class:"playlist-images"}),
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
        $.getJSON(datalink, function (data) {
            $.each(data, function (key, value) {
                data_list.add(value);
            });

        });
        beginGame();
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
            var id;
            $.each(data, function (key, value) {
                if(key==="id"){
                    id = value;
                }
                if(key==="name"){
                    $(user_name).text(value);
                }else if(key==="profilePic"){
                    $(user_pic).attr("src", value);
                }else if(key==="popularity"){
                    popularity.set(id, value);
                }

            });
        });
        $(user_name).attr("artist-id",number);
    }

    $('.profile_followers').click(function () {
        var artist_id = $(this).find("h3").attr("artist-id");
        var correct_border = "6px solid #68d968";
        var incorrect_border = "6px solid #d92929";
        for(let [key, value] of popularity){
            if(key!==artist_id){
                if(popularity.get(artist_id)>=value){
                    score+=1;
                    $("#user-score").text(score);
                }else{
                    finishGame();
                }

                removeArtist(artist_id, key);
            }
        }

    });


    function findArtist(val) {
        var amount = 0;
        random = Math.floor(Math.random() * data_list.size);
        for (let item of data_list.values()){
            if(val === artistOne && amount===random){
                artistOne = item;
            }else if(amount===random){
                artistTwo = item;
            }
            amount+=1;
        }
    }

    function removeArtist(val, val2) {
        data_list.delete(val);
        data_list.delete(val2);
        popularity.clear();
        findArtist(artistOne);
        getArtistInfo(artistOne, "#username_one","#image_one");
        findArtist(artistTwo);
        getArtistInfo(artistTwo, "#username_two","#image_two");
        console.log(data_list);
        console.log(data_list.size);
    }


    function finishGame(response){
        $("#end-area").slideToggle();
        $("#main-area").slideToggle();

        $("#score").text(score);
        $("#message").text(response);

    }

});
