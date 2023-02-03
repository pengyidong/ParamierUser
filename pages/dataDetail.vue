<template>
	<view class="d-f" :style="'height: '+ pageH +'px'">
		<u-navbar :title="list[index].name" :autoBack="true" :placeholder='true'></u-navbar>
		<view class="bg-FFFFFF m24 borderRadius pr flex-1" id="tempContainer">
			<canvas canvas-id="itemPopup" id="itemPopup" class="charts" @touchstart="touchstart" @touchmove="touchmove"
				@touchend="touchend" />
		</view>
	</view>

</template>

<script>
	import {
		recordRun,
		recordDetail
	} from '@/common/api.js'
	import uCharts from '@/static/utils/u-charts.js';
	var uChartsInstance = {};
	export default {
		data() {
			return {
				numAxis: [],
				pageH: '',
				index: null,
				data_id: null,
				cStyle: {
					width: '100%',
					height: '100%'
				},
				list: [{
						name: '温度',
						unitMeasure: "℃",
						color: '#5AA1F9',
						data: []
					},
					{
						name: '脉宽',
						unitMeasure: "ms",
						color: '#91CB74',
						data: []
					},

					{
						name: '脉冲个数',
						unitMeasure: "个",
						color: '#FAC858',
						data: []
					},
					{
						name: '能量大小',
						unitMeasure: "J",
						color: '#EE6666',
						data: []
					}
				],
			};
		},
		onLoad(options) {
			this.pageH = uni.getSystemInfoSync().windowHeight
			this.index = decodeURIComponent(options.index);
			this.data_id = decodeURIComponent(options.dataId);
			this.getListData()
		},
		methods: {
			async getListData() {
				let obj = {
					data_id: this.data_id
				}
				const res = await recordDetail(obj)
				if (res.statusCode == 200) {
					this.detailData = res.data.data
					this.getDeatilData()
				}
			},
			// 图表数据
			async getDeatilData() {
				let obj = {
					limit: 100,
					filter: {
						rel: "and",
						cond: [{
								field: "equipment_id",
								method: "eq",
								value: `${this.detailData.equipment_id}`
							},
							{
								field: "record_id",
								method: "eq",
								value: `${this.detailData.record_id}`
							},
						]
					}
				}
				const res = await recordRun(obj)
				if (res.statusCode == 200) {
					let _numAxis = []
					let _tempAxis = []
					let _pulseWidthAxis = []
					let _energyAxis = []
					let _pulsesNumberAxis = []
					res.data.data.reverse().forEach((item, index) => {
						// this.numAxis.push(this.initTime(Date.parse(val[0].createTime), Date.parse(item
						// 	.createTime)))
						_numAxis.push(index + 1)
						_tempAxis.push(parseFloat(item.temperature.toFixed(2)))
						_pulseWidthAxis.push(item.pulse_width)
						_energyAxis.push(item.energy)
						_pulsesNumberAxis.push(item.pulses_number)
					})
					this.numAxis = _numAxis
					this.list[0].data = _tempAxis
					this.list[1].data = _pulseWidthAxis
					this.list[2].data = _energyAxis
					this.list[3].data = _pulsesNumberAxis
					this.getServerData()
				}
			},
			async getData() {
				let obj = {
					limit: 100,
					filter: {
						rel: "and",
						cond: [{
							field: "record_id",
							method: "eq",
							value: `${this.record_id}`
						}, {
							field: "equipment_status",
							method: "eq",
							value: `运行中`
						}, {
							field: "model",
							method: "eq",
							model: `${this.model}`
						}, ]
					}
				}
				const res = await recordRun(obj)

			},
			getServerData() {
				let res = {
					categories: this.numAxis,
					series: [{
						name: this.list[this.index].name,
						data: this.list[this.index].data
					}],
					enableScroll: true,
					xAxis: {
						disableGrid: true,
						scrollShow: true,
						itemCount: 12
					}
				};
				if (this.numAxis.length < 15) {
					res.enableScroll = false
					res.xAxis = {
						disableGrid: true
					}
				}
				const query = uni.createSelectorQuery().in(this);
				query.select("#tempContainer").boundingClientRect(data => {
					this.drawCharts('itemPopup', res, data.width, data.height, );
				}).exec(res => {})
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
					padding: [20, 10, 10, 10],
					enableScroll: data.enableScroll,
					legend: {},
					rotate: true,
					xAxis: data.xAxis,
					enableMarkLine: this.list[this.index].name === '温度',
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
				uChartsInstance[id] = new uCharts(opts);
			},
			touchstart(e) {
				uChartsInstance[e.target.id].scrollStart(e);
			},
			touchmove(e) {
				uChartsInstance[e.target.id].scroll(e);
			},
			touchend(e) {
				uChartsInstance[e.target.id].scrollEnd(e);
				uChartsInstance[e.target.id].touchLegend(e);
				// uChartsInstance[e.target.id].showToolTip(e);
			},
		}
	};
</script>

<style scoped>
	.charts {
		width: 100%;
		height: 100%;
		z-index: 1;
	}
</style>
