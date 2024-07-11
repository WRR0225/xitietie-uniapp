import {
	http
} from '@/utils/http'

const AUTHORIZATION_TOKEN =
	'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMTIzMDY0MTEiLCJ1c2VyX21haW5faWQiOjEzMTU1ODY3MiwiY2hhbm5lbCI6IlciLCJzb3VyY2UiOiJhcGkiLCJpc19ndWVzdCI6ZmFsc2UsImxhYmVsIjoiY2xpZW50OndlYXBwIiwiaWF0IjoxNzIwNjk4ODU3LCJuYmYiOjE3MjA2OTg4NTcsImV4cCI6MTcyMDc4NTI1NywiaXNzIjoiaGV5dGVhIn0.pDuPvM5RGU2JcxiW8N6Z0ZbOLENVKnOYoGcGHgp_ZYo'

/**
 * 获取联名菜单数据
 */
export const getcomboMealMenuAPI = (showLocation = 2, shopId = 3291, isTakeaway = 0) => {
	return http({
		method: 'GET',
		url: '/api/service-menu/vip/grayapi/shop/combo-meal-menu' +
			`?showLocation=${showLocation}&shopId=${shopId}&isTakeaway=${isTakeaway}`
	})
}

/**
 * 获取门店列表数据
 * @param data 包含需要提交的店铺列表数据的对象
 * @returns 返回一个Promise对象，成功时携带服务器响应的数据，失败时携带错误信息
 */
export const postShopListAPI = (postShopListParam) => {
	return http({
		method: 'POST',
		url: '/api/service-smc/grayapi/city/shop-page',
		data: postShopListParam
	})
}

/**
 * 获取门店详情数据-国内
 */
export const postChinaShopInfoAPI = (postShopInfoParam) => {
	return http({
		method: 'POST',
		url: '/api/service-smc/grayapi/user/closest/shop',
		data: postShopInfoParam
	})
}

/**
 * 获取门店详情数据-海外
 */
export const postOverseasShopInfoAPI = (postShopInfoParam) => {
	return http({
		method: 'GET',
		baseURL: 'https://go.heytea-co.com',
		url: `/api/service-portal/vip/grayapi/v2/user/closest/shop?id=${postShopInfoParam.id}`,
	})
}


/**
 * 使用关键字搜索门店
 */
export const postShopSearchAPI = (postShopSearchParam) => {
	return http({
		method: 'POST',
		url: '/api/service-smc/grayapi/search/shop-page',
		data: postShopSearchParam
	})
}

/**
 * 门店点单页banner-用于检索是否在试营业和新开业的9元店
 */
export const getShopBannerAPI = (id) => {
	return http({
		method: 'GET',
		url: `/api/service-portal/vip/openapi/v3/ads?shop_id=${id}`,
	})
}

/**
 * 门店点单页菜单（国内）-用于检索 试营业/9元喝/第二杯半价的label
 */
export const postShopMenuAPI = (shopId) => {
	return http({
		method: 'POST',
		url: '/api/service-activities/pms/activity/shopMenu',
		data: {
			"freightAmount": 0,
			"shopBusinessIs": 0,
			"shopId": shopId,
			"takeawayIs": 0,
			"spellOrderIs": 0,
			// "isStudentMember": false,
			// "level": 3
		},
		header: {
			'Authorization': AUTHORIZATION_TOKEN
		}
	})
}

/**
 * 门店点单页菜单（海外）-用于检索 试营业/9元喝/第二杯半价的label
 */
export const postOverseasShopMenuAPI = (shopId) => {
	return http({
		method: 'POST',
		baseURL: 'https://go.heytea-co.com',
		url: '/api/service-activities/pms/activity/shopMenu',
		data: {
			"freightAmount": 0,
			"shopBusinessIs": 0,
			"shopId": shopId,
			"takeawayIs": 0,
			"spellOrderIs": 0,
			// "isStudentMember": false,
			// "level": 3
		},
		header: {
			'Authorization': AUTHORIZATION_TOKEN
		}
	})
}

/**
 * 点单页-分类信息
 */
export const postShopProductCategoryAPI = (shopId) => {
	return http({
		method: 'GET',
		url: `/api/service-menu/grayapi/shop/categories?shopId=${shopId}&isTakeaway=0`,
	})
}