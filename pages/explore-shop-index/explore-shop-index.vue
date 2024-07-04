<template>
	<view class="container">
			<!-- <navigator url="/pages/explore-shop/explore-shop" open-type="navigate"style="display: flex;"> -->
				<button  @click="clickDefault">
					-- 常规探索 --
				</button>
			<!-- </navigator> -->
			
			
				<button @click="clickTeaHouse">
					-- 茶坊 --
				</button>
		
	</view>

</template>

<script setup>
	const clickDefault=()=>{
		uni.navigateTo({
			url: '/pages/explore-shop/explore-shop?category=default'
		});
	
	}
const clickTeaHouse=()=>{
	uni.navigateTo({
		url: '/pages/explore-shop/explore-shop?category=teahouse'
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