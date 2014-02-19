/* 
 .----------------.  .----------------.  .----------------. 
| .--------------. || .--------------. || .--------------. |
| |     _____    | || | _____  _____ | || |  _________   | |
| |    |_   _|   | || ||_   _||_   _|| || | |_   ___  |  | |
| |      | |     | || |  | | /\ | |  | || |   | |_  \_|  | |
| |      | |     | || |  | |/  \| |  | || |   |  _|  _   | |
| |     _| |_    | || |  |   /\   |  | || |  _| |___/ |  | |
| |    |_____|   | || |  |__/  \__|  | || | |_________|  | |
| |              | || |              | || |              | |
| '--------------' || '--------------' || '--------------' |
 '----------------'  '----------------'  '----------------' 

LicenceApache 2.0
Antonín Vlček
Gymnázium Brno-Řečkovice 
RedHat | JCMM | JMK
*/
var iwe = (function () { 
    /*private variables*/
    var tile = {width: 52, height: 30};
    var imagesLoaded = false;
    var aImages = [];
    /*functions*/
    function $(id) {
        return document.getElementById(id);
    }
    /*main object*/
    var iwe = {
        Tile: function (x, y, sprite) {
            this.x = x;
            this.y = y;
            this.sprite = sprite;
        },
        Tiles: { //here will be all your tile prototypes
        },
        Canvas: {
            ctx: null
        },
        Map: {
            offset: {x: 0, y: 0},
            model: []
        },
        Model: {
             
        },
        isVisible: function (x, y) {
            if ((x + iwe.Map.offset.x + tile.width - 100 >= iwe.Map.offset.x) && (x + iwe.Map.offset.x <= iwe.Map.offset.x + iwe.Canvas.width - 100) && (y + iwe.Map.offset.y >= iwe.Map.offset.y) && (y + iwe.Map.offset.y <= iwe.Map.offset.y + iwe.Canvas.height - 100)) {
                return true;
            } else {
                return false;
            }
        },
        images: [],
        loadImages: function (imagesDir, array) {
            var images, remaining = array.length;
            for (var i = 0; i < array.length; i++){
                iwe.images[i] = new Image(); 
                iwe.images[i].src = imagesDir+array[i];
                remaining --;
                imagesLoaded = remaining === 0 ? true : false;
            }
        },
        TRANSFORM: {
            toIso: function (x,y){
                var isoX = ((x-y)*(tile.width/2))+iwe.Map.offset.x; 
                var isoY = (((x+y))*(tile.height/2))+iwe.Map.offset.y;
                return {x: isoX, y: isoY};
            },
            toModel: function(x,y){
                x -= iwe.Map.offset.x;
                y -= iwe.Map.offset.y;
                var modelX = Math.round(((x/(tile.width/2)) + (y/(tile.height/2)))/2 - 1);
                var modelY = Math.round(((y/(tile.height/2))- (x/(tile.width/2)))/2);
                return {x: modelX, y: modelY};
            }
       },
       DRAW: {
           image: function (url,x,y){
                if(iwe.isVisible(x,y)){
                    iwe.Canvas.ctx.drawImage(url, x, y);   
                }
           },
           tile: function (tile){
                var isoCoor = iwe.TRANSFORM.toIso(tile.x, tile.y);
                isoCoor.x -= tile.offset.x;
                isoCoor.y -= tile.offset.y;
                iwe.DRAW.image(iwe.images[tile.spriteId], isoCoor.x, isoCoor.y);
           },
           all: function (){
                for(var y=0; y < iwe.Map.model.length; y++){
                    for(var x=0; x < iwe.Map.model[y].length; x++){ 
                        var tileToDraw = iwe.Tiles['t'+iwe.Map.model[y][x]];
                        tileToDraw.x = y;
                        tileToDraw.y = x;
                        iwe.DRAW.tile(tileToDraw);
                    }
                }
            }
       },
       CLEAR: function(){
            iwe.Canvas.ctx.clearRect(0,0,iwe.Canvas.width,iwe.Canvas.height);
       },
       COLISION: function(x, y){
            if(iwe.Tiles['t'+iwe.Map.model[x][y]].walkable){
                return false;
            }else{
                return true;
            } 
       },
       getTile: function(x,y){
           return iwe.Map.model[x][y];
       },
       loadMap: function (array,offsetX,offsetY){
            iwe.Map.model = array; 
            iwe.Map.offset.x = offsetX;
            iwe.Map.offset.y = offsetY;
       },
       INIT: function(init) {
            iwe.Canvas = $(init.canvas);
            iwe.Canvas.ctx = iwe.Canvas.getContext("2d");
            iwe.loadImages(init.imagesDir, init.images);
            iwe.loadMap (init.map,init.startMapAt.x, init.startMapAt.y);  
        }
   };
    return iwe;
}());


