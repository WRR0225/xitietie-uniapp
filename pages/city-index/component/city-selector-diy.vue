<template>
	<view class="hot-city">
		<view class="title">
			热门城市
		</view>
		<view class="hot-city-wrapper">
			<view class="hot-city-item" @click="onHotCityClick('北京市')">
				<text class="hot-city-text">北京市</text>
			</view>
			<view class="hot-city-item" @click="onHotCityClick('上海市')">
				<text class="hot-city-text">上海市</text>
			</view>
			<view class="hot-city-item" @click="onHotCityClick('广州市')">
				<text class="hot-city-text">广州市</text>
			</view>
			<view class="hot-city-item" @click="onHotCityClick('深圳市')">
				<text class="hot-city-text">深圳市</text>
			</view>
			<view class="hot-city-item" @click="onHotCityClick('杭州市')">
				<text class="hot-city-text">杭州市</text>
			</view>
			<view class="hot-city-item" @click="onHotCityClick('成都市')">
				<text class="hot-city-text">成都市</text>
			</view>
		</view>
	</view>
</template>

<script>
</script>

<style lang="scss">
	.hot-city {
		.title {
			margin-left: 5px;
		}

		.hot-city-wrapper {
			display: flex;
			flex-wrap: wrap;
			gap: 10px;
			padding: 10px;
			justify-content: space-between;
			background-color: rgb(247, 247, 247);

			.hot-city-item {
				flex: 0 0 30%;
				text-align: center;
				background-color: #f0f0f0;
				border-radius: 3px;
				height: 32px;

				.hot-city-text {
					font-size: 14px;
					color: #191919;
				}
			}
		}
	}
</style>