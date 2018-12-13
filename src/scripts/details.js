
		    var oSmall = document.getElementById("small");
		    var oBig = document.getElementById("big");
		    var oFrame = document.getElementById("frame");
		    var oBig_img = oBig.children[0];
		    oSmall.onmouseover = function(){
		        oBig.style.display = "block";
		        oFrame.style.display = "block";
		    }
		    oSmall.onmouseout = function(){
		        oBig.style.display = "none";
		        oFrame.style.display = "none";
		    }
		    oSmall.onmousemove = function(event){
		        var e = event || window.event;
		        var nLeft = e.offsetX - 50;
		        var nTop = e.offsetY - 50;
		        if(nLeft <= 0){
		            nLeft = 0;
		        }
		        if(nTop <= 0){
		            nTop = 0;
		        }
		        var maxLeft = oSmall.offsetWidth - oFrame.offsetWidth;
		        if(nLeft >= maxLeft){
		            nLeft = maxLeft
		        }
		        var maxTop = oSmall.offsetHeight - oFrame.offsetHeight;
		        if(nTop >= maxTop){
		            nTop = maxTop;
		        }
		        oFrame.style.left = nLeft + "px";
		        oFrame.style.top = nTop + "px";  
		        
		        // 计算比例;
		        var propX = oBig.offsetWidth / oFrame.offsetWidth;
		        // 根据比例算出位移值;
		        oBig_img.style.left = -nLeft * propX + "px";
		        var propY = oBig.offsetHeight / oFrame.offsetHeight;
		        oBig_img.style.top = -nTop * propY + "px";
		    }
		
		    