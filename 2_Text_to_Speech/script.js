const textarea = document.querySelector("textarea");
const speechBtn = document.querySelector("button");
const voiceList = document.querySelector("select");
let isSpeaking = true;

function textToSpeech(text) {
  let utterance = new SpeechSynthesisUtterance(text);
  for (let voice of speechSynthesis.getVoices()) {
    if (voice.name === voiceList.value) {
      utterance.voice = voice;
    }
  }
  speechSynthesis.speak(utterance);
}

function voices() {
  for (let voice of speechSynthesis.getVoices()) {
    let selected =
      voice.name === "Microsoft Mark - English (United States)"
        ? "selected"
        : "";
    let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
    voiceList.insertAdjacentHTML("beforeend", option);
  }
}

speechBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (textarea.value != "") {
    if (!speechSynthesis.speaking) {
      textToSpeech(textarea.value);
    }

    if (textarea.value.length > 80) {
      if (isSpeaking) {
        speechSynthesis.resume();
        isSpeaking = false;
        speechBtn.innerText = "Pause Speech";
      } else {
        speechSynthesis.pause();
        isSpeaking = true;
        speechBtn.innerText = "Resume Speech";
      }
    }

    setInterval(() => {
      if (!speechSynthesis.speaking && !isSpeaking) {
        isSpeaking = true;
        speechBtn.innerText = "Convert To Speech";
      }
    });
  }
});

speechSynthesis.addEventListener("voiceschanged", voices);
