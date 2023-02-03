<template>
	<view class="pb240">
		<u-navbar title="授权验真信息" :autoBack="true" :placeholder='true'></u-navbar>
		<view class="mt24"></view>
		<view class="card d-d-c">
			<image style="width:200rpx;"
				src="https://bianm.jinxiongsj.com/file/uploads/20221108/21a69a0de3ca4cfbaf8839a89fa8ffd3.png"
				mode="widthFix"></image>
			<view class="co-333333 f32 fb mt24">
				请点击以下授权，获取验真卡片
			</view>
		</view>
		<view class="card">
			<view class="co-333333 f26 fb mb15">头像</view>
			<view class="d-c">
				<u-avatar :src="detail.src" size='60'></u-avatar>
				<button class="avatar-wrapper maxW" open-type="chooseAvatar"
					@chooseavatar="onChooseAvatar">授权头像</button>
			</view>

			<view class="co-333333 f26 fb m-15-0">昵称</view>
			<input type="nickname" class="weui-input" placeholder="请输入昵称" v-model="detail.wxname" @blur="onNickName" />
			<view class="co-333333 f26 fb m-15-0">手机号</view>
			<view class="d-c">
				<view class="co-333333 f26">{{detail.phone || '-'}}</view>
				<button open-type="getPhoneNumber" class="maxW" @getphonenumber="getPhoneNumber">授权手机号</button>
			</view>
			<view class="co-333333 f26 fb m-15-0">性别</view>
			<u-radio-group v-model="detail.gender" :borderBottom="true" placement="column" iconPlacement="right">
				<u-radio label="女" name="女" :labelDisabled='true' :customStyle="{marginBottom: '16px'}"></u-radio>
				<u-radio label="男" name="男" :labelDisabled='true' :customStyle="{marginBottom: '16px'}"></u-radio>
			</u-radio-group>
		</view>
		<view class="d-c-c mt50 wz">
			<view class="flex-1 d-c-c">
				<button class="btn-normal" @click="save">保存信息</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getUserPhone,
		yzdata,
		createUser,
		checkCode,
		getInstrument,
		createVerifyTruth,
		getUserInfoUploadToken,
		getOpenid,
		getYzUploadToken
	} from '@/common/api.js'
	import title from '@/components/title/title.vue';
	export default {
		data() {
			return {
				detail: {
					src: '',
					key: '',
					yzkey: '',
					gender: '女',
					openId: '',
					wxname: '',
					phone: '',
					equipment_id: '',
					serial_number: '',
					agency_name: '',
					equipment_model: 'RFWTM-01',
				},
				insDetail: {},
				checkObj: {
					hash_code: 'E2BE29A9F567D75664106CA4069936688D609673829D2B0D1C85D8C8CBF9D580',
					device_code: 'grshh2TpCE8_dev_NOA02'
				},
				token_and_url_list: [],
				token_and_url_list1: []
			}
		},
		created() {
			this.getToken()
			this.getYzToken()
			this.cCode().then(checkRes => {
				if (checkRes.statusCode === 200 && checkRes.data.code === 200) {
					this.getData()
				}
			})

		},
		methods: {
			onNickName(e) {
				const {
					value
				} = e.detail
				this.detail.wxname = value
			},
			async getToken() {
				const res = await getUserInfoUploadToken()
				if (res.statusCode === 200) {
					this.token_and_url_list = res.data.token_and_url_list
				}
			},
			async getYzToken() {
				const res = await getYzUploadToken()
				if (res.statusCode === 200) {
					this.token_and_url_list1 = res.data.token_and_url_list
				}
			},
			async save() {
				let createObj = {
					transaction_id: "bmrj8888",
					data: {
						agency_name: {
							value: '变美日记广州体验中心'
						},
						phone: {
							value: parseInt(this.detail.phone)
						},
						wxname: {
							value: this.detail.wxname
						},
						wxurl: {
							value: [
								this.detail.key
							]
						},
						sex: {
							value: this.detail.gender
						},
						openid: {
							value: this.detail.openId
						},
					},
				}
				const createUserRes = await createUser(createObj)
				if (createUserRes.statusCode === 200) {
					this.GINS().then(insRes => {
						if (insRes.statusCode === 200) {
							this.createCard()
						}
					})
				}
			},
			onChooseAvatar(e) {
				const {
					avatarUrl
				} = e.detail
				this.detail.src = avatarUrl
				this.uploadAvatar(avatarUrl)
				this.uploadAvatar1(avatarUrl)
			},
			downLoadImg(imgUrl) {
				wx.downloadFile({
					url: imgUrl, //图片地址
					success: downres => {
						this.uploadAvatar1(downres.tempFilePath, 1)
					}
				})
			},
			uploadAvatar1(avatarUrl, index = 0) {
				uni.uploadFile({
					url: this.token_and_url_list1[0].url, //接口地址
					header: {
						'Authorization': 'Bearer SMlLFl0qf3setN6OWJl7henCSwnwfLaX'
					}, //请求token
					filePath: avatarUrl,
					formData: {
						"token": this.token_and_url_list1[0].token,
					},
					name: 'file',
					success: (uploadFileRes) => {
						this.token_and_url_list1.shift();
						this.detail.yzkey = JSON.parse(uploadFileRes.data).key
						if (index === 1) {
							this.createCard()
						}
					}
				});
			},
			uploadAvatar(avatarUrl) {
				uni.uploadFile({
					url: this.token_and_url_list[0].url, //接口地址
					header: {
						'Authorization': 'Bearer SMlLFl0qf3setN6OWJl7henCSwnwfLaX'
					}, //请求token
					filePath: avatarUrl,
					formData: {
						"token": this.token_and_url_list[0].token,
					},
					name: 'file',
					success: (uploadFileRes) => {
						this.token_and_url_list.shift();
						this.detail.key = JSON.parse(uploadFileRes.data).key
					}
				});
			},
			async getData() {
				uni.getStorage({
					key: 'openid',
					success: res => {
						this.yz(res.data).then(yzRes => {
							let length = yzRes.data.data.length
							if (length >= 1) {
								this.detail = yzRes.data.data[0]
								this.detail.gender = yzRes.data.data[0].sex
								this.detail.openId = yzRes.data.data[0].openid
								this.downLoadImg(this.detail.wxurl[0].url)
							}
						})
					}
				});
			},
			// 获取验真卡片信息
			async yz(openid) {
				let obj = {
					limit: 100,
					filter: {
						rel: "and",
						cond: [{
							field: "openid",
							method: "eq",
							value: openid
						}, ]
					}
				}
				const yzRes = await yzdata(obj)
				return yzRes
			},
			// 获取机构信息
			async GINS() {
				let insObj = {
					limit: 1,
					filter: {
						rel: "and",
						cond: [{
							field: "agency_name",
							method: "eq",
							value: '变美日记广州体验中心'
						}, ]
					}
				}
				const resIns = await getInstrument(insObj)
				this.detail.equipment_id = resIns.data.data[0].equipment_id
				this.detail.serial_number = resIns.data.data[0].serial_number
				this.detail.agency_name = resIns.data.data[0].agency_name
				return resIns
			},
			// 验真信息
			async cCode() {
				let checkObj = {
					hash_code: 'E2BE29A9F567D75664106CA4069936688D609673829D2B0D1C85D8C8CBF9D580',
					device_code: 'grshh2TpCE8_dev_NOA02'
				}
				const checkRes = await checkCode(checkObj)
				return checkRes
			},
			// 创建验真卡片
			async createCard(getRes, detail) {
				let createObj = {
					transaction_id: "bmrj8888",
					data: {
						agency_name: {
							value: '变美日记广州体验中心'
						},
						wxname: {
							value: this.detail.wxname
						},
						wxurl: {
							value: [
								this.detail.yzkey
							]
						},
						sex: {
							value: this.detail.gender
						},
						openid: {
							value: this.detail.openId
						},
						phone: {
							value: this.detail.phone
						},
						date: {
							value: Date.now()
						},
						equipment_id: {
							value: this.detail.equipment_id
						},
						serial_number: {
							value: this.detail.serial_number
						},
						agency_name: {
							value: this.detail.agency_name
						},
						equipment_model: {
							value: 'RFWTM-01'
						},
					},
				}
				let createRes = await createVerifyTruth(createObj)
				if (createRes.statusCode === 200) {
					let url =
						`/pages/verificationList?phone=${this.detail.phone}`
					uni.redirectTo({
						url
					});
				}
			},
			// 获取手机号
			async GUP(obj) {
				let phoneRes = await getUserPhone(obj)
				this.detail.phone = phoneRes.data.data.phone
				this.detail.openId = phoneRes.data.data.session.openid || uni.getStorage('openid')
			},
			getPhoneNumber(e) {
				if (e.detail.errMsg !== 'getPhoneNumber:ok') {
					return false;
				}
				wx.login({
					success: res => {
						let obj = {
							code: res.code,
							encrypted_data: encodeURIComponent(e.detail.encryptedData),
							iv: encodeURIComponent(e.detail.iv),
						}
						this.GUP(obj)
					}
				});
			}
		}
	}
