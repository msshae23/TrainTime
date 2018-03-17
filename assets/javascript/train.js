 var config = {
    apiKey: "AIzaSyAtHvy0QuN4VUM422h5B-wTQUZSBAcgzco",
    authDomain: "train-tracker-4f3fe.firebaseapp.com",
    databaseURL: "https://train-tracker-4f3fe.firebaseio.com",
    projectId: "train-tracker-4f3fe",
    storageBucket: "train-tracker-4f3fe.appspot.com",
    messagingSenderId: "888871708313"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  var trainName = "";
  var trainFreq = 0;
  var trainArrival = "";
  var trainDest = "";

  //capturing button click
  $("#submitButton").on("click", function(){
  	event.preventDefault();
  	//grab input values
  	trainName = $("#tNameInput").val().trim();
  	trainFreq = $("#tFrequencyInput").val().trim();
  	trainDest = $("#tDestinationInput").val().trim();
  	trainArrival = moment($("#tArvlInput").val().trim(), "HH:mm").format("");

  	database.ref().push({
  		trainName: trainName,
  		trainFreq: trainFreq,
  		trainArrival: trainArrival,
  		trainDest: trainDest,
  		dateAdded:firebase.database.ServerValue.TIMESTAMP

  	});
  	return false;
  });


database.ref().on("child_added", function(snapshot) {
  console.log(snapshot.val());

  // update the variable to match firebase
  trainName = snapshot.val().trainName;
  destination = snapshot.val().trainDest;
  firstTrainTime = snapshot.val().trainArrival;
  frequency = snapshot.val().trainFreq;

//creating variables for changing arrival times 
  var firstTrainMoment = moment(firstTrainTime, "HH:mm");
  var nowMoment = moment(); 

  var minutesSinceFirstArrival = nowMoment.diff(firstTrainMoment, "minutes");
  var minutesSinceLastArrival = minutesSinceFirstArrival % frequency;
  var minutesAway = frequency - minutesSinceLastArrival;

  var nextArrival = nowMoment.add(minutesAway, "minutes");
  var formatNextArrival = nextArrival.format("HH:mm");


 var sv = $('<tr>');
  var a = $('<td>');
  var b = $('<td>');
  var c = $('<td>');
  var d = $('<td>');
  var e = $('<td>');
  a.append(trainName);
  b.append(destination);
  c.append(frequency);
  d.append(formatNextArrival);
  e.append(minutesAway);
  sv.append(a).append(b).append(c).append(d).append(e);
  $("#addedTrains").append(sv);


})