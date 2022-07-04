<template>
	<view>
		<!-- 搜索 在顶部用粘性定位 -->
		<view class="search-xiding">
			<my-search @myclick="gotosearch"></my-search>
		</view>
		
		<swiper 
		:indicator-dots="true" 
		:autoplay="true" 
		circular=true
		:interval="1000" 
		>
			<swiper-item v-for="(item,i) in swiperList" :key="i">
				<navigator class="img" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
					<image :src="item.image_src"></image>
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 分类导航的列表 -->
		<view class="navlistbox">
			<view class="navlist" v-for="(item1,i1) in navList" :key="i1"
			@click="navClickHandler(item1)"
			>
				<image :src="item1.image_src" class="nav-img"></image>
			</view>
		</view>
		<!-- 楼层 -->
		<view class="floor-list">
			<view class="floor-itrm" v-for="(item,i) in floorList" :key="i">
				<!-- 楼层的标题 -->
				<image :src="item.floor_title.image_src" class="floor-title"></image>
				<!-- 标题下边得区域 -->
				<view class="floor-img-box">
					<!-- 左边得大盒子 -->
					<!-- :url="item.product_list[0].url" -->
					  <navigator class="left-img-box" :url="item.product_list[0].url">
					    <image :src="item.product_list[0].image_src" 
						:style="{width: item.product_list[0].image_width + 'rpx'}" mode="widthFix"></image>
					  </navigator>
					  <!-- 右侧 4 个小图片的盒子 -->
					  <view class="right-img-box">
					    <navigator class="right-img-item" v-for="(item2, i2) in item.product_list" :key="i2" v-if="i2 !== 0" :url="item2.url">
					      <image :src="item2.image_src" mode="widthFix" :style="{width: item2.image_width + 'rpx'}"></image>
					    </navigator>
					  </view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import bageMix from '@/mixins/Tabbar-badge.js'
	export default {
		// 正常来说应该放在守卫里把
		mixins:[bageMix],
		data() {
			return {
				// 轮播图的数据
				swiperList:[],
				// 分类导航的数据
				navList:[],
				// 楼层的数据
				floorList:[]
			}
		},
		// onLoad: () => {
			
		// }
		onLoad() {
			// 调用方法获取轮播图的数据
			this.getSwiperList()
			// 调用分类导航的方法
			this.getNavList(),
			// 调用楼层的方法
			this.getfloorList()
		},
		methods: {
			async getSwiperList(){
				const {data:res} = await uni.$http.get('/api/public/v1/home/swiperdata')
				if(res.meta.status !== 200){
					return uni.$showMsg
					// return uni.showToast({
					// 	title:'数据请求失败',
					// 	duration:2000,
					// 	icon:'none'
					// })
				}
				this.swiperList= res.message
				uni.$showMsg('数据请求成功')
			},
			async getNavList(){
				const {data:res} = await uni.$http.get('/api/public/v1/home/catitems')
				if(res.meta.status !== 200){
					return uni.$showMsg
					// return uni.showToast({
					// 	title:'数据请求失败',
					// 	duration:2000,
					// 	icon:'none'
					// })
				}
				this.navList = res.message
				// console.log(this.navList );
				uni.$showMsg('数据请求成功')
			},
			//
			navClickHandler(item1){
				// console.log(item1);
				if(item1.name==='分类'){
					uni.switchTab({
						url:'/pages/cate/cate'
					})
				}
			},
			// 楼层
			async getfloorList(){
				const {data:res} = await uni.$http.get('/api/public/v1/home/floordata')
				// console.log(res);
				if(res.meta.status !== 200){
					return uni.$showMsg
					// return uni.showToast({
					// 	title:'数据请求失败',
					// 	duration:2000,
					// 	icon:'none'
					// })
				}
				//对数据进行处理
				res.message.forEach(floor => {
				    floor.product_list.forEach(prod => {
				      prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
				    })
				  })
				this.floorList = res.message
				// console.log(this.navList );
				
			},
			// 跳转到搜索页面
			gotosearch(){
				uni.navigateTo({
					url:'/subpkg/search/search'
				})
			}
		
		}
	}
</script>

<style lang="scss" scoped>
	*{
		margin: 0;
		padding: 0;
	}
	html,body{
		width: 100%;
	}
	.img{
		height: 330rpx;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.navlistbox{
		display: flex;
		justify-content: space-around;
		margin: 15px 0;
		.nav-img{
			width: 128rpx;
			height: 140rpx;
		}
	}
	.floor-list{
		width: 100%;
		.floor-title {
		  height: 60rpx;
		  width: 100%;
		  display: flex;
		}
	}
	.floor-img-box{
		display: flex;
		padding-left: 10rpx;
	.right-img-box{
		display:flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}
	}
	.search-xiding{
		position: sticky;
		top: 0;
		z-index: 999;
	}
</style>
