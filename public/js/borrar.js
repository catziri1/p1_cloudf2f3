$(document).ready(function() {
  var pages = 1;
  var page = 1;
  var total = 0;
  var url;

  $("#version").html("v0.14");
  
  $("#searchbutton").click( function (e) {
    displayModal();
  });
  
  $("#searchfield").keydown( function (e) {
    if(e.keyCode == 13) {
      displayModal();
    }	
  });
  
  function displayModal() {
    $( "#myModal").modal('show');
    pages = 1;
    page = 1;
    total = 0;
    url = [];
    $("#status").html("Searching...");
    $("#dialogtitle").html("Search for: "+$("#searchfield").val());
    $("#previous").hide();
    $("#next").hide();
    $.getJSON('/search/' + $("#searchfield").val() , function(data) {
      renderQueryResults(data);
    });
  }
  
  $("#next").click(function(e) {
    if(page < pages){
      page++;
      showImages();
    }
  });
  
  $("#previous").click( function(e) {
    if(page > 1){
      page--;
      showImages();
    }
  });

  function showImages(){
    a = (page - 1) * 4;
    if(a + 4 > total){
      b = total - a;
    } else {
      b = 4
    }
    renderImg(url.slice(a, a+b));
    updateStatus();
  }

  function updateStatus(){
    $("#status").html(""+ total +" result(s) - " +page+ " of "+pages+ " page(s)");
  }

  function renderQueryResults(data) {
    if (data.error != undefined) {
      $("#status").html("Error: "+ data.error);
    } else {
      total = data.num_results;
      url = data.results;
      pages = Math.trunc(data.num_results / 4) + 1;
      showImages();
      if(data.num_results / 4 > 1){
        $("#next").show();
        $("#previous").show();
      } 
     }
   }

  function renderImg(images){
    let tag = "#photo";
    for(let i = 0; i < 4; i++){
      let img;
      if(images[i]){
        img = document.createElement("img");
        img.src = images[i];
        img.width = 250;
      } else {
        img = ""
      }
      tempTag = tag + i;
      $(tempTag).html(img);
    }
  }
});