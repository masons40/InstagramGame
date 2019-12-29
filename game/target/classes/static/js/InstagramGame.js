
$("document").ready(function(){


    var data_list , successJson;
    var popularity = [];

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
