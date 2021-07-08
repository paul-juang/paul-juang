//load imgFav01-200 from urlfile.js
$(function() {

 $("<a>").attr({id:"return",title:"返回首頁"})
 .text("\u21B6").appendTo('body');
 $("<br>").appendTo('body');

 $("#return").on("click",function() {
  $(this).attr("href","/")
 })

 $("<div>").attr("id","displaydiv").appendTo("body");
 let displaydiv = $("#displaydiv");

 $('#displaydiv').on("dblclick",".img",function(e) {

    console.log($(this).attr("src"));
    e.stopPropagation();
    let imgheight = $(this).css("height");
    if (imgheight === "200px") {
      $(this).css({width: window.innerWidth, height: window.innerHeight});
    }
    else {
      $(this).css({width:200,height:200,marginLeft:10,marginTop:10});
    }
  })

 let imgUrlArrFav = [
     imgFav01,imgFav02,imgFav03,imgFav04,imgFav05,imgFav06,imgFav07,imgFav08,imgFav09,imgFav10,
     imgFav11,imgFav12,imgFav13,imgFav14,imgFav15,imgFav16,imgFav17,imgFav18,imgFav19,imgFav20,
     imgFav21,imgFav22,imgFav23,imgFav24,imgFav25,imgFav26,imgFav27,imgFav28,imgFav29,imgFav30,
     imgFav31,imgFav32,imgFav33,imgFav34,imgFav35,imgFav36,imgFav37,imgFav38,imgFav39,imgFav40,
     imgFav41,imgFav42,imgFav43,imgFav44,imgFav45,imgFav46,imgFav47,imgFav48,imgFav49,imgFav50,
  ];

 let imgUrlArr0 = [
     imgFav01,imgFav02,imgFav03,imgFav04,imgFav05,
     imgFav06,imgFav07,imgFav08,imgFav09,imgFav10,
     imgFav11,imgFav12,imgFav13,imgFav14,imgFav15,
     imgFav16,imgFav17,imgFav18,imgFav19,imgFav20
  ];

 let imgUrlArr1 = [
     imgFav21,imgFav22,imgFav23,imgFav24,imgFav25,
     imgFav26,imgFav27,imgFav28,imgFav29,imgFav30,
     imgFav31,imgFav32,imgFav33,imgFav34,imgFav35,
     imgFav36,imgFav37,imgFav38,imgFav39,imgFav40
  ];

 let imgUrlArr2 = [
     imgFav41,imgFav42,imgFav43,imgFav44,imgFav45,
     imgFav46,imgFav47,imgFav48,imgFav49,imgFav50,
     imgFav51,imgFav52,imgFav53,imgFav54,imgFav55,  
     imgFav56,imgFav57,imgFav58,imgFav59,imgFav60
  ];

 let imgUrlArr3 = [
     imgFav61,imgFav62,imgFav63,imgFav64,imgFav65,
     imgFav66,imgFav67,imgFav68,imgFav69,imgFav70,
     imgFav71,imgFav72,imgFav73,imgFav74,imgFav75,
     imgFav86,imgFav87,imgFav88,imgFav89,imgFav80
  ];

 let imgUrlArr4 = [
     imgFav81,imgFav82,imgFav83,imgFav84,imgFav85,
     imgFav86,imgFav87,imgFav88,imgFav89,imgFav90,
     imgFav91,imgFav92,imgFav93,imgFav94,imgFav95,
     imgFav96,imgFav97,imgFav98,imgFav99,imgFav100
  ];

 let imgUrlArr5 = [
     imgFav101,imgFav102,imgFav103,imgFav104,imgFav105,
     imgFav106,imgFav107,imgFav108,imgFav109,imgFav110,
     imgFav111,imgFav112,imgFav113,imgFav114,imgFav115,
     imgFav116,imgFav117,imgFav118,imgFav119,imgFav120
  ];

 let imgUrlArr6 = [
     imgFav121,imgFav122,imgFav123,imgFav124,imgFav125,
     imgFav126,imgFav127,imgFav128,imgFav129,imgFav130,
     imgFav131,imgFav132,imgFav133,imgFav134,imgFav135,
     imgFav136,imgFav137,imgFav138,imgFav139,imgFav140
  ];

 let imgUrlArr7 = [
     imgFav141,imgFav142,imgFav143,imgFav144,imgFav145,
     imgFav146,imgFav147,imgFav148,imgFav149,imgFav150,
     imgFav151,imgFav152,imgFav153,imgFav154,imgFav155,  
     imgFav156,imgFav157,imgFav158,imgFav159,imgFav160
  ];

 let imgUrlArr8 = [
     imgFav161,imgFav162,imgFav163,imgFav164,imgFav165,
     imgFav166,imgFav167,imgFav168,imgFav169,imgFav170,
     imgFav171,imgFav172,imgFav173,imgFav174,imgFav175,
     imgFav176,imgFav177,imgFav178,imgFav179,imgFav180
  ];

 let imgUrlArr9 = [
     imgFav181,imgFav182,imgFav183,imgFav184,imgFav185,
     imgFav186,imgFav187,imgFav188,imgFav189,imgFav190,
     imgFav191,imgFav192,imgFav193,imgFav194,imgFav195,
     imgFav196,imgFav197,imgFav198,imgFav199,imgFav200
  ];

  let imgUrlArr10 = [
     imgFav201,imgFav202,imgFav203,imgFav204,imgFav205,
     imgFav206,imgFav207,imgFav208,imgFav209,imgFav210,
     imgFav211,imgFav212,imgFav213,imgFav214,imgFav215,
     imgFav216,imgFav217,imgFav218,imgFav219,imgFav220
  ];

 let imgUrlArr11 = [
     imgFav221,imgFav222,imgFav223,imgFav224,imgFav225,
     imgFav226,imgFav227,imgFav228,imgFav229,imgFav230,
     imgFav231,imgFav232,imgFav233,imgFav234,imgFav235,
     imgFav236,imgFav237,imgFav238,imgFav239,imgFav240
  ];

 let imgUrlArr12 = [
     imgFav241,imgFav242,imgFav243,imgFav244,imgFav245,
     imgFav246,imgFav247,imgFav248,imgFav249,imgFav250,
     imgFav251,imgFav252,imgFav253,imgFav254,imgFav255,
     imgFav256,imgFav257,imgFav258,imgFav259,imgFav260
  ];

  let imgUrlArr13 = [
     imgFav261,imgFav262,imgFav263,imgFav264,imgFav265,
     imgFav266,imgFav267,imgFav268,imgFav269,imgFav270,
     imgFav271,imgFav272,imgFav273,imgFav274,imgFav275,
     imgFav276,imgFav277,imgFav278,imgFav279,imgFav280
  ];

  let imgUrlArr14 = [
     imgFav281,imgFav282,imgFav283,imgFav284,imgFav285,
     imgFav286,imgFav287,imgFav288,imgFav289,imgFav290,
     imgFav291,imgFav292,imgFav293,imgFav294,imgFav295,
     imgFav296,imgFav297,imgFav298,imgFav299,imgFav300
  ];

  let imgUrlArr15 = [
     imgFav301,imgFav302,imgFav303,imgFav304,imgFav305,
     imgFav306,imgFav307,imgFav308,imgFav309,imgFav310,
     imgFav311,imgFav312,imgFav313,imgFav314,imgFav315,
     imgFav316,imgFav317,imgFav318,imgFav319,imgFav320
  ];

  let imgUrlArr16 = [
     imgFav321,imgFav322,imgFav323,imgFav324,imgFav325,
     imgFav326,imgFav327,imgFav328,imgFav329,imgFav330,
     imgFav331,imgFav332,imgFav333,imgFav334,imgFav335,
     imgFav336,imgFav337,imgFav338,imgFav339,imgFav340
  ];

  let imgUrlArr17 = [
     imgFav341,imgFav342,imgFav343,imgFav344,imgFav345,
     imgFav346,imgFav347,imgFav348,imgFav349,imgFav350,
     imgFav351,imgFav352,imgFav353,imgFav354,imgFav355,
     imgFav356,imgFav357,imgFav358,imgFav359,imgFav360
  ];


 let imgUrlAll = [];

 imgUrlAll.push(imgUrlArr0,imgUrlArr1,imgUrlArr2,imgUrlArr3,imgUrlArr4,
                imgUrlArr5,imgUrlArr6,imgUrlArr7,imgUrlArr8,imgUrlArr9,
                imgUrlArr10,imgUrlArr11,imgUrlArr12,imgUrlArr13,imgUrlArr14,
                imgUrlArr15,imgUrlArr16,imgUrlArr17
                );
     
 let max0 = 18;
 let m = Math.floor(Math.random()*max0);
 let imgUrlArr = imgUrlAll[m];
    
 displayImgbySeq(imgUrlArr);
 //displayimgPromised(imgUrlArr);
;

}) //end of $(function())

