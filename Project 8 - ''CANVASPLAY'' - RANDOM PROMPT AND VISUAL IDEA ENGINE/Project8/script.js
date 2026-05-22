const colorInput = document.getElementById("strokeColor");
const brushSizeInput = document.getElementById("brushSize");
const penBtn = document.getElementById("pen");
const eraserBtn = document.getElementById("eraser");
const squareBtn = document.getElementById("square");
const cleanUpBtn = document.getElementById("cleanup");
const downloadImageBtn = document.getElementById("downloadImage");

const canvas = document.getElementById("canvas");
// this step will give us a object of canvas
// which has property to write on canvas and a lot of other things

canvas.height = 400;
canvas.width = 800;

const ctx = canvas.getContext("2d");

let currentTool = "pen";


ctx.lineWidth = 5;
ctx.lineCap = "round";
ctx.strokeStyle = "#000000";
let isDrawing = false;

let startX=0;
let startY=0;



function startDraw(e){
    isDrawing = true;
    if(currentTool === "square"){
        startX = e.offsetX;
        startY = e.offsetY;
        return;
    }
    
    ctx.beginPath();
    ctx.moveTo(e.offsetX,e.offsetY)

}

function draw(e){
    
    if(!isDrawing || currentTool === "square") return;
    ctx.strokeStyle = currentTool === "eraser" ?" #ffffff ": colorInput.value;
    ctx.lineWidth = brushSizeInput.value;
    ctx.lineTo(e.offsetX,e.offsetY)
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.offsetX,e.offsetY);  
}



function stopDraw(e){
    if(currentTool === "square"){
    let endX=e.offsetX;
    let endY=e.offsetY;
    let width=endX-startX;
    let height=endY-startY;
    ctx.beginPath();
    ctx.rect(startX,startY,width,height);
    ctx.stroke();
    ctx.closePath();
    }
    isDrawing = false;

}

function canvasLeft(){
    isDrawing = false;

}

penBtn.addEventListener("click",()=>{
    currentTool = "pen";
    squareBtn.classList.remove("activeBtn");
    eraserBtn.classList.remove("activeBtn");
    penBtn.classList.add("activeBtn");
})

eraserBtn.addEventListener("click",()=>{
    currentTool = "eraser";
    penBtn.classList.remove("activeBtn");
    squareBtn.classList.remove("activeBtn");
    eraserBtn.classList.add("activeBtn");
})

squareBtn.addEventListener("click",()=>{
    currentTool = "square";
    penBtn.classList.remove("activeBtn");
    eraserBtn.classList.remove("activeBtn");
    squareBtn.classList.add("activeBtn");



})

cleanUpBtn.addEventListener("click",()=>{
    ctx.clearRect(0,0,canvas.width,canvas.height);
})

downloadImageBtn.addEventListener("click",()=>{
    const link = document.createElement("a");
    link.download = "image.jpg";
    link.href = canvas.toDataURL();
    link.click();
    link.remove();
})


// downloadImageBtn.addEventListener("click", function () {
//   const link = canvas.toDataURL("image/png");
//   const anchorTag = document.createElement("a");
//   anchorTag.href = link;
//   anchorTag.download = "Drawing.png";
//   document.body.appendChild(anchorTag);
//   anchorTag.click();
//   document.body.removeChild(anchorTag);
// });



canvas.addEventListener('mousedown' , startDraw);
canvas.addEventListener('mousemove',draw)
canvas.addEventListener('mouseup',stopDraw)
canvas.addEventListener('mouseleave',canvasLeft)