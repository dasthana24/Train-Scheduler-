

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD6QldxC1KUA9f4rVP8Lw3e6kD4Iu-uUt4",
    authDomain: "train-3b741.firebaseapp.com",
    databaseURL: "https://train-3b741.firebaseio.com",
    projectId: "train-3b741",
    storageBucket: "train-3b741.appspot.com",
    messagingSenderId: "91556892612"
  };
  firebase.initializeApp(config);

  
  // Create a variable to reference the database
  var database = firebase.database();
  
 
  
  // Capture Button Click
  $("#add-train").on("click", function() {
    // Don't refresh the page!
    event.preventDefault();
  
    // Code in the logic for storing and retrieving the most recent train information
    var train = $("#trainname-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var frequency = $("#frequency-input").val().trim();
    var firstTime = $("#firsttime-input").val().trim();
    
    // Don't forget to provide initial data to your Firebase database. - set replaces old data
    //if you want to add more users than just the latest one, then use push
    //database.ref().set({
    var snapshot = { 
      formtrain: train,
      formdestination: destination,
      formfrequency: frequency,
      formfirsttime: firstTime,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    };
      //this is added so we can get most resent user so we can get most recent user to brower and to do this we need to change the listener  
    database.ref().push(snapshot);
  
    console.log(snapshot.formtrain);
    console.log(snapshot.formdestination);
    console.log(snapshot.formfrequency);
    console.log(snapshot.formfirsttime);
    console.log(snapshot.dateAdded);
  
    // Alert
    // alert("Train was successfully added");
  
    // Clears all of the text-boxes
    $("#trainname-input").val("");
    $("#destination-input").val("");
    $("#frequency-input").val("");
    $("#firsttime-input").val("");
  
  });
  
  
  // Firebase watcher + initial loader 
  database.ref().on("child_added", function(childSnapshot) {  
    var train = childSnapshot.val().formtrain;
    var destination = childSnapshot.val().formdestination;
    var frequency = childSnapshot.val().formfrequency;
    var firstTime = childSnapshot.val().formfirsttime;
  
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);
  
    //determine Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm a"));
  
    //get timer functioning
    $("#timer").text(currentTime.format("hh:mm a"));
  
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
  
    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log("Remainder: " + tRemainder);
  
    //determine Minutes Away
    var minutesAway = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + minutesAway);
  
    //determine Next Train Arrival
    var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm a");
    console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm a"));
  
    
  
  
    //adds back updated information
    $("#train-table > tbody").append( "</td><td>" + train + "</td><td>" + destination + "</td><td>" +
    frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");
  

  
  // If any errors are experienced, log them to console.
  }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
  });
  
  


  function timeUpdater() {
    //empty tbody before appending new information
    $("#train-table > tbody").empty();
    
    database.ref().on("child_added", function(childSnapshot) {  
    var train = childSnapshot.val().formtrain;
    var destination = childSnapshot.val().formdestination;
    var frequency = childSnapshot.val().formfrequency;
    var firstTime = childSnapshot.val().formfirsttime;
  
    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);
  
    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm a"));
    // $("#timer").html(h + ":" + m);
    $("#timer").text(currentTime.format("hh:mm a"));
    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
  
    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log("Remainder: " + tRemainder);
  
    //determine Minutes Away
    var minutesAway = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + minutesAway);
  
    //determine Next Train Arrival
    var nextArrival = moment().add(minutesAway, "minutes").format("hh:mm a");
    console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm a"));
  
  
    $("#train-table > tbody").append("<tr><td>"  + "</td><td>" + train + "</td><td>" + destination + "</td><td>" +
    frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway + "</td></tr>");
  
    })
  };
  

