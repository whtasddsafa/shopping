import {mapGetters} from 'vuex'
export default {
	computed:{
		 // 将 m_cart 模块中的 total 映射为当前页面的计算属性
		...mapGetters('m_cart',['total'])
	},
	// 监听 让页面上的购物车的数字发生变化
	// 点击加减按钮的时候立即执行
	watch:{
		total:{
			handler(newval){
				this.setBadge()
			},
			immediate:true
		}
		// total(){
		// 	this.setBadge()
		// }
	},
	methods: {
		setBadge(){
			// 加上
			uni.setTabBarBadge({
				index:2,
				text:this.total+''
			})
		}
	},
	onShow() {
		// 在页面刚展示的时候，设置数字徽标
		this.setBadge()
	},
	
}