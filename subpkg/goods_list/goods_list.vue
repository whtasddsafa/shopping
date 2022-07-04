<template>
	<view>
		<view class="goods-list">
			<view v-for="(goods,i) in goodsList" :key="i"
			@click="gotoDetail(goods)" >
			<!-- 在这里设置购物车里出现的选中的图标 -->
				<mygoods :goods="goods"></mygoods>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 请求参数对象
				queryObj:{
					// 查询关键词
					query:'',
					// 商品分裂id
					cid:'',
					// 页码值
					pagenum:1,
					// 每页显示的数据
					pagesize:10
				},
				// 商品列表的数据
				goodsList:[],
				// 总数量,用来实现分页
				total:0,
				// // 默认图片
				// defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
				
				// 节流阀 防抖
				isloding:false
			};
		},
		onLoad(options) {
			// 接受后面的参数
			// console.log(options);
			// 将页面参数转存到 this.queryObj 对象中
			this.queryObj.query = options.query ||''
			this.queryObj.cid = options.cid || ''
			this.getGoodsList()
		},
		methods:{
			// cb下面的
			async getGoodsList(cb){
				// 发起请求前打开节流阀
				this.isloding = true
				const {data:res} = await uni.$http.get('/api/public/v1/goods/search',this.queryObj)
				// 请求完毕关闭节流阀
				this.isloding = false
				
				// 只要数据请求完毕，就立即按需调用cb回调函数
				cb&&cb()
				
				// console.log(res);
				// this.goodsList = res.message.goods
				// 新旧数据拼接
				this.goodsList = [...this.goodsList,...res.message.goods]
				this.total = res.message.total
			},
			// 点击跳转到页面详情页
			gotoDetail(goods){
				// console.log(goods);
				uni.navigateTo({
					url:'/subpkg/goods_detail/goods_detail?goods_id='+goods.goods_id
				})
			}
		},
		// 监听加载下拉加载更多isloding
		onReachBottom(){
			// 当前的页码值大于等于总的,就结束
			if(this.queryObj.pagenum*this.queryObj.pagesize >= this.total){
				return uni.$showMsg('数据加载完毕')
			}
			
			// 判断节流阀打开的状态 
			// 为true就是正在请求其他的数据，这次就先不执行了
			if(this.isloding) return
			
			this.queryObj.pagenum++
			this.getGoodsList()
		},
		// 监听下拉刷新
		onPullDownRefresh(){
			// 3.重置关键数据
			this.queryObj.pagenum = 1
			this.total = 0
			this.isloding = false
			this.goodsList =[]
			// 2.重新发起请求
			this.getGoodsList(()=>uni.stopPullDownRefresh())
		},
		
	}
</script>

<style lang="scss">
view{
	
}
</style>
