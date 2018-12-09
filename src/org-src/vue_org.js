/**********************************************************///响应式data
let student = {
    name: "小鹏",
    age: 12,
    home: "周家坪"
};

let v1 = new Vue({
    el: '#one',
    data: student
});

Object.freeze;//使用 Object.freeze()，这会阻止修改现有的属性，也意味着响应系统无法再追踪变化。
console.log(v1.name === student, '......', v1.name === student.name);
console.log(v1 + '============' + student.name);
v1.name = "校长";

// v1.b = "我不会影响视图的变化";//只有当实例被创建时 data 中存在的属性才是响应式的。也就是说如果你添加一个新的属性,那么对 b 的改动将不会触发任何视图的更新


/******************************************************///计算属性computed

let v2 = new Vue({
    el: "#two",
    data: {
        one: 555
    },
    computed: {
        ten_times: function () {
            return this.one * 555555555;
        },
        double: {
            get: function f() {
                return this.one * 2;
            },
            set: function (new_thing) {
                this.one = new_thing * 55555;
            }
        }//计算属性可以提供setter，但默认只有get
    }
});//计算属性是基于它们的依赖进行缓存的。只在"相关依赖"发生改变时它们才会重新求值。

/****************************************************///侦听属性watch
let v3 = new Vue({
    el: "#three",
    data: {
        firstname: 'FFFF',
        lastname: 'oooo',
        fullname: 'FFFF oooo'
    },
    watch: {
        firstname: function (val) {
            this.fullname = val + ' ' + this.lastname;
        },
        lastname: function (val) {
            this.fullname = this.firstname + ' ' + val;
        }
    }
});//根实例
/*****************************************************///绑定class
let v4 = new Vue({
    el: "#four",
    data: {
        isa: true,
        isb: true,
        A: 'SDSD',//这样赋值的A是无效的
        object_class: {
            A: false,
            B: true
        },
        F1: 'A',
        F2: 'B',
        C: 'C',

        activecolor: 'red',
        fontsize: 30
    },
    computed: {
        object_class_computed: function () {
            return {
                A: this.isa && this.isb,
                B: !this.isa && this.isb
            }
        }
    }
});
/*********************************************************///注册组件，组件基础
Vue.component('button-component', {
    data: function () {
        return {
            count: 0
        }
    }//data在组件里面必须是一个函数,不然不能做到每次复用组件是维护不同的属性.
    , template: '<button v-on:click="count++">you click {{count}} times</button>'
});//全局注册，子组件
new Vue({el: '#component-demo'});//注册后的组件,能使用在任何Vue根实例的模板中(new Vue),同时也可以在所有子组件中也可以使用

/***********************///prop
Vue.component('blog-post', {
    props: {
        title: [Number, String, Boolean, Array, Object, Function, Symbol],
        propb: {
            valueis: function (val) {
                return ['success', 'bad', 'chip']
            }
        }//设置prop验证
    },
    template: '<div><h3>{{title}}</h3><div>每个组件只包含一个根元素，必须用一个大的包裹住</div></div>'
});//简单的prop组件
new Vue({
    el: '#component-prop',
    data: {
        posts: [
            {id: 0, title: 'i am first prop information'},
            {id: 1, title: 'i am second prop information'},
            {id: 2, title: 'i am third prop information'}
        ]
    }
});
/*******************///prop复杂组件,通过事件像父级组件发送消息
Vue.component('blogs-post', {
    props: ['post'],
    template: '<div>' +
    '<h3>{{ post.title }}</h3><slot></slot>' +
    '<button v-on:click="$emit(\'bigger\',0.3)">large text</button>' +
    '<div v-html="post.content"></div>' +
    '</div>'
});//$emit自定义事件，可以向父级组件触发事件，第二个参数可以抛出一个值(可以用$event访问，或者作为事件处理方法的第一个参数传入)
//<slot></slot>标签为插槽
new Vue({
    el: '#component-composts',
    data: {
        posts: [
            {id: 0, title: 'first composts prop information', content: 'walk it like it talk it1'},
            {id: 1, title: 'second composts prop information', content: 'walk it like it talk it2'},
            {id: 2, title: 'third composts  prop information', content: 'walk it like it talk it3'}
        ],
        setFontSize: 1
    }
});
/*****************///v-mode创建自定义输入组件
Vue.component('input-custom', {
    props: ['value'],
    template: '<input v-bind:value="value" v-on:input="$emit(\'input\',$event.target.value)">'
});
new Vue({
    el: "#input-model",
    data: {
        what: "你想干啥啊"
    }
});
/*******************************************************///动态组件
Vue.component('tab-home', {
    template: '<div>Home component</div>'
});
Vue.component('tab-posts', {
    template: '<div>Posts component</div>'
});
Vue.component('tab-archive', {
    template: '<div>Archive component</div>'
});

new Vue({
    el: '#dynamic-component-demo',
    data: {
        currentTab: 'Home',
        tabs: ['Home', 'Posts', 'Archive']
    },
    computed: {
        currentTabComponent: function () {
            return 'tab-' + this.currentTab.toLowerCase()
        }
    }
});
/**********************************************///条件渲染
new Vue({
    el: '#if-else',
    data: {
        loginType: 1
    },
    methods: {
        too: function () {
            if (this.loginType === 1) {
                this.loginType = 2;
            } else {
                this.loginType = 1;
            }
        }
    }
});
/**********************************************///列表渲染
let m1 = new Vue({
    el: '#for-of',
    data: {
        object: {
            name: 'goudan',
            old: 13,
            school: "uestc",
            country: "China"
        },
        abc: [1, 2, 3, 4, 5, 6]
    }
});
/***********************************************////事件处理
new Vue({
    el: "#doing",
    data: {a: 1},
    methods: {
        warn: function () {
            alert('you can\'t do this');
        }
    }
});
/************************************************///表单绑定
new Vue({
    el: '#form-control',
    data: {
        message: '',
        checked: false,
        checkedNames: [],
        selected: 'A',
        options: [
            {text: 'One', value: 'A'},
            {text: 'Two', value: 'B'},
            {text: 'Three', value: 'C'}
        ]
    }
});