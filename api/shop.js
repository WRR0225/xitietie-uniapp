import {
	http
} from '@/utils/http'

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
 * 获取门店详情数据
 * @param data 包含要提交的店铺信息参数的对象
 * @returns 返回一个Promise对象，成功时携带服务器响应数据，失败时携带错误信息
 */
export const postShopInfoAPI = (postShopInfoParam) => {
	return http({
		method: 'POST',
		url: '/api/service-smc/grayapi/user/closest/shop',
		data: postShopInfoParam
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
 * 门店点单页菜单-用于检索9元喝label
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
			"isStudentMember": false,
			"level": 3
		},
		header: {
			'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMTIzMDY0MTEiLCJ1c2VyX21haW5faWQiOjEzMTU1ODY3MiwiY2hhbm5lbCI6IlciLCJzb3VyY2UiOiJhcGkiLCJpc19ndWVzdCI6ZmFsc2UsImxhYmVsIjoiY2xpZW50OndlYXBwIiwiaWF0IjoxNzE5NzY4Mzg2LCJuYmYiOjE3MTk3NjgzODYsImV4cCI6MTcxOTg1NDc4NiwiaXNzIjoiaGV5dGVhIn0.11h12JQoNkr4_R0vMAcI-jrBlNHlZHDviY7Gp6gJ70A'
		}
	})
}