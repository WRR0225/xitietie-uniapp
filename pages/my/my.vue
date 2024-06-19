<template>
	<view class="container">
		<button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
			<image class="avatar" :src=avatarUrl></image>
		</button>
		<input type="nickname" class="weui-input" placeholder="请输入昵称" />
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

<style></style>