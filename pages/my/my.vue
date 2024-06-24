<template>
	<view class="top">
		<view class="avatar-box">
			<button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
				<image class="avatar" :src=avatarUrl></image>
			</button>
		</view>
		<view class="nickname">
			<input type="nickname" class="weui-input" placeholder="请输入昵称" />
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'

	const defaultAvatarUrl =
		'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
	const avatarUrl = ref(defaultAvatarUrl)

	function onChooseAvatar(e) {
		const {
			avatarUrl: newAvatarUrl
		} = e.detail
		avatarUrl.value = newAvatarUrl
	}
</script>

<style lang='scss'>
	.top {
		display: flex;
		flex-direction: column;
		align-items: center;

		.avatar-box {
			margin-top: 20px;
			.avatar-wrapper {
				
				width: 100px;
				height: 100px;
				padding: 0; // 移除按钮的内边距
				border: none; // 移除按钮的边框
				display: flex;
				justify-content: center;
				align-items: center;
				border-radius: 50%; // 将按钮本身设置为圆形

				.avatar {
					width: 100%;
					height: 100%;
					display: block; // 设置图像为块级元素
					border-radius: 50%; // 将图像设置为圆形
				}
			}
		}
		.nickname{
			margin-top: 20px;
			width: 200px;
			text-align: center;
		}
	}
</style>