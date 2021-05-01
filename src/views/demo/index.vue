<template>
  <div class="app-container popver">
    <el-row>
      <el-col>
        <el-popover
          placement="top-start"
          title="标题"
          width="200"
          content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。"
        >
          <el-button slot="reference">hover 激活</el-button>
          <!-- <a slot="reference" href="#">hover 激活</a> -->
        </el-popover>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12">
        <div v-for="i in 1110" :key="`type1-${i}`">
          <a href="#" @click="download(`file1-${i}`)">Link - {{ i }}</a>
        </div>
      </el-col>
      <el-col :span="12">
        <div v-for="i in 4" :key="`type2-${i}`">
          <a href="#" @click="download(`file2-${i}`)">Link - {{ i }}</a>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import Popover from './popver'

export default {
  data() {
    return {
      show: true
    }
  },
  methods: {
    download(fid) {
      // console.debug('Download:', arguments)
      // this.popver(fid)
      Popover.show(`#preview?fid=${fid}`, `#download?fid=${fid}`)
    },
    popver(fid) {
      // console.debug('Popver:', arguments)
      // console.debug(window.event)
      // console.debug(window.event.target)

      // console.debug(window.event.target)
      // const target = window.event.target
      // console.debug(target.style.position)
      // target.style.position = 'relative'

      const event = window.event
      console.debug(event)
      // event.target.addEventListener('mouseenter', function() {
      //   console.debug('mouseenter', arguments)
      // }, false)
      // console.debug(event.target)
      // console.debug(event.target.style.height)
      console.debug('相对于屏幕的位置:', event.screenX, event.screenY)
      console.debug('相对于浏览器窗口的位置:', event.clientX, event.clientY)
      console.debug('相对于浏览器窗口的位置:', event.pageX, event.pageY)
      console.debug('相对于当前所指向对象的位置坐标:', event.offsetX, event.offsetY)

      event.stopPropagation()

      let div = document.getElementById('wps-popver')
      console.debug('div popver....', div)
      if (!div) {
        div = document.createElement('div')
        div.id = 'wps-popver'
        const style = div.style
        style.border = '1px solid #EBEEF5'
        // box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
        style.boxShadow = '0 2px 12px 0 rgb(0 0 0 / 10%)'
        style.padding = '12px'
        // style.width = '150px'
        // style.height = '100px'
        style.position = 'absolute'
        style.backgroundColor = '#fff'
        // style.top = 0
        // style.left = 0
        style.top = `${event.clientY + event.offsetY}px`
        style.left = `${event.clientX}px`

        div.addEventListener('click', e => e.stopPropagation(), false)

        const preview = document.createElement('a')
        preview.href = `#preview?fid=${fid}`
        preview.text = 'Preview'
        // preview.target = ''
        preview.style.marginRight = '10px'
        div.appendChild(preview)
        const download = document.createElement('a')
        download.href = `#download?fid=${fid}`
        download.text = 'Download'
        div.appendChild(download)

        document.body.appendChild(div)
        document.body.addEventListener('click', function() {
          console.debug('body click', arguments)
          div.style.display = 'none'
        }, false)
        // document.getElementById('app').appendChild(div)
      } else {
        const style = div.style
        style.top = `${event.clientY + event.offsetY}px`
        style.left = `${event.clientX}px`
        style.display = 'block'
        // console.debug(div.children)
        // console.debug(div.childNodes)
        div.childNodes.forEach((it, ind) => {
          console.debug(it.href)
          it.href = ind ? `#download?fid=${fid}` : `#preview?fid=${fid}`
        })
      }
    }
  }
}
</script>
<style lang="sass" scoped>
.popver
  a
    margin: 20px 0
    border: 1px solid red
</style>
