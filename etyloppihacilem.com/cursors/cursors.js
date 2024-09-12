var main = document.getElementById("main")
var width = main.offsetWidth
var height = main.offsetHeight

function getRandomUInt(max) {
    return Math.floor(Math.random() * max)
}

function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min)
    const maxFloored = Math.floor(max)
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled) // The maximum is inclusive and the minimum is inclusive
}

var element
for (var i = 0; i < 500; i++) {
    element = document.createElement("img")
    element.setAttribute("src", "cursor-arrow.svg")
    if (/firefox|fxios/i.test(navigator.userAgent)) {
        element.speed_x = getRandomInt(10, 70) / 100
        element.speed_y = getRandomInt(10, 70) / 100
    } else {
        element.speed_x = getRandomInt(40, 120) / 100
        element.speed_y = getRandomInt(40, 120) / 100
    }
    move_child(element, getRandomUInt(width), getRandomUInt(height))
    main.appendChild(element)
}

function move_child(child, x, y) {
    if (x > width) x -= width
    if (x < 0) x += width
    if (y > height) y -= height
    if (y < 0) y += height
    child.style.left = x + "px"
    child.style.top = y + "px"
}

function move_cursors(element, x, y) {
    var rect = element.getBoundingClientRect()
    move_child(element, rect.left + x * element.speed_x, rect.top + y * element.speed_y)
}

var timestamp = null
var lastMouseX = null
var lastMouseY = null
var animationFrameId = null // ID pour requestAnimationFrame

function move(e) {
    if (timestamp === null) {
        timestamp = Date.now()
        lastMouseX = e.screenX
        lastMouseY = e.screenY
        return
    }

    var now = Date.now()
    var dt = now - timestamp
    var dx = e.screenX - lastMouseX
    var dy = e.screenY - lastMouseY
    var speedX = Math.round((dx / dt) * 100)
    var speedY = Math.round((dy / dt) * 100)

    timestamp = now
    lastMouseX = e.screenX
    lastMouseY = e.screenY
    var children = main.children
    for (var i = 0; i < children.length; i++) {
        move_cursors(children[i], speedX, speedY)
    }
}
var visible = true
main.addEventListener("click", (event) => {
    console.log("coucou")
    var elems = document.getElementsByClassName("text")
    if (visible) {
        for (var i = 0; i < elems.length; i++) {
            elems[i].style.opacity = "0"
        }
        visible = false
    } else {
        for (var i = 0; i < elems.length; i++) {
            elems[i].style.opacity = "1"
        }
        visible = true
    }
})
main.addEventListener("mousemove", move)
