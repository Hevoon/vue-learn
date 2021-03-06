/****************************************///基础组件的自动化全局注册
// webpack (或在内部使用了 webpack 的 Vue CLI 3+)，那么就可以使用 require.context 只全局注册这些非常通用的基
import Vue from './lib/vue/dist/vue'
import upperFirst from './lodash/upperFirst'
import camelCase from './lodash/camelCase'

const requireComponent = require.context(
    './components', // 其组件目录的相对路径
    false,// 是否查询其子目录
    /Base[A-Z]\w+\.(vue|js)$/ // 匹配基础组件文件名的正则表达式
);

requireComponent.keys().forEach(fileName => {
    // 获取组件配置
    const componentConfig = requireComponent(fileName);

    // 获取组件的 PascalCase 命名
    const componentName = upperFirst(
        camelCase(
            // 剥去文件名开头的 `./` 和结尾的扩展名
            fileName.replace(/^\.\/(.*)\.\w+$/, '$1')
        )
    );

    // 全局注册组件
    Vue.component(
        componentName,
        // 如果这个组件选项是通过 `export default` 导出的，
        // 那么就会优先使用 `.default`，
        // 否则回退到使用模块的根。
        componentConfig.default || componentConfig
    )
});