<template>
	<button @click="searchTryRunShop"  v-if="buttonVisible" style="margin-top: 12px;">检测</button>
	<!-- 	<view style="font-size: 20px;">
		通过门店banner分析
	</view>
	<view v-if="targetTitle1">{{ targetTitle1 }}</view>
	<view v-if="targetTitle2">{{ targetTitle2 }}</view>
	<view v-if="targetTitle3">{{ targetTitle3 }}</view> -->
	<!-- 	<view style="font-size: 20px;margin-top: 10px;">
		通过菜单label分析
	</view> -->
	<view class="found-message" v-if="labelFound">{{foundMessage}}</view>
	<!-- <view v-else>未找到 "9元喝" 标签</view> -->
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

	// 店铺数据假数组
	const shopList = [{
			id: 169,
			name: "深圳欢乐颂店",
			address: "南新路3030号南山欢乐颂购物中心一层 L128号",
			is_open: true,
			closed_label: null
		},
		{
			id: 4430,
			name: "绍兴诸暨宝龙广场店",
			address: "花果山水帘洞",
			is_open: true,
			closed_label: null
		},
	];

const buttonVisible = ref(true);
const labelFound = ref(false);
const foundMessage =ref('')


	// 存储符合条件的店铺
	const nineYuanShops = ref([]);

	//店铺id
	// const shopId = ref(4430)
	// 响应式变量来存储目标标题
	// const targetTitle1 = ref('');
	// const targetTitle2 = ref('');
	// const targetTitle3 = ref('');
	//标记是否找到9元标签



	const searchTryRunShop = async () => {
		// getShopBannerData(shopId.value)
		const results = await Promise.all(props.openshops.map(async (shop) => {
			const hasLabel = await checkShopForLabel(shop.id);
			return hasLabel ? shop : null;
		}));
		nineYuanShops.value = results.filter(shop => shop !== null);
		console.log(nineYuanShops.value)
		buttonVisible.value=false
		if(nineYuanShops.value.length > 0){
			labelFound.value = true
			foundMessage.value = '共找到'+nineYuanShops.value.length+'家新开业门店'
			console.log(foundMessage.value)
		}else{
			labelFound.value = true
			foundMessage.value = '当前城市暂无新开业门店'
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
.found-message{
	text-align: center;
	margin-top: 8px;
}
</style>