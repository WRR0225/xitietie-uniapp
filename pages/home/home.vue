<template>
	<view class="background">
		<view class="content-box">
			<view class="search-bar">
				<uni-search-bar class="uni-search-bar" @confirm="search" @input="input" :radius="8"></uni-search-bar>
			</view>
			<view class="option">
				<view class="current">
					<view class="text">
						全部
					</view>
				</view>
				<view class="filter">
					<view class="text">
						筛选
					</view>
					<img class="icon" src="../../static/Funnel.png"
				</view>
			</view>
			<scroll-view class="scroll-view" scroll-y="true">
				<view class="tietie-card-box">
					<view class="tietie-card">
						<view class="up">
							<img src="../../static/杭州.png" class="image" />
						</view>
						<view class="down">
							<view class="text">
								杭州
							</view>
						</view>
					</view>
					<view class="tietie-card">
						<view class="up">
							<img src="../../static/广州.png" class="image" />
						</view>
						<view class="down">
							<view class="text">
								广州
							</view>
						</view>
					</view>
					<view class="tietie-card">
						<view class="up">
							<img src="../../static/六盘水.png" class="image" />
						</view>
						<view class="down">
							<view class="text">
								六盘水
							</view>
						</view>
					</view>
					<view class="tietie-card">
						<view class="up">
							<img src="../../static/上海1.png" class="image" />
						</view>
						<view class="down">
							<view class="text">
								上海#1
							</view>
						</view>
					</view>
					<view class="tietie-card">
						<view class="up">
							<img src="../../static/上海1.png" class="image" />
						</view>
						<view class="down">
							<view class="text">
								上海#1
							</view>
						</view>
					</view>
					<view class="tietie-card">
						<view class="up">
							<img src="../../static/上海1.png" class="image" />
						</view>
						<view class="down">
							<view class="text">
								上海#1
							</view>
						</view>
					</view>
					<view class="tietie-card">
						<view class="up">
							<img src="../../static/上海1.png" class="image" />
						</view>
						<view class="down">
							<view class="text">
								上海#1
							</view>
						</view>
					</view>
					<view class="tietie-card">
						<view class="up">
							<img src="../../static/上海1.png" class="image" />
						</view>
						<view class="down">
							<view class="text">
								上海#1
							</view>
						</view>
					</view>
					<view class="tietie-card">
						<view class="up">
							<img src="../../static/上海1.png" class="image" />
						</view>
						<view class="down">
							<view class="text">
								上海#1
							</view>
						</view>
					</view>
					<view class="tietie-card">
						<view class="up">
							<img src="../../static/上海1.png" class="image" />
						</view>
						<view class="down">
							<view class="text">
								上海#1
							</view>
						</view>
					</view>
					<view class="spacer"></view>
				</view>

			</scroll-view>

		</view>
	</view>

</template>

<script setup>

</script>

<style lang="scss">
	.background {
		background-color: white;
		height: 100vh;
		width: 100%;
		display: flex;
		justify-content: center;

		.content-box {
			width: 90%;

			.search-bar {
				// background-color: aquamarine;
				display: flex;
				justify-content: center;
				//吸顶
				position: fixed;
				top: 0;
				width: 90%;
				background-color: white;
				z-index: 1;

				.uni-search-bar {
					flex: 1;
				}
			}

			.option {
				display: flex;
				justify-content: space-between;
				align-items: center;
				height: 54px;
				// 吸顶
				position: fixed;
				top: 54px;
				width: 90%;
				background-color: white;
				z-index: 1;

				.current {
					display: flex;
					justify-content: center;
					align-items: center;
					margin-left: 10px;
					height: 30px;
					width: 55px;
					border: 1px solid #e5e5e5;
					border-radius: 15px;

				}

				.filter {
					margin-right: 10px;
					padding-left: 10px;
					border-left: 1px solid #e5e5e5;
					display: flex;
					justify-content: center;
					align-items: center;

					.text {
						margin-right: 8px;
					}

					.icon {
						width: 18px;
						height: 18px;
					}
				}
			}

			.scroll-view {
				margin-top: 118px;
				height: calc(100vh - 118px);
				overflow-y: scroll;

				::-webkit-scrollbar {
					display: none;
				}

				.tietie-card-box {
					// background-color: aquamarine;
					height: 100vh;
					display: flex;
					flex-wrap: wrap;
					justify-content: space-between;
					align-content: flex-start;
					padding: 0 10px;

					.tietie-card {
						width: 152px;
						display: flex;
						flex-direction: column;
						margin-bottom: 20px;
						border-radius: 15px;
						box-shadow: 2px 4px 8px rgba(0, 0, 0, 0.2);

						.up {
							width: 152px;
							height: 152px;
							background-color: #f4f4f4;
							border-top-left-radius: 15px;
							border-top-right-radius: 15px;
							display: flex;
							justify-content: center;
							align-items: center;
							// box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

							.image {
								max-width: 80%;
								max-height: 80%;
							}
						}

						.down {
							width: 152px;
							height: 45px;
							background-color: #dedede;
							border-bottom-right-radius: 15px;
							border-bottom-left-radius: 15px;
							display: flex;
							justify-content: space-between;
							align-items: center;
							// box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

							.text {
								margin-left: 16px;
							}
						}
					}

					.spacer {
						width: 100%;
						height: 50px;
						/* 你想保留的空间高度 */
					}
				}
			}
		}
	}
</style>