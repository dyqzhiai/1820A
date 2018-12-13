
   var index = 1;
   var pageNum = 40;

   $.ajax({
        type:"get",

        url:"data.json",

        async:true,

        dataType:"json",
        success : function(arr){
            var html = "";
         for( var i = (index-1)*pageNum ; i < index*pageNum ; i++ ){
			var pro = arr[i];
			if( i < arr.length ){
                html +=  ` <a href="#">
                <div class="goods-box">
                <div class="good-image">
                 <img src="${pro .FileName}" alt="">
           </div>
            <div class="good-price">
                <span>￥${pro.price_mobile}</span>
                 <s>￥${pro.OriginalPrice}</s>
            </div>
           <div class="good-title">
                 <p>${pro.Name}</p>   
           </div>
           
           <div class="good-lenth">
                 <div>起订:<span>${pro.LimitCount}</span>${pro.Unit}</div>    
             </div>
          
          <div class="btn">即将开始</div>
     </div></a>`
            }
        }
        $(".container-goodslist").html(html);
    }
    });
    

    
  
