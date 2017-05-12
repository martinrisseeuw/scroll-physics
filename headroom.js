function headroom(element) {
  const className = {
    up: 'scroll-up',
    down: 'scroll-down',
    top: 'scroll-top',
  }
  
  const viewportHeight = window.innerHeight
  const cached = {
    scrollY,
    direction: false,
  }

  return function(event) {
    const speed = checkScrollSpeed()

    if (speed > 8) element.dataset.speed = 'fast'
    if (speed <= 1) element.dataset.speed = 'none'

    const direction = cached.scrollY < scrollY

    if (direction !== cached.direction) {
      element.classList.add(direction ? className.down : className.up)
      element.classList.remove(direction ? className.up : className.down)
      direction && element.classList.remove(className.top)
    }

    if (!direction && scrollY <= 0) element.classList.add(className.top)

    cached.direction = direction
    cached.scrollY = scrollY
  }
}

const checkScrollSpeed = ((settings) => {
  settings = settings || {}
  let lastPos
  let newPos 
  let timer 
  let delta
  let delay = settings.delay || 50

  function clear() {
    lastPos = null
    delta = 0
  }

  clear()

  return function(){
    newPos = window.scrollY;

    if ( lastPos != null ) delta = newPos -  lastPos
    lastPos = newPos
    clearTimeout(timer)
    timer = setTimeout(clear, delay)
    return Math.abs(delta)
  }
})()


