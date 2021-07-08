//home page in Chinese for nodeapp

$(function() { 

  renderHomePage();
  
  function renderHomePage() {

   let imgUrl = "https://apod.nasa.gov/apod/image/2107/SaturnAndMoons_Ranjbaran_2692.jpg";
   
   $('<div>').attr({id:"nasa-image"}).css({width:"100%",height:window.innerHeight})
   .append($('<img>').attr({src: imgUrl}).css({width:"100%",height:"100%"}))
   .appendTo('body');  

   $('<nav>').attr({class:"navbar navbar-fixed-top"})
   .append(
    $('<div>').attr({class:"content-padding"}) 
    )
   .appendTo('body');

   let div1 = $('div.content-padding');

   $('<ul>').attr({class:"nav navbar-nav navbar-center"})

   .append($('<li>')
    .append($('<a>').attr({href:'/', id:"homeRef"}).text('首頁'))
    )
   
   .append($('<li>').attr({class:'dropdown',id:"accounting"})
    .append(
     $('<a>').attr({href:'#',class:'dropdown-toggle','data-toggle':"dropdown"}).text('會計系統')    
     .append($('<i>').attr({class:'fa fa-chevron-down'}))               
     ))

  
   .append($('<li>').attr({class:'dropdown',id:"tree"})
    .append(
     $('<a>').attr({href:'#',class:'dropdown-toggle','data-toggle':"dropdown"}).text('金融傳銷')    
     .append($('<i>').attr({class:'fa fa-chevron-down'}))               
     ))
   .append($('<li>')
    .append($('<a>').attr({href:'/d3test', id:"homeRef"}).text('統計圖表'))
    )

   .append($('<li>')
    .append($('<a>').attr({href:'/imggallery', id:"homeRef"}).text('太空圖集'))
    )


   //.append($('<li>')
   //  .append($('<a>').attr({href:'/starwar', id:"homeRef"}).text('星際大戰'))
   // )


   .append($('<li>').attr({class:'dropdown',id:"loto"})
    .append(
     $('<a>').attr({href:'#',class:'dropdown-toggle','data-toggle':"dropdown"}).text('台灣彩券')    
     .append($('<i>').attr({class:'fa fa-chevron-down'}))               
     ))

   .append($('<li>').attr({class:'dropdown',id:"stat"})
    .append(
     $('<a>').attr({href:'#',class:'dropdown-toggle','data-toggle':"dropdown"}).text('統計預測')    
     .append($('<i>').attr({class:'fa fa-chevron-down'}))               
     ))

  .appendTo(div1);

   let li2 = $("#accounting")
   $('<ul>').attr({class:'dropdown-menu',id:"accountingMenu"})
   .appendTo(li2)


   let accountingArr = [

      "普通分錄","總帳目表","試算表","損益表","資產負債表","會計科目"

   ]

   let accountingHref = [
     "/ledger","/ledgerdraw","/trialbalance","/incomestatement","/balancesheet","/setacctchart"
   ]

   for (let i = 0; i < accountingArr.length; i++) {
    $('<li>')
    .append($('<a>').attr({href:accountingHref[i],class:'episode_link'}).text(accountingArr[i])
     )
   .appendTo($('#accountingMenu'))      

  }       


  let li3 = $("#tree")
   $('<ul>').attr({class:'dropdown-menu',id:"treeMenu"})
   .appendTo(li3)

   let treeArr = [
     "傳銷登錄","傳銷細目","列印圖表"
   ]

 //let treeHref = [
//"/treedata","/drawtreex","/drawtree"
//]

   let treeHref = [
     "/treedata","agkdraw","/drawtree"

   ]

   for (let i = 0; i < treeArr.length; i++) {
    $('<li>')
    .append($('<a>').attr({href:treeHref[i],class:'episode_link'}).text(treeArr[i])
     )
    .appendTo($("#treeMenu"))      
  }       


  let li4 = $("#loto")
   $('<ul>').attr({class:'dropdown-menu',id:"lotoMenu"})
   .appendTo(li4)

  let lotoArr = [
     "大樂透投注","大樂透中獎比對","大樂透中獎摘要",
     "今彩539投注","今彩539中獎比對","今彩539中獎摘要" 

   ]

   let lotoHref = [
      "/loto649","/asloto649","/coloto649",
      "/loto539","/asloto539","/coloto539"
       //"#","#","#","#","#","#","#","#"
   ]


   for (let i = 0; i < lotoArr.length; i++) {
    $('<li>')
    .append($('<a>').attr({href:lotoHref[i],class:'episode_link'}).text(lotoArr[i])
     )
    .appendTo($("#lotoMenu"))      
  }       



  let li5 = $("#stat")
   $('<ul>').attr({class:'dropdown-menu',id:"statMenu"})
   .appendTo(li5)

  let lotostatArr = [
     "大樂透中獎統計","大樂透統計分析","大樂透號碼摘要",
     "今彩539中獎統計","今彩539統計分析","今彩539號碼摘要"

   ]

   let lotostatHref = [
      "/suloto649","/suloto649","/preloto649",
      "/suloto539","/suloto539","/preloto539"
       //"#","#","#","#","#","#","#","#"
   ]


   for (let i = 0; i < lotostatArr.length; i++) {
    $('<li>')
    .append($('<a>').attr({href:lotostatHref[i],class:'episode_link'}).text(lotostatArr[i])
     )
    .appendTo($("#statMenu"))      
  }       


 }

})
