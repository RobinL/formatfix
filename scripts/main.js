$(function() {

	$.get('ajax/formatssmall.txt', processData)


});

function processData(data) {

	var myArray = [];
	myArray = data.split("value");

	myArray = _.filter(myArray, function(text) {


		return text.trim() !== "";
	})

	

	_.forEach(myArray, function(element, index, list) {
		myArray[index] = [];
		myArray[index] = element.split("\n")

		myArray[index] = _.filter(myArray[index], function(text) {
			return text.trim() !== "";
		})

		myArray[index] = _.map(myArray[index], function(text) {
			return text.trim();
		})

	})

	//myArray is now a two dimensional array with each format as the first index, and each part of the format as the second index

}