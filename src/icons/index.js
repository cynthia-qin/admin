// 将svg图标全局注册
import Vue from 'vue'
import SvgIcon from '@/components/svg-icon.vue'
Vue.component('SvgIcon', SvgIcon)

// 批量导入SVG图标
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
