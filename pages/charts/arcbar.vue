<template>
	<view class="charts-box">
		<canvas canvas-id="arcbarCharts" id="arcbarCharts" class="charts" @tap="tap" />
	</view>
</template>

<script>
	import uCharts from '@/static/utils/u-charts.js';
	var uChartsInstance = {};
	export default {
		data() {
			return {
				cWidth: 180,
				cHeight: 180,
			};
		},
		props: {
			progress: {
				value: Array,
				default: {}
			},
		},
		onReady() {},
		watch: {
			progress(val) {
				if (!val) return
				this.getServerData();
			}
		},
		methods: {
			getServerData() {
				let res = {
					series: [{
						color: "#5D9AFF",
						data: this.progress.toFixed(1) || 0
					}]
				};
				this.drawCharts('arcbarCharts', res);
			},
			drawCharts(id, data) {
				const ctx = uni.createCanvasContext(id, this);
				uChartsInstance[id] = new uCharts({
					type: "arcbar",
					context: ctx,
					width: 90,
					height: 90,
					series: data.series,
					animation: true,
					background: "#FFFFFF",
					color: ["#1890FF", "#91CB74", "#FAC858", "#EE6666", "#73C0DE", "#3CA272",
						"#FC8452", "#9A60B4", "#ea7ccc"
					],
					padding: undefined,
					title: {
						name: `${(this.progress * 100).toFixed(1) }%` || 0,
						fontSize: 18,
						color: "#5D9AFF"
					},
					extra: {
						arcbar: {
							type: "default",
							width: 8,
							backgroundColor: "#E9E9E9",
							startAngle: 0.75,
							endAngle: 0.25,
							gap: 2,
						}
					}
				})
			}
		}
	}
</script>

<style scoped>
	/* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
	.charts-box {
		width: 180rpx;
		height: 180rpx;
		z-index: 1;
	}
</style>
