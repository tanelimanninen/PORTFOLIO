//piirretään otsikkopallo
function makeCanvas() {
    var canvas  = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    // circle
    ctx.beginPath();
	// x, y, r, start, stop
	ctx.arc(630,105,100,0,2*Math.PI);
    ctx.fillStyle="#FFFFFF";
    ctx.fill();
	ctx.stroke();
    
    // tekstit palloon
	ctx.fillStyle="#000000";
	ctx.font="35px Arial";
	ctx.fillText("Kaupunki",558,100);

    ctx.fillStyle="#000000";
	ctx.font="30px Arial";
    ctx.fillText("Sovellus",574,130);
}