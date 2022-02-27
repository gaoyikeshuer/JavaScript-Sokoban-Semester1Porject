const empty = 'empty'
const wall = 'wall'
const block = 'block'
const success_block = 'success_block'
const vacancy = 'vacancy'
const player = 'player'

const Map1 = [    
    [wall,  wall,  wall,  wall,  wall,  wall, wall],
    [wall, empty, empty, empty, empty, empty, wall],
    [wall, empty, empty, block, block, empty, wall],
    [wall, empty, block, empty, block, player, wall],
    [wall, vacancy, vacancy, wall, wall, wall, wall],
    [wall, vacancy, vacancy, wall, empty, empty, empty],
    [wall, wall, wall, wall, empty, empty, empty]
    ]

class Sokoban  {
    constructor(){

    }
    displayLevel(num){
        this.newMap = this.level[num];
    }
    findPlayerCoordinates(){

    }

}



const isTraversible = (cell) => [1, 3].includes(cell);


function findPlayerCoordinates(){
    const y = map.findIndex(row => row.includes(player));
    const x = map[y].indexOf(player);

 return{
        x,
        y,
        above: map[y-1][x],
        below: map[y+1][x],
        sideLeft: map[y][x-1],
        sideRight: map[y][x+1]
    }//拥有自己属性的对象
}
function move(playerCoordinates,direction){
if(isTraversible()){}
}

function playerMove(){
    

}
