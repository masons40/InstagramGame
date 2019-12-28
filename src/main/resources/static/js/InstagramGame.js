
$("document").ready(function(){


    var data_list ;

    $('#play-button').click(function () {

        var playlistArea = $("#category-area");

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
        $.getJSON(datalink, function (data) {
            // $.each(data, function (key, value) {
            // });
            data_list=data;
        });

        $("#begin-area").slideToggle();
        $("#score-area").slideToggle();
        $("#main-area").slideToggle();
    });


    $(".profile_followers").click(function () {
        var random = data_list[Math.floor(Math.random() * data_list.length)];
        console.log(random)
    });
});
