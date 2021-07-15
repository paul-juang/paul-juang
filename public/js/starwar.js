let img1 = "https://github.com/RyanHemrick/star_wars_app/blob/master/public/images/star_wars_episode_1_poster.png?raw=true"
let img2 = "https://github.com/RyanHemrick/star_wars_app/blob/master/public/images/star_wars_episode_2_poster.png?raw=true"
let img3 = "https://github.com/RyanHemrick/star_wars_app/blob/master/public/images/star_wars_episode_3_poster.png?raw=true"
let img4 = "https://github.com/RyanHemrick/star_wars_app/blob/master/public/images/star_wars_episode_4_poster.png?raw=true"
let img5 = "https://github.com/RyanHemrick/star_wars_app/blob/master/public/images/star_wars_episode_5_poster.png?raw=true"
let img6 = "https://github.com/RyanHemrick/star_wars_app/blob/master/public/images/star_wars_episode_6_poster.png?raw=true"

let hero1 = "https://github.com/RyanHemrick/star_wars_app/blob/master/public/images/star_wars_episode_1_hero.jpg?raw=true"
let hero2 = "https://github.com/RyanHemrick/star_wars_app/blob/master/public/images/star_wars_episode_2_hero.jpg?raw=true"
let hero3 = "https://github.com/RyanHemrick/star_wars_app/blob/master/public/images/star_wars_episode_3_hero.jpg?raw=true"
let hero4 = "https://github.com/RyanHemrick/star_wars_app/blob/master/public/images/star_wars_episode_4_hero.jpg?raw=true"
let hero5 = "https://github.com/RyanHemrick/star_wars_app/blob/master/public/images/star_wars_episode_5_hero.jpg?raw=true"
let hero6 = "https://github.com/RyanHemrick/star_wars_app/blob/master/public/images/star_wars_episode_6_hero.jpg?raw=true"

$(function() { 

 fetch("/getHttps")
 .then(res => res.json()    
  )
 .then(data => {
      if (data.imgUrl) {
        let imgNasa = data.imgUrl;
        console.log("Nasa:", imgNasa);
      } else{
        console.log("Nasa: nothing");
      }
    })
 .catch(err => { 
     console.log("Nasa error: " + err.message);  
   })

 let episoArr = [img1,img2,img3,img4,img5,img6];
 let heroArr = [hero1,hero2,hero3,hero4,hero5,hero6];

 renderHomePage()

 function renderHomePage() {

   $("body").empty();

   let starImage = "https://github.com/RyanHemrick/star_wars_app/blob/master/public/images/death_star_image.jpg?raw=true"
   
   $('<div>').attr({id:"hero-image"}).css({width:"100%",height:400})
    .html(`
        <img id='hero-image' src= ${starImage} style='width:100%; height:100%;'/>
        <h1 id='hero-title'>Star War Movies</h1>
      `)
   .appendTo('body');
      
   $.getJSON('movies.json',function(res) {
       
       let movies = res.movies;

       $('<nav>').attr({class:"navbar navbar-fixed-top"})
        .html(`
            <div class='content-padding'>
              <ul class='nav navbar-nav navbar-right'>
                <li>
                  <a href='#' id='homeRef'>home</a>                 
                </li>

                <li class='dropdown'>
                  <a href='#' class='dropdown-toggle' data-toggle='dropdown'>movies
                     <i class='fa fa-chevron-down'></i>
                  </a>
                  <ul class=dropdown-menu>

                    ${movies.map(function(movie) {
                       return `
                           <li class='dropdown'>
                               <a href ='#' class='episode_link'>${movie.title}</a>
                           </li>
                       `
                     }).join("")}

                  </ul>                 
                </li>

              </ul>
            </div> 
            `)       
       .appendTo('body');

      $('<div>').attr({id:'posters-wrapper',class:'content-padding clearfix'})
       .html(`
          ${movies.map(function(movie, i) {
            return `
             <div class='poster'>
              <a href='#' class='posterHref'>
               <img src= ${episoArr[i]} class='img-responsive'/>
               <div class='poster-info-overlay'>
                  <h3>${movie.title}</h3>
                  <h4>view more<i class='fa fa-chevron-down'></i></h4>               
               </div>
              </a>
             </div>
            `
          }).join('')}                     
      `)      
     .appendTo('body')
 
    $("#homeRef").on("click",function(event) {
       event.preventDefault();
       renderHomePage();
     })

     $(".episode_link").on("click",function(event) {
        event.preventDefault();
        let movieNum = $(".episode_link").index(this);
        renderSinglePage(movies,movieNum);
     })

     $(".posterHref").on("click",function(event) {
        event.preventDefault();
        let movieNum = $(".posterHref").index(this);
        renderSinglePage(movies,movieNum);
     })     

   }); 

 }

 function renderSinglePage(movies,movieNum) {

    if ($("#posters-wrapper")) {
      $("#posters-wrapper").remove(); 
    }

    if ($("#singleDiv1")) {
      $("#singleDiv1").remove(); 
    }

    $("<div>").attr({id: "singleDiv1", class: "content-padding clearfix"})
     .html(`
         <div class='poster-wrapper'>
           <img id='hero-image-single' src=${episoArr[movieNum]} class='img-responsive'>
         </div>
         <div id='descriptionWrapper' class='description-wrapper'>
           <div class='description'>
             <h2 class='movie-header'>Description</h2>
             <p>${movies[movieNum].description}</p>
           </div>
           <div class='main_characters'>
             <h2 class='movie-header'>Main Characters</h2>
             <ul id='characterUl'>
                ${movies[movieNum].main_characters.map(function(char) {
                   return `
                      <li>${char}</li>
                   `
                }).join('')}
             </ul>
           </div>
         </div>
      `)
     .appendTo("body");
     
   let heroImage = heroArr[movieNum];
   $("div #hero-image").attr({src: heroImage }); 

   let heroImageSingleHeight = $("#descriptionWrapper").height();
   $("#hero-image-single").css({height: heroImageSingleHeight});
   $("#hero-title").text(movies[movieNum].title); 
 } 

}); 
