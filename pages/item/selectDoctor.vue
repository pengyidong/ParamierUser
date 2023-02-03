<template>
	<view>
		<u-popup :show="show" @close="close" @open="open" :duration='500' round='15'>
			<scroll-view scroll-y class="pt30 bg-F8F8F8" :style="'max-height: '+ maxHeight +'px;'">
				<view class="card d-c" v-for="(item, index) in list" :key="index" @click="select(item)">
					<u-avatar :src="item.picture[0].url" size='60'></u-avatar>
					<view class="ml30 d-f-a flex-1">
						<view class="d-c">
							<view class="mr30 co-333333 f30">
								{{item.doctor_name}}
							</view>
							<view class="mainBtn">
								{{item.doctor_title}}
							</view>
						</view>
						<view class="f26">
							编号：{{item.doctor_id}}
						</view>
					</view>
					<u-icon name="arrow-right" color="#333333" size="16"></u-icon>
				</view>
			</scroll-view>
		</u-popup>
	</view>
</template>

<script>
	import {
		getDoctorList
	} from '@/common/api.js'
	export default {
		props: {
			show: {
				value: Boolean,
				default: false,
			}
		},
		data() {
			return {
				list: [],
				maxHeight: uni.getSystemInfoSync().windowHeight * 0.75
			}
		},
		created() {
			this.getData()
		},
		watch:{
			show(val){
			}
		},
		methods: {
			open() {
				// console.log('open');
			},
			close() {
				this.$emit('close', false)
			},
			select(item) {
				this.$emit('select', item)
				this.close()
			},
			async getData() {
				let obj = {
					limit: 100,
					filter: {
						rel: "and",
						cond: [{
							field: "agency_name",
							method: "eq",
							value: '变美日记广州体验中心'
						}, ]
					}
				}
				const res = await getDoctorList(obj)
				if (res.statusCode === 200) {
					this.list = res.data.data
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
