<template>
	<view>
	<view class="cart" v-if="cart.length !== 0">
		<!-- 收获地址组件 -->
		<myaddress></myaddress>
		
		<view class="cart-title">
			<!-- 左侧图标 -->
			<uni-icons type="shop" size="18"></uni-icons>
			<!-- 右侧文本 -->
			<text class="cart-title-text">购物车</text>
		</view>

		<uni-swipe-action>
			<!-- 购物车中的商品信息 -->
			<view class="" v-for="(goods,i) in cart" :key="i">
				<uni-swipe-action-item 
				:right-options="options" 
				@click="swiperItemClickHandler(goods)">
					<mygoods :goods="goods" 
					:show-radio="true" 
					@radio-change="radioChangeHandler" 
					:show-num="true"
					@num-change="numChange"></mygoods>
				</uni-swipe-action-item><!-- 后边的就是父子传值  子传给父 -->
			</view>
		</uni-swipe-action>
		
		<view class="">
			<mysettle></mysettle>
		</view>
	</view>
	
	<!-- 空白购物车区域 -->
	  <view class="empty-cart" v-else>
	    <text class="tip-text">空空如也~</text>
	  </view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import bageMix from '@/mixins/Tabbar-badge.js'
	export default {
		mixins: [bageMix],
		data() {
			return {
				// 
				options:[{
					text:'删除',
					style:{
						backgroundColor:'#c00000'
					}
				}]
			}
		},
		computed: {
			// cart 接收  把cart 就是选中的商品 
			...mapState('m_cart', ['cart'])

		},
		methods: {
			...mapMutations('m_cart', ['uqdateGoodsState', 'uqdateGoodsCount','removeGoodsById']),
			radioChangeHandler(e) {
				// console.log(e);//mygoods传过来的值   在传到cart.js中区处理
				this.uqdateGoodsState(e)

			},
			numChange(e) {
				// console.log(e);
				this.uqdateGoodsCount(e)
			},
			// 根据id删除购物车中的对应信息
			swiperItemClickHandler(goods){
				this.removeGoodsById(goods)
			}
		}
		/* computed:{
			 // 将 m_cart 模块中的 total 映射为当前页面的计算属性
			...mapGetters('m_cart',['total'])
		},
		methods: {
			setBadge(){
				// 加上
				// 为 tabBar 某一项的右上角添加文本  在文档中有setTabBarBadge
				uni.setTabBarBadge({
					index:2,
					text:this.total+''
				})
			}
		},
		onShow() {
			// 在页面刚展示的时候，设置数字徽标
			this.setBadge()
		} */

	}
</script>

<style lang="scss">
	.cart-title {
		height: 40px;
		display: flex;
		align-items: center;
		padding-left: 5px;
		border-bottom: 1px solid #efefef;

		.cart-title-text {
			font-size: 14px;
			margin-left: 10px;
		}
	}
	.cart{
		padding-bottom: 50px;
	}
</style>
