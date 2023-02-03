<template>
	<view class="cardt">
		<view class="list-item">项目名称：{{detail.project || '-'}}</view>
		<view class="list-item">项目部位：{{detail.parts || '-'}}</view>
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
