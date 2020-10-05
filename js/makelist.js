const SoNguoi = 8;

// on load 
$(window).on("load", function(){

	var inday = getCookie("day");
	var inmonth = getCookie("month");
	var inyear = getCookie("year");
	var date = new Date();
	const origialday = new Date(2020, 8, 24); // mặc định ngày 24/09/2020 Trí (moth: 0 - 11);
	if (inday != null && inmonth != null && inyear != null) {
		date = new Date(inyear, inmonth-1, inday);
		console.log("Date from Cookie: " + date.toUTCString());
	}

	console.log("Xuất lịch gác cho ngày: " + date.toUTCString());

	var day = daysdifference(origialday, date);
	var DayofWeek = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
	document.getElementById("date0").innerHTML = DayofWeek[date.getDay()];
	document.getElementById("date1").innerHTML = date.getDate();
	document.getElementById("date2").innerHTML = date.getMonth() + 1;
	document.getElementById("date3").innerHTML = date.getFullYear();


	console.log("khoảng cách ngày: " + day);
	var point = startpoint(day);
	console.log("Vị trí trong mảng: " + point);
	if (point < 0) {
		text = '<td class="text-center" colspan="4">Không có lịch gác</td>'

		var tableRef = document.getElementById('TableList').getElementsByTagName('tbody')[0];
		var newRow   = tableRef.insertRow(tableRef.rows.length);
		newRow.innerHTML = text;

	return;

	}

	makeListOneDay(point);
});


function startpoint(days) //days: Khoảng cách ngày từ ngày 24/09/2020 Trí
{
	if (days%3 == 0) {
		var pos = (5 * (days / 3)) % SoNguoi;

		return (pos);
	}
	return -1;
}

function makeListOneDay(start){
	var name = new Array('Trí', 'Hiếu', 'Khánh', 'Nguyên', 'Quang', 'Nhàn', 'An', 'Huy');
	var fullname = new Array("Lê Hoàng Trọng Trí", 
		"Hồ Hữu Hiếu", 
		"Vũ Quốc Khánh", 
		"Nguyễn Huỳnh Minh Nguyên", 
		"Nguyễn Minh Quang", 
		"Lê Thanh Nhàn", 
		"Đoàn Vương Ngọc An", 
		"Nguyễn Hoàng Huy");
	var time = ["21h30 - 23h30", "23h30 - 01h00", "01h00 - 02h30", "02h30 - 04h00", "04h00 - 06h15"];
	var text = "";
	var count = 0;
	var len = name.length;
	//console.log("Giá trị đầu tiên của mảng: " + name[start]);


	while(count < 5){
		var index = (start + count) % 8;

		// create new list
		text = '<td class="text-center">' + (count + 1) 
		+ "</td><td>" + fullname[index] 
		+ '</td><td class="text-center">' + time[count] 
		+ "</td><td>" + name[index] + "</td>";

		count++;

		var tableRef = document.getElementById('TableList').getElementsByTagName('tbody')[0];
		var newRow   = tableRef.insertRow(tableRef.rows.length);
		newRow.innerHTML = text;
	}

	console.log("Result: " + text);

	return text;			
}

function daysdifference(firstDate, secondDate) {
	var startDay = new Date(firstDate);
	var endDay = new Date(secondDate);

	var millisBetween = startDay.getTime() - endDay.getTime();
	var days = millisBetween / (1000 * 3600 * 24);

	return Math.round(Math.abs(days));
}


function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function deleteCookie(name) {   
    document.cookie = name+'=; Max-Age=-99999999;';  
}
