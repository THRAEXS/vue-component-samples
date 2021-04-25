<template>
  <nav class="circle-nav">
    <div class="center">
      <a href="javascript: void(0);" @click="events[0]()">
        <div v-for="it in label" :key="it">{{ it }}</div>
      </a>
    </div>
    <ul>
      <li v-for="(icon, ind) in icons" :key="icon">
        <a href="javascript: void(0);" @click="events[ind + 1]()">
          <svg-icon :icon-class="icon" />
        </a>
      </li>
    </ul>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      label: ['集团', '科技'],
      icons: [
        // 'example',
        // 'eye-open',
        'tree',
        'tree',
        'tree',
        'user'
      ],
      events: [
        () => console.debug('do something...'),
        () => console.debug('do something...'),
        () => console.debug('do something...'),
        () => console.debug('do something...'),
        () => console.debug('do something...')
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.circle-nav {
  $sideLen: 110px;
  $subSideLen: $sideLen / 2;
  $linkColor: #3e5e75;
  $linkColorEven: #374e61;
  $linkColorCenter: rgba(14, 40, 62, 1);
  $linkColorCenterHover: #2d5069;
  $fontSizeCenter: 0.8em;
  $fontSizeLink: 0.8em;

  position: relative;
  width: $sideLen;
  height: $sideLen;
  // border: 1px solid;
  // border-radius: 50%;

  .center {
    // display: none;

    position: absolute;
    left: $subSideLen / 2;
    top: $subSideLen / 2;
    width: $subSideLen;
    height: $subSideLen;
    border: 2px solid #fff;
    z-index: 2001;
    border-radius: 50%;
    overflow: hidden;

    a {
      display: block;
      color: #fff;
      text-align: center;
      // border: 1px solid red;
      width: $subSideLen - 2*2;
      height: $subSideLen - 2*2;
      background-color: $linkColorCenter;
      transition: background-color .5s;
      // padding: (($subSideLen - ($fontSizeCenter * 1.8)) / 2) 0;
      // padding-top: 8px;
      padding-top: 0.5em;

      &:hover {
        background-color: $linkColorCenterHover;
      }

      div {
        font-weight: bold;
        // border: 1px solid;
        font-size: $fontSizeCenter;
        // line-height: $subSideLen / 2;
        // line-height: $fontSizeCenter * 1.8;
      }
    }
  }

  ul {
    // display: none;
    position: absolute;
    margin: 0;
    padding: 0;
    width: $sideLen;
    height: $sideLen;
    list-style: none;
    // border: 2px solid red;
    border-radius: 50%;
    overflow: hidden;
    background-color: rgb(179, 188, 196);

    li {
      position: absolute;
      top: 0;
      left: 0;
      width: $subSideLen;
      height: $subSideLen;
      overflow: hidden;
      transform-origin: 100% 100%;
      // border: 1px solid blue;

      a {
        display: block;
        width: $subSideLen;
        height: $subSideLen;
        background-color: $linkColor;
        text-align: center;
        line-height: $subSideLen;
        // border: 1px solid #fff;
        transition: opacity .5s;

        &:hover {
          opacity: 0.8;
        }

        svg {
          font-size: $fontSizeLink;
          color: #fff;
          // border: 1px solid red;
        }
      }

      &:nth-child(even) a {
        background-color: $linkColorEven;
      }

      &:nth-child(1) {
        transform: rotate(45deg);
        a svg {
          transform: rotate(-45deg);
        }
      }
      &:nth-child(2) {
        transform: rotate(135deg);
        a svg {
          transform: rotate(-135deg);
        }
      }
      &:nth-child(3) {
        transform: rotate(225deg);
        a svg {
          transform: rotate(-225deg);
        }
      }
      &:nth-child(4) {
        transform: rotate(-45deg);
        a svg {
          transform: rotate(45deg);
        }
      }
    }
  }
}
</style>