//functions
function getimg(url) {
  
  return new Promise(function(resolve,reject) {
    var img = new Image();
    img.onload = function() {
      resolve(url)
    }
    img.onerror = function() {
      reject(url)
    }
    img.src = url;
  })
}

//display an array of images by sequence
function displayImgbySeq(urlarr) {

  urlarr.forEach(async (img) => {
    try {
      let url = await getimg(img);
      $("<img>").attr({src: url, class:"img"})
       .css({width:200,height:200,marginLeft:10,marginTop:10})
       .appendTo(displaydiv); 
    } catch(err) {
      console.log('error:' + err.message)
    }    
  })

}
  
function displayimgPromised(urlarr) {

  let promisearr = urlarr.map(getimg);
  let sequence = Promise.resolve();
  promisearr.forEach(function(curpromise) {
    sequence.then(function() {
      return curpromise;
    })
    .then(function(url) {
      $("<img>").attr({src: url, class:"img"})
      .css({width:200,height:200,marginLeft:10,marginTop:10})
      .appendTo(displaydiv);
    })
    .catch(function(err) {
      console.log("loading image error!")
    })

   })
 }
 
 //display an array of images by recursion     
 async function displayImgbyRec(urlarr) {

  let targeturl = urlarr.shift();
  if (targeturl) {
     try {
      let url = await getimg(targeturl);
      $("<img>").attr({src: url, class:"img"})
       .css({width:200,height:200,marginLeft:10,marginTop:10})
       .appendTo(displaydiv);
       
       displayimg(urlarr); 
     } catch(err) {
      console.log('error:' + err.message)
     }        
   }
}

 function displayimg(urlarr) {

  let targeturl = urlarr.shift();
  if (targeturl) {
    getimg(targeturl)
    .then(function(url) {
            $("<img>").attr({src: url, class:"img"})
            .css({width:200,height:200,marginLeft:10,marginTop:10})
            .appendTo(displaydiv);

            displayimg(urlarr);
          })
    .catch(function(urlarr) {
      console.log("loading image error!")
    })
  }
}


