export const baseURL = 'https://api.jiandaoyun.com/api/'
export const ybpURL = 'https://rfm.bmrjtech.cn'
export const bianmURL = 'https://bianm.jinxiongsj.com'
export const testURL = 'https://newshop.jinxiongsj.com'
export const request = (options) => {
	let url;
	if (options.type == '1' || options.type == '4') {
		url = `${baseURL}v${options.type}/app/63413e3366ceda0008b4e512/entry/${options.url}`
	} else if (options.type == '-1') {
		url = `${bianmURL}/index.php/api/${options.url}`
		if (!options.data || Object.keys(options.data).length == 0) {
			options.data = {}
		}
		options.data.app_id = 10019
	} else if (options.type == '-2') {
		url = `${testURL}/index.php/${options.url}`
	} else {
		url = `${ybpURL}/_/${options.url}`
	}
	return new Promise((resolve, reject) => {
		uni.request({
			url,
			method: options.method || 'POST',
			data: options.data || {},
			withCredentials: true,
			header: {
				'Authorization': 'Bearer SMlLFl0qf3setN6OWJl7henCSwnwfLaX'
			},
			success: (res) => {
				if (res.statusCode === 200) {
					resolve(res)
				} else if (res.data.code === -1) {
					// 登录态失效, 重新登录
				}
				// 如果不满足上述判断就输出数据
			},
			// 这里的接口请求，如果出现问题就输出接口请求失败
			fail: (err) => {
				console.log(err)
				reject(err)
			}
		})
	})
}
