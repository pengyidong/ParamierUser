<template>
	<u-overlay :show="show" :opacity="1">
		<view class="d-c-c h100 pr bgImg">
			<video @play="play" :style="" @error="clogErr" :style="'height:'+videoH+'px !important;'"
				:custom-cache="false" :src="src" :controls='false' :autoplay='true' :enable-progress-gesture='false'
				:show-fullscreen-btn='false' :show-center-play-btn='false'>
			</video>
			<view class="pa skip" @click="skipVideo">
				跳过({{count}}S)
			</view>
		</view>
	</u-overlay>
</template>

<script>
	import utils from '@/static/utils/calcImageWH.js';
	export default {
		data() {
			return {
				videoH: utils.calcH(4, 3),
				show: true,
				count: 5,
				videoPlay: false,
				src: 'https://bianm.jinxiongsj.com/file/uploads/20221018/3508992d07180a577cef624829174931.mp4'
			}
		},
		created() {
			let show = uni.getStorageSync('showVideo')
			if (show == '1') {
				this.show = false
			}
		},
		methods: {
			clogErr(e) {
				console.error('视频错误信息:', e.detail.errMsg)
			},
			play() {
				uni.setStorageSync('showVideo', '1')
				this.verification()
				setTimeout(() => {
					this.videoPlay = true
				}, 400);
			},
			skipVideo() {
				this.show = false
			},
			verification() {
				this.count = 4;
				var times = setInterval(() => {
					this.count--; //递减
					if (this.count <= 0) {
						this.show = false
						clearInterval(times);
					}
				}, 1080); //1000毫秒后执行
			},
		},

	}
</script>

<style lang="scss" scoped>
	video {
		border: none;
		display: block !important;
		object-fit: cover;
		outline: none;
		mix-blend-mode: lighten;
		width: 100% !important;
	}

	video:focus {
		outline: none;
	}

	.bgImg {
		// background: url('https://bianm.jinxiongsj.com/file/uploads/20221010/12f68d09ea5787dc55c8fb5442b37652.png') fixed center;
		// background-size: 100% auto;
		background: #4f9dfb;
	}

	.skip {
		border: 1px solid #FFFFFF;
		border-radius: 50rpx;
		height: 50rpx;
		line-height: 48rpx;
		padding: 15rpx 35rpx;
		color: #FFFFFF;
		font-size: 32rpx;
		background-color: #80a4e4;
		bottom: calc(env(safe-area-inset-bottom) + 20rpx);
		right: 30rpx;
	}
</style>
