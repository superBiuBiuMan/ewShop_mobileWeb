<template>
  <div class="good-list-item">
    <div class="list-pic">
      <img v-lazy="itemData.cover_url" />
    </div>
    <div class="good-info">
      <!-- 书名 -->
      <p class="good-title">{{itemData.title}}</p>
      <p>
          <!-- 价格 -->
          <span class="good-price"><small>¥</small>{{itemData.price}}</span>
          <!-- 书库存 -->
          <span class="good-collect">{{itemData.stock}}</span>
        </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodListItem",
  props:{
    itemData:{
      type:Object,
      default(){
        return {};
      }
    }
  }
};
</script>

<style lang="less" scoped>
.good-list-item{
    width: 46%;
    font-size: 13px;
    text-align: center;
    border-radius: 6px;
    background-color: var(--color-background);
    position: relative;
    z-index: 4;
    .list-pic{
        img{
            width: 100%;
        }
    }
    .good-info{
        display: flex;
        //居中
        flex-direction: column;
        align-items: center;
        &>p{
            width: 100%;
        }
        .good-price{
            color: red;
        }
        // 书名
        .good-title{
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        //库存
        .good-collect{
            margin-left: 5px;
            &::before{
                content: '☆';
            }
        }
    }
}
</style>
