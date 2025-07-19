let speech = new SpeechSynthesisUtterance();

let voices = [];
let voiceSelect = document.getElementById("voiceSelect");
let rate = document.getElementById("rate");
let pitch = document.getElementById("pitch");
let volume = document.getElementById("volume");
let rateValue = document.getElementById("rateValue");
let pitchValue = document.getElementById("pitchValue");
let volumeValue = document.getElementById("volumeValue");

function populateVoices() {
    voices = window.speechSynthesis.getVoices();
    voiceSelect.innerHTML = "";
    voices.forEach((voice, i) => {
        let option = document.createElement("option");
        option.value = i;
        option.text = `${voice.name} (${voice.lang})${voice.default ? " [default]" : ""}`;
        voiceSelect.appendChild(option);
    });
    // Set the default voice
    if (voices.length > 0) {
        let defaultVoiceIndex = voices.findIndex(v => v.default);
        voiceSelect.selectedIndex = defaultVoiceIndex !== -1 ? defaultVoiceIndex : 0;
        speech.voice = voices[voiceSelect.selectedIndex];
    }
}

populateVoices();
if ('onvoiceschanged' in window.speechSynthesis) {
    window.speechSynthesis.onvoiceschanged = populateVoices;
}

voiceSelect.addEventListener("change", () => {
    speech.voice = voices[voiceSelect.value];
});

rate.addEventListener("input", () => {
    speech.rate = rate.value;
    rateValue.textContent = rate.value;
});
pitch.addEventListener("input", () => {
    speech.pitch = pitch.value;
    pitchValue.textContent = pitch.value;
});
volume.addEventListener("input", () => {
    speech.volume = volume.value;
    volumeValue.textContent = volume.value;
});

// Set initial values
speech.rate = rate.value;
speech.pitch = pitch.value;
speech.volume = volume.value;

document.querySelector("button").addEventListener("click", () => {
    speech.text = document.querySelector("textarea").value;
    if (!speech.text.trim()) {
        alert("Please enter some text to convert to speech.");
        return;
    }
    window.speechSynthesis.cancel(); // Stop any previous speech
    // Always update voice in case the user changed it before clicking
    speech.voice = voices[voiceSelect.value];
    window.speechSynthesis.speak(speech);
});
