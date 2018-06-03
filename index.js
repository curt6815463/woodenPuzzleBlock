var rows = document.querySelectorAll('.row')
var cols = document.querySelectorAll('.col')

var pendingCols = document.querySelectorAll('.pendingOne .col')
let table = []
for(let i = 0 ; i < 10 ; i++){
  table[i] = []
  for(let j = 0 ; j < 10 ; j++){
    table[i][j] = {
      value:0,
      range:{
        startX:0,
        endX:0,
        startY:0,
        endY:0
      }
    }
  }
}

function draw(box) {
  box.shape.some((row, y) => {
    row.some((value, x) => {
      if(value === 1){
        let count = y*3 + x
        pendingCols[count].classList.add('blue')
      }
    })
  })
}

var box = {
  shape:[
    [0,0,1],
    [0,0,1],
    [0,1,1]
  ]
}
// getBoundingClientRect()

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

  console.log(pendingOne.getBoundingClientRect().left);
  console.log(pendingOne.getBoundingClientRect().top);
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

draw(box)
