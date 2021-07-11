var img0 = "https://apod.nasa.gov/apod/image/1809/atmosphere_geo5_2018235_eq2400.jpg"; //***
var img1 = "https://github.com/RyanHemrick/star_wars_app/blob/master/public/images/star_wars_episode_1_poster.png?raw=true"
var img2 = "https://github.com/RyanHemrick/star_wars_app/blob/master/public/images/star_wars_episode_2_poster.png?raw=true"
var img3 = "https://github.com/RyanHemrick/star_wars_app/blob/master/public/images/star_wars_episode_3_poster.png?raw=true"
var img4 = "https://github.com/RyanHemrick/star_wars_app/blob/master/public/images/star_wars_episode_4_poster.png?raw=true"
var img5 = "https://github.com/RyanHemrick/star_wars_app/blob/master/public/images/star_wars_episode_5_poster.png?raw=true"
var img6 = "https://github.com/RyanHemrick/star_wars_app/blob/master/public/images/star_wars_episode_6_poster.png?raw=true"

var hero1 = "https://github.com/RyanHemrick/star_wars_app/blob/master/public/images/star_wars_episode_1_hero.jpg?raw=true"
var hero2 = "https://github.com/RyanHemrick/star_wars_app/blob/master/public/images/star_wars_episode_2_hero.jpg?raw=true"
var hero3 = "https://github.com/RyanHemrick/star_wars_app/blob/master/public/images/star_wars_episode_3_hero.jpg?raw=true"
var hero4 = "https://github.com/RyanHemrick/star_wars_app/blob/master/public/images/star_wars_episode_4_hero.jpg?raw=true"
var hero5 = "https://github.com/RyanHemrick/star_wars_app/blob/master/public/images/star_wars_episode_5_hero.jpg?raw=true"
var hero6 = "https://github.com/RyanHemrick/star_wars_app/blob/master/public/images/star_wars_episode_6_hero.jpg?raw=true"

$(function() { 
 var gdata,imgUrl,nasaDescription,movies,movieNum; 
 var episoArr = [img1,img2,img3,img4,img5,img6];
 var heroArr = [hero1,hero2,hero3,hero4,hero5,hero6]

 fetch("/getHttps")
 .then(res => res.json()    
  )
 .then(data => {
    if (data.imgUrl) {
      var imgNasa = data.imgUrl;
      console.log("Nasa:", imgNasa)
    } else{
      var img0 = img0;
    }
    renderHomePage()
    })
 .catch(err => { 
     console.log("error: " + err.message)  
   })

 function renderHomePage() {

   $("body").empty();

   var starImage = "https://github.com/RyanHemrick/star_wars_app/blob/master/public/images/death_star_image.jpg?raw=true"
   
   $('<div>').attr({id:"hero-image"}).css({width:"100%",height:400})
   .append($('<img>').attr({id:"hero-image",src: starImage}).css({width:"100%",height:"100%"}))
   .append($('<h1>').attr({id:"hero-title"}).text("Star War"))
   .appendTo('body');  

   $.getJSON('movies.json',function(res) {

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
       var src = episoArr[i];
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

    var src = episoArr[movieNum];

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

   var heroImage = heroArr[movieNum];
   $("div #hero-image").attr({src: heroImage }); 

   var heroImageSingleHeight = $("#descriptionWrapper").height();
   $("#hero-image-single").css({height: heroImageSingleHeight});
 } 

}); 
