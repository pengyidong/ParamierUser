// 过滤器

export default {
	transformTime(date) {
		if (!date) return '-'
		let time = new Date(date);
		let y = time.getFullYear();
		let M = time.getMonth() + 1;
		let d = time.getDate();
		let h = time.getHours();
		let m = time.getMinutes();
		let s = time.getSeconds();
		return `${addZero(y)}-${addZero(M)}-${addZero(d)} ${addZero(h)}:${addZero(m)}:${addZero(s)}`
	},
	state(index) {
		let _index =  parseFloat(index)
		let list = ['已派单','已沟通','已到院','已成交','无效订单']
		return list[_index]
	}
}

function addZero(m) {
	return m < 10 ? '0' + m : m;
}