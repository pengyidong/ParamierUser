import {
	request
} from '@/common/request.js'

// type
// 1 => v1
// 4 => v4
// 0 => 仪表盘接口
// -1 => 变美惊喜社接口


// 设备实时数据 
export const equipment = (data) => request({
	url: '6342711d9a0ac3000a44c761/data_retrieve',
	method: 'post',
	data,
	type: "4"
})

// 治疗档案列表
export const record = (data) => request({
	url: '634e763952cb33000a45e252/data',
	method: 'post',
	data,
	type: "1"
})

// 治疗档案详情
export const recordDetail = (data) => request({
	url: '634e763952cb33000a45e252/data_retrieve',
	method: 'post',
	data,
	type: "1"
})

// 设备运行数据 
export const recordRun = (data) => request({
	url: '6343c34483f745000868a309/data',
	method: 'post',
	data,
	type: "1"
})

// 编辑治疗档案
export const recordUpdate = (data) => request({
	url: '634e763952cb33000a45e252/data_update',
	method: 'post',
	data,
	type: "4"
})

// 获取文件上传凭证和上传地址
export const getRecordUploadToken = () => request({
	url: '634e763952cb33000a45e252/file/get_upload_token',
	method: 'post',
	data: {
		transaction_id: "bmrj8888"
	},
	type: '1'
})

// 获取文件上传凭证和上传地址
export const getDoctorUploadToken = () => request({
	url: '634e619d3f89ef000acfe68f/file/get_upload_token',
	method: 'post',
	data: {
		transaction_id: "bmrj8888"
	},
	type: '1'
})

// 获取文件上传凭证和上传地址
export const getUserInfoUploadToken = () => request({
	url: '63a531c5e52b15000a86af3b/file/get_upload_token',
	method: 'post',
	data: {
		transaction_id: "bmrj8888"
	},
	type: '1'
})

// 获取文件上传凭证和上传地址
export const getYzUploadToken = () => request({
	url: '63a530650bb10c000ad50160/file/get_upload_token',
	method: 'post',
	data: {
		transaction_id: "bmrj8888"
	},
	type: '1'
})

// 获取认证医生列表
export const getDoctorList = (data) => request({
	url: '634e619d3f89ef000acfe68f/data',
	method: 'post',
	data,
	type: "4"
})

// 获取认证医生
export const getDoctor = (data) => request({
	url: '634e619d3f89ef000acfe68f/data_retrieve',
	method: 'post',
	data,
	type: "4"
})

// 编辑医生
export const updateDoctor = (data) => request({
	url: '634e619d3f89ef000acfe68f/data_update',
	method: 'post',
	data,
	type: "4"
})

// 删除医生
export const deleteDoctor = (data) => request({
	url: '634e619d3f89ef000acfe68f/data_delete',
	method: 'post',
	data,
	type: "1"
})

// 删除医生
export const createDoctor = (data) => request({
	url: '634e619d3f89ef000acfe68f/data_create',
	method: 'post',
	data,
	type: "4"
})


// 获取商机列表
export const getBusinessList = (data) => request({
	url: '63857723fa0a710007b253d8/data',
	method: 'post',
	data,
	type: "1"
})

// 获取商机详情
export const getBusinessDetail = (data) => request({
	url: '63857723fa0a710007b253d8/data_retrieve',
	method: 'post',
	data,
	type: "1"
})

// 查询治疗档案信息
export const getInstitutions = (data) => request({
	url: '634e5efe3f89ef000ace2e94/data_retrieve',
	method: 'post',
	data,
	type: "1"
})

// 查询仪器信息
export const getInstrument = (data) => request({
	url: '634e6363852454000af42f80/data',
	method: 'post',
	data,
	type: "1"
})

// 获取商机统计
export const getBusinessStatistical = (data) => request({
	url: 'data_process/data/dash/combined_group',
	method: 'post',
	data,
	type: "0"
})

// 获取文章分类列表
export const getCategory = (data) => request({
	url: 'plus.article.article/category',
	method: 'GET',
	data,
	type: "-1"
})

// 获取文章列表
export const getCategoryList = (data) => request({
	url: 'plus.article.Article/index',
	method: 'GET',
	data,
	type: "-1"
})

// 获取文章详情
export const getArticleDetail = (data) => request({
	url: 'plus.article.article/detail',
	method: 'GET',
	data,
	type: "-1"
})

// 获取动态码
export const getCode = (data) => request({
	url: 'job/cloud/getCode',
	method: 'GET',
	data,
	type: "-2"
})

// 获取动态码
export const getUserPhone = (data) => request({
	url: 'iot/index/getPhone',
	method: 'GET',
	data,
	type: "-2"
})

// 获取动态码
export const getUserInfo = (data) => request({
	url: 'iot/index/getinfo',
	method: 'GET',
	data,
	type: "-2"
})

// 获取动态码
export const checkCode = (data) => request({
	url: 'iot/index/checkCode',
	method: 'GET',
	data,
	type: "-2"
})

// 获取动态码
export const getOpenid = (data) => request({
	url: 'iot/index/getOpenid',
	method: 'POST',
	data,
	type: "-2"
})

// 创建用户数据
export const createUser = (data) => request({
	url: '63a531c5e52b15000a86af3b/data_create',
	method: 'POST',
	data,
	type: "4"
})

// 查询用户手机号
export const getUserIsPhone = (data) => request({
	url: '63a531c5e52b15000a86af3b/data',
	method: 'POST',
	data,
	type: "4"
})

// 验真卡片 查询多条数据接口
export const yzdata = (data) => request({
	url: '63a530650bb10c000ad50160/data',
	method: 'POST',
	data,
	type: "4"
})

// 创建验真卡片
export const createVerifyTruth = (data) => request({
	url: '63a530650bb10c000ad50160/data_create',
	method: 'POST',
	data,
	type: "4"
})

// 创建验真卡片
export const getVerifyTruth = (data) => request({
	url: '63a530650bb10c000ad50160/data',
	method: 'POST',
	data,
	type: "4"
})