Webcam.set({
  width: 250,
  height: 250,
  image_format: "png",
  png_quality: 90,
  dest_height: 250,
  dest_width: 250
});

Webcam.attach("#live-cam");

my_model = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/O9oHwyccr/model.json",
model_loaded );

function model_loaded(){
  console.log("model LOADED");
}

function take_snap(){
  console.log("JOEL");
  Webcam.snap((data_uri) => {
    document.getElementById("Snapshot-cam").innerHTML = "<img src='"+data_uri+"' id='result_img'>";
  })
}

function recognize_img(){
  console.log("starting recognition");
  var img = document.getElementById("result_img");
  my_model.classify(img, after_classification);
  //text2speech("HELLO", "Sad");
}

function after_classification(error, results){
  if(!error){
    console.log(results);
  }else{
    console.log(error);
  }
  e1 = results[0].label;
  e2 = results[1].label;

  data = {"Happy": "&#128512;", "Sad": "&#128542;", "Angry": "&#128544;"};

  document.getElementById("prediction-label").innerHTML = e1;
  document.getElementById("prediction-label2").innerHTML = e2;

  document.getElementById("emoji-label").innerHTML = data.e1;
  document.getElementById("emoji-label2").innerHTML = data.e2;

  text2speech(e1, e2);
}

function text2speech(result1, result2){
  texttospeech = window.speechSynthesis;
  pred1 = "First Prediction : "+result1;
  pred2 = "Second Prediction : "+result2;
  my_utterance = new SpeechSynthesisUtterance(pred1+pred2);
  texttospeech.speak(my_utterance);
}