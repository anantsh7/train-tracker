// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
var config = {
  apiKey: "AIzaSyASAuq5V9PH3MNg1EmYnFbHqvz8PwkKeRY",
  authDomain: "train-times-e0a92.firebaseapp.com",
  databaseURL: "https://train-times-e0a92.firebaseio.com",
  projectId: "train-times-e0a92",
  storageBucket: "train-times-e0a92.appspot.com",
  messagingSenderId: "908659063225",
}

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Train
$("#add-train-btn").on("click", function (event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDest = $("#dest-input").val().trim();
  var trainFreq = $("#frequency").val().trim();
  var trainNext = $("#next-input").val().trim();


  var newTrain = {
    name: trainName,
    destination: trainDest,
    frequency: trainFreq,
    nextArrival: trainNext,
  };


  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.frequency);
  console.log(newTrain.nextArrival);

  alert("You've added a train!");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#dest-input").val("");
  $("#frequency").val("");
  $("#next-input").val("");
});

database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainFreq = childSnapshot.val().frequency;
  var trainDest = childSnapshot.val().destination;
  var trainNext = childSnapshot.val().nextArrival;


  console.log(trainName);
  console.log(trainDest);
  console.log(trainFreq);
  console.log(trainNext);

  var trainNextPretty = (moment(trainNext, 'HH:mm').format('hh:mm a'));

  var trainAway = moment().diff(moment(trainNext, "X"), "minutes");
  console.log(trainAway);

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDest),
    $("<td>").text(trainFreq),
    $("<td>").text(trainNextPretty),
    $("<td>").text(trainAway),
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});