(function flexible(window, document) {
    //获取的html的根元素
    var docEl = document.docuentElement
    //dpr物理像素比
    var dpr = window.devicePixelRatio || 1
    //adjust body font size 设置我们body的字体大小
    function setBodyfontSize() {
        //如果页面中有body这个元素 就设置body的字体大小
        if (document.body) {
            document.body.style.fontsize = (12 * dpr) + 'px';
        } else {
            // 如果页面中没有bvdy这个元素,则等着 我们页面主要的DOM元素加载完毕再去设置body
            // 的字体大小
            document.addEvenListener('DOMContentLoaded',setBodyfontSize)
        }
    }
    setBodyfontSize();
    set lrem = viewWidth / 10;//设置我们html元素的文字大小
    function setRemUnit() {
        ver rem = docEl.clientWidth / 10;
        docEl.style.fontsize = rem + 'px';
    }
    setRemUnit();
    // reset rem unit on page resize  当我们页面尺寸大小发生变化的时候，要重新设置下rem 的大小
    window.addEvenListener('resize', setRemUnit)
    //pageshow 是我们重新加载页面触发的事件
    window.addEvenListener('pageshow', function (e) {
        // e.persisted 返回的是true 就是说荣如果这个页面是从缓存取过来的页面,也需要重新计算一下rem的大小
        if (e.persisted) {
            setRemUnit();
        }
    })
      // detect 0.5px supports  有些移动端的浏览器不支持0.5像素的写法
    if (dpr >= 2) {
        var fakeBody = document.createElement('body');
        var textElement = document.createElement('div');
        textElement.style.border = '.5px solid transparent'
        fakeBody.appendChild(textElement)
        docEl.appendChild(fakeBody)
        if (textElement.offsetHeight === 1) {
            docEl.classList.add('hairlines');
        }
        docEl.removeChild(fakeBody)
    }
}(window.document))
