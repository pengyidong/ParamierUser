<template>
	<view class="mt30">
		<view class="flex bg-FFFFFF m-0-24 borderRadius p24 mb30">
			<view>
				<image :src="modelList[model]" style="width:130rpx;height:130rpx">
				</image>
			</view>
			<view class="f26 co-333333 ml30 flex flex-1">
				<view class="flex-1 d-f-a">
					<view>模式：{{model || '-'}}</view>
					<view>时长：{{durationTime || '-'}}</view>
				</view>
				<view class="flex-1 d-f-a">
					<view>总发数：{{total || '-'}}</view>
					<view>已打发数：{{passesUsed || '-'}}</view>
				</view>


			</view>
		</view>
		<view class="m24 bg-FFFFFF borderRadius">
			<view class="uni-margin-wrap">
				<swiper class="swiper" circular :indicator-dots="indicatorDots" :autoplay="autoplay"
					:interval="interval" :duration="duration">
					<swiper-item>
						<itemCharts :loadingtext='loadingtext' :yAxis='tempAxis' :xAxis='numAxis' :index='0'
							:dataId='dataId' />
					</swiper-item>
					<swiper-item>
						<itemCharts :loadingtext='loadingtext' :yAxis='pulseWidthAxis' :xAxis='numAxis' :index='1'
							:dataId='dataId' />
					</swiper-item>
					<swiper-item>
						<itemCharts :loadingtext='loadingtext' :yAxis='pulsesNumberAxis' :xAxis='numAxis' :index='2'
							:dataId='dataId' />
					</swiper-item>
					<swiper-item>
						<itemCharts :loadingtext='loadingtext' :yAxis='energyAxis' :xAxis='numAxis' :index='3'
							:dataId='dataId' />
					</swiper-item>
				</swiper>
			</view>
		</view>
	</view>

</template>

<script>
	import {
		equipment
	} from '@/common/api.js'
	import itemCharts from "./itemCharts.vue"
	export default {
		components: {
			itemCharts
		},
		props: {
			numAxis: {
				value: Array,
				default: {}
			},
			tempAxis: {
				value: Array,
				default: {}
			},
			pulseWidthAxis: {
				value: Array,
				default: {}
			},
			pulsesNumberAxis: {
				value: Array,
				default: {}
			},
			energyAxis: {
				value: Array,
				default: {}
			},
			model: {
				value: String,
				default: ''
			},
			currentnumber: {
				value: String,
				default: ''
			},
			dataId: {
				value: String,
				default: ''
			},
			loadingtext: {
				value: String,
				default: ''
			},
			lineList: {
				value: Array,
				default: ''
			},
			passesUsed: {
				value: String,
				default: ''
			}
		},
		computed: {
			durationTime() {
				if (!this.lineList[0]) return ''
				let time = parseInt((Date.parse(this.lineList[this.lineList.length - 1].createTime) - Date.parse(this
					.lineList[0].createTime)) / 1000)
				let res
				let h = Math.floor(time / 3600)
				let hh = h < 10 ? h > 0 ? `0${h}时` : '' : `${h}时`
				let m = Math.floor((time / 60) % 60)
				let mm = m < 10 ? m > 0 ? `0${m}分` : '' : `${m}分`
				let s = Math.floor(time % 60)
				let ss = s < 10 ? s > 0 ? `0${s}秒` : '' : `${s}秒`
				res = `${hh}${mm}${ss}`
				return res
			}
		},
		data() {
			return {
				indicatorDots: false,
				autoplay: true,
				interval: 5000,
				duration: 750,
				total: null,
				modelList: {
					'脱毛': 'https://bianm.jinxiongsj.com/file/uploads/20221010/b5e4211be37f8978aff4e1355ba014e4.png',
					'嫩肤': 'https://bianm.jinxiongsj.com/file/uploads/20221010/863ed068b4e9e313d85aef2e6f9d76d5.png',
					'祛斑': 'https://bianm.jinxiongsj.com/file/uploads/20221010/ef72d557e552161ab29d821ca83bba80.png',
					'毛细血管扩张': 'https://bianm.jinxiongsj.com/file/uploads/20221010/44bc9166ed4af0364319e4ad95cb9ae2.png',
				}
			};
		},
		watch: {
			model(val) {
				this.getData(val)
			},
			loadingtext(val) {}
		},
		created() {

		},
		methods: {
			async getData(model) {
				let obj = {
					data_id: '63903b0580c117000a994815'
				}
				const res = await equipment(obj)
				let modelObj = {
					'脱毛': 'hair_removal_total_number',
					'嫩肤': 'tender_skin_total_number',
					'祛斑': 'the_spot_total_number',
					'毛细血管扩张': 'capillary_blood_vessels_total_number',
				}
				if (res.statusCode == 200) {
					this.detail = res.data.data
					this.total = this.detail[`${modelObj[model]}`] || '-'
				}
			}
		}
	};
</script>

<style scoped>
	.uni-margin-wrap {
		width: 690rpx;
		width: 100%;
	}

	.swiper {
		height: 500rpx;
	}

	.swiper-item {
		display: block;
		height: 300rpx;
		line-height: 300rpx;
		text-align: center;
	}

	.swiper-list {
		margin-top: 40rpx;
		margin-bottom: 0;
	}

	.uni-common-mt {
		margin-top: 60rpx;
		position: relative;
	}

	.info {
		position: absolute;
		right: 20rpx;
	}

	.uni-padding-wrap {
		width: 550rpx;
		padding: 0 100rpx;
	}
</style>
