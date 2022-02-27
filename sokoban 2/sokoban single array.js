$(function(){

    game.init($('#container'))
});

var game = {
    level:[{
        map:[
            6,6,6,6,6,6,6,
            6,1,1,1,1,1,6,
            6,1,1,1,1,1,6,
            6,1,1,1,1,1,6,
            6,3,3,6,6,6,6,
            6,3,3,6,4,4,4,
            6,6,6,6,4,4,4
        ],
        box:[{y:5,x:2},{y:5,x:1},{y:4,x:2},{y:3,x:1}],
        player:{y:3,x:5}
    },{
       map:[
           4,4,6,6,6,6,6,
           4,4,6,3,1,1,6,
           6,6,6,1,1,1,6,
           6,1,1,3,1,1,6,
           6,1,1,1,6,6,6,
           6,1,1,3,6,4,4,
           6,6,6,6,6,4,4
       ],
       box:[{y:3,x:2},{y:3,x:3},{y:3,x:4}],
       player:{y:5,x:1}

    },
      
    {
        map:[
            6,6,6,6,6,6,6,
            6,1,1,1,1,1,6,
            6,1,1,1,1,1,6,
            6,1,1,1,1,1,6,
            6,3,3,6,6,6,6,
            6,3,3,6,4,4,4,
            6,6,6,6,4,4,4
        ],
        box:[{y:5,x:2},{y:5,x:1},{y:4,x:2},{y:3,x:1}],
        player:{y:3,x:5}
    }
],
    currentLevel: 0,
    steps:0,

    init: function(id){
        this.id = id;
        this.createMap(this.currentLevel);
    },
    

    createMap: function(num){
        this.id.empty();//clear all the data
        this.steps = 0;
        $('#levelTitle').html("Level"+" "+(this.currentLevel+1));
        var that = this;
        this.newMap = this.level[num];
        //set container's width
        this.id.css('width',Math.sqrt(this.newMap.map.length)*50);
       for(var value of this.newMap.map){

               that.id.append('<div class="item'+ value + '"></div>')
           
           
       }

       this.createBox();
       this.createPlayer();
    },

    createBox: function(){
    var that = this;
    for(let value of this.newMap.box){
        var box = $('<div class="box"></div>');
        box.css("left",value.x*50);
        box.css("top",value.y*50);
        that.id.append(box);
    }
    },
    createPlayer: function(){
      var player = $('<div class="player"></div>');
      player.css("left",this.newMap.player.x*50);
      player.css("top",this.newMap.player.y*50);
      player.data("x",this.newMap.player.x);//jquery data method allows us to attach 
      //data of any type to DOM elemtns in a way that is safe from circular references
      //and therefore from memory leaks
      player.data("y",this.newMap.player.y);
      this.id.append(player);
      window.focus();//get the document focus;
      this.movePlayerBackground(player);
      
      
    },
    movePlayerBackground: function(player){
        var that = this;
        $(document).keydown(
            function(event){
                switch(event.keyCode){
                    case 37: //go left
                        
                        player.css('backgroundPosition','-50px 0');
                       that.movePerson(player,{x:-1});
                        //player.css('left',(player.position().left-50)+"px");
                    
                    break;
                    case 38: //go up
                   
                    player.css('backgroundPosition','-100px 0');
                    that.movePerson(player,{y:-1});
                    //player.css('top',(player.position().top-50)+"px");
                   
                   
                  
                   
                    break;
                    case 39: //go right
                    
                    player.css('backgroundPosition','-150px 0');
                    that.movePerson(player,{x:1});
                    //player.css('left',(player.position().left+50)+"px");
                    
                 
                    break;
                    case 40: //go down
                
                    player.css('backgroundPosition','0px 0');
                    that.movePerson(player,{y:1});
                    //player.css('top',(player.position().top+50)+"px");
                    
                    break;
                }
            }
        )
    },

  
    movePerson:function(player,obj){
        
        var yOffset = obj.y || 0;
        var xOffset = obj.x || 0;
        var length = Math.sqrt(this.newMap.map.length);
        var currentMapIndex = (player.data('x')+xOffset)+(player.data('y')+yOffset)*length;
        if(this.newMap.map[currentMapIndex] != 6 ){
        player.data('x',player.data('x')+xOffset);
        player.data('y',player.data('y')+yOffset);
        player.css('left',(player.data("x")*50+"px"));
        player.css('top',(player.data("y")*50+"px"));
        var that = this;
        $(".box").each(function(index,value){

        if(that.touchBox(player,$(value)) && (that.newMap.map[(player.data('x')+xOffset)+(player.data('y')+yOffset)*length] != 6))//no need to display true
            {        
                
                $(value).css('left',(player.data("x")+xOffset)*50);//move the box
                $(value).css('top',(player.data("y")+yOffset)*50); 
                
                
                $(".box").each(     
                        function(index2,value2){
                     
                            if(that.touchBox($(value),$(value2))&& (value!=value2)){
                                $(value).css('left',(player.data("x"))*50);
                                $(value).css('top',(player.data("y"))*50); 
                                player.data("x",player.data("x")-xOffset);//don't move the character
                                player.data("y",player.data("y")-yOffset);
                                player.css("left",player.data("x")*50);
                                player.css("top",player.data("y")*50);
                             
                            }
                        
                        }
                    )      
        }else if(that.touchBox(player,$(value))){
            player.data("x",player.data("x")-xOffset);
            player.data("y",player.data("y")-yOffset);
            player.css("left",player.data("x")*50);
            player.css("top",player.data("y")*50);
        }

        }
        )       
        }
        this.enterNextLevel();
    },

    wallBlock: function(item,xOffset,yOffset){
        var y = item.position().top/50 + yOffset;
        var x = item.position().left/50+ xOffset;
        console.log(this.newMap.map[y][x])
        if(this.newMap.map[y][x] == 6){
            return false//during the process of moving the box to the wall
        }else{
            return true
        }    
     },

  
    touchBox: function(player,item){
        var playerLeft = player.offset().left;
        var playerTop  = player.offset().top;
        var playerRight = player.offset().left+player.width();
        var playerDown = player.offset().top+player.height();

        var boxLeft = item.offset().left;
        var boxTop = item.offset().top;
        var boxRight = item.offset().left + item.width();
        var boxDown = item.offset().top+ item.height();

        if(playerRight<=boxLeft || playerLeft >= boxRight || playerTop >= boxDown || playerDown <= boxTop) {
            return false;//didn't touch the box
        }
        else{
            return true;//did touch the box
        }
    },

 
    
   enterNextLevel: function(){
       var sum =0;
       var that= this;
       $(".box").each(
           function(item,value){
               $(".item3").each(
                   function(id, value2){
                    if(that.touchBox($(value),$(value2))){
                    sum = sum +1;
                    }
                   }
               )
           
           }
       )
       if(sum == this.newMap.box.length){
       this.currentLevel=this.currentLevel+1;
       this.createMap(this.currentLevel);
       }
   }

}
