<template>
	<view class="background">
		<view class="custom-navigationBar">
			<view class="back" @click="switchTab">
				<uni-icons type="left" size="24"></uni-icons>
			</view>
			<view class="title" v-if="pageCategory === 'default'">
				探索门店
			</view>
			<view class="title" v-if="pageCategory === 'ice'">
				手炒冰
			</view>
			<view class="placeholder">
				<!-- 占位 -->
			</view>
		</view>

		<!-- 选项卡 -->
		<view class="tab">
			<view v-if="pageCategory === 'default'">
				<zb-tab :activeStyle="{
			    fontWeight: 'bold',
			    transform: 'scale(1.1)'
			    }" :data="tablist" v-model="active" height="44">
				</zb-tab>
			</view>
			<!-- <view v-if="pageCategory === 'ice'"></view> -->
		</view>

		<!-- 城市门店加载完成前的东西 -->
<!-- 		<view v-if="isLoading" style="font-size: 100px;">
			加载中...
		</view> -->
		<view>
			<!-- 城市选择器 -->
			<view>
				<view class="navbar-diy">
					<view class="left">
						<navigator url="/pages/city-index/city-index" open-type="navigate">
							<view class="text">
								{{cityName}}
							</view>
							<uni-icons class="icon" type="down" size="20"></uni-icons>
						</navigator>
					</view>
					<view class="right">
						<view class="search" @click="clickSearchArea">
							<uni-icons type="search" size="20" color="gray"></uni-icons>
							<view class="text">
								搜索
							</view>
						</view>
					</view>
				</view>
			</view>

			<!-- 门店列表 -->
			<view :key="active" class="tab-content">
				<view v-if="pageCategory === 'default'">
					<!-- 待开业门店 -->
					<ShopList v-if="active === 0" :list="closeShopList" />
					<!-- 新店开业 -->
					<NewOpenShop v-if="active === 1" :openshops="openShopList" :cityname="cityName" />
					<!-- 全部门店 -->
					<ShopList v-if="active === 2" :list="shopList" />
				</view>

				<view v-if="pageCategory === 'ice'">
					<IceShop />
				</view>
			</view>
		</view>
	</view>
</template>

<script setup lang="ts">
	import {
		onLoad
	} from '@dcloudio/uni-app';
	import {
		postShopListAPI,
	} from '@/api/shop';
	import {
		ref
	} from 'vue';
	import ShopList from './component/ShopList.vue';
	import NewOpenShop from './component/NewOpenShop.vue';
	import IceShop from './component/IceShop.vue';
	// 全局状态-------------------------
	import { useShopStore } from '../../store';
	const shopStore = useShopStore();
	const pageCategory = ref(shopStore.pageCategory);
	// ---------------------------------------------------------------------------------------------------
	// 当前页面类型 （全部|冰箱贴|茶坊|24小时营业）
	// const pageCategory = ref('default')


	//控制骨架屏/加载gif
	const isLoading = ref(true)

	//未选择城市时的默认参数-默认城市：深圳
	const postShopListParam = ref({
		city_code: '156440300'
	})

	//选择城市
	const setCity = (selectedCityId : any) => {
		if (selectedCityId) {
			postShopListParam.value.city_code = selectedCityId
			console.log(postShopListParam.value.city_code)
		} else {
			console.log('未手动选择城市id')
		}
		postShopListRes()
	}

	const shopList = ref([])
	const cityName = ref('')
	const closeShopList = ref([])
	const openShopList = ref([])
	// const teaHouseShopList = ref([])

	// 处理接口返回数据，确保符合ShopItem类型及符合v-for遍历结构
	const processShopListData = (data) => {
		return data.map((item) => ({
			id: item.id,
			name: item.name,
			address: item.address,
			is_open: item.is_open,
			closed_label: item.closed_label,
			is_overseas: item.is_overseas,
			is_tea_house: item.is_tea_house,
			is_all_day: item.all_business_time_list && item.all_business_time_list[0] 
			            ? item.all_business_time_list[0].isAllDay 
			            : false
		}));
	};

	const postShopListRes = async () => {
		const res = await postShopListAPI(postShopListParam.value)
		shopList.value = processShopListData(res.data.list)
		cityName.value = res.data.list[0].city
		closeShopList.value = shopList.value.filter(item => item.is_open === false);
		openShopList.value = shopList.value.filter(item => item.is_open === true);
		// teaHouseShopList.value = shopList.value.filter(item => item.is_tea_house === true);
		//请求到数据后销毁骨架屏
		isLoading.value = false

		console.log(shopList.value);
		// console.log(openShopList.value);
	}


	//tab组件所需数组
	const tablist = [
		{
			name: '待开业',
			value: 0,
		},
		{
			name: '新开业&试营业',
			value: 1,
		},
		{
			name: '全部门店',
			value: 2,
		}]
	//tab默认选择
	const active = ref(0)

	//点击搜索框
	const clickSearchArea = () => {
		uni.navigateTo({
			url: '/pages/search-shop/search-shop'
		})
	}

	//自定义navigationBar返回
	const switchTab = () => {
		uni.switchTab({
			url: '/pages/explore-shop-index/explore-shop-index'
		});
	}

	// ---------------------------------------------------------------------------------------------------
	onLoad((option) => {
		console.log('Selected city ID（主动选择的城市id）:', option.selectedCityId);
		const selectedCityId = option.selectedCityId
		setCity(selectedCityId);
	});
</script>

<style scoped lang="scss">
	.background {
		// background-color: #eeeff8;
		margin-top: 100px; // 让内容向下移动50px，避免被自定义navigationBar遮挡

		padding-top: 96px; // 调整填充顶部，避免内容被固定元素遮挡（52px + 44px）
	}

	.custom-navigationBar {
		height: 100px; // 设置navigationBar高度
		background-color: rgb(248, 248, 248);
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 10; // 确保层级高于其他元素

		display: flex;
		align-items: center;
		justify-content: space-between;

		padding-top: 19px;

		.back {
			width: 50px;
			margin-left: 4px;

		}

		.title {
			font-size: 16px;
		}

		.placeholder {
			width: 50px;
			margin-right: 4px;
		}
	}

	.tab {
		margin-top: 100px; // 让tab内容向下移动50px
		position: fixed;
		top: 0;
		width: 100%;
		z-index: 10; // 确保层级高于其他元素
		background-color: white; // 根据需要设置背景色
	}


	.navbar-diy {
		position: fixed;
		top: 144px; // 紧跟在 tab 之后
		width: 100%;
		z-index: 10; // 确保层级高于其他元素

		height: 52px;
		background-color: #fff;
		border-bottom: 2px solid #a5a5a5;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.left navigator {
			display: flex;
			align-items: center;
			margin-left: 16px;
			height: 52px;

			.text {
				font-size: 17px;
				margin-right: 6px;
				//不换行
				white-space: nowrap;
			}
		}

		.right {
			.search {
				width: 80px;
				height: 30px;
				margin-right: 16px;
				border-radius: 16px;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: rgb(245, 245, 245);

				.text {
					font-size: 13px;
					color: gray;
				}
			}
		}
	}
</style>