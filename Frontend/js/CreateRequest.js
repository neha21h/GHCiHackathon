function foo(gender)
{
	if(gender == "Male")
		$('#radioMale').prop("checked",true);
	else
		$('#radioFemale').prop("checked",true);
}

function deleteAutofill()
{
	document.getElementById("login-form").reset();
	$("#radioNo").prop("checked",true);
}

function deleteRequiredDate()
{
	var labelreqByDate = document.getElementById("labelReqByDate");
	labelreqByDate.style.display = 'none';
}

$(document).ready(function(e)
{
	$.get( "http://localhost/createRequest.php", function(data) 
	{
  		var data = jQuery.parseJSON(data);
  		$('#inputFullName').val(data.name);
  		$('#inputEmailId').val(data.email);
  		$('#inputMobileNumber').val(data.number);
  		foo(data.gender);
 		$('#inputDOB').val(data.dob);
 		$('#inputCity').val(data.city);
  		$('#inputState').val(data.state);
  		
	});

    $('#contact-details-tab').click(function(e) {
		$("#login-form").delay(100).fadeIn(100);
 		$("#register-form").fadeOut(100);
		$('#request-details-tab').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
	$('#request-details-tab').click(function(e) {
		$("#register-form").delay(100).fadeIn(100);
 		$("#login-form").fadeOut(100);
		$('#contact-details-tab').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});
	$('#ContactTab-NextButton').click(function(e)
	{
		$("#register-form").delay(100).fadeIn(100);
 		$("#login-form").fadeOut(100);
		$('#contact-details-tab').removeClass('active');
		$(this).addClass('active');
		e.preventDefault();
	});

	$('#RequestTab-Submit').click(function(e)
	{
		var name = $('#inputFullName').val();
		var emailId = $('#inputEmailId').val();
		var mobileNumber = $('#inputMobileNumber').val();

		var check_gender = document.getElementsByName('optionsGender');
		var gender;
		for(var i = 0; i < check_gender.length; i++)
		{
    		if(check_gender[i].checked)
    		{
        		gender = check_gender[i].value;
    		}
		}
		
		var dateOfBirth = $('#inputDOB').val();
		var city = $('#inputCity').val();
		var state = $('#inputState').val();

		var type = $('#radioOfferingAid').val();
		var condition = $('#select').val();
		var requestName = $('#inputRequestName').val(); 	
		var requiredBy = $('#inputReqByDate').val(); 	

		var data = {"contact":{
						"name":name,
			      		"emailId":emailId,
			      		"mobileNumber":mobileNumber,
			      		"gender":gender,
			      		"dateOfBirth":dateOfBirth,
			      		"city":city,
			      		"state":state	
						},

					"request":{
						"type":type,
		      			"condition":condition,
				      	"requestName":requestName,
				      	"requiredBy":requiredBy
				       	},
					}

		$.ajax
		({
			url : "server/antardrishti/create",
			type : "POST",
			dataType : "json",
			contentType: "application/json",
			data : JSON.stringify(data),
			success : function(result) 
			{
	    		alert("result.success"); // result is an object which is created from the returned JSON
	    		alert(result.success);
			},
			error : function(req, status, error)
   			{
    			alert("req.status");
				alert(req.error);
   			}
		});

		});

});

