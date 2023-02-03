<template>
	<view class="">
		<title title="区块信息"></title>
		<view class="card d-s-c">
			<view>哈希值：{{detail.hash || '-'}}</view>
			<view class="hashbtn ml30" @click="copyhash">复制</view>
		</view>
	</view>
</template>

<script>
	import title from '@/components/title/title.vue';
	export default {
		components: {
			title
		},
		props: {
			detail: {
				value: Object,
				default: {}
			}
		},
		data() {
			return {}
		},
		methods: {
			copyhash() {
				uni.setClipboardData({
					data: this.detail.hash,
					success: () => {
						uni.showToast({
							title: "复制哈希值成功"
						})
					}
				})
			}
		}
	}
</script>


<style lang="scss" scoped>
	.hashbtn {
		padding: 5rpx 15rpx;
		color: #FFFFFF;
		background: #5D9AFF;
		border-radius: 12rpx;
		font-size: 26rpx;
	}
</style>
