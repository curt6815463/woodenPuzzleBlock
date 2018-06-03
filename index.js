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
    [0,0,1],
    [0,0,1],
    [0,1,1]
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
  isMouseDown = false

  let posX = parseInt((pendingOne.getBoundingClientRect().left - frameX) / 50)
  let posY = parseInt((pendingOne.getBoundingClientRect().top - frameY) / 50)


  fillTable(box,{x:posX,y:posY})

  pendingOne.getBoundingClientRect().top - frameY
  pendingOne.style.left = 0 + "px"
  pendingOne.style.top = 0 + "px"


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
  
}

function pendingBoxdraw(box) {
  box.shape.some((row, y) => {
    row.some((value, x) => {
      if(value === 1){
        let count = y*3 + x
        pendingCols[count].classList.add('blue')
      }
    })
  })
}
pendingBoxdraw(box)
console.table(table)
