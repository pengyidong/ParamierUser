<template>
	<view class="pr d-s-c mb20" style="height: 65rpx;">
		<view class="f34 fb bgImg">
			<view class="ml14">
				{{title}}
			</view>
		</view>
		<view class="d-b" v-if="isShowMore">
			<view class="f24 co-999999 m-0-24">
				查看更多
			</view>
			<u-icon name="arrow-right-double" color="#999999" size="14"></u-icon>
		</view>
	</view>
</template>

<script>
	export default {
		name: "title",
		data() {
			return {};
		},
		props: {
			title: {
				value: String,
				default: ''
			},
			isShowMore: {
				value: Boolean,
				default: false
			}
		},
	}
</script>

<style lang="scss" scoped>
	.bgImg {
		height: 66rpx;
		line-height: 66rpx;
		background: url('https://bianm.jinxiongsj.com/file/uploads/20221009/f1912c1b97ea596159527b490d6a39ec.png') no-repeat;
		 background-size: auto 100%;
		margin-left: 10rpx;
	}
</style>
