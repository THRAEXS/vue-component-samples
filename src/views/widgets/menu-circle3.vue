<template>
  <nav class="circle-nav">
    <a href="#" class="center">
      <div class="label">
        <div>天地</div>
        <div>科技</div>
      </div>
    </a>
    <ul>
      <li v-for="icon in icons" :key="icon">
        <a :href="`#${icon}`">
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
      label: '集团科技',
      icons: [
        'example',
        'eye-open',
        'tree',
        'user'
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.circle-nav {
  $sideLen: 150px;
  $subSideLen: $sideLen / 2;
  // $linkColor: rgba(14, 40, 62, 0.5);
  $linkColor: #3e5e75;
  // $linkColorEven: rgba(14, 40, 62, 0.75);
  $linkColorEven: #374e61;
  $linkColorHover: rgba(14, 40, 62, 1);

  width: $sideLen;
  height: $sideLen;
  position: relative;
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-align-items: center;
  align-items: center;
  // border: 1px solid;

  .center {
    // display: none;
    // width: $subSideLen;
    // height: $subSideLen;
    // border: 1px solid red;
    // display: block;
    // width: $subSideLen;
    // height: $subSideLen;
    border-radius: 50%;
    border: 2px solid #ccc;
    background-color: $linkColorHover;
    transition: background-color .5s;
    z-index: 2001;

    &:hover {
      // background-color: #2a4e68;
      background-color: #244257;
      // opacity: 0.75;
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
      // border: 1px solid green;

      div {
        font-size: 1.2em;
        font-weight: bold;
        line-height: 1.3;
        color: #ccc;
        // border: 1px solid;
        // text-align: center;
        // width: 100%;
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
    box-shadow: 0 0 10px #ccc;

    // display: none;
    // border: 1px solid red;
    background-color: rgb(179, 188, 196);

    li {
      // width: $subSideLen;
      // height: $subSideLen;
      position: absolute;
      top: 0;
      left: 0;
      transform-origin: 100% 100%;

      // border: 1px solid blue;

      &:nth-child(even) a {
        background-color: $linkColorEven;
      }

      a {
        // display: block;
        width: $subSideLen;
        height: $subSideLen;
        // border: 1px solid green;
        // text-align: center;s
        background-color: $linkColor;
        transition: opacity .5s;
        display: -webkit-flex;
        display: flex;
        -webkit-justify-content: center;
        justify-content: center;
        -webkit-align-items: center;
        align-items: center;
        border-bottom: 1px solid #ccc;
        border-right: 1px solid #ccc;

        &:hover {
          // background-color: $linkColorHover;
          opacity: 0.8;
          // box-shadow: 0 0 10px #ccc;
        }

        svg {
          font-size: 1.2em;
          color: #ccc;
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
