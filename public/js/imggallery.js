$(function() {

 $("<a>").attr({id:"return",title:"返回首頁"})
 .css({color: "rgb(0,0,255)"})
 .text("\u21B6").appendTo('body');
 $("<br>").appendTo('body');

 $("#return").on("click",function() {
  $(this).attr("href","/")
 })

 $("<div>").attr({id:"displaydiv", class:"img-container"})
  .css({'max-width':'max-width: 1200px',margin:'20px 80px',display:'flex',
         'align-items':'center','justify-content':'space-around','flex-wrap': 'wrap'}
   )
  .appendTo("body");
 $('#displaydiv').on("dblclick",".img",function(e) {
    e.stopPropagation();
    let imgheight = $(this).css("height");
    if (imgheight === "210px") {
      $(this).css({width: "100%", height: window.innerHeight});
      $('#displaydiv').css("margin","20px 0")
    }
    else {
      $(this).css({width:210,height:210,marginTop:10});
      $('#displaydiv').css("margin","20px 80px")
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

  let imgUrlArr18 = [
     imgFav361,imgFav362,imgFav363,imgFav364,imgFav365,
     imgFav366,imgFav367,imgFav368,imgFav369,imgFav370,
     imgFav371,imgFav372,imgFav373,imgFav374,imgFav375,
     imgFav376,imgFav377,imgFav378,imgFav379,imgFav380
  ];

  let imgUrlArr19 = [
     imgFav381,imgFav382,imgFav383,imgFav384,imgFav385,
     imgFav386,imgFav387,imgFav388,imgFav389,imgFav390,
     imgFav391,imgFav392,imgFav393,imgFav394,imgFav395,
     imgFav396,imgFav397,imgFav398,imgFav399,imgFav400
  ];

  let imgUrlArr20 = [
     imgFav401,imgFav402,imgFav403,imgFav404,imgFav405,
     imgFav406,imgFav407,imgFav408,imgFav409,imgFav410,
     imgFav411,imgFav412,imgFav413,imgFav414,imgFav415,
     imgFav416,imgFav417,imgFav418,imgFav419,imgFav420
  ];

  let imgUrlArr21 = [
     imgFav421,imgFav422,imgFav423,imgFav424,imgFav425,
     imgFav426,imgFav427,imgFav428,imgFav429,imgFav430,
     imgFav431,imgFav432,imgFav433,imgFav434,imgFav435,
     imgFav436,imgFav437,imgFav438,imgFav439,imgFav440
  ];

  let imgUrlArr22 = [
     imgFav441,imgFav442,imgFav443,imgFav444,imgFav445,
     imgFav446,imgFav447,imgFav448,imgFav449,imgFav450,
     imgFav451,imgFav452,imgFav453,imgFav454,imgFav455,
     imgFav456,imgFav457,imgFav458,imgFav459,imgFav460
  ];

  let imgUrlArr23 = [
     imgFav461,imgFav462,imgFav463,imgFav464,imgFav465,
     imgFav466,imgFav467,imgFav468,imgFav469,imgFav470,
     imgFav471,imgFav472,imgFav473,imgFav474,imgFav475,
     imgFav476,imgFav477,imgFav478,imgFav479,imgFav480
  ];

  let imgUrlArr24 = [
     imgFav481,imgFav482,imgFav483,imgFav484,imgFav485,
     imgFav486,imgFav487,imgFav488,imgFav489,imgFav490,
     imgFav491,imgFav492,imgFav493,imgFav494,imgFav495,
     imgFav496,imgFav497,imgFav498,imgFav499,imgFav500
  ];

  let imgUrlArr25 = [
     imgFav501,imgFav502,imgFav503,imgFav504,imgFav505,
     imgFav506,imgFav507,imgFav508,imgFav509,imgFav510,
     imgFav511,imgFav512,imgFav513,imgFav514,imgFav515,
     imgFav516,imgFav517,imgFav518,imgFav519,imgFav520
  ];

  let imgUrlArr26 = [
     imgFav521,imgFav522,imgFav523,imgFav524,imgFav525,
     imgFav526,imgFav527,imgFav528,imgFav529,imgFav530,
     imgFav531,imgFav532,imgFav533,imgFav534,imgFav535,
     imgFav536,imgFav537,imgFav538,imgFav539,imgFav540
  ];

  let imgUrlArr27 = [
     imgFav541,imgFav542,imgFav543,imgFav544,imgFav545,
     imgFav546,imgFav547,imgFav548,imgFav549,imgFav550,
     imgFav551,imgFav552,imgFav553,imgFav554,imgFav555,
     imgFav556,imgFav557,imgFav558,imgFav559,imgFav560
  ];

  let imgUrlArr28 = [
     imgFav561,imgFav562,imgFav563,imgFav564,imgFav565,
     imgFav566,imgFav567,imgFav568,imgFav569,imgFav570,
     imgFav571,imgFav572,imgFav573,imgFav574,imgFav575,
     imgFav576,imgFav577,imgFav578,imgFav579,imgFav580
  ];

  let imgUrlArr29 = [
     imgFav581,imgFav582,imgFav583,imgFav584,imgFav585,
     imgFav586,imgFav587,imgFav588,imgFav589,imgFav590,
     imgFav591,imgFav592,imgFav593,imgFav594,imgFav595,
     imgFav596,imgFav597,imgFav598,imgFav599,imgFav600
  ];

  let imgUrlArr30 = [
     imgFav601,imgFav602,imgFav603,imgFav604,imgFav605,
     imgFav606,imgFav607,imgFav608,imgFav609,imgFav610,
     imgFav611,imgFav612,imgFav613,imgFav614,imgFav615,
     imgFav616,imgFav617,imgFav618,imgFav619,imgFav620
  ]; 

  let imgUrlArr31 = [
     imgFav621,imgFav622,imgFav623,imgFav624,imgFav625,
     imgFav626,imgFav627,imgFav628,imgFav629,imgFav630,
     imgFav631,imgFav632,imgFav633,imgFav634,imgFav635,
     imgFav636,imgFav637,imgFav638,imgFav639,imgFav640
  ];

 let imgUrlAll = [];

 imgUrlAll.push(imgUrlArr0,imgUrlArr1,imgUrlArr2,imgUrlArr3,imgUrlArr4,
                imgUrlArr5,imgUrlArr6,imgUrlArr7,imgUrlArr8,imgUrlArr9,
                imgUrlArr10,imgUrlArr11,imgUrlArr12,imgUrlArr13,imgUrlArr14,
                imgUrlArr15,imgUrlArr16,imgUrlArr17,imgUrlArr18,imgUrlArr19,
                imgUrlArr20,imgUrlArr21,imgUrlArr22,imgUrlArr23,imgUrlArr24,
                imgUrlArr25,imgUrlArr26,imgUrlArr27,imgUrlArr28,imgUrlArr29,
                imgUrlArr30,imgUrlArr31
              );
     
 let max0 = 32;
 let m = Math.floor(Math.random()*max0);
 console.log("random num", m)
 let imgUrlArr = imgUrlAll[m];
 $("#displaydiv").html(`
                 ${imgUrlArr.map(url => {
                     return `
                        <img src=${url} class='img' style='width:210px;height:210px;margin-top:10px;'>
                     `
                 }).join('')}

    `)

}) 
