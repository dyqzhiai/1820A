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
//# sourceMappingURL=all.js.map
