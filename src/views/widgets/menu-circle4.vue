<template>
  <nav class="circle-nav">
    <a href="javascript: void(0);" class="center" @click="events[0]()">
      <div class="label">
        <div v-for="it in label" :key="it">{{ it }}</div>
      </div>
    </a>
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
        'example',
        'eye-open',
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
  $subSideLen: $sideLen / 2 - 2;
  $linkColor: #3e5e75;
  $linkColorEven: #374e61;
  $linkColorCenter: rgba(14, 40, 62, 1);
  $linkColorCenterHover: #2d5069;
  $fontSizeCenter: 0.8em;
  $fontSizeLink: 0.7em;

  width: $sideLen;
  height: $sideLen;
  position: relative;
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-align-items: center;
  align-items: center;

  .center {
    border-radius: 50%;
    border: 2px solid #fff;
    background-color: $linkColorCenter;
    transition: background-color .5s;
    z-index: 2001;

    &:hover {
      background-color: $linkColorCenterHover;
    }

    .label {
      width: $subSideLen;
      height: $subSideLen;
      display: -webkit-flex;
      display: flex;
      -webkit-flex-direction: column;
      flex-direction: column;
      -webkit-justify-content: center;
      justify-content: center;
      -webkit-align-items: center;
      align-items: center;
      border-radius: 50%;

      div {
        font-size: $fontSizeCenter;
        font-weight: bold;
        line-height: 1.2;
        color: #fff;
      }
    }
  }

  ul {
    width: $sideLen;
    height: $sideLen;
    position: absolute;
    list-style: none;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid #fff;
    background-color: rgb(179, 188, 196);

    li {
      position: absolute;
      top: 0;
      left: 0;
      transform-origin: 100% 100%;

      &:nth-child(even) a {
        background-color: $linkColorEven;
      }

      a {
        width: $subSideLen;
        height: $subSideLen;
        background-color: $linkColor;
        transition: opacity .5s;
        display: -webkit-flex;
        display: flex;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-align-items: center;
        align-items: center;
        border-right: 1px solid #ccc;

        &:hover {
          opacity: 0.8;
        }

        svg {
          font-size: $fontSizeLink;
          color: #fff;
        }
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
