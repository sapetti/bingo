window.onload = function() {
  
  const startButton = document.getElementById('startup')
  const nextButton = document.getElementById('next')
  const selectedSection = document.getElementById('selected')
  const scoreboardSection = document.getElementById('scoreboard')
  let confetti = null
  let bigShowTimeout = null
  const NUMBERS = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
  let state = []
  
  Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
  }
  
  function setSelectedNumbers() {
    selectedSection.innerHTML = state.join(', ')
  }
  
  function setScoreBoard(value) {
    scoreboardSection.innerHTML = value
  }

  function isComplete() {
    return NUMBERS.length == state.length
  }

  function setNextButtonDisabled(state) {
    nextButton.disabled = state
  }

  function bigEndShow() {
    setNextButtonDisabled(true)
    bigShowTimeout = setTimeout(() => {
      setScoreBoard('🏆')
      confetti = new ConfettiGenerator({ target: 'confetti-canvas' })
      confetti.render()
    }, 2500)
  }
  
  function start() {
    state = []
    setScoreBoard('🤪')
    setSelectedNumbers()
    setNextButtonDisabled(false)
    confetti && confetti.clear()
    confetti = null
    bigShowTimeout && clearTimeout(bigShowTimeout)
    bigShowTimeout = null
  }
  
  function next() {
    if(isComplete()) return
    const number = NUMBERS
    .filter( x => !state.includes(x))
    .random()
    state.push(number)
    setScoreBoard(number)
    setSelectedNumbers()
    if(isComplete()) bigEndShow()
  }

  startButton.addEventListener('click', start)
  nextButton.addEventListener('click', next)
  document.addEventListener('keydown', function(event) {
    
    if (event.defaultPrevented) {
      return; // Should do nothing if the default action has been cancelled
    }
    
    var handled = false
    const key = event.key ? event.key
                          : event.keyCode
    if (key == " " || key == "32") {
      if(isComplete()) {
        start()
      } else {
        next()
      }
      handled = true
    }

    if (handled) {
      // Suppress "double action" if event handled
      event.preventDefault();
    }
  }, true)
  start()
}