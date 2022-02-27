$(function () {

    game.init($('#container'))
});//Call the function directly when the page is loaded

var game = {
    easyLevel: [{
        map: [
            [0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 1, 0],
            [0, 1, 1, 1, 1, 1, 0],
            [0, 2, 2, 0, 0, 0, 0],
            [0, 2, 2, 0, 3, 3, 3],
            [0, 0, 0, 0, 3, 3, 3]
        ],
        box: [{ y: 3, x: 2 }, { y: 3, x: 4 }, { y: 2, x: 3 }, { y: 2, x: 4 }],
        player: { y: 3, x: 5 }
    }, {
        map: [
            [3, 3, 0, 0, 0, 0, 0],
            [3, 3, 0, 2, 1, 1, 0],
            [0, 0, 0, 1, 1, 1, 0],
            [0, 1, 1, 2, 1, 1, 0],
            [0, 1, 1, 1, 0, 0, 0],
            [0, 1, 1, 2, 0, 3, 3],
            [0, 0, 0, 0, 0, 3, 3]
        ],
        box: [{ y: 3, x: 2 }, { y: 3, x: 3 }, { y: 3, x: 4 }],
        player: { y: 5, x: 1 }

    },

    {
        map: [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 1, 2, 0],
            [0, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 1, 0, 1, 1, 2, 0],
            [0, 0, 0, 0, 0, 0, 0, 0]
        ],
        box: [{ y: 2, x: 4 }, { y: 2, x: 5 }],
        player: { y: 2, x: 6 }
    }
    ],

    hardLevel: [{
        map: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 2, 2, 0, 1, 1, 1, 1, 1, 1, 0],
            [0, 2, 2, 0, 1, 1, 1, 1, 1, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 3],
            [0, 1, 1, 0, 1, 1, 1, 0, 0, 3, 3],
            [0, 1, 1, 0, 1, 1, 0, 0, 3, 3, 3],
            [0, 1, 1, 1, 1, 0, 0, 3, 3, 3, 3],
            [0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3]
        ],
        box: [{ y: 2, x: 5 }, { y: 2, x: 7 }, { y: 3, x: 6 }, { y: 4, x: 5 }],
        player: { y: 1, x: 9 }
    }, {
        map: [
            [3, 3, 3, 0, 0, 0, 0, 3, 3, 3, 3, 3, 3, 3],
            [3, 3, 3, 0, 1, 1, 0, 3, 3, 3, 3, 3, 3, 3],
            [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 3, 3, 3, 3],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 3, 3, 3, 3],
            [0, 0, 1, 1, 1, 1, 0, 2, 1, 0, 3, 3, 3, 3],
            [3, 0, 1, 1, 1, 0, 0, 1, 2, 0, 0, 0, 0, 0],
            [3, 0, 0, 1, 1, 1, 0, 2, 1, 1, 1, 1, 1, 0],
            [3, 3, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [3, 3, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1, 0],
            [3, 3, 3, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0]
        ],
        box: [{ y: 2, x: 5 }, { y: 3, x: 6 }, { y: 5, x: 4 }],
        player: { y: 3, x: 2 }
    }

    ],

    mode: "easy",

    currentLevel: 0,

    stepNum: 0,

    pushes: 0,

    stepStore: {  //Store player's coordinates and box coordinates
        person: [],
        box: []
    },

    init: function (id) {
        this.id = id;//Pass in the #container itself as an attribute of game for later editing
        this.createEasyMap(this.currentLevel);//Generate initial map

    },
    createHardMap: function (num) {
        this.stepNum = 0;
        this.pushes = 0;
        $(document).unbind();//remove all event handlers for this document. It's important since empty() can't remove the event handler.
        this.mode = "hard"; // change the game's difficulty
        this.id.empty();//clear all the data in this #container
        this.stepStore.person =[];
        this.stepStore.box=[];
        $('#levelTitle').html("Level" + " " + (this.currentLevel + 1));
        $('#moveSteps').html('Moves: ' + (this.stepNum));
        $("#pushes").html("Pushes: " + this.pushes);
    
        this.newMap = this.hardLevel[num];
        //set container's width
        this.id.css('width', this.newMap.map[num].length * 50); 
        this.id.css('height', this.newMap.map.length * 50);
        var that = this; //bind the scope 
        for (var arr of this.newMap.map) { //Iterate over each element in the array
            for (var value of arr) {
                that.id.append('<div class="item' + value + '"></div>')// to assign them the corresponding css and put them in the #container
            }
        }
        this.restart();
        this.createBox();
        this.createPlayer();

    }
    ,


    createEasyMap: function (num) {
        this.stepNum = 0;
        this.pushes = 0;
        $(document).unbind();
        this.mode = "easy";
        this.id.empty();//clear all the data
        this.stepStore.person = [];//empty the stored data
        this.stepStore.box = [];
        $('#levelTitle').html("Level" + " " + (this.currentLevel + 1));
        $('#moveSteps').html('Moves: ' + (this.stepNum));
        $("#pushes").html("Pushes: " + this.pushes);
        var that = this;
        this.newMap = this.easyLevel[num];
        //set container's width
        this.id.css('width', this.newMap.map[num].length * 50);
        this.id.css('height', this.newMap.map.length * 50);

        for (var arr of this.newMap.map) {
            for (var value of arr) {
                that.id.append('<div class="item' + value + '"></div>')
            }



        }
        this.restart();
        this.createBox();
        this.createPlayer();
    },

    createBox: function () {
        var that = this;
        for (let value of this.newMap.box) {
            var box = $('<div class="box"></div>');
            box.css("left", value.x * 50);
            box.css("top", value.y * 50);
            that.id.append(box);
        }
    },
    createPlayer: function () {
        var player = $('<div id="player"></div>');
        player.css("left", this.newMap.player.x * 50);
        player.css("top", this.newMap.player.y * 50);
        player.data("x", this.newMap.player.x);//jquery data method allows us to attach 
        //data of any type to DOM elemtns in a way that is safe from circular references
        //and therefore from memory leaks
        player.data("y", this.newMap.player.y);
        this.id.append(player);
        window.focus();//get the document focus;
        this.movePlayerBackground(player);


    },
    movePlayerBackground: function (player) {

        var that = this;
        $(document).keydown(
            function (event) {
                switch (event.keyCode) {
                    case 37: //go left

                        player.css('backgroundPosition', '-50px 0');
                        that.movePerson(player, { x: -1 });


                        break;
                    case 38: //go up

                        player.css('backgroundPosition', '-100px 0');
                        that.movePerson(player, { y: -1 });





                        break;
                    case 39: //go right

                        player.css('backgroundPosition', '-150px 0');
                        that.movePerson(player, { x: 1 });


                        break;
                    case 40: //go down

                        player.css('backgroundPosition', '0px 0');
                        that.movePerson(player, { y: 1 });


                        break;
                }
            }
        )
    },


    movePerson: function (player, obj) {
        var yOffset = obj.y || 0;
        var xOffset = obj.x || 0;
        this.stepStore.person[this.stepNum] = {};//Properties can only be added after the object is defined first
        if (this.newMap.map[player.data('y') + yOffset][player.data('x') + xOffset] != 0) {//Only when the player does not touch the wall can move
            this.stepStore.person[this.stepNum].x = player.data('x');
            this.stepStore.person[this.stepNum].y = player.data('y');// Store previous step's data
            player.data('x', player.data('x') + xOffset);
            player.data('y', player.data('y') + yOffset); // update the data of movement
            player.css('left', (player.data("x") * 50 + "px"));
            player.css('top', (player.data("y") * 50 + "px"));//update the player's position

            this.stepNum++; //add the step
            var that = this;

            $(".box").each(function (index, value) { //loop through the box

                if (that.touchBox(player, $(value)) && (that.newMap.map[player.data('y') + yOffset][player.data('x') + xOffset] != 0))
                {//Only when the player touches the box and the front of the box is not a wall, then the box can be moved
                    $(value).css('left', (player.data("x") + xOffset) * 50);//move the box
                    $(value).css('top', (player.data("y") + yOffset) * 50);
                    that.stepStore.box[that.stepNum] = {};
                    that.stepStore.box[that.stepNum].index = index;//Record which box is moving
                    that.stepStore.box[that.stepNum].x = player.data("x");
                    that.stepStore.box[that.stepNum].y = player.data("y");
                    that.pushes++;
                    $('#pushes').html('Pushes: ' + that.pushes);


                    $(".box").each(
                        function (index2, value2) {

                            if (that.touchBox($(value), $(value2)) && (value != value2)) {//If two boxes collide and the two boxes are not the same box, do not move
                                $(value).css('left', (player.data("x")) * 50);//reduce the direction value to keep box still.
                                $(value).css('top', (player.data("y")) * 50);
                                player.data("x", player.data("x") - xOffset);//Because the player has already moved, the only way to keep the player from moving is to reduce the direction value of the move
                                player.data("y", player.data("y") - yOffset);
                                player.css("left", player.data("x") * 50);
                                player.css("top", player.data("y") * 50);
                                that.stepNum--; // the player didn't move so reduce the number of steps
                                that.stepStore.person.pop();//Also, there is no moving player so there is no need to record data, use pop() to subtract the data of the last record 

                            }

                        }
                    )
                } else if (that.touchBox(player, $(value))) {//The front of the box is a wall, so it can not be moved
                    player.data("x", player.data("x") - xOffset);
                    player.data("y", player.data("y") - yOffset);// reduce the direction value to keep the player still
                    player.css("left", player.data("x") * 50);
                    player.css("top", player.data("y") * 50);
                    that.stepNum--;
                    that.stepStore.person.pop();
                }

            }
            )
        }
        $('#moveSteps').html('Moves: ' + (this.stepNum))
        console.log(this.stepStore.box)
        this.enterNextLevel();

    },


    touchBox: function (player, item) { //See if the player pushes the box
        var playerLeft = player.offset().left;
        var playerTop = player.offset().top;
        var playerRight = player.offset().left + player.width();
        var playerDown = player.offset().top + player.height();

        var boxLeft = item.offset().left;
        var boxTop = item.offset().top;
        var boxRight = item.offset().left + item.width();
        var boxDown = item.offset().top + item.height();

        if (playerRight <= boxLeft || playerLeft >= boxRight || playerTop >= boxDown || playerDown <= boxTop) {
            return false;//didn't touch the box
        }
        else {
            return true;//did touch the box
        }
    },
    restart: function () {
        var that = this;
        $("#restart").click(function () {
            $(document).unbind();
            this.stepNum = 0;
            this.pushes = 0;
            $("#moveSteps").html("Moves: " + this.stepNum);
            $("#pushes").html("Pushes: " + this.pushes);
            if (that.mode == "hard") {
                that.createHardMap(that.currentLevel);
            } else {
                that.createEasyMap(that.currentLevel);
            }

        })
    }
    ,
    enterNextLevel: function () {
        var sum = 0;
        var that = this;
        $(".box").each(
            function (item, value) {
                $(".item2").each( //loop through the goals (vacancy)
                    function (id, value2) {
                        if (that.touchBox($(value), $(value2))) {//If there is a collision between the goals and the box, the box is proved to be on top of the goals
                            sum = sum + 1;
                        }
                    }
                )

            }
        )
        if (sum == this.newMap.box.length) {//If each box is on top of the goals, it proves the pass
            this.currentLevel = this.currentLevel + 1;
            if (this.mode == "hard" && this.currentLevel == this.hardLevel.length) {
                setTimeout(() => {
                    alert("You win the whole game with difficulty of hard")
                    this.currentLevel = 0;
                    return this.createHardMap(this.currentLevel);
                }, 300);

            }
            if (this.mode == "easy" && this.currentLevel == this.easyLevel.length) {//If the level passed exceeds the original level of the map, it proves that the player wins the whole game and returns to the first level
                setTimeout(() => {
                    alert("You win the whole game with difficulty of easy!")
                    this.currentLevel = 0;
                    return this.createEasyMap(this.currentLevel);
                }, 300);

            }

            if (this.mode == "hard") {
                setTimeout(() => {
                    alert("You have passed this hard level!")
                }, 30);

                this.createHardMap(this.currentLevel);
            }
            else {
                setTimeout(() => {
                    alert("You have passed this easy level!")
                }, 30);

                this.createEasyMap(this.currentLevel);
            }
        }
    },
    prevStep: function () { //store the status of the previous step
        if (this.stepNum != 0) {
            $('#player').data('x', this.stepStore.person[this.stepNum - 1].x);
            $('#player').data('y', this.stepStore.person[this.stepNum - 1].y);
            $('#player').css('left', this.stepStore.person[this.stepNum - 1].x * 50);
            $('#player').css('top', this.stepStore.person[this.stepNum - 1].y * 50);
            var boxNow;
            if (this.stepStore.box[this.stepNum]) {//If there is a pushed box in this step, the movement of the box could be rolled back

                boxNow = $(".box").eq(this.stepStore.box[this.stepNum].index);//The stored index tells which box has been pushed
                boxNow.x = this.stepStore.box[this.stepNum].x;
                boxNow.y = this.stepStore.box[this.stepNum].y;
                boxNow.css('left', boxNow.x * 50);
                boxNow.css('top', boxNow.y * 50);
                if (this.pushes > 0) {
                    this.pushes--;
                    $("#pushes").html("Pushes: " + this.pushes);
                }

            }

            this.stepNum--;
            $('#moveSteps').html('Moves: ' + (this.stepNum));

        }

    },


}
