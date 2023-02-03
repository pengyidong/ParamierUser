<template>
	<view class="bg-FFFFFF borderRadius h100" id="tempContainer">
		<canvas v-if="yAxis.length !== 0" :canvas-id="list[index].id" :id="list[index].id" class="charts" @tap="tap" />
		<view class="h100 w100 d-c-c" v-else>
			<view class="h100 w100 d-c-c" v-if="loadingtext==='数据加载中'">
				<u-loading-icon size='48' color='#c1c4cc'></u-loading-icon>
			</view>
			<view class="h100 w100 f48 co-999999 d-c-c" v-if="loadingtext==='暂无数据'">
				<u-empty mode="data" text='暂无数据'></u-empty>
			</view>
		</view>
	</view>
</template>

<script>
	import uCharts from '@/static/utils/u-charts.js';
	var uChartsInstance = {};
	export default {
		data() {
			return {
				pixelRatio: 2,
				list: [{
						id: 'temp',
						name: '温度',
						unitMeasure: "℃",
						color: '#5AA1F9'
					},
					{
						id: 'pulseWidth',
						name: '脉宽',
						unitMeasure: "ms",
						color: '#91CB74'
					},

					{
						id: 'pulsesNumber',
						name: '脉冲个数',
						unitMeasure: "个",
						color: '#FAC858'
					},
					{
						id: 'energ',
						name: '能量大小',
						unitMeasure: "J",
						color: '#EE6666'
					}
				],
			};
		},
		props: {
			index: {
				value: Number,
			},
			yAxis: {
				value: Array,
				default: {}
			},
			xAxis: {
				value: Array,
				default: {}
			},
			dataId: {
				value: String,
				default: ''
			},
			loadingtext: {
				value: String,
				default: ''
			}
		},
		watch: {
			yAxis(val) {
				if (val.length === 0) return
				this.getServerData();
			},
		},
		onReady() {
			this.pixelRatio = uni.getSystemInfoSync().pixelRatio;
		},
		methods: {
			getServerData() {
				let res = {
					categories: this.xAxis,
					series: [{
						name: this.list[this.index].name,
						data: this.yAxis
					}]
				};
				let container = uni.createSelectorQuery().in(this).select("#tempContainer");
				container.boundingClientRect(data => {
					this.drawCharts(this.list[this.index].id, res, data.width, data.height);
				}).exec(function(res) {
					// 注意：exec方法必须执行，即便什么也不做，否则不会获取到任何数据
				})
			},
			drawCharts(id, data, width, height) {
				const ctx = uni.createCanvasContext(id, this);
				let opts = {
					type: "line",
					context: ctx,
					width,
					height,
					categories: data.categories,
					series: data.series,
					animation: true,
					background: "#FFFFFF",
					color: [this.list[this.index].color],
					fontSize: '12',
					padding: [15, 10, 0, 10],
					dataLabel: false,
					dataPointShape: false,
					legend: {
						fontSize: '12',
					},
					enableMarkLine: this.list[this.index].name === '温度',
					xAxis: {
						disableGrid: true
					},
					yAxis: {
						gridType: "dash",
						dashLength: 2,
						showTitle: true,
						data: [{
							fontSize: 12,
							title: this.list[this.index].unitMeasure,
							titleFontSize: 12,
							tofix: 2,
						}]
					},
					extra: {
						line: {
							type: "curve",
							width: 2
						},
						markLine: {
							data: [{
								value: 50,
								showLabel: true,
								labelText: '警戒',
								labelFontColor: '#FFFFFF',
								labelBgColor: '#DE4A42'
							}]
						}
					}
				}
				uChartsInstance[id] = new uCharts(opts)
			},
			tap(e) {
				let url =
					`/pages/dataDetail?index=${this.index}&dataId=${this.dataId}`
				uni.navigateTo({
					url
				})
			}
		}
	};
</script>

<style scoped>
	.charts {
		width: 100%;
		height: 500rpx;
		z-index: 100;
	}
</style>
