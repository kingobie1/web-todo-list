
// check off specific todos by clicking
$("ul").on("click", "li", function(){
	$(this).toggleClass("complete");
});

// delete entry
$("ul").on("click", ".delete", function(event){

	var todoText = $(this).parent().children(".todoItem").text();
	console.log(todoText);
	$.post("/remove", {item: todoText});	

	$(this).parent().fadeOut(500, function(){
		$(this).remove();
	});
	event.stopPropagation();
});

// press enter in input
$("input[type='text']").keypress( function() {
	console.log("hey");
	if (event.which === 13) {
		// grabbing new todo from input
		var todoText = $(this).val();
		$(this).val("");

		if (todoText !== "") {
			// create new li and add to ul
			$("ul").append("<li><span class='delete'><i class='fa fa-trash-o' aria-hidden='true'></i></span><span class='todoItem'>" + todoText + "</span></li>");
			$.post("/", {item: todoText});
		}
	}
});


// Hit plus sign
$("h1 i").click(function(){
	// $("input").fadeToggle();

	var todoText = $("input[type='text']").val();
	$("input[type='text']").val("");

	if (todoText !== "") {
		// create new li and add to ul
		$("ul").append("<li><span class='delete'><i class='fa fa-trash-o' aria-hidden='true'></i></span><span class='todoItem'>" + todoText + "</span></li>")
		$.ajax({
		    url: '/',
		    type: 'DELETE',
		    data: todoText,
		    success: function(result) {
	        	// Do something with the result
	    	}
		});
	}
})