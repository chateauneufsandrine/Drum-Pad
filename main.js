// let padKeys = document.querySelectorAll(".key");
// // let audio = document.querySelector(`.key[data-key ="${event.key}"]`);

// console.log(padKeys);

//  padKeys.forEach(key => {
//     key.addEventListener("click", handleAudioListener);
//  });

//  function handleAudioListener() {
//    //  let  key = event.key;
// document.querySelector("data-key").play();
/////////////////////////////////////////////////////////////////////////////////////
// let padKeys = document.querySelectorAll(".key");
// console.log(padKeys);
// padKeys.forEach((key) => {
//   key.addEventListener("keydown", handleAudioListener);
// });
addEventListener("keydown", handleAudioListener);
addEventListener("keyup", handleStopEffect);

function handleAudioListener(event) {
  console.log(event);
  
  // récupère la valeur de l'attribut data-key du bouton cliqué
  let keyValue = event.keyCode;
  // cherche dans le html un élément <audio> qui possède le même data-key que le bouton
  let audio = document.querySelector(`audio[data-key="${keyValue}"]`);
  audio.play();

  let padKey = document.querySelector(`div[data-key="${keyValue}"]`);
  console.log(padKey);
  padKey.classList.add("playing");
 
}
aa
function handleStopEffect(event) {
  console.log(event);
  
  // récupère la valeur de l'attribut data-key du bouton cliqué
  let keyValue = event.keyCode;
  // cherche dans le html un élément <audio> qui possède le même data-key que le bouton
  let audio = document.querySelector(`audio[data-key="${keyValue}"]`);
  audio.play();

  let padKey = document.querySelector(`div[data-key="${keyValue}"]`);
  console.log(padKey);
   padKey.classList.remove("playing");
}
