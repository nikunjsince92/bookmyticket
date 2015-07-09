var numOfSeats, fullName;
function buildDOM(occupiedchairs) {
				
				var totalRows=10, totalCols=12;
				var col=["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
				var chairWidth=40, chairHeight=40;
                var _html = [], chairNum, className;
				var naming1 = [];
				var _htmlHeader = "", _htmlLeft = "";
				//building the top naming
				for(i=0; i<totalCols; i++){
					var addClassforMargin = "";
					if(i==0) addClassforMargin = "firstElMargin";
					else if(i==5) addClassforMargin = "sixthElMargin";
					else addClassforMargin = "normalMargin";
					_htmlHeader += '<div class="naming '+addClassforMargin+'">'+(i+1)+'</div>';
				}
				$('#horizontal').html(_htmlHeader);
				
				//building the left naming
				for(i=0; i<totalRows; i++){
					var addClassforMargin = "";
					if(i==0) addClassforMargin = "firstElMarginVert";
					else if(i==5) addClassforMargin = "sixthElMarginVert";
					else addClassforMargin = "normalMarginVert";
					_htmlLeft += '<div class="namingVert '+addClassforMargin+'">'+col[i]+'</div>';
				}
				$('#vertical').html(_htmlLeft);
				
				var occChairs = [];
				for(var i=0; i<occupiedchairs.length; i++)
				{
					for(var j=0; j<occupiedchairs[i].seats.length; j++)
					{
							occChairs.push(occupiedchairs[i].seats[j]);
					}	
				}
                for (i = 0; i < totalRows; i++) {
                    for (j = 0; j < totalCols; j++) {
                        chairNum = col[i].concat((j+1).toString());
				//		console.log(chairNum);
                        className = 'chair row-' + i.toString() + ' col-' + j.toString();
                        if ($.isArray(occChairs) && $.inArray(chairNum, occChairs) != -1) {
                            className += ' occupiedChair';
                        }
						
                        _html.push('<li class="' + className + '"' +
                                  'style="top:' + (i * chairHeight).toString() + 'px;left:' + (j * chairWidth).toString() + 'px">' +'<a title="' + chairNum + '"></a>' +
                                  '</li>');
				//		console.log('nik');
                    }
                }
                $('#place').html(_html.join(''));
            };
            //case I: Show from starting
            //buildDOM();
 
            //Case II: If already booked
            var occupiedchairs = [{
					name: "User 1",
					seats: ['A6', 'C9', 'D3']
				},
				{
					name:"User 2",
					seats: ['J5', 'G6', 'F2']
				},
				{
					name:"User 3",
					seats:['A1', 'A2', 'A3']
				}
			];
            buildDOM(occupiedchairs);



$(document).ready(function(){
	
	$(document).on("keypress keyup keydown", "#numOfSeats", function(){
		var value = jQuery(this).val();
		value = value.replace(/[^0-9]+/g, '');
		jQuery(this).val(value);
	});
	
	$("#continue").click(function(){
		numOfSeats = parseInt($("#numOfSeats").val());
		fullName = $("#fullName").val();
		if(fullName=="" || numOfSeats=="")
		{
			alert("Please fill every field");
			return;
		}
		if(numOfSeats !== parseInt(numOfSeats, 10))
		{
			alert("Number of seats should be an integer value");
			return;
		}
		$(".positionHeading").slideUp("slow");
		$(".positionInput").slideUp("slow");
	    $("#page2").fadeIn();
	});

	$(document).on("click", ".chair", function () {
		if ($(this).hasClass('occupiedChair')){
			alert('This seat is already reserved');
		}
		else{
			if($(this).hasClass("selectedChair"))
				$(this).toggleClass('selectedChair');
			else 
			if($(".chair.selectedChair").length>=numOfSeats)
				alert("You have already selected "+numOfSeats+" seats");
			else
				$(this).toggleClass('selectedChair');
		}
	});
	 
	$('#btnShow').click(function () {
		var str = [];
		$.each($('#place li.occupiedChair a, #place li.selectedChair a'), function (index, value) {
			str.push($(this).attr('title'));
		});
		alert(str.join(','));
	});
	 
	$('#btnShowNew').click(function () {
		var str = [], item, count;
		$.each($('#place li.selectedChair a'), function (index, value) {
			item = $(this).attr('title');                   
			str.push(item);                   
		});
		if(str.length!=numOfSeats)
		{
			var r = confirm("You want to proceed with "+str.length+" seats?");
			if (r == false)
				return;
			
		}
		occupiedchairs.push({name:fullName, seats:str});
		makeTable();
		$("#btnShowNew").slideUp(200);
		$("#moreBooking").delay(210).slideDown(200);
		alert(fullName+"\n"+(str.length==0?"No seat selected":str.join(', ')));
	});
	$("#moreBooking").click(function(){
		setTimeout(function(){
			$(".positionHeading").slideDown(200);
			$(".positionInput").slideDown(200);
			$("#btnShowNew").delay(210).slideDown(200);
			$("#moreBooking").slideUp(200);
			buildDOM(occupiedchairs);
		}, 210);
	    $("#page2").fadeOut(200);
	});
	makeTable();
		function makeTable(){
			_htmlfortable="";
			for(var i=0; i<occupiedchairs.length; i++)
						{
							_htmlfortable += "<tr><td>"+occupiedchairs[i].name+"</td><td>"+occupiedchairs[i].seats.join(", ")+"</td></tr>";	
						}
			$("#tablecontents").html(_htmlfortable);
		}
	
	
		
});
