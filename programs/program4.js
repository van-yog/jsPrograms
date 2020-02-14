$(function() {
  $("#button").click(function() {
    $(".div1").fadeToggle();
    $(".div2").fadeToggle("slow");
    $(".div3").fadeToggle(2000);
  });
});

$(function() {
  $("#button2").click(function() {
    $(".d1").slideToggle();
  });

  $("#button3").click(function() {
    $(".d32").animate(
      {
        left: "+=5px",
        fontSize: "toggle",
        opacity: "0.5",
        height: "+=10px",
        width: "+=10px"
      },
      "slow"
    );
    $(".d32").animate(
      {
        left: "-=5px",
        fontSize: "toggle",
        opacity: "1",
        height: "-=10px",
        width: "-=10px"
      },
      "slow"
    );
  });

  $("#btn4").click(function() {
    $(".d43")
      .css("color", "blue")
      .slideUp(2000)
      .slideDown(2000)
      .animate({ fontSize: "30px" }, "slow")
      .animate({ fontSize: "20px" });
  });
});
