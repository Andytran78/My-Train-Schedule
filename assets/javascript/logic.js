
	$(document).ready(function() {
	// link to Firebase
		var trainData = new Firebase("https://my-train-schedules.firebaseio.com/");

	// button to add a train
		$("#addTrainBtn").on("click", function() {
			var trainName = $("#trainNameInput").val().trim();
			var destination = $("#destinationInput").val().trim();
			var trainTimeInput = moment($("#trainTimeInput").val().trim(), "HH:mm").subtract(1, "year").format("x");;
			var frequencyInput = $("#frequencyInput").val().trim();

			//create object or data to push to firebase
			var newTrain = {
				name : trainName,
				destination : destination,
				trainTime : trainTimeInput,
				frequency : frequencyInput,
			}
			// pushing train data to firebase.
			trainData.push(newTrain);

				$("#trainNameInput").val("");
				$("#destinationInput").val("");
				$("#trainTimeInput").val("");
				$("#frequencyInput").val("");

				// prevent page from refreshing
				return false;

	});

		//add data to firebase snapshot
		trainData.on("child_added", function(childSnapshot, prevChildKey) {
			var firebaseName = childSnapshot.val().name;
			var firebaseDestination = childSnapshot.val().destination;
			var firebaseTrainTimeInput = childSnapshot.val().trainTime;
			var firebaseFrequency = childSnapshot.val().frequency;
			
			var diffTime = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes");
			var timeRemainder = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes") % firebaseFrequency ;
			var minutes = firebaseFrequency - timeRemainder;

			var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A"); 
			

			//append to the data to the train table

			$("#trainTable > tbody").append("<tr><td>" + firebaseName + "</td><td>" + firebaseDestination + "</td><td>" + firebaseFrequency + " mins" + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");
		});
	
});