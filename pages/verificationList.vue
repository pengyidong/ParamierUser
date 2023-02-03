<template>
	<view class="">
		<u-navbar title="验真卡片" :autoBack="true" :placeholder='true'></u-navbar>
		<view class="mt24"></view>
		<view class="card boxShadow f32 co-333333 lh180 pr" @click="goto(item)" v-for="(item, index) in list"
			:key="index">
			<view class="">型号：{{item.equipment_model || '-'}}</view>
			<view class="">序列号：{{item.serial_number || '-'}}</view>
			<view class="">机构名称：{{item.agency_name || '-'}}</view>
			<view class="">验真时间：{{item.date | transformTime}}</view>
			<view class="mainBtn" v-if="item.record_id">治疗记录</view>
			<view class="pa yq">
				<image style="width: 80rpx;"
					src="https://bianm.jinxiongsj.com/file/uploads/20221108/21a69a0de3ca4cfbaf8839a89fa8ffd3.png"
					mode="widthFix"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getVerifyTruth,
	} from '@/common/api.js'
	export default {
		data() {
			return {
				list: []
			}
		},
		onLoad(options) {
			let phone = decodeURIComponent(options.phone);
			this.getData(phone)
		},
		methods: {
			async getData(phone) {
				let obj = {
					limit: 100,
					filter: {
						rel: "and",
						cond: [{
							field: "phone",
							method: "eq",
							value: phone
						}, ]
					}
				}
				const res = await getVerifyTruth(obj)
				if (res.statusCode === 200) {
					this.list = res.data.data
				}
			},
			goto(item) {
				if (item.record_id && item.rid) {
					let url =
						`/pages/recordDeatil?agency_name=${item.agency_name}&id=${item.rid}&record_id=${item.record_id}`
					uni.navigateTo({
						url
					})
				}

			}
		}
	}
</script>

<style lang="scss" scoped>
	.mainBtn {
		margin-top: 15rpx;
		width: 120rpx;
		height: 30rpx;
	}

	.yq {
		top: 5rpx;
		right: 5rpx;
	}
</style>
