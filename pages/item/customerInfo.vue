<template>
	<view class="cardt">
		<view class="list-item">姓名：{{detail.customer_name || '-'}}</view>
		<view class="list-item">联系方式：{{detail.contact || '-'}}</view>
		<view class="list-item">性别：{{detail.gender || '-'}}</view>
		<view class="list-item">症状和问题：<span class="tj"></span>{{detail.symptoms || '-'}}</view>
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
		methods: {}
	}
</script>


<style lang="scss" scoped>
</style>
