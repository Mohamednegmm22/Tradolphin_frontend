// var SDK = function (url) {
//   this.url = url;
// };

// SDK.prototype.register = function (firstname, lastname, password, email) {
//   $.ajax(this.url + "/add-user?firstname="+ firstname +"&lastname="+firstname+"&password="+password+"&email="+email+"", {
//     method: "POST",
//     data: {
   
//     },
//   });
//   console.log(this.url);
// };

// var loaded = false;

// SDK.prototype.meth = function(parma1, pams2){
//   setTimeout(function(){
//     $("#loaded-content").show()
//   }, 200)
//   $.ajax(this.url + "/was", {
//     method: "GET"
//   }).complete(function(result){
//     $.foreach(result.items, function(item){
//       $("#market-container").append($(<div>item.title</div>));
//     })
//   })
// }