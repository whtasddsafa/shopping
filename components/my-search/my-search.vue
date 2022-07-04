<template>
	<view @click="searchbox">
		<view class="my-search-container" 
				:style="{'background-color':bgcolor}" >
			<view class="my-search-box" 
			:style="{'border-radius':redius+'px'}" >
				<uni-icons type="search" size="17"></uni-icons>
				<text class="placeholder">搜索</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"my-search",
		props:{
			// 背景颜色
			bgcolor:{
				type:String,
				default:'#42bd56'
			},
			// 圆角尺寸
			redius:{
				type:Number,
				default:18
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			searchbox(){
				// console.log('.............');
				// 传值
				this.$emit('myclick')
			}
		}
	}
</script>

<style lang="scss">
	.my-search-container{
		height: 50px;
		// background-color: #42bd56;
		display: flex;
		align-items: center;
		padding: 0 10px;
		.my-search-box{
			height: 36px;
			background-color: #ffffff;
			// border-radius: 18px;
			width: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			.placeholder{
				font-size: 15px;
				margin-left: 5px;
			}
		}
	}
</style>