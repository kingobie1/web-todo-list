alert("todo.js hooked up");

// check off specific todos by clicking
$("ul").on("click", "li", function(){
	$(this).toggleClass("complete");
});

// delete entry
$("ul").on("click", "span", function(event){
	$(this).parent().fadeOut(500, function(){
		$(this).remove();
	});
	event.stopPropagation();
});

// press enter in input
$("input[type='text']").keypress( function() {
	if (event.which === 13) {
		// grabbing new todo from input
		var todoText = $(this).val();
		$(this).val("");

		if (todoText !== "") {
			// create new li and add to ul
			$("ul").append("<li><span><i class='fa fa-trash-o' aria-hidden='true'></i></span> " + todoText + "</li>")
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
			$("ul").append("<li><span><i class='fa fa-trash-o' aria-hidden='true'></i></span> " + todoText + "</li>")
	}
})