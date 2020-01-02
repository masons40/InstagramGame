
$("document").ready(function(){

    var data_list , successJson;
    var popularity = [];
    var score=0;
    var artistOne, artistTwo;

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
