/**
 * Created by Tonny on 13.5.14.
 */

iwe.INIT({
    canvas: 'collision',
    tile: {width: 52, height: 30},
    startAt: {x: 300, y: 100},
    fullScreen: false
});
iwe.loadImages('./samples/collision/images/', ['grass.png','unwalkable.png','hero.png']);
var map = [
    [0,0,0,0,0,0,0,0,0,0],
    [0,1,1,0,0,0,0,0,0,0],
    [0,0,1,1,0,0,0,0,0,0],
    [0,0,0,1,1,0,0,0,0,0],
    [0,0,0,0,1,0,0,0,0,0],
    [0,0,0,0,1,1,1,1,1,1],
    [0,0,0,0,1,0,0,1,0,0],
    [0,1,1,1,1,0,1,1,0,0],
    [0,0,0,0,1,0,1,0,0,0],
    [1,1,1,1,1,1,1,1,1,1]
];
var tiles = {
    t0: function (x,y){
        this.x = x;
        this.y = y;
        this.offsetX = 0;
        this.offsetY = 0;
        this.spriteId = 0;
        this.walkable = true;
    },
    t1: function (x,y){
        this.x = x;
        this.y = y;
        this.offsetX = 0;
        this.offsetY = 0;
        this.spriteId = 1;
        this.walkable = false;
    }
};
window.onload = function launch(){
    iwe.fillModel(map, tiles);
    function redraw(){
        iwe.CLEAR();
        iwe.DRAW.all();
        pushHero();
    }

    var HERO = {
        x: 0,
        y: 0,
        spriteId: 2,
        offset: {x: 15, y: -40}
    };

    function pushHero(){
        var coor = iwe.TRANSFORM.toIso(HERO.x, HERO.y);
        coor.x += HERO.offset.x;
        coor.y += HERO.offset.y;
        iwe.DRAW.image(iwe.images[HERO.spriteId], coor.x, coor.y);
    }
    function collision (x,y){
        if(!iwe.getTile(x,y).walkable){
            console.log('Collision on '+x+':'+y);
            return false;
        }else{
            return true;
        }
    }
    function moveHero(e){
        if (e.keyCode === 38) {         //up
            if(collision(HERO.x,HERO.y-1)){HERO.y --;}
        } else if (e.keyCode === 40) { //down
            if(collision(HERO.x,HERO.y+1)){HERO.y ++;}
        } else if (e.keyCode === 37) { //left
            if(collision(HERO.x-1,HERO.y)){HERO.x --;}
        } else if (e.keyCode === 39) { //right
            if(collision(HERO.x+1,HERO.y)){HERO.x ++;}
        }
        redraw();
    }

    window.onkeydown = moveHero;
    redraw();
};