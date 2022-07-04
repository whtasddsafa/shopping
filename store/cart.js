export default {
	// 为当前的模块开辟命名空间
	namespaced: true,
	
	state: () => ({
		// 购物车的数组，用来存储购物车中每个商品的信息对象
		// 每个商品的信息对象，都包含如下 6 个属性：
		// { goods_id, goods_name, goods_price, goods_count, goods_small_logo, goods_state }
		// cart:[]
		cart: JSON.parse(uni.getStorageSync('cart')||'[]'),
	}),
	// 模块的mutations方法
	mutations:{
		addToCart(state,goods){
			// find
			const findResult = state.cart.find(x=>{
				return x.goods_id === goods.goods_id
			})
			// console.log(findResult);
			if(!findResult){
				state.cart.push(goods)
			}else{
				findResult.goods_count ++
			}
			// console.log(state.cart);//这里可以看到goods_count在不断加
			
			// 通过 commit 方法，调用 m_cart 命名空间下的 saveToStorage 方法
			this.commit('m_cart/saveToStorage')
			
		},
		saveToStorage(state){
			uni.setStorageSync('cart',JSON.stringify(state.cart))
		},
		// 更新商品购物车中的勾选
		uqdateGoodsState(state,goods){
			// console.log(state);
			// console.log(goods);
			// 找到所有的数据   再看看数据与传过来的哪个等
			const findResult = state.cart.find(x=>x.goods_id === goods.goods_id)
			if(findResult){
				findResult.goods_state = goods.goods_state
				
				this.commit('m_cart/saveToStorage')
			}
		},
		uqdateGoodsCount(state,goods){
			// console.log(state);
			// console.log(goods);
			// 找到所有的数据   再看看数据与传过来的哪个等
			const findResult = state.cart.find(x=>x.goods_id === goods.goods_id)
			if(findResult){
				findResult.goods_count = goods.goods_count
				
				this.commit('m_cart/saveToStorage')
			}
		},
		// 根据id删除商品数据
		removeGoodsById(state,goods){
			state.cart = state.cart.filter(x=>x.goods_id !== goods.goods_id)
			this.commit('m_cart/saveToStorage')
		},
		// 更新所有商品的勾选状态
		updateAllGoodsState(state, newState) {
		  // 循环更新购物车中每件商品的勾选状态
		  state.cart.forEach(x => x.goods_state = newState)
		  // 持久化存储到本地
		  this.commit('m_cart/saveToStorage')
		}
	},
	getters:{
		total(state){
			// let c= 0
			// state.cart.forEach(x=>c+=x.goods_count)
			// return c
			// 两个都行
			return state.cart.reduce((total,item)=> total+=item.goods_count,0)
		},
		// 选择框
		checkedCount(state){
			return state.cart.filter(x => x.goods_state).reduce((total, item) => total += item.goods_count, 0)
		},
		// 已勾选的商品的总价
		checkedGoodsAmount(state) {
		  // 先使用 filter 方法，从购物车中过滤器已勾选的商品
		  // 再使用 reduce 方法，将已勾选的商品数量 * 单价之后，进行累加
		  // reduce() 的返回值就是已勾选的商品的总价
		  // 最后调用 toFixed(2) 方法，保留两位小数
		  return state.cart.filter(x => x.goods_state)
		                   .reduce((total, item) => total += item.goods_count * item.goods_price, 0)
		                   .toFixed(2)
		}
	}
}
