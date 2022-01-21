// select the elements
const quoteText = document.querySelector(".quote");
const qouteBtn = document.querySelector("button");
const authorName = document.querySelector(".author .name");
const soundBtn = document.querySelector(".sound");
const copyBtn = document.querySelector(".copy");
const twitterBtn = document.querySelector(".twitter");

// generate random quote from api
qouteBtn.addEventListener("click", randomQuote);

function randomQuote() {
  qouteBtn.classList.add("loading");
  qouteBtn.innerText = "Loading Quote...";
  fetch(
    "https://api.quotable.io/random?maxLength=100,tags=famous-quotes|inspirational"
  )
    .then((res) => res.json())
    .then((result) => {
      quoteText.innerText = result.content;
      authorName.innerText = result.author;
      qouteBtn.innerText = "New Quote";
      qouteBtn.classList.remove("loading");
    });
}

// speech the text
soundBtn.addEventListener("click", () => {
  let utterance = new SpeechSynthesisUtterance(
    `${quoteText.innerText} by ${authorName.innerText}`
  );
  speechSynthesis.speak(utterance);
});

// copy the text
copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(`${quoteText.innerText}`);
});

// quote post in twitter
twitterBtn.addEventListener("click", () => {
  let tweetUrl = `https://twitter.com/intent/tweet?url=${quoteText.innerText}`;
  window.open(tweetUrl, "_blank");
});
