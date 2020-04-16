// Define global variables
let vsMini = $("#vs-mini");
let callURL = "https://api.opendota.com/api/players/30614351/matches"
    + "?significant=0"
    + "&hero_id=20"
    + "&limit=1";


// Execute ajax call on-click
vsMini.click(function() {
    var call = $.ajax({
        url: callURL,
        dataType: "json"
    });
    
    var success = function(response) {

        matchID = response[0].match_id

        if (response[0].player_slot <= 127 && response[0].radiant_win == true) {
            result = "won";
        } else if (response[0].player_slot >= 128 && response[0].radiant_win == false) {
            result = "won";
        } else {
            result = "lost";
        }
    
        $("#win-or-loss").text("Jonas " + result + "!");
        $("#match-id").text(matchID).attr("onclick", `window.open('https://www.opendota.com/matches/${matchID}')`);

        if (response[0].deaths > response[0].kills && result == "won") {
            $("#kda").text("Despite going... "
            + response[0].kills + "/"
            + response[0].deaths + "/"
            + response[0].assists);
        } else {
            $("#kda").text("He went... "
            + response[0].kills + "/"
            + response[0].deaths + "/"
            + response[0].assists);
        }
    };
    
    var error = function(error) {
        console.log(error);
    };
    
    call.then(success, error);
    call.then(function() {
        $("#landing-page").hide();
        $("#result-page").show();
        $("#slide-container").show();
    });

    $(".slider").on("input", function() {
        let ree = $(this).val();
        let str = "E";
        
        if ($(window).width() >= 1024) {
            $("#ree").css("font-size", (ree * 3) + "px");
            $("#ree").css("right", (ree * 2) + "px");
            $("#ree").text("REEEE" + str.repeat(ree/6));
        } else if ($(window).width() >= 769 && $(window).width() < 1024) {
            $("#ree").css("font-size", (ree * 2) + "px");
            $("#ree").css("right", (ree) + "px");
            $("#ree").text("REEEE" + str.repeat(ree/10));
        } else if ($(window).width() <= 768) {
            $("#ree").css("font-size", (ree * 2) + "px");
            $("#ree").css("right", (ree / 3) + "px");
            $("#ree").text("REEEE" + str.repeat(ree/10));
        };

        if (ree > 0 && ree <= 40) {
            $("#ree").attr("class", "shake-slow shake-constant");
            $("#imgDiv").attr("class", "shake-little shake-constant");
        } else if (ree > 40 && ree <= 80) {
            $("#ree").attr("class", "shake shake-slow shake-constant");
        } else if (ree > 80 && ree <= 130) {
            $("#ree").attr("class", "shake-hard shake-constant");
            $("#imgDiv").attr("class", "shake-hard shake-constant");
        } else if (ree > 130) {
            $("#imgDiv").attr("class", "shake-crazy shake-constant");
            $("#ree").attr("class", "shake-crazy pulse");
        } else {
            $("#imgDiv").removeClass();
        };

        if (ree > 80) {
            $("#result-page").attr("class", "container has-text-centered shake-hard shake-constant");
        } else {
            $("#result-page").attr("class", "container has-text-centered")
        };

    });

});


// Auto-update copyright year
$("#copyright-year").text(moment().format("YYYY"));