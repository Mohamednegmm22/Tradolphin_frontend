function myFunction() {

    var eye = document.getElementById("eye-fill");
    if (eye.className = "bi bi-eye-fill") {
        eye.setAttribute("class", "bi bi-eye-slash-fill");
        var path_1 = document.getElementById("path_1");
        path_1.setAttribute("d", "M10.79 12.912l-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z");
        var path_2 = document.createElement("path");
        path_2.setAttribute("id","path_2")
        path_2.setAttribute("d", "M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708l-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829z");
        var path_3 = document.getElementById("path_3");
        path_3.setAttribute("d", "M13.646 14.354l-12-12 .708-.708 12 12-.708.708z");    
    }else if (eye.className = "bi bi-eye-slash-fill"){
        alert("Hallo");
    }

}