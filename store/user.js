export default {
	// 开启命名空间
	namespaced:true,
	
	state:()=>({
		// address:{}
		address:uni.getStorageSync('address') || '{}',
		// address:JSON.parse(uni.getStorageSync('address') || '{}')
		
		// 这样是正确的方法
		// token:uni.getStorageSync('token') || '',
		// 上边的是对的，这个123是接口永不了才这样做的
		token:uni.getStorageSync('token') || '123',
		
		userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}')
	}),
	
	// 方法
	mutations:{
		// 更新收获地址
		updateAddress(state,address){
			// console.log(state.userName);
			state.address = address
			// console.log(state.address);
			this.commit('m_user/setaddresstostorage')
		},
		// 持久化存储address
		setaddresstostorage(state){
			// uni.setStorageSync('address', JSON.stringify(state.address))
			uni.setStorageSync('address', state.address)
		},
		// 更新用户的基本信息
		  updateUserInfo(state, userinfo) {
		    state.userinfo = userinfo
		    // 通过 this.commit() 方法，调用 m_user 模块下的 saveUserInfoToStorage 方法，将 userinfo 对象持久化存储到本地
		    this.commit('m_user/saveUserInfoToStorage')
		  },
		 // 将 userinfo 持久化存储到本地
		  saveUserInfoToStorage(state) {
		    uni.setStorageSync('userinfo', JSON.stringify(state.userinfo))
		  },
		  // 
		  updateToken(state,token){
			  state.token = token 
			  this.commit('m_user/saveTokenStorage')
		  },
		  saveTokenStorage(state){
			  uni.setStorageSync('token',state.token)
		  }
	},
	getters:{
		addstr(state){
			console.log(state);
			if(!state.address.provinceName){
				return ''
			}
			return state.address.provinceName + state.address.cityName + state.address.countyName + state.address.detailInfo
		}
	}
}