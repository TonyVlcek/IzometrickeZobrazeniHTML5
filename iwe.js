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
    var imagesLoaded = false;
    var isVisibleOffset = 50; //only for betatesting 
    /*functions*/
    function $(id) {
        return document.getElementById(id);
    }
    /*main object*/
    var iwe = {
        tile: {
            width: null,
            height: null
        },
        Canvas: {
            ctx: null
        },
        Map: {
            offset: {x: 0, y: 0}
        },
        Model: [],
        isVisible: function (x, y) {
            if ((x + iwe.Map.offset.x + iwe.tile.width - isVisibleOffset >= iwe.Map.offset.x) && (x + iwe.Map.offset.x <= iwe.Map.offset.x + iwe.Canvas.width - isVisibleOffset) && (y + iwe.Map.offset.y >= iwe.Map.offset.y) && (y + iwe.Map.offset.y <= iwe.Map.offset.y + iwe.Canvas.height - isVisibleOffset)) {
                return true;
            }
            else{
                return false;
            }
        },
        images: [],
        loadImages: function (imagesDir, array) {
            var images, remaining = array.length, i;
            for (i = 0; i < array.length; i++){
                iwe.images[i] = new Image(); 
                iwe.images[i].src = imagesDir+array[i];
                remaining --;
                imagesLoaded = remaining === 0 ? true : false;
            }
        },
        TRANSFORM: {
            toIso: function (x,y){
                var isoX = ((x-y)* (iwe.tile.width/2))+iwe.Map.offset.x; 
                var isoY = (((x+y))*(iwe.tile.height/2))+iwe.Map.offset.y;
                return {x: isoX, y: isoY};
            },
            toModel: function(x,y){
                x -= iwe.Map.offset.x;
                y -= iwe.Map.offset.y;
                var modelX = Math.round(((x/(iwe.tile.width/2)) + (y/(iwe.tile.height/2)))/2 - 1);
                var modelY = Math.round(((y/(iwe.tile.height/2))- (x/(iwe.tile.width/2)))/2);
                return {x: modelX, y: modelY};
            }
       },
       DRAW: {
           image: function (url,x,y){
                if(iwe.isVisible(x,y)){
                    iwe.Canvas.ctx.drawImage(url, x, y);  
                    return true;
                }else {
                    return false;
                }
           },
           tile: function (tile){
                var isoCoor = iwe.TRANSFORM.toIso(tile.x, tile.y);
                isoCoor.x -= tile.offsetX;
                isoCoor.y -= tile.offsetY;
                iwe.DRAW.image(iwe.images[tile.spriteId], isoCoor.x, isoCoor.y);
           },
           all: function (){
                for(var i=0; i < iwe.Model.length; i++){
                    for(var j=0; j < iwe.Model[i].length; j++){ 
                        iwe.DRAW.tile(iwe.Model[i][j]);
                    }
                }
            }
       },
       CLEAR: function(){
            iwe.Canvas.ctx.clearRect(0,0,iwe.Canvas.width,iwe.Canvas.height);
       },    
       getTile: function(x,y){
           return iwe.Model[x][y];
       },
       fullScreen: function(){
            document.body.style.margin = "0";
            document.body.style.padding = "0";
            document.body.style.height = window.innerHeight;
            document.body.style.width = window.innerWidth;
            document.body.style.overflow = "hidden";
            iwe.Canvas.height = window.innerHeight;
            iwe.Canvas.width = window.innerWidth;
            iwe.Canvas.style = 'border: 0;';
            window.scrollTo(0, 1);
       },
       fillModel: function (map, tiles){
         for (var i = 0; i < map.length; i++) {
                iwe.Model.push([]);
                for (var j = 0; j < map[i].length; j++) {
                    var tile = new tiles['t'+map[i][j]](i,j);
                    iwe.Model[i].push(tile);
                }
            }  
       },
       INIT: function(init) {
            iwe.Canvas = $(init.canvas);
            iwe.Canvas.ctx = iwe.Canvas.getContext("2d");
            //iwe.loadImages(init.imagesDir, init.images);
            iwe.tile.width = init.tile.width;
            iwe.tile.height = init.tile.height;
            iwe.Map.offset = init.startAt;
            //iwe.loadMap (init.map,init.startMapAt.x, init.startMapAt.y);  
            if(init.fullScreen){
                iwe.fullScreen();
            }
       }
   };
    return iwe;
}());





