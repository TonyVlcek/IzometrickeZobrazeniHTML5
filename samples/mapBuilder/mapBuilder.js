/**
 * Created by Tonny on 13.5.14.
 */

iwe.INIT({
    canvas: 'mapBuilder',
    tile: {width: 52, height: 30},
    startAt: {x: 500, y: 100},
    fullScreen: false
});
iwe.loadImages('./samples/mapBuilder/images/', [   'block.png','hero.png','highlite.png',
    'menu_1.png','menu_2.png'
]);
var map = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,1,1,1,0,0,0,0,1,1,0,0,0,0,0,0],
    [0,0,1,1,1,0,0,0,0,0,1,1,0,0,0,0,0],
    [0,0,0,1,0,0,0,0,0,1,0,1,0,0,0,0,0],
    [0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,1,1,1,0,0,1,1,1,0,1,1,1,0,0,0],
    [0,0,1,1,1,0,0,0,1,0,0,1,0,1,0,0,0],
    [0,0,1,1,1,0,0,0,1,0,0,1,1,1,0,0,0],
    [0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0]
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
        this.offsetY = 20;
        this.spriteId = 0;
        this.walkable = true;
    }
};

window.onload = function launch(){
    iwe.fillModel(map, tiles);
    function redraw(){
        iwe.CLEAR();
        iwe.DRAW.all();
        pushHero();
        pushMenu();
    }

    var mouse_x, mouse_y, isDraged = false, changeOffset = 0;

    function getMouseCoor(e){
        var x, y;
        if (e.pageX !== undefined && e.pageY !== undefined) {
            x = e.pageX;
            y = e.pageY;
        }else {
            x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        return {x: x, y: y};
    }

    function canvasMouseDown(e){
        var coor = getMouseCoor(e);
        mouse_x = coor.x;
        mouse_y = coor.y;
        iwe.Canvas.onmousemove = mapShift;
    }

    function canvasMouseUp(e){
        iwe.Canvas.style = 'cursor: default;';
        iwe.Canvas.onmousemove = tileHighlite;
    }
    function canvasClick(e){
        if(!isDraged){
            var mouseCoor = getMouseCoor(e);
            //MENU
            if(mouseCoor.x >= 50 && mouseCoor.x <=100 && mouseCoor.y >= 30 && mouseCoor.y <= 80){//the first button
                changeOffset = 10;
            }else if (mouseCoor.x >= 50 && mouseCoor.x <=100 && mouseCoor.y >= 80 && mouseCoor.y <= 130){
                changeOffset = -10;
            }
            var coor = iwe.TRANSFORM.toModel(mouseCoor.x, mouseCoor.y);
            var tile = iwe.getTile(coor.x, coor.y);
            tile.offsetY += changeOffset;
            redraw();
        }
        isDraged = false;
    }
    function mapShift(e){
        isDraged = true;
        iwe.Canvas.style = 'cursor: move;';
        var coor = getMouseCoor(e);
        iwe.Map.offset.x -= mouse_x - coor.x;
        iwe.Map.offset.y -= mouse_y - coor.y;
        mouse_x = coor.x;
        mouse_y = coor.y;
        redraw();
    }
    function tileHighlite(e){
        var mouseCoor = getMouseCoor(e);
        var preCoor = iwe.TRANSFORM.toModel(mouseCoor.x, mouseCoor.y);
        var tile = iwe.getTile(preCoor.x, preCoor.y);
        var coor = iwe.TRANSFORM.toIso(preCoor.x, preCoor.y);
        coor.x += tile.offsetX;
        coor.y -= tile.offsetY;
        redraw();
        iwe.DRAW.image(iwe.images[2],coor.x,coor.y);
    }
    iwe.Canvas.onmousedown = canvasMouseDown;
    iwe.Canvas.onmouseup = canvasMouseUp;
    iwe.Canvas.onmousemove = tileHighlite;
    window.onkeydown = moveHero;
    iwe.Canvas.onclick = canvasClick;

    var HERO = {
        x: 1,
        y: 1,
        w: 30,
        h: 30,
        spriteId: 1,
        offset: {x: 15, y: -40}
    };

    function pushHero(){
        var coor = iwe.TRANSFORM.toIso(HERO.x, HERO.y);
        var tile = iwe.getTile(HERO.x,HERO.y);
        coor.x += HERO.offset.x - tile.offsetX;
        coor.y += HERO.offset.y - tile.offsetY;
        iwe.DRAW.image(iwe.images[HERO.spriteId], coor.x, coor.y);
    }

    function moveHero(e){
        if (e.keyCode === 38) {         //up
            if(iwe.getTile(HERO.x,HERO.y-1).walkable){HERO.y --;}
        } else if (e.keyCode === 40) { //down
            if(iwe.getTile(HERO.x,HERO.y+1).walkable){HERO.y ++;}
        } else if (e.keyCode === 37) { //left
            if(iwe.getTile(HERO.x-1,HERO.y).walkable){HERO.x --;}
        } else if (e.keyCode === 39) { //right
            if(iwe.getTile(HERO.x+1,HERO.y).walkable){HERO.x ++;}
        }
        console.log(HERO.x+':'+HERO.y+' '+iwe.getTile(HERO.x,HERO.y).walkable);
        redraw();
    }
    function pushMenu(){
        iwe.DRAW.image(iwe.images[3], 50, 30);
        iwe.DRAW.image(iwe.images[4], 50, 81);
    }
    pushMenu();
    redraw();
};