<template>
	<view class="search-bar">
		<uni-search-bar @confirm="search" @input="inputSearch" @cancel="cancelSearch" placeholder='请输入门店或地址关键字'
			:radius="20" clearButton="always" :focus="true"></uni-search-bar>
	</view>
	<view class="res-list">
		<view class="item" v-for="item in searchResultList" :key="item.id">
			<view class="name">
				{{item.name}} · {{item.province}}
			</view>
			<view class="address">
				{{item.address}}
			</view>
		</view>
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
	//搜索结果
	const searchResultList = ref([])

	const postShopSearch = async () => {
		const res = await postShopSearchAPI(postShopSearchParam.value)
		console.log(res.data.list)
		searchResultList.value = res.data.list
	}

	//输入框值变化防抖请求
	const inputSearch = _.debounce((e) => {
		postShopSearchParam.value.name = e
		if (postShopSearchParam.value.name != '') {
			postShopSearch()
		}
	}, 1000)
</script>

<style lang="scss">
	.item {
		height: 60px;
		margin: 6px 16px;
		border-bottom: 1px solid gray;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;

		.name {
			font-weight: bold;
		}

		.address {
			font-size: 13px;
			color: gray;
			width: 350px;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
		}
	}
</style>