<template>
	<view>
		<view v-if="shopInfo.length > 0">
			<view class="name">
				{{ shopInfo[0].name }}
			</view>
			<view class="info">
				<view class="address">
					地址：{{ shopInfo[0].address }}
				</view>
				<view class="contact_phone" v-if="shopInfo[0].contact_phone!='-'">
					电话：{{ shopInfo[0].contact_phone }}
				</view>
				<view class="time">
					门店营业时间：{{ shopInfo[0].all_business_time_list[0].openAt }}~{{ shopInfo[0].all_business_time_list[0].closeAt }}
				</view>
				<view class="24h">
					是否24小时营业：{{shopInfo[0].all_business_time_list[0].isAllDay?'是':'否'}}
				</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import {
		onLoad
	} from '@dcloudio/uni-app';
	import { postChinaShopInfoAPI, postOverseasShopInfoAPI } from '../../api/shop';
	import { ref } from 'vue';

	//请求参数
	const postShopInfoParam = ref({
		// 杭州EFC欧美广场店
		"id": 1022,
		// "location": "120.29850006103516,30.418750762939453",
		// "type": 1,
		// "is_to_oversea_app": false
	})

	// 处理接口返回数据
	const processShopInfoData = (data) => {
		return [{
			id: data.id,
			name: data.name,
			address: data.address,
			contact_phone: data.contact_phone,
			all_business_time_list: data.all_business_time_list
		}];
	};

	//存储门店详情信息
	const shopInfo = ref([])
	//是否为海外门店
	const isOverseas = ref(false)

	//根据点击的门店卡片是否是海外门店向不同的接口发请求
	const postShopInfoRes = async () => {
		const res = isOverseas.value
			? await postOverseasShopInfoAPI(postShopInfoParam.value)
			: await postChinaShopInfoAPI(postShopInfoParam.value);
		shopInfo.value = processShopInfoData(res.data);
		console.log(shopInfo.value);
	}

	// ----------------------------------------------------------------------------
	onLoad((option) => {
		postShopInfoParam.value.id = option.shopId
		console.log('当前请求门店id:' + postShopInfoParam.value.id)
		//先用!!转为布尔类型
		isOverseas.value = !!JSON.parse(option.isOverseas);
		console.log('当前请求门店是否为海外门店:' + isOverseas.value)
		postShopInfoRes()
	})
</script>

<style>
	.name {
		font-size: 25px;
		margin-bottom: 30px;
	}
</style>