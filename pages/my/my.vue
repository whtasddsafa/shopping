<template>
	<view class="my-container" >
		<my-login v-if="!token"></my-login>
		<my-userinfo v-else></my-userinfo>
	</view>
</template>

<script>
	import {mapState} from 'vuex'
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		},
		computed:{
			...mapState('m_user',['token']),
			...mapState('m_cart',['cart'])
		},
		onLoad() {
			console.log(this.cart);
		}
	}
</script>

<style lang="scss">

</style>
