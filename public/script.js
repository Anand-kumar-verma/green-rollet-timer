var $inner = $(".inner"),
  $spin = $("#spin"),
  $reset = $("#reset"),
  $data = $(".data"),
  $mask = $(".mask"),
  maskDefault = "Place Your Bets",
  timer = 9000;

var red = [32, 19, 21, 25, 34, 27, 36, 30, 23, 5, 16, 1, 14, 9, 18, 7, 12, 3];

$reset.hide();

$mask.text(maskDefault);

// $(document).ready(function () {
//   console.log("THis isnandn ere");
//   var timer = 2000; // Assuming this is the timer value in milliseconds
//   var maskDefault = "Place Your Bets"; // Assuming this is the default mask text
//   var red = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]; // Assuming red numbers
//   var $inner = $(".inner"); // Assuming this is your inner element
//   var $mask = $(".mask"); // Assuming this is your mask element
//   var $reset = $("#reset"); // Assuming this is your reset button
//   var $data = $(".data"); // Assuming this is your data element
//   var randomNumber = 10;
//   var color = null;

//   function spinRoulette() {
//     randomNumber = Math.floor(Math.random() * 37); // Generate a random number between 0 and 36
//     $inner
//       .attr("data-spinto", randomNumber)
//       .find("li:nth-child(" + randomNumber + ") input")
//       .prop("checked", "checked");

//     $(".placeholder").remove();

//     setTimeout(function () {
//       $mask.text("No More Bets");
//     }, timer / 2);

//     setTimeout(function () {
//       $mask.text(maskDefault);
//     }, timer + 500);

//     setTimeout(function () {
//       $reset.removeClass("disabled").prop("disabled", false);

//       if ($.inArray(randomNumber, red) !== -1) {
//         color = "red";
//       } else {
//         color = "black";
//       }
//       if (randomNumber === 0) {
//         color = "green";
//       }

//       $(".result-number").text(randomNumber);
//       $(".result-color").text(color);
//       $(".result").css({ "background-color": color });
//       $data.addClass("reveal");
//       $inner.addClass("rest");

//       var $thisResult =
//         '<li class="previous-result color-' +
//         color +
//         '"><span class="previous-number">' +
//         randomNumber +
//         '</span><span class="previous-color">' +
//         color +
//         "</span></li>";

//       $(".previous-list").prepend($thisResult);
//     }, timer);
//   }

//   setInterval(spinRoulette, 60 * 1000);
// });

document.addEventListener("DOMContentLoaded", function(event) {
  $(document).ready(function () {
    const socket = io("https://sun-lottery-timer-tlhr.onrender.com/");
    let receivedValues;
  
    socket.on("connect", function () {
      console.log("Socket.IO connection established.");
    });
  
    socket.on("onemin", function (message) {
      console.log(message);
      message === 0 && spinRoulette();
    });
  
    socket.on("error", function (error) {
      console.error("Socket.IO error:", error);
    });
  });
});



function spinRoulette() {
  var timer = 2000; // Assuming this is the timer value in milliseconds
  var maskDefault = "Place Your Bets"; // Assuming this is the default mask text
  var red = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]; // Assuming red numbers
  var $inner = $(".inner"); // Assuming this is your inner element
  var $mask = $(".mask"); // Assuming this is your mask element
  var $reset = $("#reset"); // Assuming this is your reset button
  var $data = $(".data"); // Assuming this is your data element
  var randomNumber = 10;
  var color = null;

  randomNumber = Math.floor(Math.random() * 37); // Generate a random number between 0 and 36
  $inner
    .attr("data-spinto", randomNumber)
    .find("li:nth-child(" + randomNumber + ") input")
    .prop("checked", "checked");

  $(".placeholder").remove();

  setTimeout(function () {
    $mask.text("No More Bets");
  }, timer / 2);

  setTimeout(function () {
    $mask.text(maskDefault);
  }, timer + 500);

  setTimeout(function () {
    $reset.removeClass("disabled").prop("disabled", false);

    if ($.inArray(randomNumber, red) !== -1) {
      color = "red";
    } else {
      color = "black";
    }
    if (randomNumber === 0) {
      color = "green";
    }

    $(".result-number").text(randomNumber);
    $(".result-color").text(color);
    $(".result").css({ "background-color": color });
    $data.addClass("reveal");
    $inner.addClass("rest");

    var $thisResult =
      '<li class="previous-result color-' +
      color +
      '"><span class="previous-number">' +
      randomNumber +
      '</span><span class="previous-color">' +
      color +
      "</span></li>";

    $(".previous-list").prepend($thisResult);
  }, timer);
}

// $spin.on("click", function () {
//   // get a random number between 0 and 36 and apply it to the nth-child selector
//   var randomNumber = 10,color = null;
//   $inner
//     .attr("data-spinto", randomNumber)
//     .find("li:nth-child(" + randomNumber + ") input")
//     .prop("checked", "checked");
//   // prevent repeated clicks on the spin button by hiding it
//   $(this).hide();
//   // disable the reset button until the ball has stopped spinning
//   $reset.addClass("disabled").prop("disabled", "disabled").show();

//   $(".placeholder").remove();

//   setTimeout(function () {
//     $mask.text("No More Bets");
//   }, timer / 2);

//   setTimeout(function () {
//     $mask.text(maskDefault);
//   }, timer + 500);

//   // remove the disabled attribute when the ball has stopped
//   // setTimeout(function () {
//   //   $reset.removeClass("disabled").prop("disabled", "");

//   //   if ($.inArray(randomNumber, red) !== -1) {
//   //     color = "red";
//   //   } else {
//   //     color = "black";
//   //   }
//   //   if (randomNumber == 0) {
//   //     color = "green";
//   //   }

//   //   $(".result-number").text(randomNumber);
//   //   $(".result-color").text(color);
//   //   $(".result").css({ "background-color": "" + color + "" });
//   //   $data.addClass("reveal");
//   //   $inner.addClass("rest");

//   //   $thisResult =
//   //     '<li class="previous-result color-' +
//   //     color +
//   //     '"><span class="previous-number">' +
//   //     randomNumber +
//   //     '</span><span class="previous-color">' +
//   //     color +
//   //     "</span></li>";

//   //   $(".previous-list").prepend($thisResult);
//   // }, timer);
// });

$reset.on("click", function () {
  // remove the spinto data attr so the ball 'resets'
  $inner.attr("data-spinto", "").removeClass("rest");
  $(this).hide();
  $spin.show();
  $data.removeClass("reveal");
});

// so you can swipe it too
var myElement = document.getElementById("plate");
var mc = new Hammer(myElement);
mc.on("swipe", function (ev) {
  if (!$reset.hasClass("disabled")) {
    if ($spin.is(":visible")) {
      $spin.click();
    } else {
      $reset.click();
    }
  }
});
