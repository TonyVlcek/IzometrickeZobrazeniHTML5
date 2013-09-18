<!DOCTYPE html>
<html>
<body>
<head>
<meta http-equiv="content-type" content="text/html; charset=UTF-8">
</head>



<canvas id="myCanvas" width="1000" height="500" style="border:1px solid #000000;">
Your browser does not support the HTML5 canvas tag.
</canvas>

<script type="text/javascript">
<!-- hide for older browser
	 ds = prompt("Zadej délku strany v px:");;
	 pocet_sloupcu = prompt("Zadej počet sloupců:");
	 pocet_radku = prompt("Zadej počet řádků:");
	 
	 
	pocet = pocet_sloupcu * pocet_radku;
	var c=document.getElementById("myCanvas");
	var ctx=c.getContext("2d");
	var fromLeft;
	var vykr_sloupcu = 0;
	var vykr_radku = -1;
	x = 0.86 * ds;
	y = 0.5 * ds;
	
for(var i = 1; i <= pocet; i++ ){	
	
	if(vykr_sloupcu == pocet_sloupcu){
			vykr_sloupcu = 0;
			vykr_radku ++;
	}

	
	fromLeft = 2*x*vykr_sloupcu;
	fromTop = y*vykr_radku;
	
	if(vykr_radku%2){	//lichy radek
		fromLeft = fromLeft-x;
	}
	
	ctx.strokeStyle = "darkgreen";
	ctx.fillStyle="lightgreen";
	ctx.beginPath();
	ctx.moveTo(fromLeft, y+fromTop);
	ctx.lineTo(x+fromLeft,fromTop);
	ctx.lineTo(2*x+fromLeft, y+fromTop);
	ctx.lineTo(x+fromLeft, 2*y+fromTop);
	ctx.closePath();
	ctx.stroke();
	ctx.fill();
	
	ctx.font="30px Arial";
	ctx.fillStyle="blue";
	
	vykr_sloupcu ++; 
}	
-->
</script>
</body>
</html>