<template>
	<view class="search-bar">
		<uni-search-bar @confirm="search" @input="inputSearch" @cancel="cancelSearch" v-model="searchValue"
			placeholder='请输入门店或地址关键字' :radius="20" clearButton="always" :focus="true"></uni-search-bar>
	</view>
	<view class="res-list">
		<view v-if="searchValue">
			<view v-if="searchResultList.length>0">
				<view class="item" v-for="item in searchResultList" :key="item.id" @click="shopCardClick(item)">
					<view class="title">
						{{item.name}} · {{item.province}}
					</view>
					<view class="address">
						{{item.address}}
					</view>
				</view>
			</view>
			<view v-else>
				<view class="message">
					{{message}}
				</view>
			</view>
		</view>
	</view>

</template>


<script setup>
	import _ from 'lodash'
	import { postShopSearchAPI } from '../../api/shop';
	import { ref } from 'vue';

	const message = ref('正在搜索中，请稍后')

	const searchValue = ref('')

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
		if (Array.isArray(res.data.list) && res.data.list.length === 0) {
			message.value="此关键字无匹配门店"
		}
		
	}

	//输入框值变化防抖请求
	const inputSearch = _.debounce((e) => {
		postShopSearchParam.value.name = e
		if (postShopSearchParam.value.name != '') {
			postShopSearch()
			console.log('当前搜索关键词：' + searchValue.value)
		}
	}, 1000)

	//门店搜索结果项点击事件
	const shopCardClick = (item) => {
		uni.navigateTo({
			url: `/pages/shop-info/shop-info?shopId=${item.id}&isOverseas=${item.is_overseas}`
		});
	}
</script>

<style lang="scss">
	.item {
		height: 60px;
		margin: 6px 16px;
		border-bottom: 1px solid gray;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;

		.title {
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

	.message {
		display: flex;
		justify-content: center;
		margin-top: 200px;
	}
</style>