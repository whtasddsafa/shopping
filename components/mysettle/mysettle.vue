<template>
	<view class="my-set-con">
		<!-- 全选 -->
		<label class="radio" @click="changeAllState">
			<radio color="#C00000" :checked="isFullCheck" /><text>全选</text>
		</label>
		<!-- 合计 -->
		<view class="amount-box">
			合计:<text class="amount">￥{{checkedGoodsAmount}}</text>
		</view>
		<!-- 结算 -->
		<view class="btn-settle" @click="settlement">
			结算({{checkedCount}})
		</view>
	</view>
</template>

<script>
	import {mapGetters,mapMutations ,mapState} from 'vuex';
	export default {
		name:"mysettle",
		data() {
			return {
				seconds:3,
				// 定时器的id
				timer:null
			};
		},
		computed:{
			...mapGetters('m_cart',['checkedCount','total','checkedGoodsAmount']),
			
			...mapGetters('m_user',['addstr']),
			// addstr() {
			// 	return this.$store.addstr
			// 	},
			...mapState('m_user',['token']),
			// 是否全选
			isFullCheck(){
				// total那边传过来的总的
				return this.total === this.checkedCount
			}
		},
		methods:{
			...mapMutations('m_cart', ['updateAllGoodsState']),
			changeAllState(){
				// 修改购物车中所有商品的选中状态
				// !this.isFullCheck 表示：当前全选按钮的状态取反之后，就是最新的勾选状态
				this.updateAllGoodsState(!this.isFullCheck)
			},
			settlement(){
				if(!this.checkedCount) return uni.$showMsg('请选择结算的商品')
				if(!this.addstr) return uni.$showMsg('请选择收获地址')
				// if(!this.token) return uni.$showMsg('请登录')
				if(!this.token) return this.delayNavigate()
			},
			// 延时导航到my页面
			delayNavigate(){
				// 把 data 中的秒数重置成 3 秒
				  this.seconds = 3
				this.showTips(this.seconds)
				
				this.timer = setInterval(()=>{
					this.seconds--
					// 判断是否<=0
					if(this.seconds<=0){
						// 清除定时器
						clearInterval(this.timer)
						
						// 跳转到my页面
						uni.switchTab({
							url:'/pages/my/my'
						})
						
						// 终止后续代码的运行(为0时，不在展示提示信息)
						return
					}
					this.showTips(this.seconds)
				},1000)
			},
			// 展示倒计时提示的消息
			showTips(n){
				uni.showToast({
					icon:'none',
					title:'请登录后在结算！'+n+'秒后跳转',
					mask:true,
					duration:1500
				})
			}
		}
	}
</script>

<style lang="scss">
.my-set-con{
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 50px;
	padding-bottom: 50px;
	background-color: white;
	
	display: flex;
	  justify-content: space-between;
	  align-items: center;
	  padding-left: 5px;
	  font-size: 14px;
	.radio{
		display: flex;
		align-items: center;
	}
	.amount-box{
		.amount{
			color: #c00000;
		}
	}
	.btn-settle{
		height: 50px;
		    min-width: 100px;
		    background-color: #c00000;
		    color: white;
		    line-height: 50px;
		    text-align: center;
		    padding: 0 10px;
	}
}
</style>