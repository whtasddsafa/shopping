<template>
	<view>
		<view class="goods-item">
			<!-- 商品左侧 -->
			<view class="goods-item-left">
				<!-- 动态的绑定  选中状态  人家goods传过来的里面有true和false -->
				<radio :checked="goods.goods_state"
				 color="#C00000" v-if="showRadio"
				 @click="redioClick"
				 ></radio>
				<image class="good-item-left-img" :src="goods.goods_small_logo || defaultPic" mode=""></image>
			</view>
			<!-- 右边 -->
			<view class="goods-item-right">
				<!-- 商品标题 -->
				<view class="goods-name">
					{{goods.goods_name}}
				</view>
				<view class="goods-info-box">
					<!-- 商品价格 -->
					<view class="goods-price">
						￥{{jiage(goods.goods_price)}}
					</view>
					<!--  -->
					<uni-number-box @change="numChaneHander" v-if="showNum" :min="1" :value="goods.goods_count"></uni-number-box>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"mygoods",
		props:{
			goods:{
				type:Object,
				default:{}
			},
			// 控制前面的按钮在哪个页面显示
			showRadio: {
			      type: Boolean,
			      // 如果外界没有指定 show-radio 属性的值，则默认不展示 radio 组件
			      default: false,
			    },
			showNum:{
				type:Boolean,
				dafault:false
			}
		},
		data() {
			return {
				defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
			};
		},
		methods:{
			jiage(price){
				return price.toFixed(2);
			},
			// 这是 radio 组件的点击事件
			redioClick(){
				// console.log(this.goods);
				this.$emit('radio-change',{
					goods_id:this.goods.goods_id,
					goods_state:!this.goods.goods_state
				})
			},
			// 监听numberbox数量变化的组件
			// 拿到上面变化的值
			numChaneHander(val){
				this.$emit('num-change',{
					goods_id:this.goods.goods_id,
					goods_count:val-0
				})
			}
		},
		computed:{
		}
	}
</script>

<style lang="scss">
.goods-item{
	display: flex;
	padding: 10px 5px ;
	border-bottom: 1px solid #f0f0f0;
	.goods-item-left{
		margin-right: 5px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.good-item-left-img{
			width: 100px;
			height: 100px;
			display: block;
		}
	}
	.goods-item-right{
		display:flex;
		flex-direction: column;
		justify-content: space-between;
		flex: 1;
		.goods-name{
			font-size: 13px;
		}
		.goods-info-box{
			display: flex;
			justify-content: space-between;
			align-items: center;
			.goods-price{
				color: red;
				font-size: 16px;
			}
		}
	}
}
</style>