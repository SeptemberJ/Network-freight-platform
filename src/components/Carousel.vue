<template>
  <div class="CarouselBlock">
    <el-carousel trigger="click" :autoplay="false">
      <el-carousel-item v-for="(item, idx) in img" :key="idx">
        <el-card :body-style="{ padding: '0px' }">
          <img :src="item.src" class="BannerImg">
          <div class="TipsBlock">
            <span class="TipsZ">&nbsp;</span>
            <span class="TipsItem"><span style="float:left;">{{item.txt}}</span> <span style="float:right;">查看更多 ></span></span>
          </div>
        </el-card>
      </el-carousel-item>
      <div class="RightCodeBlockZ"></div>
      <div class="RightCodeBlock"></div>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: 'Carousel',
  data () {
    return {
      img: [
        {src: '../../static/images/banner_1.jpg', txt: '[ 2020-01-20 ]    关于2020年春节假期平台放假通知'},
        {src: '../../static/images/banner_1.jpg', txt: '[ 2020-01-20 ]    关于2020年春节假期平台放假通知'},
        {src: '../../static/images/banner_1.jpg', txt: '[ 2020-01-20 ]    关于2020年春节假期平台放假通知'}
      ],
      img2: [
        {src: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg', txt: '麋鹿'},
        {src: 'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg', txt: '马'},
        {src: 'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg', txt: '老虎'},
        {src: 'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg', txt: '麋鹿'},
        {src: 'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg', txt: '狼'},
        {src: 'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg', txt: '狐狸'}
      ]
    }
  }
}
</script>

<style scoped lang="less">
.BannerImg{
  width: 100%;
  height: auto;
}
.TipsBlock{
  width: 100%;
  height: 32px;
  position: absolute;
  bottom: 0;
  left: 0;
  .TipsZ{
    width: 100%;
    height: 32px;
    padding: 0 160px;
    background: #000;
    float: left;
    position: absolute;
    bottom: 0;
    left: 0;
    opacity: .5;
  }
  .TipsItem{
    width: 100%;
    height: 32px;
    line-height: 32px;
    padding: 0 102px;
    float: left;
    position: absolute;
    bottom: 0;
    left: 0;
    font-size: 10px;
    color: #fff;
  }
}
.RightCodeBlockZ{
  width: 80px;
  height: 234px;
  float: right;
  background: #fff;
  position: relative;
  right: 34px;
  top: 52px;
  z-index: 9;
  opacity: .5;
}
.RightCodeBlock{
  width: 80px;
  height: 234px;
  float: right;
  background: #fff;
  position: absolute;
  right: 34px;
  top: 52px;
  z-index: 9;
}
</style>
