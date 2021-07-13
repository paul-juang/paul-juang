//home page in Chinese for nodeapp

$(function() { 

  renderHomePage();
  
  function renderHomePage() {

   let imgUrl = "https://apod.nasa.gov/apod/image/2103/Neowise3Tails_Lefaudeux_1088.jpg"
   
   let accountingArr = [
      {text:'普通分錄', href:'/ledger'},
      {text:'總帳目表', href:'/ledgerdraw'},
      {text:'試算表', href:'/trialbalance'},
      {text:'損益表', href:'/incomestatement'},
      {text:'資產負債表', href:'/balancesheet'},
      {text:'會計科目', href:'/setacctchart'}   
   ]

   let treeArr = [
      {text:'傳銷登錄', href:'/treedata'},
      {text:'傳銷細目', href:'/agkdraw'},
      {text:'列印圖表', href:'/drawtree'}   
   ]

   let lotoArr = [
      {text:'大樂透投注', href:'/loto649'},
      {text:'大樂透中獎比對', href:'/asloto649'},
      {text:'大樂透中獎摘要', href:'/coloto649'},
      {text:'今彩539投注', href:'/loto539'},
      {text:'今彩539中獎比對', href:'/asloto539'},
      {text:'今彩539中獎摘要', href:'/coloto539'}   
   ]

   let lotostatArr = [
      {text:'大樂透中獎統計', href:'/statloto649'},
      {text:'大樂透統計分析', href:'/suloto649'}, //??suloto649x
      {text:'大樂透號碼摘要', href:'/preloto649'},
      {text:'今彩539中獎統計', href:'/statloto539'}, 
      {text:'今彩539統計分析', href:'/suloto539'},//??suloto539x
      {text:'今彩539號碼摘要', href:'/preloto539'}   
   ]

   $('<div>').attr({id:"nasa-image"}).css({width:"100%",height:window.innerHeight})
    .html(`
          <img src=${imgUrl} style='width:100%;height:100%;'> 
      `)
   .appendTo('body'); 
   
   $('<nav>').attr({class:"navbar navbar-fixed-top"})
    .html(`
        <div class='content-padding'>
           <ul class='nav navbar-nav navbar-center'>
           
              <li>
                 <a href='/'>首頁</a>
              </li>

              <li class='dropdown'>
                 <a href='#' class='dropdown-toggle' data-toggle='dropdown'>會計系統
                    <i class='fa fa-chevron-down'></i>
                 </a>                    
                 <ul class='dropdown-menu'>
                    ${accountingArr.map(function(obj) {
                      return `
                          <li>
                            <a href=${obj.href} class='episode_link'>${obj.text}</a>
                          </li>
                      `
                    }).join('')}
                 </ul>
              </li>

              <li class='dropdown'>
                 <a href='#' class='dropdown-toggle' data-toggle='dropdown'>金融傳銷
                    <i class='fa fa-chevron-down'></i>
                 </a>                
                 <ul class='dropdown-menu'>
                    ${treeArr.map(function(obj) {
                      return `
                          <li>
                            <a href=${obj.href} class='episode_link'>${obj.text}</a>
                          </li>
                      `
                    }).join('')}
                 </ul>
              </li>

              <li>
                 <a href='/d3test'>統計圖表</a>
              </li>

              <li>
                 <a href='/imggallery'>太空圖集</a>
              </li>
              
              <li class='dropdown'>
                 <a href='#' class='dropdown-toggle' data-toggle='dropdown'>台灣彩券
                    <i class='fa fa-chevron-down'></i>
                 </a>
                 <ul class='dropdown-menu'>
                    ${lotoArr.map(function(obj) {
                      return `
                          <li>
                            <a href=${obj.href} class='episode_link'>${obj.text}</a>
                          </li>

                      `
                    }).join('')}
                 </ul>
              </li>

              <li class='dropdown'>
                 <a href='#' class='dropdown-toggle' data-toggle='dropdown'>統計預測
                    <i class='fa fa-chevron-down'></i>
                 </a>
                 <ul class='dropdown-menu'>
                    ${lotostatArr.map(function(obj) {
                      return `
                          <li>
                            <a href=${obj.href} class='episode_link'>${obj.text}</a>
                          </li>
                      `
                    }).join('')}
                 </ul>
              </li>
              
           </ul>
        </div>

      `)

   .appendTo('body');

 }

})
