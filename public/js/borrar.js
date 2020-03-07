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


////////7////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {
  var totalVistas;
  var elemeVista=4;
  
  var pageCurrent=1;
  var imageID=0;
  var btn="";
  var datar=["https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
  "https://cdn.pixabay.com/photo/2015/02/24/15/41/dog-647528__340.jpg",
"https://www.bigstockphoto.com/images/homepage/module-6.jpg",
"https://s.ftcdn.net/v2013/pics/all/curated/RKyaEDwp8J7JKeZWQPuOVWvkUjGQfpCx_cover_580.jpg",
"https://static-cdn.123rf.com/images/v5/index-thumbnail/84170952-b.jpg"]
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
    $(  "#myModal").modal('show');

    $("#status").html("Searching...");
    $("#dialogtitle").html("Search for: "+$("#searchfield").val());
    $("#previous").hide();
    $("#next").hide();
    $.getJSON('/search/' + $("#searchfield").val() , function(data) {
      renderQueryResults(data);
    });
  }
  
  $("#next").click( function(data) {
    pageCurrent=pageCurrent+1;
    btn="next";
    showImages(data);

  });
  
  $("#previous").click( function(data) {
    pageCurrent=pageCurrent-1;
    btn="previous"
    showImages(data);
  
  });

  function showImages(data){
    if(btn.localeCompare("next")||btn.localeCompare(""))
{
    for(i=0;i<4;i++){
      var img=document.createElement("img");
     // img.src=data.results[imageID];
     img.src=datar[imageID];
      img.width="100";
      img.height="100"
      $("#photo".concat(i)).html(img);
        imageID++;
}
}
if(btn.localeCompare("previous")){
  
  for(i=0;i<4;i++){
    imageID--;

    var img=document.createElement("img");
   // img.src=data.results[imageID];
   img.src=datar[imageID];
    img.width="100";
    img.height="100"
    $("#photo".concat(i)).html(img);
}
}

  }


  function renderQueryResults(data) {
    var totalElemen=data.num_results;
  totalVistas=totalElemen/elemeVista;
  if(totalElemen%elemeVista!=0)
    totalVistas+1;
   
      showImages(data);

    if (data.error != undefined) {
      $("#status").html("Error: "+data.error);
    } else {
      $("#status").html(""+data.num_results+" result(s)");
        $("#next").show();
        $("#previous").show();
     }
   }
});
