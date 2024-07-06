<template>
	<view class="container">
		<!-- <navigator url="/pages/explore-shop/explore-shop" open-type="navigate"style="display: flex;"> -->
		<button @click="clickDefault">
			-- 常规探索 --
		</button>
		<!-- </navigator> -->


		<button @click="clickTeaHouse">
			-- 茶坊 --
		</button>

	</view>

</template>

<script setup>
	import {
		useShopStore
	} from '@/store';

	const shopStore = useShopStore();

	const clickDefault = () => {
		shopStore.setPageCategory('default');
		uni.navigateTo({
			url: '/pages/explore-shop/explore-shop'
		});

	}
	const clickTeaHouse = () => {
		shopStore.setPageCategory('teahouse');
		uni.navigateTo({
			url: '/pages/explore-shop/explore-shop'
		});

	}
</script>

<style lang="scss">
	.container {
		height: 100vh;
		width: 100%;
		// background-color: aquamarine;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
</style>