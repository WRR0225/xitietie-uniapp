<template>
	<view v-if="list.length">
		<view v-for="item in list" :key="item.id" class="item">
			<view class="info-box">
				<view class="info" @click="shopCardClick(item)">
					<!-- <view style="color: red;">id:{{ item.id }}</view> -->
					<view class="name">
						<view class="text">
							{{ item.name }}
						</view>
						<uni-icons type="right" size="15" />
					</view>
					<!-- 标签 -->
					<!-- 待开业 -->
					<view class="label" v-if="item.is_open==false">
						<view class="text">{{item.closed_label}}</view>
					</view>
					<!-- 试营业 | 9元喝&买一送一 | 第二杯半价 -->
					<view class="new-shop-label" v-if="item.label">
						<!-- 9元喝&买一送一 -->
						<view class="nine-yuan" v-if="item.label==='9元喝'||item.label==='买一送一'">
							<fui-tag background='rgba(9, 190, 79, .05)' color="#09be4f" :padding="tagpadding"
								style="margin-right: 6px;">{{item.label}}</fui-tag>
							<fui-tag background='rgba(9, 190, 79, .05)' color="#09be4f"
								:padding="tagpadding">开业1-3天</fui-tag>
						</view>
						<!-- 第二杯半价 -->
						<view class="second-half" v-if="item.label==='第二杯半价'">
							<fui-tag background='rgba(255, 183, 3, .1)' color="#ffb703" :padding="tagpadding"
								style="margin-right: 6px;">{{item.label}}</fui-tag>
							<fui-tag background='rgba(255, 183, 3, .1)' color="#ffb703"
								:padding="tagpadding">开业4-7天</fui-tag>
						</view>
						<!-- 试营业88折 -->
						<view class="second-half" v-if="item.label==='试营业88折'">
							<fui-tag background='#8d8d8d' color="#ffffff" :padding="tagpadding"
								style="margin-right: 6px;">{{item.label}}</fui-tag>
						</view>
					</view>
					<!-- 茶坊门店 -->
					<view class="teahouse" v-if="item.is_tea_house === true">
						<fui-tag background='rgba(151, 247, 7, 0.2)' color="#71d004" :padding="tagpadding"
							style="margin-right: 6px;">茶坊</fui-tag>
					</view>
					<!-- 24小时营业门店  -->
					<view class="teahouse" v-if="item.is_all_day === true">
						<fui-tag background='rgba(208, 174, 255, 0.2)' color="#6831FF" :padding="tagpadding"
							style="margin-right: 6px;">24小时营业</fui-tag>
					</view>
					
					<!-- 地址 -->
					<view class="address">
						<uni-icons type="location" size="17" />
						<view class="text">{{ item.address }}</view>
					</view>
				</view>
				<!-- <view class="button">
					添加订阅
				</view> -->
			</view>
		</view>
	</view>
	<view v-else>
		<view class="empty">
			<img class="image" src="../img/no_data.png" />
			<view class="text">
				当前城市暂无匹配门店<br>
				看看其他城市吧~
			</view>
		</view>
	</view>

</template>

<script setup lang="ts">
	const tagpadding = ['12rpx', '26rpx']
	const props = defineProps({
		list: {
			type: Array,
			required: true
		}
	});

	const shopCardClick = (item) => {
		uni.navigateTo({
			url: `/pages/shop-info/shop-info?shopId=${item.id}&isOverseas=${item.is_overseas}`
		});
	}
</script>

<style lang="scss">
	.item {
		margin-top: 13px;
		background-color: white;
		height: 85px;
		display: flex;
		align-items: center;
		padding: 5px 0;

		.info-box {
			// background-color: greenyellow;
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			height: 100%;

			.info {
				display: flex;
				justify-content: space-evenly;
				flex-direction: column;
				// background-color: skyblue;
				width: 340px;
				height: 100%;
				padding-left: 20px;
				padding-right: 10px;
				position: relative;
				/* 为伪元素定位 */

				.name {
					display: flex;
					font-size: 17px;
				}

				.label {
					display: flex;

					.text {
						color: #f89b0f;
						font-size: 13px;
						// background-color: #eeeff8;
						padding: 2px;
					}
				}

				.address {
					display: flex;

					.text {
						font-size: 14px;
						color: gray;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
						font-size: 14px;
						color: gray;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}
				}

				/* 使用伪元素实现右边框 */
				// &::after {
				// 	content: '';
				// 	position: absolute;
				// 	top: 50%;
				// 	right: 0;
				// 	transform: translateY(-50%);
				// 	width: 2px;
				// 	/* 边框宽度 */
				// 	height: 65%;
				// 	/* 边框高度，可以根据需要调整 */
				// 	background-color: #ebebeb;
				// 	/* 边框颜色 */
				// }
			}

			.button {
				padding-right: 13px;
				white-space: nowrap;
			}
		}
	}

	.empty {
		display: flex;
		flex-direction: column;
		align-items: center;
		//不知道这里为什么不能用justify-content:center居中
		// 暂时用这个↓ 
		padding-top: 100px;

		.text {
			display: flex;
			flex-direction: column;
			align-items: center;
			color: gray;
		}

		.image {
			height: 250px;
			width: 250px;
		}

	}
</style>