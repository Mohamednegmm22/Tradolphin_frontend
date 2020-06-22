var x = setInterval(function () {
    var countDownDate = new Date("jun 17, 2020 00:00:00").getTime();
    var now = new Date().getTime();
  
    var distance = countDownDate - now;
  
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
    var time = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
    // Display the result in the element with id="demo"
    document.getElementById("time").innerText = time;
  
    if (distance < 0) {
      clearInterval(x);
      document.getElementById("time").innerText = "EXPIRED";
    }
  }, 1000);
  