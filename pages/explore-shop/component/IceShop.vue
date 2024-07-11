<template>
	喜茶 手抄冰
</template>

<script setup>
	import {
		onShow
	} from '@dcloudio/uni-app';
	import { onMounted } from 'vue';
	import {
		postShopProductCategoryAPI
	} from '../../../api/shop';


	onMounted(() => {
		console.log('喜茶 手抄冰 onMounted')
		postShopProductCategoryAPI(991)
	})
</script>

<style>
</style>