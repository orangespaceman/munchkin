(function($){

    "use strict";

    // global vars
    var $addEl;
    var playerTemplate;
    var $playersEl;

    // inits
    $(document).ready(domInit);

    /*
    * Run on DOM load
    */
    function domInit(){
        playerTemplate = $("#player-template").html();
        $playersEl = $(".players");
        initAddPlayer();
    }


    /*
    * App functionality
    */
    function initAddPlayer() {
        $addEl = $(".btn--add");
        $addEl.on("click", addPlayer);
    }

    function addPlayer(e) {
        e.preventDefault();
        var playerName = prompt("What is the new player's name?");
        if (playerName) {

            var $newPlayerEl = $(playerTemplate).hide();
            var strength = 1;

            $newPlayerEl.find(".player--name").text(playerName);
            $newPlayerEl.appendTo($playersEl).fadeIn();
            $newPlayerEl.find(".player--remove").on("click", {el:$newPlayerEl}, removePlayer);

            // editables
            var $editables = $newPlayerEl.find(".stat-value--editable");
            $editables.each(function(counter,el) {

                var $el = $(el);
                var $score = $el.find("span");
                var score = parseInt($score.text(), 10);
                var $down = $("<a>").addClass("arrow").html("&larr;").prependTo($el);
                var $up = $("<a>").addClass("arrow").html("&rarr;").appendTo($el);

                $up.on("click", function(e){
                    e.preventDefault();
                    $score.text(++score);
                    updateScore($newPlayerEl, ++strength);
                });

                $down.on("click", function(e){
                    e.preventDefault();
                    if (score > 0) {
                        score--;
                        if (--strength < 0) { strength = 0; }
                        $score.text(score);
                        updateScore($newPlayerEl, strength);
                    }
                });
            });
        }
    }

    function removePlayer(e) {
        e.preventDefault();
        var confirmDelete = confirm("Are you sure you want to remove this player?");
        if (confirmDelete) {
            var $el = e.data.el;
            $el.fadeOut(function(){
                $el.remove();
            });
        }
    }

    function updateScore($el, strength) {
        $el.find(".player--stat__strength .stat-value").text(strength);
    }

})(jQuery);