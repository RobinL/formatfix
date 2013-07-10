$(function() {

	$.get('ajax/formats.txt', processData)


});

function processData(data) {

	var myArray = [];
	myArray = toTwoDimenstions(data);
	//myArray is now a two dimensional array with each format as the first index, and each part of the format as the second index
	
	
	//Group formats if they contain the same values
	myArray = toGroups(myArray);

	//Now we want to take the groups, and in each one, get a list of variables to which this format applies, and a format
	


	var myObject = {};

	myObject = toObject(myArray);
	debugger;

	var defineString = textDefineFormats(myObject);
	$("#div1").html(defineString);

	

	
	


	var applyString = textApplyFormats(myObject);
	$("#div2").html(applyString);


	var tabString = tabulateFormats(myObject);
	$("#div3").html(tabString);

	$("#div3").select()

	var tabString2 = tabulateFormatsDetail(myObject);
	$("#div4").html(tabString2);

	var tabString3 = tabulateFormatsVariableLink(myObject);
	$("#div5").html(tabString3);
	

}

function toTwoDimenstions(data) {

	//takes initial values, splits by the word 'value' and newlines, and trims
	var myArray = [];
	myArray = data.split(/\n\s{1,}value/);

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

function toGroups(arr) {
	return _.groupBy(arr, function(elem) {
		var first = _.first(elem);
		return _.reduce(elem, function(memo, elem2) {
				return elem2 == first ? "" : memo + elem2;
			}
			, "");
	})
}

function toObject(arr) {

	var myObject = {};

	_.forEach(arr, function(element, index, list){

			
			
			myObject["fmt"+element[0][0]] = {};
			myObject["fmt"+element[0][0]].varslist = [];
			myObject["fmt"+element[0][0]].format = [];

		_.forEach(arr[index], function (element2, index2, list2) {
			

			myObject["fmt"+element[0][0]].varslist.push(element2[0]);
			myObject["fmt"+element[0][0]].format = _.last(element2,element2.length-1);

		})
	
	});

	return myObject;
}

function textDefineFormats(obj) {
	var returnString = "";

	_.forEach(obj, function(element, index, list){
		
		returnString += "VALUE " + index + "<br> ";
		
		_.forEach(element.format, function(element2,index2,list2) {
			returnString += "&nbsp&nbsp" + element2 + " <br>";
		})

		returnString += "<br>"
	
	})
	

	return returnString;

}

function textApplyFormats(obj) {

	var returnString = "";

	_.forEach(obj, function(element, index, list){
		//format Q2AAPERIODTYPEcp Q2AAPERIODTYPE.;
		_.forEach(element.varslist, function(element2,index2,list2) {
			returnString += "format " + element2 + " " + index + ".;<br> ";
		})	
	})

	return returnString;

}

function tabulateFormats(obj) {


var returnString = "<table>";

	_.forEach(obj, function(element, index, list){
		
		returnString += "<tr><td>" + index + "</td><td> ";
		
		_.forEach(element.format, function(element2,index2,list2) {
			returnString += element2 + " <br>";
		})

		returnString += "</td></tr>"
	
	})

	returnString +="</table>"
	debugger;
	return returnString


}

function tabulateFormatsDetail(obj) {

	var returnString = "<table>";

	_.forEach(obj, function(element, index, list){
		
		
		
		_.forEach(element.format, function(element2,index2,list2) {
			returnString += "<tr><td>" + index + "</td>";
			returnString += "<td>"
			returnString += element2.match(/\d{1,}/) ;
			returnString += "</td><td>"
			returnString += element2.match(/'.{1,}/) ;
			returnString += "</td>"
			
		})

		returnString += "</tr>"
	
	})

	returnString +="</table>"

	return returnString


}

function tabulateFormatsVariableLink(obj) {

	var returnString = "<table>";

	_.forEach(obj, function(element, index, list){
		
		
		
		_.forEach(element.varslist, function(element2,index2,list2) {
			returnString += "<tr><td>" + index + "</td><td> ";
			returnString += element2;
		})

		returnString += "</td></tr>"
	
	})

	returnString +="</table>"

	return returnString


}

