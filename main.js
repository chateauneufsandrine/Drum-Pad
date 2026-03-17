let padKeys = document.querySelectorAll(".key");
// console.log(padKeys);

addEventListener("keydown", handleAudioListener);
addEventListener("keyup", handleStopEffect);

function handleAudioListener(event) {
  console.log(event);

  // récupère la valeur de l'attribut data-key du bouton cliqué
  let keyValue = event.keyCode;
  // cherche dans le html un élément <audio> qui possède le même data-key que le bouton
  let audio = document.querySelector(`audio[data-key="${keyValue}"]`);

  if (event.repeat) return;
  if (!audio) return;

  audio.currentTime = 0;
  audio.play();

  let padKey = document.querySelector(`div[data-key="${keyValue}"]`);
  console.log(padKey);
  padKey.classList.add("playing");
}
// }

function handleStopEffect(event) {
  // console.log(event);

  let keyValue = event.keyCode;

  let padKey = document.querySelector(`div[data-key="${keyValue}"]`);
  console.log(padKey);
  if (!padKey) return;
  padKey.classList.remove("playing");
}
