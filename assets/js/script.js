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
        let imgDiv = $("#imgDiv")
        console.log(response)
        matchID = response[0].match_id

        if (response[0].player_slot <= 127 && response[0].radiant_win == true) {
            result = "won";
        } else if (response[0].player_slot >= 128 && response[0].radiant_win == false) {
            result = "won";
        } else {
            result = "lost";
            imgDiv.addClass("shake-little shake-constant");
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
        $("#slidecontainer").show();
    });
});


// Auto-update copyright year

$("#copyright-year").text(moment().format("YYYY"));