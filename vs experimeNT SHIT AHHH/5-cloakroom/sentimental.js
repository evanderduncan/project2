let sentiment;
let statusEl;
let submitBtn;
let inputBox;
let sentimentResult;

function setup() {
  noCanvas();
  // initialize sentiment
  sentiment = ml5.sentiment("movieReviews", modelReady);

  // setup the html environment
  inputBox = createInput(
    "enter sentimental text here to continue"
  );
  inputBox.attribute("size", "75");
  submitBtn = createButton("submit");
  sentimentResult = createP("sentiment score:");

  // predicting the sentiment on mousePressed()
  submitBtn.mousePressed(getSentiment);
}

function getSentiment() {
  // get the values from the input
  const text = inputBox.value();

  // make the prediction
  const prediction = sentiment.predict(text);

  // display sentiment result on html page
  sentimentResult.html("sentiment score: " + prediction.score);
  // display visual sentiment result
  if (prediction.score > 0.5) {
    createP("positive ");
  } else {
    createP("negative ");
  }
}

function modelReady() {
  // model is ready
  statusEl.html("💡 model loaded");
}
