<template>
	<view class="card flex">
		<view class="mr30">
			<u-avatar :src="detail.doctor_photo[0].url" size='80'></u-avatar>
		</view>
		<view class="d-f-s">
			<view>姓名：{{detail.doctor_name || '-'}}</view>
			<view>职称：{{detail.doctor_title || '-'}}</view>
			<view>编号：{{detail.doctor_number || '-'}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			detail: {
				value: Object,
				default: {}
			}
		},
		data() {
			return {}
		},
		methods: {}
	}
</script>


<style lang="scss" scoped>
	.doctorPhoto {
		width: 160rpx;
		height: 160rpx;
		min-width: 160rpx;
		min-height: 160rpx;
		border-radius: 160rpx;
	}
</style>
