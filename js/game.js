const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;
let divSelector = null;
let divMissed = null;

function clearSelection(sel) {
  if (sel == "right" || sel == undefined) { 
    if (divSelector != null) {
      divSelector.text("");
      divSelector.removeClass("target");
    }
  }
  
  if (sel == "wrong" || sel == undefined) {
    if (divMissed != null) {
      divMissed.removeClass("miss");
    }
  }
}

function startGame() {
  clearSelection();

  hits = 0;
  firstHitTime = getTimestamp();
  divSelector = null;
  divMissed = null;

  $("#game-area").removeClass("d-none");
  $("#win-message").addClass("d-none");

  round();
}

function round() {
  clearSelection();

  hits++;

  if (hits <= maxHits) {
    divSelector = $(randomDivId());
    divSelector.addClass("target");
    divSelector.text(hits);
  } else {
    endGame();
  }
}

function endGame() {
  // FIXME: спрятать игровое поле сначала

  const totalPlayedMillis = getTimestamp() - firstHitTime;
  const totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);

  $("#game-area").addClass("d-none");
  $("#win-message").removeClass("d-none");
}

function handleClick(event) {
  const gamefld = $(event.target);

  if (hits > 0 && hits <= maxHits) {
    if (gamefld.hasClass("game-field")) {      
      if (gamefld.hasClass("target")) {
        round();
      } else {
        clearSelection("wrong")
        divMissed = gamefld;
        divMissed.addClass("miss");
      }  
    }
  }
}

function init() {
  $(".game-field").click(handleClick);
  $("#button-reload").click(startGame);  
}

$(document).ready(init);
