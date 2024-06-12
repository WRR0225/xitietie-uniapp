<template>
	<view>
		<uni-search-bar @confirm="search" @input="input" @cancel="cancelSearch" placeholder='请输入门店或地址关键字' :radius="20" clearButton="always" :focus="true"></uni-search-bar>
	</view>
</template>


<script setup lang="ts">
	const cancelSearch =()=>{
		uni.navigateBack()
	}
</script>

<style>

</style>
