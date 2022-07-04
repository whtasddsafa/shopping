<template>
	<view>
		<!-- 使用自定义组件 -->
		<!-- <my-search :bgcolor="'pink'" ></my-search> -->
		<!-- 子传夫值 myclick -->
		<my-search @myclick="gotosearch"></my-search>
		
		<view class="scroll-view-a">
			<!-- 左侧得滑动区 -->
			<scroll-view class="left-scroll-view"
			 scroll-y="true" :style="{height: wh+'px'}">
				<view class="" v-for="(item,i) in catelist" :key="i">
					<view 
					:class="['left-scroll-view-item', i===active?'active':'']"
					@click="activeChange(i)"
					>
						{{item.cat_name}}
					</view>
				</view>
			</scroll-view>
			<!-- 右侧得滑动区 -->
			<scroll-view 
			class="right-scroll-view" 
			scroll-y="true" 
			:style="{height: wh+'px'}"
			:scroll-top="scrollTop+' ' " >
				<view class="cate-l2" v-for="(item2,index2) in cateLevel2"
				:key="index2"
				>
				<!-- 二级分类标题 -->
					<view class="cate-l2-title">
						/{{item2.cat_name}}/
					</view>
					<!-- 三级 -->
					<view class="cate-l3-list">
						<view class="cate-l3-item" v-for="(item3,i3) in item2.children" :key="i3"
						@click="gotogoodslist(item3)"
						>
							<image :src="item3.cat_icon"></image>
							<text>{{item3.cat_name}}</text>
						</view>
					</view>
				</view>
			</scroll-view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 当前设备可用的高度
				wh:0,
				catelist:[],
				// 默认的激活项
				active:0,
				// 二级分类的数组
				cateLevel2:[],
				// 解决右侧滚动条不自动到最上方
				scrollTop:[],
			}
		},
		onLoad() {
			// 根据设备占满高度
			const a = uni.getSystemInfoSync()
			// console.log(a);
			// -50是上面的搜索高度
			this.wh=a.windowHeight - 50
			// 获取分类的数据
			this.getCateList()
		},
		onShow() {
			this.getCateList()
			this.active = 0
		},
		methods: {
			async getCateList(){
				const {data:res} = await uni.$http.get('/api/public/v1/categories')
				// console.log(res);
				if(res.meta.status !== 200){
					return uni.$showMap()
				}
				this.catelist = res.message
				// console.log(res.message);
				//二级分类赋值
				this.cateLevel2 = res.message[0].children
				// console.log(this.cateLevel2);
			},
			// 点击的时候会切换
			activeChange(i){
				this.active = i
				// 为二级分类重新赋值
				this.cateLevel2 = this.catelist[i].children
				
				// 关于滚动条的
				this.scrollTop = this.scrollTop === 0 ? 1:0
			},
			// 三级  点击跳转页面
			gotogoodslist(item){
				uni.navigateTo({
					url:'/subpkg/goods_list/goods_list?cid='+item.cat_id
				})
			},
			// 区搜索页面
			gotosearch(){
				// console.log('ok');
				uni.navigateTo({
					url:'/subpkg/search/search'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.scroll-view-a{
		display: flex;
	}
	.left-scroll-view{
		width: 120px;
		.left-scroll-view-item{
			line-height: 60px;
			background-color: #f7f7f7;
			text-align: center;
			font-size: 12px;
			&.active{
			background-color: #ffffff;
			position: relative;
			&::before{
				content: ' ';
				display: block;
				width: 3px;
				height: 30px;
				background-color: #42bd56;
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
			}
			}
		}
	}
	.cate-l2-title{
		font-size: 12px;
		font-weight: 700;
		text-align: center;
		padding: 15rpx 0;
	}
	.cate-l3-list{
		display: flex;
		flex-wrap: wrap;
		.cate-l3-item{
			width: 33.333%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			image{
				width: 60px;
				height: 60px;
			}
			text{
				font-size: 12px;
			}
		}
	}
</style>
