<template>
	<view class="pb88">
		<u-navbar title="治疗档案详情" :autoBack="true" :placeholder='true'></u-navbar>
		<charts :numAxis='numAxis' :tempAxis='tempAxis' :pulseWidthAxis='pulseWidthAxis'
			:pulsesNumberAxis='pulsesNumberAxis' :energyAxis='energyAxis' :dataId='id' :model='model'
			:passesUsed='detailData.passes_used' :loadingtext='loadingtext' :currentnumber='current_number'
			:lineList='lineList'>
		</charts>
		<basicInfo :detail='detailData' :model='model' :currentnumber='current_number' :lineList='lineList'></basicInfo>
		<progress :detail='detailData'></progress>
		<view class="bg-FFFFFF pb30 m-0-24 bb-999999-2">
			<u-tabs @change='tabsChange' :current='index' :scrollable='false' itemStyle="height: 30px;" :list="list"
				:lineWidth='60' :lineHeight='2' lineColor="#5AA1F9" :activeStyle="{
			    color: '#5AA1F9'
			}"></u-tabs>
		</view>

		<project v-if="index === 0" :detail='detailData'></project>
		<customer v-if="index === 1" :detail='detailData'></customer>
		<doctor v-if="index === 2" :detail='detailData'></doctor>
		<effect v-if="index === 3" :detail='detailData'></effect>

		<hash :detail='detailData'></hash>
	</view>
</template>

<script>
	import charts from "./charts/charts.vue"
	import basicInfo from "./detail/basicInfo.vue"
	import progress from "./detail/progress.vue"
	import project from "./item/projectInfo.vue"
	import customer from "./item/customerInfo.vue"
	import doctor from "./item/doctor.vue"
	import effect from "./item/effect.vue"
	import hash from "./item/hash.vue"
	import {
		recordDetail,
		recordRun
	} from '@/common/api.js'
	export default {
		components: {
			basicInfo,
			progress,
			charts,
			project,
			customer,
			doctor,
			effect,
			hash
		},
		data() {
			return {
				index: 0,
				itemIndex: 0,
				agency_name: '',
				record_id: '',
				id: '',
				model: '',
				current_number: '',
				lineList: [],
				numAxis: [],
				tempAxis: [],
				pulseWidthAxis: [],
				pulsesNumberAxis: [],
				energyAxis: [],
				detailData: {},
				passesUsed: '',
				list: [{
					name: '项目信息',
				}, {
					name: '客户信息',
				}, {
					name: '医生信息'
				}, {
					name: '效果图片'
				}],
				loadingtext: '数据加载中',
			}
		},
		watch: {
			lineList(val) {
				let _numAxis = []
				let _tempAxis = []
				let _pulseWidthAxis = []
				let _energyAxis = []
				let _pulsesNumberAxis = []
				val.forEach((item, index) => {
					// this.numAxis.push(this.initTime(Date.parse(val[0].createTime), Date.parse(item
					// 	.createTime)))
					_numAxis.push(index + 1)
					_tempAxis.push(parseFloat(item.temperature.toFixed(2)))
					_pulseWidthAxis.push(item.pulse_width)
					_energyAxis.push(item.energy)
					_pulsesNumberAxis.push(item.pulses_number)
				})
				this.numAxis = _numAxis.slice(0, 15)
				this.tempAxis = _tempAxis.slice(0, 15)
				this.pulseWidthAxis = _pulseWidthAxis.slice(0, 15)
				this.energyAxis = _energyAxis.slice(0, 15)
				this.pulsesNumberAxis = _pulsesNumberAxis.slice(0, 15)
			}
		},
		onLoad(options) {
			this.agency_name = decodeURIComponent(options.agency_name);
			this.record_id = decodeURIComponent(options.record_id);
			this.id = decodeURIComponent(options.id);
		},
		onShow() {
			this.getListData()
		},
		onShareAppMessage() {
			let result = {
				title: `${this.detailData.customer_name}的治疗记录`,
				// imageUrl: `https://bianm.jinxiongsj.com/file/uploads/20230117/7c9baaf030805c9ab6ae46f699fd6844.png`
			}
			return result
		},
		methods: {
			initTime(current, next) {
				let time = parseInt((next - current) / 1000)
				let res
				let h = Math.floor(time / 3600)
				let hh = h < 10 ? h > 0 ? `0${h}h` : '' : `${h}h`
				let m = Math.floor((time / 60) % 60)
				let mm = m < 10 ? m > 0 ? `0${m}m` : '' : `${m}m`
				let s = Math.floor(time % 60)
				let ss = s < 10 ? s > 0 ? `0${s}s` : '0s' : `${s}s`
				res = `${hh}${mm}${ss}`
				return res
			},
			tabsChange(e) {
				this.index = e.index
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
					this.lineList = res.data.data
					this.model = res?.data?.data[0]?.model || ''
					this.current_number = res?.data?.data[0]?.current_number
					this.loadingtext = '暂无数据'
				} else {
					this.loadingtext = '暂无数据'
				}
			},
			// 项目详情
			async getListData() {
				let obj = {
					data_id: this.id
				}
				const res = await recordDetail(obj)
				if (res.statusCode == 200) {
					this.detailData = res.data.data
					this.getDeatilData()
				}

			}
		}
	}
</script>

<style lang="scss" scoped>
	.popupShow {
		overflow: hidden;
		position: fixed;
	}
</style>
