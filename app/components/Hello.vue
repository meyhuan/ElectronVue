<template>
  <div class="secDiv">
    <button v-on:click="onlick()" v-if="showGetData">GET_DATA</button>
    <div v-for='item of content' :key='item.id'>
      <img :src='item.author.avatar_url' :title='item.author.loginname'>
      <div class='textDiv'>
        <a>{{item.title}}</a>
        <div class="align-right">
          <div class='stuff'>
            <span>回复：{{item.reply_count}}</span>
            <span>创建于：{{dealTime(item.create_at)}}</span>
          </div>
        </div>
      </div>
      
    </div>
  </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      content: [],
      item: {
        create_at: '2017-02-22T11:32:43.547Z'
      },
      limit: 0,
      showGetData: true
    }
  },
  methods: {
    onlick () {
      this.getData()
      window.addEventListener('scroll', this.scrollMethod)
      console.log('limit =' + this.limit)
    },
    getData () {
      this.limit += 10
      console.log('limit =' + this.limit)
      this.$http({
        url: 'https://cnodejs.org/api/v1/topics',
        method: 'get',
        params: {
          page: 1,
          limit: this.limit,
          mdrender: false
        }
      }).then((res) => {
        this.content = res.data.data
        console.log('content =' + this.content)
      }).catch((res) => {
        console.log('getData failed!!' + res)
      })
    },
    dealTime (time) {
      return String(time).match(/.{10}/)[0]
    },
    scrollMethod () {
      const sumH = document.body.scrollHeight
      const viewH = document.documentElement.clientHeight
      const scrollH = document.body.scrollTop
      console.log('scrollH = ' + scrollH)
      if (viewH + scrollH === sumH) {
        this.getData()
      }
    }
  },
  create () {
    this.getData()
  },
  mounted () {
    console.log('mounted ....')
    window.addEventListener('scroll', this.scrollMethod)
  },
  watch: {
    content (val) {
      if (val) {
        this.showGetData = false
      }
    }
  }
}
</script>

<style scoped>
.secDiv {
  width: 100%;
  background: #F9FAFC;
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  font-size: 22px;
  padding: 2rem;
  min-height: 40rem;
}

a {
  text-decoration: none;
}

.secDiv>div {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0.5rem 0;
  border-bottom: 2px solid #C0CCDA;
  padding-bottom: 1rem;
}

.secDiv>div img {
  width: 4rem;
  height: 4rem;
  margin-right: 2rem;
}

.textDiv {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
}

.textDiv a {
  color: black;
  font-size: 25px;
}

.textDiv a:visited {
  color: grey;
}

.align-right {
  text-align: right;    
}

.stuff {
  font-size: 17px;
  margin-top: 1rem;
  color: #8492A6;
}

.stuff span:first-child {
  margin-right: 2rem;
}
</style>