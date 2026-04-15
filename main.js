let padKeys = document.querySelectorAll(".key");
// servira à calculer le timing/////////////////////////////////
let startTime = 0;
// tableau qui stocke les touches jouées //////////////
let recordedSequence = [];
// indique si on est en train d'enregistrer ou non///////////
let isRecording = false;

addEventListener("keydown", handleKeyDownEvent);
addEventListener("keyup", handleKeyUpEvent);

///////////////////////////////////////////////////////////////////////////////////////
function handleKeyDownEvent(event) {
  // console.log(event);
 // eviter les repetions automatique:
  if (event.repeat) return;

  // récupère la valeur de l'attribut data-key du bouton cliqué
  // OU on récupère le code de la touche clavier///////////////////////////////
  let keyCode = event.keyCode;

  hub(keyCode);
 
}

// EVENEMENT DE CLICK

padKeys.forEach(key => {
  key.addEventListener("click",handleClickKey);
});

function handleClickKey(event) {
  const padKey = event.target.closest('[data-key]');
  if (!padKey) return;
  
  let keyCode = parseInt(padKey.dataset.key) ;
  
  hub(keyCode);
  
  setTimeout(() => {
    removeAnimation(keyCode);
  }, 200);
  
}

/////FONCTION "ACCUEIL" QUI REDIRIGE VERS LE BON SERVICE///////////
function hub(keyCode) {

  
  // Gestion des touches spéciales////////////////:::
  // lance ou arrete l'enregistrement////////////////////
  if (keyCode === 82) {
    record(keyCode);
    return;
  }
  // rejoue la sequence/////////////////////////////////
  if (keyCode === 80) {
    play(keyCode);
    return;
  }

  playSound(keyCode)

}


/////FONCTION JOUE UN SON///////////
function playSound(keyCode) {
  // cherche dans le html un élément <audio> qui possède le même data-key que le bouton
  let audio = document.querySelector(`audio[data-key="${keyCode}"]`);

  // si aucun son on quitte//////////
  if (!audio) return;
  // sinon remmettre le son au début et le joue/////////
  audio.currentTime = 0;
  audio.play();

  //////////////////////enregistrement avec timing////////

  if (isRecording) {
    let time = Date.now() - startTime;
    // si en mode enregistrement, stocke la touche ?????stocker le temps///////////

    // recordedSequence.push({keyCode, time});
    recordedSequence.push({ key: keyCode, time: time });
    // recordedSequence.push(keyCode);
    // console.log(recordedSequence);
  }

   // // effet visuel///////////////////////////////////////////////////////////////////
  let padKey = document.querySelector(`div[data-key="${keyCode}"]`);
  padKey.classList.add("playing");

}

// ********************************************
/////FONCTION RECORD()///////////
function record(keyCode) {
  let padKey = document.querySelector(`div[data-key="${keyCode}"]`);
  // ajoute ou enleve l'effet visuel///////////////////////////////////////////////
  padKey.classList.toggle("playing");

  // change l'état ON/OFF /////////////////
  isRecording = !isRecording;

  //???????debut de l'enregistrement////////////////////
  if (isRecording) {
    // réinitialise l'enregistrement/////
    recordedSequence = [];

    startTime = Date.now();

    console.log(" Recording START");
    // fin d'enregistrement//////////////////////////
  } else {
    // affiche la séquence enregistrée///////////////
    console.log("Recording STOP");
    console.log(recordedSequence);
  }
}
// *****************************************
// FONCTION PLAY::::::::::::::::::
/////////////////////////////////
function play(keyCode) {
  let padKey = document.querySelector(`div[data-key="${keyCode}"]`);
  // ajoute l'effet visuel///////////////////////////////////////////////
  padKey.classList.add("playing");

  // parcourt toutes les touches enregistrées///////////////////
  recordedSequence.forEach((touche) => {
    setTimeout(() => {
      // simuler un appui clavier = céé un faux événement keydown////////////////////////////////////////
      let eventKeydown = new KeyboardEvent("keydown", {
        keyCode: touche.key,
      });
      //simuler le relâchement ///////////////////////////////////////
      let eventKeyup = new KeyboardEvent("keyup", {
        keyCode: touche.key,
      });
      // lance le son et stoppe l'effet après 200 ms////////////////////////////////
      dispatchEvent(eventKeydown);
      setTimeout(() => {
        dispatchEvent(eventKeyup);
      }, 200);
    }, touche.time);
  });

  setTimeout(() => {
    padKey.classList.remove("playing");
  }, recordedSequence[recordedSequence.length - 1].time);
  
  
}

// ////FONCTION HANDELSTOPEFFECT ********************************

function handleKeyUpEvent(event) {
  // console.log(event);
  let keyCode = event.keyCode;

  removeAnimation(keyCode);
  
}

function removeAnimation(keyCode) {
  // recupère la touche ////////////////////////////
  let padKey = document.querySelector(`div[data-key="${keyCode}"]`);
  // conditions:
  // ignore si pas de bouton associé // si touche R//////////////////////
  if (!padKey || keyCode === 82 || keyCode === 80) return;
  // retirer l'effet visuel///////////////////////////////////////////////
  padKey.classList.remove("playing");
}



