/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * 
 * Funkce
*/
function Round (num, precision){
    var val = 1;
    for(var i = 0;i < precision; i++){val = val * 10;}
    return Math.round(num * val) / val;
}
/*---------------/
 * Car class     /
 * --------------/
 */
function cAuto(nadrz, aktualniStav, spotrebaNaSto) {
    this.nadrz = nadrz;
    this.aktualne = aktualniStav;
    this.spotreba = spotrebaNaSto;
}
/*---------------/
 *Benzinka  class/
 * --------------/
 */
function cBenzinka (nadrz, aktualniStav) {
    this.nadrz = nadrz;
    this.aktualne = aktualniStav;
}

/*---------------/
 *cAuto - metody /
 * --------------/
 */
cAuto.prototype.velikostNadrze = function() {
    return this.nadrz;
};
cAuto.prototype.kolikMamPaliva = function() {
    return this.aktualne;
};
cAuto.prototype.jakaJeSpotreba = function() {
    return this.spotreba;
};
cAuto.prototype.kolikSpotrebuje = function (distance) {
    return Round(this.spotreba / 100 * distance, 1);
};
cAuto.prototype.autoJede = function(distance) {
    if (this.aktualne < this.kolikSpotrebuje(distance)) {
        return "Auto ma malo benzinu ("+this.aktualne+" l).\nNa takhle dlouhou cestu by potrebovalo "+this.kolikSpotrebuje(distance)+" l paliva";
    }
    else {
            var fuelUsed = this.kolikSpotrebuje(distance);
            this.aktualne = this.aktualne - fuelUsed;
            return 'Auto ujelo' + distance + 'km \nSpotrebovalo ' + fuelUsed + 'l benzinu \n V nadrzi ma jeste ' + this.aktualne + 'l benzinu';
    }
};
cAuto.prototype.natankuj = function (kolik,odkud) {
    if(kolik > (this.nadrz - this.aktualne)){
        return 'Pretekla by nadrz...';
    }else if(kolik > odkud.aktualne){
        return 'Tolik benzinu neni ani v benzince...';
    }else{
        this.aktualne += kolik;
        odkud.aktualne -= kolik;
        return 'Nacerpano ' + kolik + 'l benzinu. \nV aute ted je ' +this.aktualne+ 'l benzinu \nV benzince ted je ' +odkud.aktualne+ 'l benzinu';
    }
}; 

/*----------------/
 *cBenzinka metody/
 * ---------------/
 */
cBenzinka.prototype.velikostNadrze = function() {
    return this.nadrz;
};
cBenzinka.prototype.kolikMamPaliva = function() {
    return this.aktualne;
};




