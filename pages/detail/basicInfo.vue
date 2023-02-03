<template>
	<view class="mt30">

		<title title="基础信息"></title>
		<view class="m-0-24 bg-FFFFFF borderRadius co-333333 f26">
			<view class="list-item d-s-c"><span>档案ID</span><span>{{detail.record_id }}</span></view>
			<view class="list-item d-s-c"><span>设备序列号</span><span>{{detail.serial_number}}</span></view>
			<view class="list-item d-s-c"><span>创建时间</span><span>{{detail.creation_time | transformTime}}</span></view>
			<view class="list-item d-s-c"><span>开始时间</span><span>{{detail.start_time | transformTime}}</span></view>
			<view class="list-item d-s-c"><span>结束时间</span><span>{{detail.end_time | transformTime}}</span></view>
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
			},
			model: {
				value: String,
				default: ''
			},
			currentnumber: {
				value: String,
				default: ''
			},
			lineList: {
				value: Array,
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
				modelList: {
					'脱毛': 'https://bianm.jinxiongsj.com/file/uploads/20221010/b5e4211be37f8978aff4e1355ba014e4.png',
					'嫩肤': 'https://bianm.jinxiongsj.com/file/uploads/20221010/863ed068b4e9e313d85aef2e6f9d76d5.png',
					'祛斑': 'https://bianm.jinxiongsj.com/file/uploads/20221010/ef72d557e552161ab29d821ca83bba80.png',
					'毛细血管扩张': 'https://bianm.jinxiongsj.com/file/uploads/20221010/44bc9166ed4af0364319e4ad95cb9ae2.png',
				}
			}
		},
		methods: {

		}
	}
</script>


<style lang="scss" scoped>
</style>
