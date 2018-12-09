new Vue({
    el: "#demo1",
    data: {
        show: true
    },
    methods: {
        beforeEnter: function (el) {
            el.style.opacity = 0;
            el.style.transformOrigin = 'left'
        },
        enter: function (el, done) {
            Velocity(el, {opacity: 1, fontSize: '1.4em'}, {duration: 300});
            Velocity(el, {fontSize: '1em'}, {complete: done})
        },
        leave: function (el, done) {
            Velocity(el, {translateX: '15px', rotateZ: '50deg'}, {duration: 600});
            Velocity(el, {rotateZ: '100deg'}, {loop: 2});
            Velocity(el, {
                rotateZ: '45deg',
                translateY: '30px',
                translateX: '30px',
                opacity: 0
            }, {complete: done})
        }
    }
});
//使用钩子函数的时候，当“只用 JavaScript 过渡”的时候，在 enter 和 leave 中必须使用 done 进行回调。否则，它们将被同步调用，过渡会立即完成。
//推荐对于“仅使用 JavaScript 过渡”的元素添加 v-bind:css="false"，Vue 会跳过 CSS 的检测。这也可以避免过渡过程中 CSS 的影响。
new Vue({
    el:"#demo2",
    data:{
        show:true
    }
});