/* globals Chart:false, feather:false */

(function () {
  "use strict";

  feather.replace();

  // Graphs
  var ctx = document.getElementById("myChart");
  // eslint-disable-next-line no-unused-vars
  var myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      datasets: [
        {
          data: [15339, 21345, 18483, 24003, 23489, 24092, 12034],
          lineTension: 0,
          backgroundColor: "transparent",
          borderColor: "#007bff",
          borderWidth: 4,
          pointBackgroundColor: "#007bff",
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: false,

            },
          },
        ],
      },
      legend: {
        display: false,
      },
    },
  });
})();
var select_id = 0;
$(document).ready(function(){
	function show_graph(){
		$.ajax({
			"url": "http://localhost:8080/asset/btc/history",
			"method": "GET",
			success:function(data){
				var date = new Date();
				var day = date.getDay();
				var ctxl = document.getElementById("myChart");
				var array_data = [];
				var array_date = [];
				for(var i = 0; i < 30; i++){
					if(select_id == 0){
						array_data.push(data[i][1]);
					}
					if(select_id == 1){
						array_data.push(data[i][2]);
					}
					if(select_id == 2){
						array_data.push(data[i][3]);
					}
					if(select_id == 3){
						array_data.push(data[i][4]);
					}
					array_date.push(i);
				}
				console.log(array_data);
				var ctx = document.getElementById("myChart");
				var days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
				var myChart = new Chart(ctx, {
					type: "line",
					data: {
					  labels: days,
					  datasets: [
						{
						  data: [array_data[0],array_data[1],array_data[2],array_data[3],array_data[4],array_data[5],
								array_data[6],array_data[7],array_data[8],array_data[9],array_data[10],array_data[11],array_data[12],
								array_data[13],array_data[14],array_data[15],array_data[16],array_data[17],array_data[18],array_data[19],
								array_data[20],array_data[21],array_data[22],array_data[23],array_data[24],array_data[25],array_data[26],
								array_data[27],array_data[28],array_data[29]],
						  lineTension: 0,
						  backgroundColor: "transparent",
						  borderColor: "#007bff",
						  borderWidth: 4,
						  pointBackgroundColor: "#007bff",
						},
					  ],
					},
					options: {
					  scales: {
						yAxes: [
						  {
							ticks: {
							  beginAtZero: false,

							},
						  },
						],
					  },
					  legend: {
						display: false,
					  },
					},
				});
			}
		});
	}
	show_graph();
	$("#type_option").on('change', function() {
		select_id = this.value;
		show_graph();
	});
	var email = localStorage.getItem("email");
	$.ajax({
		"url": "http://localhost:8080/asset/btc/market",
		"method": "GET",
		success:function(data){
			var price = data.price_usd;
			var volume = data.volume_last_24_hours;
			var name = "btc";
			var content = "<tr><td>"+name+"</td><td>" + price + "</td><td>" + volume + "</td></tr>";
			var one_hour = data.ohlcv_last_1_hour;
			var one_hour_price = one_hour.open;
			
			var one_hour_volume = one_hour.volume;
			content += "<tr><td>"+name+"</td><td>" + one_hour_price + "</td><td>" + one_hour_volume + "</td></tr>";
			var last_hour = data.ohlcv_last_24_hour;
			var last_hour_price = one_hour.open;
			var last_hour_volume = one_hour.volume;
			content += "<tr><td>"+name+"</td><td>" + last_hour_price + "</td><td>" + last_hour_price + "</td></tr>";
			$("#market").html(content);
		}
	});
	$.ajax({
		"url": "http://localhost:8080/transaction/getSell",
		"method": "POST",
		data:{
			email:email
		},
		success: function(data){
			var content = "";
			for(var i = 0; i < data.length; i++){
				content += "<tr><td>" + data[i].pricePerUnit + "</td><td>" + data[i].quantity+"</td><td>" + data[i].fullPrice + "</td><td>" + data[i].fullPrice +"</td></tr>";
			}
			$("#sell").html(content);
		}
	});
	$.ajax({
		"url": "http://localhost:8080/transaction/getBuy",
		"method": "POST",
		data:{
			email:email
		},
		success: function(data){
			var content = "";
			for(var i = 0; i < data.length; i++){
				content += "<tr><td>" + data[i].pricePerUnit + "</td><td>" + data[i].quantity+"</td><td>" + data[i].fullPrice + "</td><td>" + data[i].fullPrice +"</td></tr>";
			}
			$("#buy").html(content);
		}
	});
	$.ajax({
		"url": "http://localhost:8080/transaction/getOrder",
		"method": "POST",
		data:{
			email:email
		},
		success: function(data){
			var content = "";
			for(var i = 0; i < data.length; i++){
				content += "<tr><td>" + new Date(data[i].timestamp) + "</td><td>" + data[i].pricePerUnit+"</td><td>" + data[i].quantity +"</td><td>" + data[i].transactionType +"</td></tr>";
			}
			$("#order").html(content);
		}
	});
  $("#buy_fee").val("0");
  $("#sell_fee").val("0");
  $("#btn_buy").click(function(){

    var amount = $("#buy_amount").val();
    var price = $("#buy_price").val();
    if(amount == "" || price==""){
      alert("Insert the Price and Amount Price!!!");
      return;
    }
    if(isNaN(amount) || isNaN(price)){
      alert("Insert the correct style.");
      return;
    }
    var total = parseFloat(amount)*parseFloat(price);
    $("#buy_fee").val("0");
    $("#buy_sum").val(total);
    $("#buy_total").val(total);
	var email = localStorage.getItem("email");
    var settings = {
      "url": "http://localhost:8080/transaction/buy",
      "method": "POST",
      "timeout": 0, 
      "data": {
        "email": email,
        "quantity": amount,
        "price": price,
        "symbol": "bicoin"
      }
  };
  $.ajax(settings).done(function (data) {
      if(data.success == true){
          alert(data.message);
          location.reload();
      }else{
          return;
      }
      
    });
  });

  $("#btn_sell").click(function(){

    var amount = $("#sell_amount").val();
    var price = $("#sell_price").val();
    if(amount == "" || price==""){
      alert("Insert the Price and Amount Price!!!");
      return;
    }
    if(isNaN(amount) || isNaN(price)){
      alert("Insert the correct style.");
      return;
    }
    var total = parseFloat(amount)*parseFloat(price);
    $("#sell_fee").val("0");
    $("#sell_sum").val(total);
    $("#sell_total").val(total);
	var email = localStorage.getItem("email");
   
	$.ajax({
		"url": "http://localhost:8080/transaction/sell",
		"method": "POST",
		"timeout": 0, 
		"data": {
			"email": email,
			"quantity": amount,
			"price": price,
			"symbol": "bicoin"
		},
		success:function(data){
			if(data.success == true){
				alert(data.message);
				location.reload();
			}else{
				return;
			}
		}
	});
  });
});