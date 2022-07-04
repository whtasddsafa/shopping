<template>
	<view>
		<view class="login">
			<uni-icons type="contact-filled" size="100" color="#afafaf"></uni-icons>
			<button type="primary" class="btn-class" @click="getUserProfile">一键登录</button>
			<text class="login-text">登陆后尽享更多</text>
		</view>
	</view>
</template>

<script>
	import {
		mapMutations
		
	} from 'vuex'
	export default {
		name: "my-login",
		data() {
			return {

			};
		},
		methods: {
			// 2. 调用 mapMutations 辅助方法，把 m_user 模块中的 updateUserInfo 映射到当前组件中使用
			...mapMutations('m_user', ['updateUserInfo','updateToken']),
			getUserProfile(e) {
				console.log(e);
				uni.getUserProfile({
					desc: '你的授权信息',
					success: (res) => {
						console.log(res);
						// 3. 将用户的基本信息存储到 vuex 中
						this.updateUserInfo(res.userInfo)
						// 获取登录成功后的 Token 字符串
						this.getToken(res)
					},
					fail: (res) => {
						return uni.$showMsg('你取消了登录授权')
					}
				})
			},
			// 调用登录接口，换取永久的 token
			async getToken(info) {
				// console.log('00',res);
				// // const query = {
				// // 	code:res.code
				// // }
				// uni.login({
				// 	success:(res)=>{
				// 		// 获取code的值
				// 		console.log(res);
				// 		// 
						
						
				// 	},
				// 	fail:(err)=>{
				// 		console.log(err);
				// 		uni.$showMsg('登陆失败')
				// 	}
				// })
				// 调用微信登录接口
				    const [err, res] = await uni.login().catch(err => err)
					console.log(res);
				    // 判断是否 uni.login() 调用失败
				    if (err || res.errMsg !== 'login:ok') return uni.$showError('登录失败')
				
				    // 准备参数对象
				    const query = {
				      code: res.code,
				      encryptedData: info.encryptedData,
				      iv: info.iv,
				      rawData: info.rawData,
				      signature: info.signature
				    }
				
				    // 换取 token
				    const { data: loginResult } = await uni.$http.post('/api/public/v1/users/wxlogin', query)
				    if (loginResult.meta.status !== 200) return uni.$showMsg('登录失败！')
				
				    // 2. 更新 vuex 中的 token
				    this.updateToken(loginResult.message.token)
			}
		}
	}
</script>

<style lang="scss">
	.login {
		height: 750rpx;
		background-color: #f8f8f8;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		&::after {
			content: ' ';
			display: block;
			position: absolute;
			width: 100%;
			height: 40px;
			left: 0;
			bottom: 0;
			background-color: white;
			border-radius: 100%;
			transform: translateY(50%);

		}

		.btn-class {
			width: 90%;
			border-radius: 100px;
			margin: 15px 0;
			background-color: #c00000;
		}

		.login-text {
			font-size: 12px;
			color: gray;
		}
	}
</style>
