<template>
	<view class="tips">
		欢迎使用探索功能
	</view>
	<view class="button-container">

		<view class="category-button" id="default" @click="clickDefault">
			<img class="background-img" src="./img/default_button_background.jpg" />
			<view class="title" style="font-size: 22px;margin: 10px 0 0 10px;">
				新开业&试营业&待开业
			</view>
		</view>

		<view class="category-button" id="tea-house" @click="clickTeaHouse">
			<view class="title">
				喜茶·茶坊
			</view>
		</view>
		<view class="category-button" id="ice">
			<view class="title">
				制冰
			</view>

		</view>
		<view class="category-button" id="more">
			<view class="title">
				更多
			</view>

		</view>


	</view>

</template>

<script setup>
	import {
		useShopStore
	} from '@/store';

	const shopStore = useShopStore();

	const clickDefault = () => {
		shopStore.setPageCategory('default');
		uni.navigateTo({
			url: '/pages/explore-shop/explore-shop'
		});
	}
	const clickTeaHouse = () => {
		shopStore.setPageCategory('teahouse');
		uni.navigateTo({
			url: '/pages/explore-shop/explore-shop'
		});
	}
</script>

<style lang="scss">
	.tips {
		height: 200px;
		padding-left: 20px;
		padding-top: 15px;
	}

	.button-container {
		// background-color: lightpink;
		height: 400px;
		width: calc(100% - 40px);
		/* 减去左右的padding */
		padding: 0 20px;

		display: grid;
		grid-template-rows: 2fr 1fr;
		/* 第一行是第二行的两倍高度 */
		grid-template-columns: repeat(6, 1fr);
		gap: 15px;

		.category-button {
			border-radius: 20px;
			position: relative;
			overflow: hidden;

			.title {
				margin: 6px 0 0 8px;
				font-size: 20px;

				position: relative;
				z-index: 1;
			}

			.background-img {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				object-fit: cover;
				z-index: 0;
			}
		}
	}

	#default {
		grid-row: 1 / 2;
		grid-column: 1 / 7;
		background-color: #d4d4d4;
		/* 占据前四个单元格 */
		// background-image: url('./img/default-button-background.jpg');
		// 		background-size: cover;
		// 		/* 图片覆盖整个背景 */
		// 		background-position: center;
		// 		/* 图片居中 */
		// 		background-repeat: no-repeat;
		// 		/* 不重复 */
	}

	#tea-house {
		grid-row: 2 / 3;
		grid-column: 1 / 3;
		/* 占据前两个单元格 */
		background-image: url('./img/teahouse_button_background.jpg');
		background-size: cover;
		/* 图片覆盖整个背景 */
		background-position: center;
		/* 图片居中 */
		background-repeat: no-repeat;
		/* 不重复 */
	}

	#ice {
		grid-row: 2 / 3;
		grid-column: 3 / 5;
		/* 占据中间两个单元格 */
		background-color: #d4d4d4;
	}

	#more {
		grid-row: 2 / 3;
		grid-column: 5 / 7;
		/* 占据后两个单元格 */
		background-color: #d4d4d4;
	}
</style>