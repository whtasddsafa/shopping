<template>
	<view v-if="goodsinfo.goods_name" class="info-box">
		<!-- 解决商品价格闪烁的问题 -->
		<!-- 导致问题的原因：在商品详情数据请求回来之前，
		data 中 goods_info 的值为 {}，因此初次渲染页面时
		，会导致 商品价格、商品名称 等闪烁的问题。
		
		解决方案：判断 goods_info.goods_name 属性的值是否存在，
		从而使用 v-if 指令控制页面的显示与隐藏： -->
		<view>
			<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="1000" :circular="true">
				<swiper-item v-for="(item,i) in goodsinfo.pics" :key="i">
					<image :src="item.pics_big" @click="preview(i)"></image>
				</swiper-item>
			</swiper>
		</view>
		<!-- 商品信息区域 -->
		<view class="goods-info-box">
			<!-- 商品价格 -->
			<view class="price">
				{{goodsinfo.goods_price}}
			</view>
			<!-- 商品信息 -->
			<view class="goods-info-body">
				<!-- 商品的名字 -->
				<view class="goods-name">
					{{goodsinfo.goods_name}}
				</view>
				<!-- 收藏区域 -->
				<view class="favi">
					<uni-icons type="star" color="gray" size="18"></uni-icons>
					<text>收藏</text>
				</view>
			</view>
			<!-- 运费 -->
			<view class="yf">
				快递: 免运费
			</view>
		</view>
		<!--  -->
		<rich-text :nodes="goodsinfo.goods_introduce"></rich-text>

		<!--  -->
		<view class="goods-nav">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
				@buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				// 数据列表
				// 后台返回的是对象类型的
				goodsinfo: {},
				// 
				options: [{
					icon: 'shop',
					text: '店铺'
				}, {
					icon: 'cart',
					text: '购物车',
					info: 0
				}],
				// 右侧按钮组的配置对象
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			};
		},
		onLoad(options) {
			// console.log(options);
			const goods_id = options.goods_id
			this.getGoodsDetail(goods_id)
		},
		computed: {
			// ...mapState('m_cart','[]')
			...mapGetters('m_cart', ['total'])
		},
		// 监听购物车数量的变化
		watch: {
			// 里面回有新旧两个值  一个的话就是新值

			/* 使用普通函数的形式定义的 watch 侦听器，
			在页面首次加载后不会被调用。因此导致了商品详情页在首次加载完毕之后，
			不会将商品的总数量显示到商品导航区域： */
			// total(newval){
			// 	const findResult = this.options.find(x=>x.text === '购物车')
			// 	if(findResult){
			// 		findResult.info = newval
			// 	}
			// }
			// vue3中的侦听器
			total: {
				handler(newval) {
					const findResult = this.options.find(x => x.text === '购物车')
					if (findResult) {
						findResult.info = newval
					}
				},
				// immediate 属性用来声明此侦听器，是否在页面初次加载完毕后立即调用
				immediate:true
			}
		},
		methods: {
			// 调用vuex中的东西
			...mapMutations('m_cart', ['addToCart']),

			async getGoodsDetail(goods_id) {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/goods/detail', {
					goods_id
				})
				// console.log(res);

				// 使用字符串的 replace() 方法，为 img 标签添加行内的 style 样式，从而解决图片底部空白间隙的问题
				// 使用字符串的 replace() 方法，将 webp 的后缀名替换为 jpg 的后缀名
				res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g,
					'<img style="display:block;" ').replace(/webp/g, 'jpg')

				this.goodsinfo = res.message
			},
			// 点击的时候，图片放大
			preview(i) {
				uni.previewImage({
					current: i,
					urls: this.goodsinfo.pics.map(x => x.pics_big)
				})
			},
			onClick(e) {
				// 能打印出来左边的两个按钮
				// console.log(e);
				if (e.content.text === '购物车') {
					uni.switchTab({
						url: '/pages/cart/cart'
					})
				}
			},
			buttonClick(e) {
				// 右边的两个按钮，能打印出来第几个和名字
				// console.log(e);
				if (e.content.text === '加入购物车') {
					// 组织商品的信息对象
					const goods = {
						goods_id: this.goodsinfo.goods_id, // 商品的Id
						goods_name: this.goodsinfo.goods_name, // 商品的名称
						goods_price: this.goodsinfo.goods_price, // 商品的价格
						goods_count: 1, // 商品的数量
						goods_small_logo: this.goodsinfo.goods_small_logo, // 商品的图片
						goods_state: true // 商品的勾选状态
					}
					// 调用addToCart方法
					// 3. 通过 this 调用映射过来的 addToCart 方法，把商品信息对象存储到购物车中
					this.addToCart(goods)
				}
			}
		}
	}
</script>

<style lang="scss">
	.swiper {
		height: 750rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.goods-info-box {
		padding: 10px;
		padding-right: 0;

		.price {
			color: #c00000;
			font-size: 18px;
			margin: 10px 0;
		}

		.goods-info-body {
			display: flex;
			justify-content: space-between;
		
			.goods-name {
				font-size: 13px;
				margin-right: 10px;
			}

			.favi {
				width: 120px;
				font-size: 12px;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				border-left: 1px solid #efefef;
				color: gray;
			}
		}

		.yf {
			font-size: 12px;
			color: gray;
			margin: 10px 0;
		}
	}


	.goods-nav {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
	}

	.info-box {
		padding-bottom: 50px;
	}
</style>
