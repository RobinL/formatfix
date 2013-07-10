$(function() {

	$.get('ajax/formatssmall.txt', processData)


});

function processData(data) {

	var myArray = [];
	myArray = toTwoDimenstions(data);
	//myArray is now a two dimensional array with each format as the first index, and each part of the format as the second index
	

	//Group formats if they contain the same values
	myArray = toGroups(myArray);

	//Now we want to take the groups, and in each one, get a list of variables to which this format applies
	

	var myArray2 = {};

	_.forEach(myArray, function(element, index, list){

			myArray2[index] = {};
			myArray2[index].varslist = [];
			myArray2[index].format = [];

		_.forEach(myArray[index], function (element2, index2, list2) {
			

			myArray2[index].varslist.push(element2[0]);
			myArray2[index].format = _.last(element2,element2.length-1);

		})
	
	});
	
	debugger;
	





}

function toTwoDimenstions(data) {

	//takes initial values, splits by the word 'value' and newlines, and trims
	var myArray = [];
	myArray = data.split(/\n\svalue/);

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

	return myArray

};

function toGroups(arr)
{
	return _.groupBy(arr, function(elem) {
		var first = _.first(elem);
		return _.reduce(elem, function(memo, elem2) {
				return elem2 == first ? "" : memo + elem2;
			}
			, "");
	})
}