// 计算图片的宽高

// 获取手机的宽高
let windowWidth = uni.getSystemInfoSync().windowWidth
let windowHeight = uni.getSystemInfoSync().windowHeight

let utils = {
	// 宽度100%，计算高度。
	// 传入图片宽高
	calcH(width, height) {
		let res = (windowWidth * height) / width
		return res
	}
}

export default utils;
