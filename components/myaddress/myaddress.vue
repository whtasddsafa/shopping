<template>
	<view>
		<!-- 选择收获地址的盒子 -->
		<view class="address-box" v-if="JSON.stringify(address) === '{}'">
			<button @click="chooseAddress" type="primary" size="mini" class="address-button">请选择收获地址</button>
		</view>
		<!-- 收获信息                             重新选择收获地址 --> 
		<view class="address-info-box" v-else @click="chooseAddress">
			<view class="row1">
				<view class="row1-left">
					<view class="username">
						收货人：{{address.userName}}
					</view>
				</view>
				<view class="row1-right">
					<view class="phone">电话：{{address.userName}}</view>
					<uni-icons type="arrowright" size="16"></uni-icons>
				</view>
			</view>
			<view class="row2">
				<view class="row2-left">
					收获地址：
				</view>
				<view class="row2-tight">
					{{addstr}}
				</view>
			</view>
		</view>
		<view class="dibu"></view>
	</view>
</template>

<script>
	import {mapState,mapMutations,mcapGetters} from 'vuex'
	export default {
		name:"myaddress",
		data() {
			return {
				address:{}
			};
		},
		methods:{
			...mapMutations('m_user',['updateAddress']),
			
			async chooseAddress(){
				// 加收获地址
				const [err,succ] = await uni.chooseAddress().catch(err=>err)
				console.log(succ);
				if(err===null&&succ.errMsg === 'chooseAddress:ok'){
					// console.log(succ);
					this.address=succ
					this.updateAddress(succ)
				}
				
			}
			
		},
		computed:{
			    // ...mapState('m_user', ['address']),
			    // 将 m_user 模块中的 addstr 映射到当前组件中使用
			    // ...mapGetters('m_user', ['addstr']),
			// 把 m_user 模块中的 address 对象映射当前组件中使用，代替 data 中 address 对象
			// 把地址村到vuex中
			
			// console.log(address)
			addstr(){
				if(!this.address.provinceName){
					return ''
				}
				return this.address.provinceName + this.address.cityName + this.address.countyName + this.address.detailInfo
			}
			// addstr() {
			// 	return this.$store.addstr
			// },
		}
	}
</script>

<style lang="scss">
.dibu{
	border-bottom: 1px solid #efefef;
}
.address-box{
	height: 90px;
	display: flex;
	justify-content: center;
	align-items: center;
}
.address-info-box{
	font-size: 12px;
	height: 90px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	padding: 0 5px;
	.row1{
		display: flex;
		justify-content: space-between;
		
		.row1-right{
			display: flex;
			justify-content: space-between;
			
		}
	}
	.row2{
		display: flex;
		// justify-content: space-between;
		align-items: center;
		margin-top: 10px;
		.row2-left{
			white-space: nowrap;
		}
		
	}
}
</style>