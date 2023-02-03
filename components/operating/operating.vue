<template>
	<view class="m-0-24 mb88">
		<u-scroll-list :indicator="false">
			<view class="bg-FFFFFF borderRadius mr30 hidden" :style="'min-width:'+itemW+'rpx'">
				<view class="d-c hh100 bglg1">
					<view class="f36 co-333333 ml30">
						仪器运营
					</view>
					<u-icon name="arrow-right" color="#333333" size="18"></u-icon>
					<image class="img1"
						src="https://bianm.jinxiongsj.com/file/uploads/20221009/96a1df663f39863f76f5d002bd8200ab.png"
						mode=""></image>
				</view>
				<view class="p30 d-s-c bb-F8F8F8" v-for="(item, index) in operatList" :key="index">
					<view class="">
						<view class="co-333333 f28">
							{{item.title}}
						</view>
						<view class="d-s-c">
							<view class="d-b">
								<u-icon name="clock" color="#333333" size="12"></u-icon>
								<view class="co-666666 f26">
									{{item.time}}
								</view>
							</view>
							<view class="f26 co-999999">
								{{item.date}}
							</view>
						</view>
					</view>
					<view class="">
						<image class='borderRadius ml30' style="width: 235rpx;height: 157rpx;" :src='item.src' alt="">
						</image>
					</view>
				</view>
			</view>

			<view class="bg-FFFFFF borderRadius hidden" :style="'min-width:'+itemW+'rpx'">
				<view class="d-c hh100 bglg2">
					<view class="f36 co-333333 ml30">
						仪器使用
					</view>
					<u-icon name="arrow-right" color="#333333" size="18"></u-icon>
					<image class="img1"
						src="https://bianm.jinxiongsj.com/file/uploads/20221009/fccf2903b54fc1c3b5a3a6893fd2f78a.png"
						mode=""></image>
				</view>
				<view class="p30 d-s-c bb-F8F8F8" v-for="(item, index) in operatList" :key="index">
					<view class="">
						<view class="co-333333 f28">
							{{item.title}}
						</view>
						<view class="d-s-c">
							<view class="d-b">
								<u-icon name="clock" color="#333333" size="12"></u-icon>
								<view class="co-666666 f26">
									{{item.time}}
								</view>
							</view>
							<view class="f26 co-999999">
								{{item.date}}
							</view>
						</view>
					</view>
					<view class="">
						<image class='borderRadius ml30' style="width: 235rpx;height: 157rpx;" :src='item.src' alt="">
						</image>
					</view>
				</view>
			</view>
		</u-scroll-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				itemW: 600 * uni.getSystemInfoSync().windowWidth / 375,
				operatList: [{
					title: '热芙美使用教程热芙美芙美使用教程',
					time: '3小时',
					date: '2022-03-04',
					src: 'https://bianm.jinxiongsj.com/file/uploads/20221008/c3d14b39530e54ea73f7ebc5df348538.jpg'
				}, {
					title: '热芙美使用教程热芙美芙美使用教程',
					time: '3小时',
					date: '2022-03-04',
					src: 'https://bianm.jinxiongsj.com/file/uploads/20221008/c3d14b39530e54ea73f7ebc5df348538.jpg'
				}, {
					title: '热芙美使用教程热芙美芙美使用教程',
					time: '3小时',
					date: '2022-03-04',
					src: 'https://bianm.jinxiongsj.com/file/uploads/20221008/c3d14b39530e54ea73f7ebc5df348538.jpg'
				}]
			}
		}
	}
</script>



<style lang="scss" scoped>
	.img1 {
		width: 66rpx;
		height: 66rpx;
		margin-left: auto;
		margin-right: 90rpx;
		z-index: 1;
	}
</style>
