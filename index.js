var rows = document.querySelectorAll('.row')
var cols = document.querySelectorAll('.col')
var pendingCols = document.querySelectorAll('.pendingOne .col')
var scoreboard = document.querySelector('.scoreboard')
let table = []
let score = 0
for(let y = 0 ; y < 10 ; y++){
  table[y] = []
  for(let x = 0 ; x < 10 ; x++){
    table[y][x] = 0
  }
}



var box = {
  shape:[
    [
      [0,0,1],
      [0,0,1],
      [1,1,1]
    ],
    [
      [1],
      [1],
      [1]
    ],
    [
      [1,1,1]
    ],
    [
      [1,1,1],
      [1,1,1],
      [1,1,1],
    ],
    [
      [1],
      [1],
      [1],
      [1],
      [1]
    ],
    [
      [1,1,1,1,1]
    ],
    [
      [1]
    ],
  ]
}

var box2 = {
  shape:[
    [1],
    [1],
    [1],
    [1]
  ]
}
var pendingBoxComparisonTable = {}
function createPendingBox(pendingBox) {
  for(let i = 0 ; i < 1 ; i++){
    let randNum = Math.floor(Math.random() * (box.shape.length-1 - 0 + 1)) + 0;
    // randNum = 4
    createPendingBoxDom(box.shape[randNum],pendingBox)
    pendingBoxComparisonTable[pendingBox] = box.shape[randNum]
  }
}


function removePendingBoxDom(selectedBox) {
  let removeDom = document.querySelector(`.${selectedBox}`)
  while(removeDom.hasChildNodes()){
    removeDom.removeChild(removeDom.lastChild)
  }
}
function createPendingBoxDom(box,pendingBox) {
  let nodeY
  let nodeX
  box.some((row, y) => {
    nodeY = document.createElement('div')
    nodeY.classList.add('row')
    row.some((value, x) => {
      nodeX = document.createElement('div')
      nodeX.classList.add('col')
      if(value){nodeX.classList.add('blue')}
      nodeY.appendChild(nodeX)

      document.querySelector(`.${pendingBox}`).appendChild(nodeY)
    })
  })
}


// getBoundingClientRect()
var frame = document.querySelector('.frame')
var frameX = frame.getBoundingClientRect().left
var frameY = frame.getBoundingClientRect().top


var pendingOne = document.querySelector('.pendingOne')
var pendingTwo = document.querySelector('.pendingTwo')
var pendingThree = document.querySelector('.pendingThree')
var isMouseDown = false
var startX = 0, startY = 0, endX = 0, endY = 0
var selectedBox = ''
pendingOne.addEventListener('mousedown', function (e) {
  isMouseDown = true
  startX = e.clientX
  startY = e.clientY
  selectedBox = 'pendingOne'
})

pendingTwo.addEventListener('mousedown', function (e) {
  isMouseDown = true
  startX = e.clientX
  startY = e.clientY
  selectedBox = 'pendingTwo'
})

pendingThree.addEventListener('mousedown', function (e) {
  isMouseDown = true
  startX = e.clientX
  startY = e.clientY
  selectedBox = 'pendingThree'
})
function getFullLine() {
  let xFullLine = []
  let yFullLine = []

  for (var i = 0; i < 10; i++) {
    let tempXLineFull = true
    let tempYLineFull = true
    for (var j = 0; j < 10; j++) {
      if(table[i][j] !== 1){
        tempXLineFull = false
      }
      if(table[j][i] !== 1){
        tempYLineFull = false
      }
    }
    if(tempXLineFull){
      xFullLine.push(i)
    }
    if(tempYLineFull){
      yFullLine.push(i)
    }
  }
  return {
    xFullLine:xFullLine,
    yFullLine:yFullLine
  }
}
function clearFullLine(fullLine) {
  fullLine.xFullLine.some((x)=>{
    for(let i = 0 ; i < 10 ; i++){
        table[x][i] = 0
        cols[x*10+i].classList.remove('blue')
    }
  })
  fullLine.yFullLine.some((y)=>{
    for(let i = 0 ; i < 10 ; i++){
        table[i][y] = 0
        cols[y+i*10].classList.remove('blue')
    }
  })

  score += fullLine.xFullLine.length + fullLine.yFullLine.length
  scoreboard.innerHTML = score
}
document.addEventListener('mouseup', function (e) {
  if(isMouseDown){
    isMouseDown = false
    let pendingBox = document.querySelector(`.${selectedBox}`);
    let posX = Math.floor(((pendingBox.getBoundingClientRect().left - frameX) + 25) / 50)
    let posY = Math.floor(((pendingBox.getBoundingClientRect().top - frameY) + 25) / 50)

    let result = fillTable(pendingBoxComparisonTable[selectedBox],{x:posX,y:posY})
    console.log(selectedBox);
    switch (selectedBox) {
      case 'pendingOne':
        pendingBox.style.left = 0 + "px"
        pendingBox.style.top = 0 + "px"
        break;
      case 'pendingTwo':
        pendingBox.style.left = 300 + "px"
        pendingBox.style.top = 0 + "px"
        break;
      case 'pendingThree':
        pendingBox.style.left = 600 + "px"
        pendingBox.style.top = 0 + "px"
        break;
      default:

    }

    if(result === 'success'){
      removePendingBoxDom(selectedBox)
      // createPendingBox(selectedBox)
      clearFullLine(getFullLine())
    }
    
    if(pendingOne.childElementCount === 0 &&
       pendingTwo.childElementCount === 0 &&
       pendingThree.childElementCount === 0){
      createPendingBox('pendingOne')
      createPendingBox('pendingTwo')
      createPendingBox('pendingThree')
    }
  }
})
document.addEventListener('mousemove', function(e) {
  if(isMouseDown){
    endX = e.clientX
    endY = e.clientY

    let offsetX = endX - startX
    let offsetY = endY - startY
    let pendingBox = document.querySelector(`.${selectedBox}`);
    switch (selectedBox) {
      case 'pendingOne':
        offsetX += 0
        break;
      case 'pendingTwo':
        offsetX += 300
        break;
      case 'pendingThree':
        offsetX += 600
        break;
      default:

    }
    pendingBox.style.left = offsetX + "px"
    pendingBox.style.top = offsetY + "px"

  }
});

function fillTable(box,point) {
  let fillGridList = []
  let outOfBound = false
  let boxFillEmpty = true
  box.some((row, y) => {
    row.some((value, x) => {
      if(value === 1){
        if((y+point.y) >= 0 && (x+point.x) >= 0 &&
          (y+point.y) < 10 && ((x+point.x) < 10)){
          if(checkGridEmpty(x+point.x,y+point.y)){
            let count = (y+point.y)*10 + (x+point.x)
            grid = {
              x:x+point.x,
              y:y+point.y,
              count:count
            }
            fillGridList.push(grid)
          }
          else {
            boxFillEmpty = false
          }
        }
        else {
          outOfBound = true
        }

      }
    })
  })
  if(!outOfBound){
    if(boxFillEmpty){
      fillGridList.some((grid)=>{
        cols[grid.count].classList.add('blue')
        table[grid.y][grid.x] = 1
      })
      return 'success'
    }
  }
}
function checkGridEmpty(x,y) {
  if(table[y][x] === 1){
    return false
  }
  else {
    return true
  }
}
createPendingBox('pendingOne')
createPendingBox('pendingTwo')
createPendingBox('pendingThree')
