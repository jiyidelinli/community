$(function(){
	$("#sendBtn").click(send_letter);
	$(".closemessage").click(delete_msg);
});

function send_letter() {
	$("#sendModal").modal("hide");
	var toName = $("#recipient-name").val();
	var content = $("#message-text").val();
	$.post(
		CONTEXT_PATH + "/letter/send",
		{
			"toName": toName,
			"content": content
		},
			function(data){
				data = $.parseJSON(data);
				if(data.code = 0){
					$("#hintBody").text("发送成功!");
				}else{
					$("#hintBody").text(data.msg);
				}
				$("#hintModal").modal("show");
				setTimeout(function(){
					$("#hintModal").modal("hide");
					location.reload();
				}, 2000);
		}
	);
}

function delete_msg() {
	console.log("enter");
	var btn = this;
		var id = $(btn).prev().val();
		console.log("id:", id);
		$.post(
			CONTEXT_PATH + "/letter/delete",
			{"id": id},
			function(data){
				data = $.parseJSON(data);
				if(data.code == 0){
					$(btn).parents(".media").remove();
				}else {
					alert(data.msg);
				}
			}
		);
	// // 删除数据
	// $(this).parents(".media").remove();
}