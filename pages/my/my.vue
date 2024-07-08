<template>
	<view class="top">
		<view class="avatar-box">
			<button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
				<image class="avatar" :src=avatarUrl />
			</button>
		</view>

		<view class="info">
			<view class="nickname">
				<input type="nickname" class="weui-input" :value="nickname" @input="updateNickname($event.target.value)"
					@blur="saveUserInfo()" placeholder="设置昵称" />
			</view>
			<view class="id">
				ID: 010225
			</view>
		</view>

	</view>
	<view class="mid">
		<view class="iwant">
			<view class="img">
				图
			</view>
			我拥有
		</view>
		<view class="collect">
			<view class="img">
				图
			</view>
			我的收藏
		</view>
	</view>

	<view class="bottom">
		<uni-list>
			<uni-list-item class="uni-list-item" :show-extra-icon="true" showArrow :extra-icon="extraIcon"
				title="权限与获取信息公开" clickable @click="openSettingHandleClick" />
			<uni-list-item class="uni-list-item" :show-extra-icon="true" showArrow :extra-icon="extraIcon"
				title="版本迭代记录" clickable @click="handleClick" />
			<uni-list-item class="uni-list-item" :show-extra-icon="true" showArrow :extra-icon="extraIcon"
				title="自愿看广告入口" clickable @click="handleClick" />
			<uni-list-item class="uni-list-item" :show-extra-icon="true" showArrow :extra-icon="extraIcon"
				title="分享此小程序" clickable @click="handleClick" />
			<uni-list-item class="uni-list-item" :show-extra-icon="true" showArrow :extra-icon="extraIcon"
				title='关于"喜贴贴"' clickable @click="handleClick" />
		</uni-list>
	</view>


</template>

<script setup>
	import {
		ref,
		onMounted
	} from 'vue'

	const defaultAvatarUrl =
		'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
	const avatarUrl = ref(defaultAvatarUrl)

	const nickname = ref('')

	function onChooseAvatar(e) {
		const {
			avatarUrl: newAvatarUrl
		} = e.detail
		avatarUrl.value = newAvatarUrl
		saveUserInfo()
	}

	function updateNickname(value) {
		nickname.value = value
	}

	function saveUserInfo() {
		uni.setStorage({
			key: 'userInfo',
			data: {
				avatarUrl: avatarUrl.value,
				nickname: nickname.value
			},
			success: function() {
				console.log('用户信息保存成功')
			}
		})
	}

	const openSettingHandleClick = () => {
		wx.openSetting({
			withSubscriptions: true,
			success(res) {
				console.log(res.authSetting)
				// res.authSetting = {
				//   "scope.userInfo": true,
				//   "scope.userLocation": true
				// }
			},
			fail(err) {
				console.error(err)
			}
		})
	}

	onMounted(() => {
		// 从本地存储中获取昵称和头像地址，如果有的话
		uni.getStorage({
			key: 'userInfo',
			success: function(res) {
				const {
					avatarUrl: storedAvatarUrl,
					nickname: storedNickname
				} = res.data
				avatarUrl.value = storedAvatarUrl || defaultAvatarUrl
				nickname.value = storedNickname || ''
			}
		})
	})
</script>

<style lang='scss'>
	.top {
		display: flex;
		/* flex-direction: column; */
		align-items: center;
		justify-content: center;

		.avatar-box {
			margin-top: 20px;
			margin-left: 20px;

			.avatar-wrapper {

				width: 80px;
				height: 80px;
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

		.info {
			margin-left: 10px;


			.nickname {
				margin-top: 15px;
				margin-left: 5px;
				width: 250px;
				text-align: start;
				font-size: 18px;
				font-weight: bold;
			}

			.id {
				width: 84px;
				margin-top: 10px;
				background-color: #d6d5d8;
				border-radius: 15px;
				padding: 4px 8px;

			}
		}
	}

	.mid {
		margin-top: 20px;
		height: 85px;
		background-color: white;
		display: flex;
		/* align-items: center; */
		justify-content: space-evenly;

		.iwant {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

		}

		.collect {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

		}

		.img {

			height: 55px;
		}
	}

	.bottom {
		margin-top: 20px;

		.uni-list-item {
			height: 50px;
		}
	}
</style>