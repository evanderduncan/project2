const dragImage = document.getElementById("drag-image");

let offsetX, offsetY;

dragImage.addEventListener("mousedown", startDragging);

function startDragging(event){

    offsetX = event.offsetX - dragImage.offsetLeft;
    offsetY = event.offsetY - dragImage;

    document.addEventListener("mousemove", dragImageHandler);
    document.addEventListener("mouseup", stopDragging);
}

function dragImageHandler(event){

const x = event.pageX - offsetX;
const y = event.pageY - offsetY;

dragImage.style.left = x + "px";
dragImage.style.top = y + "px";
}

function stopDragging(event){
    document.removeEventListener("mousemove", dragImageHandler);
    document.removeEventListener("mouseup", stopDragging);

}