<template>
	<view class="mt30 w100">
		<title title="资料完善度"></title>
		<view class="m24 bg-FFFFFF  borderRadius p24 ">
			<view class="flex">
				<arcbar :progress='progress'></arcbar>
				<view class="f26 co-333333 flex-1 d-f-a ml15">
					<view class="flex mb15">
						<view class="flex-1 d-s-c  mr15">
							<view>项目信息：{{projectNum}}/2</view>
							<u-icon v-if="projectNum === 2" name="checkbox-mark" color="#5D9AFF" size="24"></u-icon>
						</view>
						<view class="flex-1 d-s-c">
							<view>客户信息：{{cistpmerNum}}/5</view>
							<u-icon v-if="cistpmerNum === 5" name="checkbox-mark" color="#5D9AFF" size="24"></u-icon>
						</view>
					</view>
					<view class="flex mb15">
						<view class="flex-1 d-s-c mr15">
							<view>医生信息：{{doctorNum}}/1</view>
							<u-icon v-if="doctorNum === 1" name="checkbox-mark" color="#5D9AFF" size="24"></u-icon>
						</view>
						<view class="flex-1 d-s-c">
							<view>效果图片：{{effectNum}}/2</view>
							<u-icon v-if="effectNum === 2" name="checkbox-mark" color="#5D9AFF" size="24"></u-icon>
						</view>
					</view>
				</view>
			</view>

			<!-- <view class="flex">
				<view class="btn co-FFFFFF f26 fb " @click="goto">
					立即完善
				</view>
			</view> -->
		</view>

	</view>

</template>

<script>
	import title from '@/components/title/title.vue';
	import arcbar from '../charts/arcbar.vue'
	export default {
		components: {
			title,
			arcbar
		},
		data() {
			return {
				projectNum: 0,
				cistpmerNum: 0,
				doctorNum: 0,
				effectNum: 0,
				progress: ''
			};
		},
		props: {
			detail: {
				value: Object,
				default: {}
			}
		},
		watch: {
			detail(val) {
				this.getInfo();
				this.progress = val.progress
			}
		},
		methods: {
			goto() {
				let url = `/pages_record/editRecord?id=${this.detail._id}`
				uni.navigateTo({
					url
				})
			},
			getInfo() {
				let _projectNum = 0
				let _cistpmerNum = 0
				let _doctorNum = 0
				let _effectNum = 0
				if (this.detail.project) {
					_projectNum++;
				}
				if (this.detail.parts) {
					_projectNum++;
				}
				if (this.detail.customer_name) {
					_cistpmerNum++;
				}
				if (this.detail.contact) {
					_cistpmerNum++;
				}
				if (this.detail.gender) {
					_cistpmerNum++;
				}
				if (this.detail.wechat) {
					_cistpmerNum++;
				}
				if (this.detail.symptoms) {
					_cistpmerNum++;
				}
				if (this.detail.doctor_name) {
					_doctorNum++;
				}

				if (this.detail?.before[0]?.url) {
					_effectNum++;
				}
				if (this.detail?.after[0]?.url) {
					_effectNum++;
				}

				this.projectNum = _projectNum
				this.cistpmerNum = _cistpmerNum
				this.doctorNum = _doctorNum
				this.effectNum = _effectNum
			},
		}
	};
</script>

<style lang="scss" scoped>
	.charts {
		width: 180rpx;
		height: 180rpx;
		z-index: 100;
	}

	.btn {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 10rpx 35rpx;
		border: 1rpx solid #8B91C4;
		background: linear-gradient(94deg, #A9B8D5, #D2C7D8);
		border-radius: 12rpx;
		position: relative;
		max-width: 150rpx;
		margin-left: auto;
	}

	.btn:before {
		content: '';
		position: absolute;
		width: calc(100% - 8rpx);
		height: calc(100% - 8rpx);
		background: transparent;
		border: 1rpx solid #FFFFFF;
		border-radius: 12rpx;
		top: 2rpx;
		left: 2rpx;
	}
</style>