</script>比价网

<style lang="scss" scoped>
	.wz {
		height: 120rpx;
		width: 100%;
		background: #FFFFFF;
		position: fixed;
		bottom: env(safe-area-inset-bottom);
		box-shadow: 0rpx 3rpx 18rpx 0rpx rgba(128, 138, 187, 0.35);
	}

	.btn-normal {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 10rpx 25rpx;
		border: 1rpx solid #8B91C4;
		background: linear-gradient(94deg, #A9B8D5, #D2C7D8);
		border-radius: 12rpx;
		position: relative;
		min-width: 200rpx;
		height: 60rpx;
		color: #FFFFFF;
	}

	button::after {
		border: none;
	}

	.avatar-wrapper {
		background: white;
		padding: 0rpx;
		margin: 0rpx;
	}

	.maxW {
		display: flex;
		align-items: center;
		justify-content: center;
		flex: 1;
		padding: 10rpx 25rpx;
		border: 1rpx solid #8B91C4;
		background: linear-gradient(94deg, #A9B8D5, #D2C7D8);
		border-radius: 12rpx;
		height: 60rpx;
		color: #FFFFFF;
		max-width: 240rpx;
		margin: 0;
		margin-left: auto;
	}

	.weui-input {
		border: #dadbde 1rpx solid;
		border-radius: 8rpx;
		padding: 8rpx 12rpx;
	}
</style>
