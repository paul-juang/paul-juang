var imgUrl1 = "https://apod.nasa.gov/apod/image/1808/fires_mccolgan_1731.jpg"; //***
var imgUrl26 = "https://apod.nasa.gov/apod/image/1808/TahaGhouchkanluTLE2018.jpg"; //***
var imgUrl3 = "https://apod.nasa.gov/apod/image/1808/IrisNebula_Sgueglia_2729.jpg";  //***
var imgUrl4 = "https://apod.nasa.gov/apod/image/1807/QuasarJetDrawing_DESY_3508.jpg"; //*
var imgUrl5 = "https://apod.nasa.gov/apod/image/1807/NGC5866_Block_1518.jpg";  //***
var imgUrl6 = "https://apod.nasa.gov/apod/image/1808/NGC6744_HaLRGB_MP.jpg";  //***
var imgUrl2 = "https://apod.nasa.gov/apod/image/1807/M57Ring_HubbleGendler_3000.jpg";//***
var imgUrl46 = "https://apod.nasa.gov/apod/image/1809/atmosphere_geo5_2018235_eq2400.jpg"; //***

$(function() { 

 var gdata,imgUrl,nasaDescription,movies,movieNum;
 var imgUrlArr = [imgUrl1,imgUrl26,imgUrl3,imgUrl4,imgUrl5,imgUrl6];

 fetch("/getHttps")
 .then(res => res.json()    
  )
 .then(data => {
  console.log(data) //why data is different than ajax
    if (data.imgUrl) {
      imgUrl = data.imgUrl
    }else{
      imgUrl = imgUrl46
    }
    
     renderHomePage()
 })
 .catch(err => { 
     console.log("error: " + err.message)  
 })

 /*$.ajax({
  url:"/getHttps",
  success: function(data) {
    console.log("data: ", data) //correct
    if (data.imgUrl) {
       imgUrl = data.imgUrl; 
      console.log("NasaUrl: ",imgUrl)
    }
    else {
      imgUrl = imgUrl46; 
    }

    renderHomePage();
  } 
});*/

 function renderHomePage() {

  $.getJSON('movies.json',function(res){

   $("body").empty();

   console.log(imgUrl)
   var backGroundImage = "url(" + imgUrl + ")";
   $('<div>').attr({id:"hero-image"}).css({width:"100%",height:400})
   .append($('<img>').attr({src: imgUrl}).css({width:"100%",height:"100%"}))
   .append($('<h1>').attr({id:"hero-title"}).text("Star War"))
   .appendTo('body');  

   movies = res.movies;
   $('<nav>').attr({class:"navbar navbar-fixed-top"})
   .append(
    $('<div>').attr({class:"content-padding"})
    )
   .appendTo('body');

   var div1 = $('div.content-padding');

   $('<ul>').attr({class:"nav navbar-nav navbar-right"}) 
   .append($('<li>')
    .append($('<a>').attr({href:'#', id:"homeRef"}).text('home'))
    )
   .append($('<li>').attr({class:'dropdown'})
    .append(
     $('<a>').attr({href:'#',class:'dropdown-toggle','data-toggle':"dropdown"}).text('movies') 		
     .append($('<i>').attr({class:'fa fa-chevron-down'}))						    
     ))
   .appendTo(div1);

   var li2 = $('li.dropdown')
   $('<ul>').attr({class:'dropdown-menu'})
   .appendTo(li2)

   for (var i = 0; i < movies.length; i++) {
    var episode_number = movies[i].episode_number;
    $('<li>')
    .append($('<a>').attr({href:"#",class:'episode_link'}).text(movies[i].title )
     )
    .appendTo($('ul.dropdown-menu'))    	
  }		    

  var divx = $('<div>').attr({id:'posters-wrapper',class:'content-padding clearfix'});

  for (var i = 0; i < movies.length; i++) { 
   var num =  movies[i].episode_number + 1;
   var poster =  movies[i].poster;
   var src = imgUrlArr[i];
   var title = movies[i].title;
   $('<div>').attr({class:"poster"})
   .append(
    $('<a>').attr({href:"#",class: "posterHref"})
    .append(
     $('<img>').attr({src:src,class:'img-responsive'})
     )
    .append(
     $('<div>').attr({class:'poster-info-overlay'})
     .append(
      $('<h3>').text(title)
      )
     .append(
      $('<h4>').text('view more')
      .append(
       $('<i>').attr({class:'fa fa-chevron-down'})
       )
      )
     )
    )
   .appendTo(divx)
 }

 divx.appendTo('body');

 $("#homeRef").on("click",function(event) {
   event.preventDefault();
   renderHomePage();
 })

 $(".episode_link").on("click",function(event) {
   event.preventDefault();
   movieNum = $(".episode_link").index(this);
   renderSinglePage();
 })

 $(".posterHref").on("click",function(event) {
  event.preventDefault();
  movieNum = $(".posterHref").index(this);
  renderSinglePage();
})

}); 

}

function renderSinglePage() {

  if ($("#posters-wrapper")) {
    $("#posters-wrapper").remove(); 
  }

  if ($("#singleDiv1")) {
    $("#singleDiv1").remove(); 
  }


  var movieSimgleDiv = $("<div>").attr({class: "content-padding clearfix",id: "singleDiv1"});
  movieSimgleDiv.appendTo("body");

  var src = imgUrlArr[movieNum];


  $("<div>").attr({class: "poster-wrapper"})
  .append($("<img>").attr({src: src, class: "img-responsive",id:"hero-image-single"}))		
  .appendTo(movieSimgleDiv);

  $("<div>").attr({class: "description-wrapper",id: "descriptionWrapper"})
  .append(
   $("<div>").attr({class: "description"})
   .append(
    $("<h2>").attr({class: "movie-header"}).text("Description")
    )
   .append(
    $("<p>").text(movies[movieNum].description)

    )
   )
  .append(
   $("<div>").attr({class: "main_characters"})
   .append(
    $("<h2>").attr({class: "movie-header"}).text("Main Characters")
    )
   .append(
    $("<ul>").attr({id:"characterUl"}))
   )
  .appendTo(movieSimgleDiv);


  var main_characters = movies[movieNum].main_characters;

  for (var i = 0; i < main_characters.length; i++) {
   $("<li>").text(main_characters[i])
   .appendTo($("#characterUl"));
 }   

 var heroTitleText = movies[movieNum].title;
 $("#hero-title").text(heroTitleText);
 
 var heroImageSingleHeight = $("#descriptionWrapper").height();
 $("#hero-image-single").css({height: heroImageSingleHeight});
 
} 

}); 
