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

// function iwe (){} var a = new iwe();
//TODO [first]: iwe => this - better construction
//TODO [second]: napsat si getter na buňku => všude, kde se dotazuji na určitou buňku v poli se bude volat getter
//TODO [third]: plnění modelu nechat na uživateli => metoda fillModel půjde pryč z enginu
//TODO [fourth]: fillModel rozdělím na dvě -> jedna bude obsahovat cykly a druhá tu akci uvnitř (ta bude později callbackem) a poté vrátim vnější funkci zpět do enginu

function Iwe(){
    /*private variables*/
    var that = this;
    this.isVisibleOffset = 50; //only for betatesting

     this.tile = {
         width: null,
         height: null
     };
     this.Canvas = {
         ctx: null
     };
     this.Map = {
         offset: {x: 0, y: 0}
     };
     this.Model = [];
     this.images = []; //TODO: jednotný coding style
     this.isVisible = function (x, y) {
         if ((x + this.Map.offset.x + this.tile.width - this.isVisibleOffset >= this.Map.offset.x)
             && (x + this.Map.offset.x <= this.Map.offset.x + this.Canvas.width - this.isVisibleOffset)
             && (y + this.Map.offset.y >= this.Map.offset.y)
             && (y + this.Map.offset.y <= this.Map.offset.y + this.Canvas.height - this.isVisibleOffset)) {
             return true;
         }
         else{
             return false;
         }
     };
     this.loadImages = function (imagesDir, array) {
         var images, remaining = array.length, i;
         for (i = 0; i < array.length; i++){
             this.images[i] = new Image();
             this.images[i].src = imagesDir+array[i];
             remaining --;
             //this.imagesLoaded = remaining === 0 ? true : false;
         }
     };
     this.TRANSFORM = {
         toIso: function (x, y){
             var isoX = ((x-y) * (that.tile.width / 2)) + that.Map.offset.x;
             var isoY = (((x+y)) * (that.tile.height / 2)) + that.Map.offset.y;
             return {x: isoX, y: isoY};
         },
         toModel: function(x,y){
             x -= that.Map.offset.x;
             y -= that.Map.offset.y;
             var modelX = Math.round(((x/(that.tile.width/2)) + (y/(that.tile.height/2)))/2 - 1);
             var modelY = Math.round(((y/(that.tile.height/2))- (x/(that.tile.width/2)))/2);
             return {x: modelX, y: modelY};
         }
    };
    this.DRAW = {
        image: function (url, x, y){
             if(that.isVisible(x, y)){
                 that.Canvas.ctx.drawImage(url, x, y);
                 return true;
             }else {
                 return false;
             }
        },
        tile: function (tile){
             var isoCoor = that.TRANSFORM.toIso(tile.x, tile.y);
             isoCoor.x -= tile.offsetX;
             isoCoor.y -= tile.offsetY;
             that.DRAW.image(that.images[tile.spriteId], isoCoor.x, isoCoor.y);
        },
        all: function (callback){
             for(var y=0; y < that.Model.length; y++){
                 for(var x=0; x < that.Model[y].length; x++){
                     if (typeof(callback) == "function"){
                         callback(x,y);
                     }
                     else {
                         that.DRAW.tile(that.Model[y][x]); //TODO: here will be called a callback from user, which will be initialized in World class
                     }
                 }
             }
         }
    };
    this.CLEAR = function(){
         this.Canvas.ctx.clearRect(0, 0, this.Canvas.width, this.Canvas.height);
    };
    this.EXPORT = function(){
        /*
         * EXPORT FUNCTION
         * The result (XML or JSON) will be returned -> usage is up to user
         */
        return JSON.stringify(this.Model);
    };
    this.IMPORT = function(source) {
        /*
        * IMPORT FUNCTION
        * It will set iwe.Model to the correct structure and reread the scene
        */
        iwe.Model = JSON.parse(source);
    };
    this.getTile = function(x,y){
        return this.Model[x][y];
    };
    this.fullScreen = function(){
         document.body.style.margin = "0";
         document.body.style.padding = "0";
         document.body.style.height = window.innerHeight;
         document.body.style.width = window.innerWidth;
         document.body.style.overflow = "hidden";
         this.Canvas.height = window.innerHeight;
         this.Canvas.width = window.innerWidth;
         this.Canvas.style = 'position: absolute; \n\
                             top: 0; left: 0; \n\
                             width: 100%; height: 100%; ';
         window.scrollTo(0, 1);
    };
    this.fillModel = function (map, tiles){
      for (var i = 0; i < map.length; i++) {
             this.Model.push([]);
             for (var j = 0; j < map[i].length; j++) {
                 var tile = new tiles['t'+map[i][j]](i,j);
                 this.Model[i].push(tile);
             }
         }
    };
    this.INIT = function(init) {
         this.Canvas = document.getElementById(init.canvas);
         this.Canvas.ctx = this.Canvas.getContext("2d");
         //iwe.loadImages(init.imagesDir, init.images);
         this.tile.width = init.tile.width;
         this.tile.height = init.tile.height;
         this.Map.offset = init.startAt;
         //iwe.loadMap (init.map,init.startMapAt.x, init.startMapAt.y);
         if(init.fullScreen){
             iwe.fullScreen();
         }
    };
}
