<template>
	<view class="try">
		试营业
	</view>
	<button @click="searchTryRunShop">检测</button>
	<view v-if="targetTitle1">{{ targetTitle1 }}</view>
	<view v-if="targetTitle2">{{ targetTitle2}}</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import {
		getTryRunShopAPI
	} from '../../../api/shop';

	const targetTitle1 = ref(''); // 响应式变量来存储目标标题
	const targetTitle2 = ref(''); // 响应式变量来存储目标标题

	const searchTryRunShop = async () => {
		const res = await getTryRunShopAPI(4430)
		const targetItem1 = res.data.shop_advertise.find(item => item.id === 7427);
		if (targetItem1) {
			targetTitle1.value = targetItem1.title;
		} else {
			targetTitle1.value = '未找到目标项';
		}
		const targetItem2 = res.data.shop_advertise.find(item => item.id === 7136);
		if (targetItem2) {
			targetTitle2.value = targetItem2.title;
		} else {
			targetTitle2.value = '未找到目标项';
		}
	}
</script>

<style>
	.try {
		font-size: 100px;
	}
</style>