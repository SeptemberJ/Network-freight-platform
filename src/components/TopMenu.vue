<template>
  <div class="MenuWrap">
    <div class="TopMenu">
      <div class="InnerBlock">
        <div class="Logo">LOGO</div>
        <div class="MenuBlock">
          <div class="Menus">
            <span>栏目名称1</span>
            <span>栏目名称2</span>
            <span>栏目名称3</span>
            <span>栏目名称4</span>
            <span>栏目名称5</span>
            <span>关于我们</span>
            <span>客户服务</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopMenu',
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@MenuHeight: 52px;
@Blue: #0066CC;
.MenuWrap{
  width: 100%;
  height: @MenuHeight + 6px;
  background: #fff;
  .TopMenu{
    width: 100%;
    height: @MenuHeight;
    float: left;
    background: #fff;
    margin-top: 3px;
    .InnerBlock{
      width: calc(100% - 208px);
      height: 100%;
      margin: 0 auto;
      .Logo{
        width: 227px;
        height: @MenuHeight - 6px;
        float: left;
        text-align: center;
        line-height: @MenuHeight - 6px;
        background:rgba(242, 242, 242, 1);
        border-radius: 5px; /*no*/
      }
      .MenuBlock{
        height: @MenuHeight - 6px;
        .Menus{
          float: right;
          height: 100%;
          line-height: @MenuHeight;
          font-size: 10px; /*no*/
          color: @Blue;
          span{
            // width: 84px;
            padding: 0 15px;
            height: 30px;
            line-height: 30px;
            margin-top: @MenuHeight - 6px - 30px;
            float: left;
            &:nth-last-of-type(2) {
              &::before {
                content:"|";
                padding-right: 20px; /*no*/
                color: @Blue;
              }
            }
            &:nth-last-of-type(1) {
              background: @Blue;
              color: #fff;
            }
          }
        }
      }
    }
  }
}
</style>
