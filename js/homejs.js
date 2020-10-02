const SoNguoi = 8;

$(document).ready(function(){

	$("#next-month").on("click", function(){
		var datamonth = $("#dataTable tbody").data("month");
		var datayear = $("#dataTable tbody").data("year");
		var datetime = new Date(datayear, datamonth - 1, 1);
		
		//next month
		datetime.setMonth(datetime.getMonth() + 1);

		//set data
		var month = datetime.getMonth();
		var year = datetime.getFullYear();
		$("#title-month").html(month + 1);
		$("#title-year").html(year);
		$("#dataTable tbody").data("month", month + 1);
		$("#dataTable tbody").data("year", year);

		//delete all table data
		$("#dataTable tbody").html("");

		//create day in array
		var arrDay = new Array(0);
		var htmltext = "";
		var firstdayofmonth = datetime.getDay(); // 0 - 6
		var daysinmonth = (new Date(year, month+1, 0)).getDate();
		var lastdayprevmonth = (new Date(year, month, 0)).getDate();
		var nowdate = new Date();
		const origialdate = new Date(2020, 8, 24); // mặc định ngày 24/09/2020 Trí (moth: 0 - 11);
		//console.log("days in month " + (month + 1) + " is " + daysinmonth);

		if (firstdayofmonth == 0) {
			firstdayofmonth = 7;
		}

		for (var i = 1; i <  firstdayofmonth; i++) {
			 htmltext = htmltext + '<td class="prev-month">' + (lastdayprevmonth - firstdayofmonth + i + 1) + '</td>';
		}

		var tdstyle = "";
		for (var i = firstdayofmonth; i < (firstdayofmonth + daysinmonth); i++) {
			var idate = new Date(year, month, (i - firstdayofmonth + 1));
			if (idate.getDate() == nowdate.getDate() && idate.getMonth() == nowdate.getMonth() && idate.getFullYear() == nowdate.getFullYear()) {
				tdstyle = tdstyle + "current-day";
			}
			//console.log(daysdifference(idate, nowdate));

			if (startpoint(daysdifference(idate, origialdate)) >= 0) {
				tdstyle = tdstyle + " event";
			}

			htmltext = htmltext + '<td class=" ' + tdstyle + '">' + (i - firstdayofmonth + 1) + '</td>';
			tdstyle = "";
			if (i%7 == 0) {
				var tableRef = $("#dataTable tbody")[0];
				var newRow   = tableRef.insertRow(tableRef.rows.length);
				newRow.innerHTML = htmltext;
				htmltext = "";
			}
		}

		var lastdayinmonth = new Date(year, month, daysinmonth);
		var lastdayinweek = lastdayinmonth.getDay();

		if (lastdayinweek != 0) {
			for (var i = lastdayinweek; i < 7; i++) {
				htmltext = htmltext + '<td class="next-month">' + (i - lastdayinweek + 1) + '</td>';
			}

			var tableRef = $("#dataTable tbody")[0];
			var newRow   = tableRef.insertRow(tableRef.rows.length);
			newRow.innerHTML = htmltext;
			htmltext = "";
		}

		//register td event click
		registereventtdclick();

	});


	$("#prev-month").on("click", function(){
		var datamonth = $("#dataTable tbody").data("month");
		var datayear = $("#dataTable tbody").data("year");
		var datetime = new Date(datayear, datamonth - 1, 1);
		
		//previous month
		datetime.setMonth(datetime.getMonth() - 1);

		//set data
		var month = datetime.getMonth();
		var year = datetime.getFullYear();
		$("#title-month").html(month + 1);
		$("#title-year").html(year);
		$("#dataTable tbody").data("month", month + 1);
		$("#dataTable tbody").data("year", year);

		//delete all table data
		$("#dataTable tbody").html("");

		//create day in array
		var arrDay = new Array(0);
		var htmltext = "";
		var firstdayofmonth = datetime.getDay(); // 0 - 6
		var daysinmonth = (new Date(year, month+1, 0)).getDate();
		var lastdayprevmonth = (new Date(year, month, 0)).getDate();
		//console.log("days in month " + (month + 1) + " is " + daysinmonth);

		if (firstdayofmonth == 0) {
			firstdayofmonth = 7;
		}

		for (var i = 1; i <  firstdayofmonth; i++) {
			 htmltext = htmltext + '<td class="prev-month">' + (lastdayprevmonth - firstdayofmonth + i + 1) + '</td>';
		}

		for (var i = firstdayofmonth; i < (firstdayofmonth + daysinmonth); i++) {
			htmltext = htmltext + '<td>' + (i - firstdayofmonth + 1) + '</td>';
			if (i%7 == 0) {
				var tableRef = $("#dataTable tbody")[0];
				var newRow   = tableRef.insertRow(tableRef.rows.length);
				newRow.innerHTML = htmltext;
				htmltext = "";
			}
		}

		var lastdayinmonth = new Date(year, month, daysinmonth);
		var lastdayinweek = lastdayinmonth.getDay();

		if (lastdayinweek != 0) {
			for (var i = lastdayinweek; i < 7; i++) {
				htmltext = htmltext + '<td class="next-month">' + (i - lastdayinweek + 1) + '</td>';
			}

			var tableRef = $("#dataTable tbody")[0];
			var newRow   = tableRef.insertRow(tableRef.rows.length);
			newRow.innerHTML = htmltext;
			htmltext = "";
		}

		//register td event click
		registereventtdclick();
	});

	var nowdate = new Date();
	$("#dataTable tbody").data("month", nowdate.getMonth());
	$("#dataTable tbody").data("year", nowdate.getFullYear());
	$("#next-month").trigger("click");
})


function registereventtdclick(){
	//Event day is clicked
	$( "#dataTable tbody td" ).on( "click", function() {
		var month = $("#dataTable tbody").data("month");
		var year = $("#dataTable tbody").data("year");
		var day = $( this ).text();
		var date = day + "/" + month + "/" + year;
		console.log(date);

		setCookie('day', day, 1);
		setCookie('month', month, 1);
		setCookie('year', year, 1);

		$(location).attr("href", "./table.html");
	});
}


function daysdifference(startDay, endDay) {

	var millisBetween = startDay.getTime() - endDay.getTime();
	var days = millisBetween / (1000 * 3600 * 24);

	return Math.round(Math.abs(days));
}
function startpoint(days) //days: Khoảng cách ngày từ ngày 24/09/2020 Trí
{
	if (days%3 == 0) {
		var pos = (5 * (days / 3)) % SoNguoi;

		return (pos);
	}
	return -1;
}