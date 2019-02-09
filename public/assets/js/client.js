$(document).ready(function () {

    $(".jumbotron form .btn").on("click", function() {
        
        event.preventDefault();

        var burger = $("#add-burger").val();
        if (burger.length > 0) {
            
            $("#add-burger").val("");

            $.post({
                url: "/api/add-burger",
                data: {burgerName: burger}
            })
            .then(function(response) {
                $("#to-eat-list").append(response);
            });
        }
    });

    $("#to-eat-list .btn").on("click", function() {

        event.preventDefault();

        const id = $(this).parents("li").data("burger_id");

        $.ajax({
            type: "POST",
            url: "/api/eat-burger" + id
        })
        .then(function(response) {
            $('li[data-burger_id="' + id + '"]').remove();
            $("#eaten-list").append(response);
        });
    });
});