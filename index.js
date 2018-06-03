var rows = document.querySelectorAll('.row')
var cols = document.querySelectorAll('.col')
var pendingCols = document.querySelectorAll('.pendingOne .col')
let table = []
for(let y = 0 ; y < 10 ; y++){
  table[y] = []
  for(let x = 0 ; x < 10 ; x++){
    table[y][x] = {
      value:0,
      range:{
        startX:x*50,
        startY:y*50,
        endX:(x+1)*50,
        endY:(y+1)*50
      }
    }
  }
}



var box = {
  shape:[
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0],
    [0,0,1,0,0]
  ]
}
// getBoundingClientRect()
var frame = document.querySelector('.frame')
var frameX = frame.getBoundingClientRect().left
var frameY = frame.getBoundingClientRect().top


var pendingOne = document.querySelector('.pendingOne')
var isMouseDown = false
var startX = 0, startY = 0, endX = 0, endY = 0
pendingOne.addEventListener('mousedown', function (e) {
  isMouseDown = true
  startX = e.clientX
  startY = e.clientY
})
document.addEventListener('mouseup', function (e) {
  if(isMouseDown){
    isMouseDown = false

    let posX = Math.floor(((pendingOne.getBoundingClientRect().left - frameX) + 25) / 50)
    let posY = Math.floor(((pendingOne.getBoundingClientRect().top - frameY) + 25) / 50)

    console.log(posX,posY)
    fillTable(box,{x:posX,y:posY})

    pendingOne.style.left = 0 + "px"
    pendingOne.style.top = 0 + "px"

    // console.log(table)

  }


})
document.addEventListener('mousemove', function(e) {
  if(isMouseDown){
    endX = e.clientX
    endY = e.clientY

    let offsetX = endX - startX
    let offsetY = endY - startY

    pendingOne.style.left = offsetX + "px"
    pendingOne.style.top = offsetY + "px"

  }
});

function fillTable(box,point) {
  box.shape.some((row, y) => {
    row.some((value, x) => {
      if(value === 1){
        if((y+point.y) > 0 && (x+point.x) > 0){
          table[y+point.y][x+point.x] = 1
          count = (y+point.y)*10 + (x+point.x)
          cols[count].classList.add('blue')          
        }
      }
    })
  })
}

function pendingBoxdraw(box) {
  box.shape.some((row, y) => {
    row.some((value, x) => {
      if(value === 1){
        let count = y*5 + x
        pendingCols[count].classList.add('blue')
      }
    })
  })
}
pendingBoxdraw(box)
