<template>
	<button @click="handleClick" v-if="buttonVisible" style="margin-top: 12px;">检索</button>
	<!-- 	<view style="font-size: 20px;">
		通过门店banner分析
	</view>
	<view v-if="targetTitle1">{{ targetTitle1 }}</view>
	<view v-if="targetTitle2">{{ targetTitle2 }}</view>
	<view v-if="targetTitle3">{{ targetTitle3 }}</view> -->
	<!-- 	<view style="font-size: 20px;margin-top: 10px;">
		通过菜单label分析
	</view> -->
	<view class="found-message1">{{foundMessage}}</view>
	<view class="found-message2" v-if="!buttonVisible">
		实际情况可在“喜茶GO”官方小程序内选择对应门店核实
	</view>
<!-- 	<view v-if="buttonVisible.value=false||foundMessage.value='当前城市暂无新开业3天内的门店'">
		可尝试对其他城市进行检索
	</view> -->
<!-- 	<view v-else>
		可尝试对其他城市进行检索
	</view> -->
	<view class="shoplist">
		<ShopList v-if="nineYuanShops.length" :list="nineYuanShops" />
	</view>

</template>

<script setup>
	import {
		ref
	} from 'vue';
	import {
		onShow
	} from '@dcloudio/uni-app';
	import {
		getShopBannerAPI,
		postShopMenuAPI
	} from '../../../api/shop';
	import ShopList from './ShopList.vue';
	import {
		defineProps
	} from 'vue';

	const props = defineProps({
		openshops: {
			type: Array,
			required: true
		}
	});
	//控制按钮显示
	const buttonVisible = ref(true);
	// 搜索后的提示信息
	const foundMessage = ref('')
	// 存储符合条件的店铺
	const nineYuanShops = ref([]);
	// 存储已处理的店铺数
	const processedCount = ref(0);


	// 响应式变量来存储目标标题
	// const targetTitle1 = ref('');
	// const targetTitle2 = ref('');
	// const targetTitle3 = ref('');

	const handleClick = async () => {
		await searchNineYuanShop();
		buttonVisible.value = false;
		console.log(nineYuanShops.value)
	}

	//每组请求之间添加延迟
	const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

	const searchNineYuanShop = async () => {
		// getShopBannerData(shopId.value)
		const batchSize = 10; // 每次发送10个请求
		const delay = 500; // 0.5秒延迟
		for (let i = 0; i < props.openshops.length; i += batchSize) {
			const batch = props.openshops.slice(i, i + batchSize);
			const results = await Promise.all(batch.map(async (shop) => {
				const hasLabel = await checkShopForLabel(shop.id);
				return hasLabel ? shop : null;
			}));
			nineYuanShops.value.push(...results.filter(shop => shop !== null));
			processedCount.value += batch.length

			console.log(processedCount.value + '/' + props.openshops.length)
			uni.showToast({
				title: `检索中${processedCount.value}/${props.openshops.length}`,
				duration: 1500,
				icon: 'loading'
			});

			await sleep(delay); // 添加延迟
		}
		// const results = await Promise.all(props.openshops.map(async (shop) => {
		// 	const hasLabel = await checkShopForLabel(shop.id);
		// 	return hasLabel ? shop : null;
		// }));
		// nineYuanShops.value = results.filter(shop => shop !== null);
		// console.log(nineYuanShops.value)
		// buttonVisible.value = false
		if (nineYuanShops.value.length > 0) {
			foundMessage.value = `共找到${nineYuanShops.value.length}家新开业门店`
			console.log(foundMessage.value)
		} else {
			foundMessage.value = '当前城市暂无新开业3天内的门店'
		}
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


	//获取门店菜单数据 & 检查单个店铺是否有 "9元喝" 标签
	const checkShopForLabel = async (id) => {
		const res = await postShopMenuAPI(id)
		return checkForLabel(res.data);

	}
	const checkForLabel = (data) => {
		//防止某些门店返回值里没有data或data.showRule（如某些公司园区的店）
		if (!data || !data.showRule) {
			return false;
		}
		const showRule = data.showRule;
		for (const key in showRule) {
			if (showRule.hasOwnProperty(key)) {
				const ruleArray = showRule[key];
				for (const rule of ruleArray) {
					if (rule.label === '9元喝' || rule.productLabel === '9元喝 | 限1件') {
						return true;
					}
				}
			}
		}
		return false;
	};
</script>

<style>
	.found-message1 {
		text-align: center;
		margin-top: 14px;
		font-size: 13px;
		color: gray;
	}

	.found-message2 {
		text-align: center;
		margin-top: 4px;
		font-size: 13px;
		color: gray;
	}
</style>