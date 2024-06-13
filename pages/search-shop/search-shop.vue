<template>
	<view>
		<uni-search-bar @confirm="search" @input="inputSearch" @cancel="cancelSearch" placeholder='请输入门店或地址关键字'
			:radius="20" clearButton="always" :focus="true"></uni-search-bar>
	</view>
</template>


<script setup lang="ts">
	import _ from 'lodash'
	import { postShopSearchAPI } from '../../api/shop';
	import { ref } from 'vue';

	const cancelSearch = () => {
		uni.navigateBack()
	}
	
	const postShopSearchParam = ref({
		name: "",
		// user_location: "120.29850006103516,30.418750762939453"
	})

	const postShopSearch = async () => {
		const res = await postShopSearchAPI(postShopSearchParam.value)
		console.log(res.data.list)
	}

	//输入框值变化防抖请求
	const inputSearch = _.debounce((e) => {
		postShopSearchParam.value.name = e
		if(postShopSearchParam.value.name != ''){
			postShopSearch()
		}
	}, 1000)
</script>

<style>

</style>