/*******************************************///组件注册
//局部注册
let ComponentA = {
    template: '<div>我是局部组件A</div>'
};
let ComponentB = {
    template: '<div>我是局部组件B</div>',
    components: {
        'component-a': ComponentA
    }
};
new Vue({
    el: '#local-component',
    components: {
        'component-a': ComponentA,
        'component-b': ComponentB
    }
});//局部组件必须在components选项中定义
/******************************************///prop
//prop验证
function Persion(firstnames, lastnames) {
    this.firstnames = firstnames;
    this.lastnames = lastnames;
}

Vue.component('my-component', {
    inheritAttrs: false,//阻止根元素继承特性
    props: {
        prop: {
            propA: [String, Number],
            propB: {
                type: Number,
                default: 100
            },
            propC: {
                type: Object,
                default: function () {
                    return {
                        message: 'i am the props'
                    }
                }
            },
            propF: {
                validator: function (value) {
                    return value > 100;
                }
            },
            propD: Persion
        }
    },//type 可以是下列原生构造函数中的一个：String,Number,Boolean,Array,Object,Date,Function,Symbol,type 还可以是一个自定义的构造函数，并且通过 instanceof 来进行检查确认。
    template: '<div><slot></slot><p v-bind="$attrs" class="a">{{prop.propA}}</p><p class="a">{{prop.propB}}</p><p class="a">{{prop.propC}}</p><p>{{prop.propF}}</p>{{prop.propD}}</div>'
    //$attrs 属性使用，该属性包含了传递给一个组件的特性名和特性值
});
new Vue({
    el: '#props',
    data: {
        prop: {
            propA: true,
            propB: 200,
            propC: {
                data: 1998
            },
            propF: 10,
            propD: new Persion("li", "hevoon")
            // propD: 'come'
        }
    }
});
/************************************************///自定义事件
//v-model
Vue.component('base-checkbox', {
    model: {
        prop: 'checked',
        event: 'change'
    },
    props: {
        checked: Boolean
    },
    template: '<div><input v-bind="$attrs" id="1" type="checkbox" :checked="checked" @change="$emit(\'change\', $event.target.checked)"><label for="1">who?</label></div>'
});
new Vue({
    el: '#event',
    data: {
        check: true,
        value: 'aobama'
    }
});
//绑定原生事件,
Vue.component('base-input', {
    inheritAttrs: false,
    props: ['value'],
    template: `<input v-bind="$attrs" v-bind:value="value" v-on:input="$emit('input',$event.target.value)" v-on:focus="$emit('update:value', 'newone')">`,
});
Vue.component('base-input-2', {
    inheritAttrs: false,
    props: ['value', 'label'],
    computed: {
        inputlisteners: function () {
            let vm = this;
            return Object.assign({},
                this.$listeners,//添加父级所有的监听器
                {
                    input: function (event) {
                        vm.$emit('input', event.target.value);
                    }
                }//添加自定义的监听器，或者覆盖监听器的行为
            )
        }//当使用了这个属性后，不需用添加.native属性了
    },
    template: `<label>{{label}}<input v-bind="$attrs" v-bind:value="value" v-on="inputlisteners"></label>`
});
new Vue({
    el: '#events',
    data: {
        value: 'please',
        label: 'come',
    },
    methods: {
        focus: function () {
            console.log("fuck");
        }
    }
});
/************************************************///插槽
Vue.component('base-layout', {
    props: {
        title: '',
        news: Object
    },
    template: '<div>' +
    '<header><h3>{{title}}</h3><slot name="header"></slot></header>' +
    '<main><slot name="main"></slot></main>' +
    '<footer><slot name="footer"></slot></footer>' +//具名插槽
    '<slot :data="news"></slot>' +//作用域插槽，用来给slot元素绑定子作用域的数据
    '</div>'
});
new Vue({
    el: '#slots',
    data: {
        title: "SLOT",
        news: {
            a: "i am a",
            b: "i am b",
            c: "i am c",
            d: "i am d"
        }
    }
});
/*************************************************************///动态组件
Vue.component('tab-home', {
    data: function () {
        return {
            selection: null
        }
    },
    template: '<div><div class="tab" v-on:click="selection=\'你点击了我\'">Home component</div><div class="tab" v-if="selection">{{selection}}</div></div>',
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
/*************************************************************///处理边界情况
//在绝大多数情况下，我们最好不要触达另一个组件实例内部或手动操作 DOM 元素。不过也确实在一些情况下做这些事情是合适的。
//访问根实例
Vue.component('div-root', {
    props: ['tit'],
    template: '<div>{{this.$root.title}}<slot></slot></div>',
    provide: function () {
        return {
            tit: this.tit
        }
    }
});
//访问父组件实例
Vue.component('div-parent', {
    template: '<div>{{this.$parent.tit}}<slot></slot></div>'
});
Vue.component('div-parent-2', {
    inject: ['tit'],//provide与inject,将想要提供给后代的组件数据或方法通过provide传出，这样不需要爆出整个父组件
    template: '<div>{{tit}}</div>'
    // template: '<div>{{this.$parent.$parent.tit}}</div>'
});
//访问子组件实例
Vue.component('div-base-input', {
    props: ['value'],
    template: `<input v-bind:value="value" ref="inside" @input="showme"/>`,
    methods: {
        showme: function () {
            console.log(this);//注意this指向的作用域
            console.log(this.$refs.inside);
            console.log(this.$parent.$refs.inputs);
            console.log(this.$parent);
        }
    }
});
new Vue({
    el: '#edge',
    data: {
        title: "i am title",
        value: "org input"
    },
    methods: {
        refdone: function () {
            console.log(this);//注意this指向的作用域
            console.log(this.$refs.inputs.$refs.inside);
            console.log(this.$root);
            // this.$refs.inputs.value="ddd"
        }
    }
});//根实例，访问父组件，访问子组件实例的具体实施。

//循环引用
Vue.component('tree-folder', {
    props: ['folder'],
    template: `<p><span>{{ folder.name }}</span><tree-folder-contents :children="folder.children"/></p>`
});
Vue.component('tree-folder-contents', {
    props: ['children'],
    template: `<ul><li v-for="child in children"><tree-folder v-if="child.children" :folder="child"/><span v-else>{{ child.name }}</span></li></ul>`
});
new Vue({
    el: '#folder',
    data: {
        games: {
            folder1: {
                name: "tree",
                children: [{name: 1}, {name: 2}, {name: 3}, {name: 4}, {name: 5}, {name: 6}, {name: 7}]
            },
            folder2: {
                name: "edge",
                children: [{name: 11}, {name: 12}, {name: 13}, {name: 14}, {name: 15}, {name: 16}, {name: 17}]
            },
            folder3: {
                name: "point",
                children: [{name: 21}, {name: 22}, {name: 23}, {name: 24}, {name: 25}, {name: 26}, {name: 27}]
            },
            folder4: {
                name: "line",
                children: [{name: 31}, {name: 32}, {name: 33}, {name: 34}, {name: 35}, {name: 36}, {name: 37}]
            },
        }
    }
});