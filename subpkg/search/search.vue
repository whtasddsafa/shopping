<template>
	<view>
		<view class="search-box">
			
		<uni-search-bar focus placeholder="搜索" @input="input" :radius="100"
		cancelButton="none"></uni-search-bar>
		</view>
		
		<!-- 搜索建议列表 -->
		<view class="sugg-list" v-if="searchResults.length !==0">
		  <view class="sugg-item" v-for="(item, i) in searchResults" :key="i" @click="gotoDetail(item.goods_id)">
		    <view class="goods-name">{{item.goods_name}}</view>
		    <uni-icons type="arrowright" size="16"></uni-icons>
		  </view>
		</view>
		<!-- 搜索历史 -->
		<view class="history-box" v-else>
			<!-- 标题区 -->
			<view class="history-title">
				<text>搜索历史</text>
				<uni-icons type="trash" size="17"  @click="remove"></uni-icons>
			</view>
			<!-- 列表去 -->
			<view class="history-list">
				<uni-tag :text="item" v-for="(item,i) in historise"
				 :key="i" @click="gotoGoodslist(item)" ></uni-tag>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer:null,
				// 文本款的值
				kw:'',
				// 搜索的结果值
				searchResults:[],
				// 搜索历史区域
				historyList:['a','b','c']
			};
		},
		onLoad() {
			// 取出本地记录
			this.historyList = JSON.parse(uni.getStorageSync('kw')||'[]')
		},
		methods:{
			// input输入事件的处理函数
			input(e){
				// 防抖
				clearTimeout(this.timer)
				// e拿到用户输入的内容
				this.timer= setTimeout(()=>{
					// console.log(e);
					this.kw=e
					// 搜索
					this.getSearchList()
				},500)
			},
			async getSearchList(){
				if(this.kw.length === 0){
					this.searchResults = []
					return
				}
				
				const {data:res} = await uni.$http.get('/api/public/v1/goods/qsearch',{query:this.kw})
				this.searchResults = res.message
				
				
				this.saveSearchHistory()
			},
			gotoDetail(goods_id) {
			  uni.navigateTo({
			    // 指定详情页面的 URL 地址，并传递 goods_id 参数
			    url: '/subpkg/goods_detail/goods_detail?goods_id=' + goods_id
			  })
			},
			saveSearchHistory(){
				// 去掉重复的，数组去重，set
				// 不用unshift 用计算属性  是因为上面key绑定的是index
				// 单独的这两个也可以用
				/* this.historyList.push(this.kw)
				this.historyList = [...new Set([this.kw,...this.historyList])] */
				// 去重
				const set = new Set(this.historyList) 
				// 先删除
				set.delete(this.kw)
				// 在添加  保证实在第一个
				set.add(this.kw)
				// 把set对象转化为数组
				this.historyList = [...set]
				
				// 把搜索历史记录持久化到存储本地
				uni.setStorageSync('kw',JSON.stringify(this.historyList))
			},
			// 清空历史记录
			remove(){
				this.historyList =[]
				uni.removeStorageSync('kw','[]')
			},
			// 点击搜索历史跳转到对应页面
			gotoGoodslist(item){
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?query='+item
				})
			}
		},
		computed:{
			historise(){
				
				return [...new Set(this.historyList)].reverse()
				// return [...this.historyList]
				
				
			}
		}
	}
</script>

<style lang="scss">
.search-box{
	background-color: #42bd56;
	position: sticky;
	top: 0;
	z-index: 9999;
}
.sugg-list {
  padding: 0 5px;

  .sugg-item {
    font-size: 12px;
    padding: 13px 0;
    border-bottom: 1px solid #efefef;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .goods-name {
      // 文字不允许换行（单行文本）
      white-space: nowrap;
      // 溢出部分隐藏
      overflow: hidden;
      // 文本溢出后，使用 ... 代替
      text-overflow: ellipsis;
      margin-right: 3px;
    }
  }
}

.history-box{
	padding: 0 5rpx;
	.history-title{
		display: flex;
		justify-content: space-between;
		height: 40rpx;
		align-content: center;
		font-size: 13px;
		border: 1px solid #efefef;
	}
	.history-list{
		display: flex;
		flex-wrap: wrap;
		.uni-tag{
			margin-top: 5px;
			margin-right: 5px;
		}
	}
}


</style>
