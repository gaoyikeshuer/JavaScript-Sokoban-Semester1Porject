$(

    function(){
        $("#HardLevelSelect").hide();
        $("#modeSelect").change(
            function(){
                if($(this).val()=="Easy"){
                    $("#EasyLevelSelect").show();
                    $("#HardLevelSelect").hide();  
                } else if($(this).val() == "Hard"){
                    $("#EasyLevelSelect").hide();
                    $("#HardLevelSelect").show();
                }
            }
        )
    }
)

$("#EasyLevel1").click(function(){
    game.currentLevel=0;
    game.createEasyMap(game.currentLevel);
})
$("#EasyLevel2").click(function(){
    game.currentLevel=1;
    game.createEasyMap(game.currentLevel);
})
$("#EasyLevel3").click(function(){
    game.currentLevel=2;
    game.createEasyMap(game.currentLevel);
})
$("#HardLevel1").click(
    function(){
        game.currentLevel = 0;
        game.createHardMap(game.currentLevel);
    }
)
$("#HardLevel2").click(
    function(){
        game.currentLevel = 1;
        game.createHardMap(game.currentLevel);
    }
)
$('#previous').click(
    function(){
    
        game.prevStep();
    }
  

)