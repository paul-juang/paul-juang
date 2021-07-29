$(function() { 
 let imgUrl = "https://apod.nasa.gov/apod/image/1907/moon_eclipse_span.jpg";

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
   {text:'大樂透中獎統計', href:'/suloto649'},
   {text:'大樂透統計分析', href:'/suloto649x'}, 
   {text:'大樂透號碼摘要', href:'/preloto649'},
   {text:'今彩539中獎統計', href:'/suloto539'}, 
   {text:'今彩539統計分析', href:'/suloto539x'},
   {text:'今彩539號碼摘要', href:'/preloto539'}   
  ]

 $('body').css({'background-image':`url(${imgUrl})`})

 $('<nav>').attr({class:"nav-bar"})
 .html(`  
  <input type="checkbox" id="check">
  <label for="check" class="checkbtn"><i class="fas fa-bars" id="bars"></i></label>    
  <ul>
    <li>
      <a href='#'>會計系統
        <i class='fa fa-caret-down'></i>
      </a>
      <ul>
        ${accountingArr.map(function(obj) {
          return `
          <li class='dropdown'>
          <a href=${obj.href}>${obj.text}</a>
          </li>
          `
        }).join('')}
      </ul>
    </li>

    <li>
      <a href='#'>金融傳銷
        <i class='fa fa-caret-down'></i>
      </a>
      <ul>
        ${treeArr.map(function(obj) {
          return `
          <li class='dropdown'>
          <a href=${obj.href}>${obj.text}</a>
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

    <li>
      <a href='#'>台灣彩券
        <i class='fa fa-caret-down'></i>
      </a>
      <ul>
        ${lotoArr.map(function(obj) {
          return `
          <li class='dropdown'>
          <a href=${obj.href}>${obj.text}</a>
          </li>
          `
        }).join('')}
      </ul>
    </li>

    <li>
      <a href='#'>統計預測
        <i class='fa fa-caret-down'></i>
      </a>
      <ul>
        ${lotostatArr.map(function(obj) {
          return `
          <li class='dropdown'>
          <a href=${obj.href}>${obj.text}</a>
          </li>
          `
        }).join('')}
      </ul>
    </li>

  </ul>
  `)

 .appendTo('body');

})