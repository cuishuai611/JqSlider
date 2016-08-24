/**
 * Slider 1.0
 *
 * 焦点图切换jQuery扩展
 *
 * http://linshi.mbwxzx.com/slider/
 *
 * author : Mr Cui
 *
 * 各位同仁轻拍,欢迎指正纠错,联系QQ：764028466
 *
 */
!(function(window,$){
    $.fn.extend({
    	 Silder : function(options){
    	 	  var defaults = {
    	 	  	      autoPlay : true,                                 //是否自动播放
                  Speed : 3000,                                    //自动执行间隔时间
                  timed : 300,                                     //动画执行时间
                  moveType : 'scroll',                             //切换方式默认是滚动 {scroll | opacity}
                  mouseEvent : 'click',                            //按钮触发事件类型{mouseover | click} 
                  btnShow : true,                                  //是否隐藏按钮        { true | false}
                  btnBox : 'radio',                                //按钮class类名                                     
    	 	          aBtn   : true                                    //是否隐藏两侧左右按钮{ true | false}                               
    	 	  };

    	 	  var options = $.extend(defaults,options),
    	 	      container = $(options.container),
    	 	      silderbox = $(options.silderbox),
    	 	      silderobj = $(options.silderobj),
              autoPlay = options.autoPlay,
              Speed = options.Speed,
              timed = options.timed,
              moveType = options.moveType,                          
              mouseEvent = options.mouseEvent,
              btnShow = options.btnShow,
              btnBox = options.btnBox,
              aBtn = options.aBtn,
              aBtnLeft = options.aBtnLeft,
              aBtnRigh = options.aBtnRigh,
              isMove = options.isMove,
              Current = options.Current,
    	 	      oNum = silderobj.length,
    	 	      oWid = null,
    	 	      oFir = silderobj.eq(0).clone(),
    	 	      self = this,
    	 	      isMove = true,
    	 	      tim  = null;

              if(btnShow){                           //是否隐藏按钮
                 var btnHtml = '<ul class='+btnBox+'>';
                 for(var i=0; i<oNum; i++){
                     btnHtml += '<li></li>'
                 }
                 btnHtml += '</ul>';
                 self.append(btnHtml);
                 var oLis = $('.'+btnBox).children('li');
                 oLis.eq(0).addClass(Current);
                 oLis.bind(mouseEvent,function(){
                 	var a = $(this).index();
                 	autoMove(a);
                 });
              }

              if(autoPlay){
              	 tim = setInterval(autoMove,Speed);   //是否自动执行
              	 conhover(container);
              }

              if(moveType == 'scroll') {              //判断切换类型
        	 	      silderbox.append(oFir);
        	 	      silderobj.addClass('scrli');
        	 	      oWid = silderobj.outerWidth();
        	 	      silderbox.css('width',(oNum+1)*oWid+100+'px');
              }else{
              	  silderobj.addClass('optli').eq(0).addClass('optcur')
              }

              if(aBtn){                               //是否隐藏两侧左右按钮
        	 	  	  var abtnL = "<a href='javascript:;' class='abut "+aBtnLeft+"'><</a>",
        	 	  	      abtnR = "<a href='javascript:;' class='abut "+aBtnRigh+"'>></a>";
                      self.append(abtnL,abtnR);
                  $('.'+aBtnLeft).click(function(){
                      autoMove('prev');
                  })
                  $('.'+aBtnRigh).click(function(){
                  	  autoMove();
                  });
        	 	  }

              
    	 	  function autoMove(){
    	 	  	 if(!isMove){return}
    	 	  	 isMove = false;
    	 	  	 if(moveType == 'scroll'){
                     var Nowleft = Math.abs(parseInt(silderbox.css('left')));
                     var index = arguments[0] != undefined && typeof(arguments[0]) != 'string' ? arguments[0] : Nowleft/oWid+1;

                     if(typeof arguments[0] == 'string'){ //判断是否是左侧按钮事件
                     	 index = Nowleft/oWid-1;
                         if(Nowleft/oWid == 0){
                         	index = oNum-1;
                         	silderbox.css('left',-oNum*oWid+'px');
                         	var newLeft = parseInt(silderbox.css('left'));
                         	silderbox.animate({left:newLeft+oWid+'px'},timed,function(){
                         		if(btnShow) $('.'+btnBox).children('li').removeClass(Current).eq(index).addClass(Current);
                         		isMove = true;
                         	})
                         }else{
                         	silderbox.animate({left:-index*oWid+'px'},timed,function(){
                         		if(btnShow) $('.'+btnBox).children('li').removeClass(Current).eq(index).addClass(Current);
                         		isMove = true;
                            })
                         }  
                     }else{
                     	silderbox.animate({left:-index*oWid+'px'},timed,function(){
	                     	if(index >= oNum){
	                     		silderbox.css('left',0);
	                     		index = 0;
	                     	}
	                     	if(btnShow) $('.'+btnBox).children('li').removeClass(Current).eq(index).addClass(Current);
	                     	isMove = true;
                        })
                     }                        
    	 	  	 }

    	 	  	 if(moveType == 'opacity'){
    	 	  	 	var index = $('.optcur').index(),
                        next = arguments[0] != undefined && typeof(arguments[0]) != 'string' ? arguments[0] : index+1;
                    if(arguments[0] == undefined){
                    	if(index >= oNum-1) next = 0;
                    }

                    if(typeof arguments[0] == 'string'){
                    	next = index-1;
                    	if(index == 0) next = oNum-1;
                    }

    	 	  	 	if(btnShow){
    	 	  	 		$('.'+btnBox).children('li').removeClass(Current).eq(next).addClass(Current);
    	 	  	 	}
    	 	  	 	silderobj.eq(index).animate({'opacity':0,'z-index':0},timed,function(){
    	 	  	 		silderobj.eq(index).removeClass('optcur');
    	 	  	 	});
    	 	  	 	silderobj.eq(next).animate({'opacity':1,'z-index':1},timed,function(){
    	 	  	 		silderobj.eq(next).addClass('optcur');
    	 	  	 	});
    	 	  	 	isMove = true;
    	 	  	 }
    	 	  } 

    	 	  function conhover(o){
	 	  	 	o.hover(
    	 	  	   function(){
    	 	  	   	  if($('.abut').length > 0) $('.abut').fadeIn();
    	 	  	   	  clearInterval(tim);
    	 	  	   },
    	 	  	   function(){
    	 	  	      if($('.abut').length > 0) $('.abut').fadeOut();
    	 	  	   	  tim = setInterval(autoMove,Speed);
    	 	  	   }
	 	  	    )
          }   
    	 }
    });

})(window,jQuery);


$(document).ready(function(){
    $('#box').Silder({
    	container : '#box',
    	silderbox : '.boxul',
    	silderobj : '.boxul li',
      Current : 'cur',
      moveType: 'opacity',
      aBtnLeft: 'apre',
      aBtnRigh: 'anex'
    });
});