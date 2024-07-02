<template>
	<view class="city-selector-diy" v-for="item in props.cityIndexList" :key="item.country_code">
		<view class="title">
			{{item.country}}
		</view>
		<view class="city-wrapper">
			<view class="city-item" v-for="city in item.cities" :key="city.city_code" @click="onCityClick(city.city_code)">
				<text class="city-text">{{city.city}}</text>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		onLoad
	} from '@dcloudio/uni-app'
	
	import { defineProps } from 'vue';

	const props = defineProps({
		cityIndexList: {
			type: Array,
			required: true
		}
	});
	
	
	const onCityClick=(cityId)=>{
		uni.reLaunch({
			url: `/pages/explore-shop/explore-shop?selectedCityId=${cityId}`
		});
	}
	
</script>

<style lang="scss">
	.city-selector-diy {
		margin-top: 14px;

		.title {
			margin-top: 4px;
			margin-left: 10px;
		}

		.city-wrapper {
			display: flex;
			flex-wrap: wrap;
			gap: 10px;
			padding: 10px;
			justify-content: start;
			background-color: rgb(247, 247, 247);

			.city-item {
				flex: 0 0 30%;
				text-align: center;
				background-color: #f0f0f0;
				border-radius: 3px;
				height: 32px;
				display: flex;
				align-items: center;
				justify-content: center;

				.city-text {
					font-size: 14px;
					color: #191919;
				}
			}
		}
	}
</style>