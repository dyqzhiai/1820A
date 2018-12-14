// 通用的工具 ;
// 通用的函数封装。
function _(selector) {
  var ele = document.querySelectorAll(selector);
  if (ele.length == 0) return null;
  return ele.length == 1 ? ele[0] : ele;
}

function _ajax(url) {
  return new Promise(function (resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.send(null);

    xhr.onload = function () {
      if (xhr.status === 200) {
        resolve(xhr.response);
      }
    };
  });
}

function _jsonp(url, cb) {
  return new Promise(function (resolve, reject) {
    cb = cb ? cb : "callback";
    var randomName = "cb" + Date.now();
    var script = document.createElement("script");
    url += (/\?/.test(url) ? "&" : "?") + `${cb}=${randomName}`;
    script.src = url;
    document.body.appendChild(script);

    script.onload = function () {
      this.remove();
    };

    window[randomName] = function (res) {
      resolve(res);
    };
  });
} // 兼容型伪数组转换成真数组;


function _slice(args) {
  return Array.prototype.slice.call(args);
}

function _removeClass(dom, className) {
  return dom.className = dom.className.replace(className, "");
}
var index = 0; // 选中所有的图片;

var prve_index = 0; // 图片

var $slides = $(".slide"); //按钮包裹

var $pagewrarp = $(".pagination");
var maxIndex = $slides.length - 1; // 什么是轮播图就是控制 index 自增自减 及 范围的一个小特效;

$("#right").on("click", next);
$("#left").on("click", prve); // 切换下一张图片;

function next() {
  prve_index = index;

  if (index == maxIndex) {
    // alert("最后一张图片了,后面没有了");
    index = 0;
    changeClass();
    return false;
  }

  index++;
  changeClass();
}

function prve() {
  prve_index = index;

  if (index == 0) {
    // alert("最后一张图片了,后面没有了")
    index = maxIndex;
    changeClass();
    return false;
  }

  index--;
  changeClass();
} // 当我们在切换图片的时候，只不过是在操作 index;


function changeClass() {
  $slides.eq(prve_index).addClass("slide-willhide").siblings(".slide").removeClass("slide-willhide");
  $slides.eq(index).addClass("slide-show").siblings(".slide").removeClass("slide-show") // 动画效果;
  .end() // 给上一张图片加上class willhide;
  .hide().stop().fadeIn();
  $pagewrarp.children().eq(index).addClass("active").siblings("span").removeClass("active");
}

function initPagination() {
  //创建$slides 数量的按钮
  for (var i = 0; i < $slides.length; i++) {
    var $span = $("<span>");

    if (i == index) {
      $span.addClass("active");
    }

    $pagewrarp.append($span);
  }

  initPagination();
} //事件委托  =>委托给小按钮的父级；


$pagewrarp.on("mouseover", "span", toIndex);

function toIndex(event) {
  //获取当前元素的下标
  //获取事件源（获取当前发生事件的元素）
  var e = event || window.event;
  var target = e.target || e.srcElement; // jquery 提供了一个 index() 方法

  prve_index = index;
  index = $pagewrarp.children().index(target);
  changeClass();
}

var banner_timer = setInterval('$("#right").trigger("click")', 5000); //用户体验的完善

$(".container").hover(function () {
  clearInterval(banner_timer);
}, function () {
  banner_timer = setInterval('$("#right").trigger("click")', 5000);
});
var index = 1;
var pageNum = 40;
$.ajax({
  type: "get",
  url: "data.json",
  async: true,
  dataType: "json",
  success: function (arr) {
    var html = "";

    for (var i = (index - 1) * pageNum; i < index * pageNum; i++) {
      var pro = arr[i];

      if (i < arr.length) {
        html += ` <a href="#">
                <div class="goods-box">
                <div class="good-image">
                 <img src="${pro.FileName}" alt="">
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
     </div></a>`;
      }
    }

    $(".container-goodslist").html(html);
  }
});
//# sourceMappingURL=all.js.map
