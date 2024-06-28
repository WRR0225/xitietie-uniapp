<template>
	<view class="try">
		试营业
	</view>
	<button @click="searchTryRunShop">检测</button>
	<view style="font-size: 20px;">
		通过门店banner分析
	</view>
	<view v-if="targetTitle1">{{ targetTitle1 }}</view>
	<view v-if="targetTitle2">{{ targetTitle2 }}</view>
	<view v-if="targetTitle3">{{ targetTitle3 }}</view>
	<view style="font-size: 20px;margin-top: 10px;">
		通过菜单label分析
	</view>
	<view v-if="labelFound">找到了 "9元喝" 标签</view>
		<view v-else>未找到 "9元喝" 标签</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import {
		getShopBannerAPI,
		postShopMenuAPI
	} from '../../../api/shop';
	
	
	//店铺id
	const shopId = ref(4430)
	// 响应式变量来存储目标标题
	const targetTitle1 = ref('');
	const targetTitle2 = ref('');
	const targetTitle3 = ref('');
	//标记是否找到9元标签
	const labelFound = ref(false);


	const searchTryRunShop = () => {
		getShopBannerData(shopId.value)
		postShopMenuData(shopId.value)
	}

	//获取门店Banner数据
	const getShopBannerData = async (id) => {
		const res = await getShopBannerAPI(id)
		//新店大礼包字段
		const targetItem1 = res.data.shop_advertise.find(item => item.id === 7427);
		if (targetItem1) {
			targetTitle1.value = targetItem1.title;
		} else {
			targetTitle1.value = '未找到目标项';
		}
		//试营业字段
		const targetItem2 = res.data.shop_advertise.find(item => item.id === 7136);
		if (targetItem2) {
			targetTitle2.value = targetItem2.title;
		} else {
			targetTitle2.value = '未找到目标项';
		}
		//9元喝字段
		const targetItem3 = res.data.shop_advertise.find(item => item.id === 7454);
		if (targetItem3) {
			targetTitle3.value = targetItem3.title;
		} else {
			targetTitle3.value = '未找到目标项';
		}
	}

	//获取门店菜单数据
	const postShopMenuData = async (id) => {
		const res = await postShopMenuAPI(id)
		
		const checkForLabel = (data) => {
				const showRule = data.showRule;
				for (const key in showRule) {
					if (showRule.hasOwnProperty(key)) {
						const ruleArray = showRule[key];
						for (const rule of ruleArray) {
							if (rule.label === '9元喝'||rule.productLabel==='9元喝 | 限1件') {
								return true;
							}
						}
					}
				}
				return false;
			};
		labelFound.value = checkForLabel(res.data);
	}
</script>

<style>
	.try {
		font-size: 70px;
	}
</style>