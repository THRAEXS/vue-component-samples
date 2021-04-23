<template>
  <nav class="circle-menu">
    <div class="center">
      <a href="#" />
    </div>
    <ul>
      <li>
        <a href="#" />
      </li>
      <li>
        <a href="#" />
      </li>
      <li>
        <a href="#" />
      </li>
      <li>
        <a href="#" />
      </li>
    </ul>
  </nav>
</template>
<style lang="scss" scoped>
.circle-menu {
  $sideLen: 300px;
  $subSideLen: $sideLen / 2;
  $linkLiaLen: $subSideLen*1.414;
  $linkColor: rgba(14, 40, 62, 0.5);
  // $linkColor: rgb(14, 40, 62);
  $linkColorEven: rgba(14, 40, 62, 0.75);
  // $linkColorEven: rgb(80, 112, 137);
  $linkColorHover: rgba(14, 40, 62, 1);
  // $linkColorHover: rgb(160, 185, 208);

  position: relative;
  width: $sideLen;
  height: $sideLen;
  // border-radius: 50%;
  // border: 1px solid red;
  // box-shadow: 0 0 10px #ccc;
  display: -webkit-flex;
  display: flex;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-align-items: center;
  align-items: center;

  .center {
    $border: 2px;
    $linkSideLen: $subSideLen - $border * 2;

    width: $subSideLen;
    height: $subSideLen;
    z-index: 1000;
    border: $border solid #fff;
    // background-color: #d9c50f;
    border-radius: 50%;
    // display: none;

    a {
      display: block;
      // border: 1px solid;
      width: $linkSideLen;
      height: $linkSideLen;
      border-radius: 50%;
      // background-color: #d9c50f;
      // background-color: rgba(53, 143, 200, 1);
      background-color: rgb(14, 40, 62);
      // background: linear-gradient(to right, rgba(53, 143, 243, 1), rgb(63, 91, 122));
      transition: background-color .5s;
    }
    a:hover {
      background-color: $linkColorHover;
      box-shadow: 0 0 20px rgb(33, 82, 128);
    }
  }

  ul {
    position: absolute;
    width: $sideLen;
    height: $sideLen;
    list-style: none;
    overflow: hidden;
    // border: 1px solid blue;
    border-radius: 50%;
    box-shadow: 0 0 15px #ccc;
    background-color: rgb(179, 188, 196);

    li:nth-child(even) a {
      background-color: $linkColorEven;
    }

    li {
      position: absolute;
      top: 0;
      left: 0;
      width: $subSideLen;
      height: $subSideLen;
      overflow: hidden;
      transform-origin: 100% 100%;

      border-bottom: 2px solid #fff;

      a {
        display: block;
        width: $linkLiaLen;
        height: $linkLiaLen;
        background: $linkColor url('http://htmlacademy.ru/assets/icons/monitor-4x.png') no-repeat 50% 25%;
        // background: linear-gradient(90deg, rgb(160, 185, 208), rgb(14, 40, 62), rgb(160, 185, 208));
        // background: linear-gradient(90deg, rgb(160, 185, 208), 20%, rgb(14, 40, 62), 80%, rgb(160, 185, 208));
        transform: rotate(-45deg);
        transition: background-image .5s;
      }

      a:hover {
        background-color: $linkColorHover;
        // box-shadow: 0 0 10px #ccc;
      }
    }

    li:nth-child(1) {
      transform: rotate(45deg);
    }
    li:nth-child(2) {
      transform: rotate(135deg);
    }
    li:nth-child(3) {
      transform: rotate(225deg);
    }
    li:nth-child(4) {
      transform: rotate(-45deg);
    }

    li:nth-child(2) a {
      background-image: url('http://htmlacademy.ru/assets/icons/aperture-4x.png');
    }
    li:nth-child(3) a {
      background-image: url('http://htmlacademy.ru/assets/icons/audio-4x.png');
    }
    li:nth-child(4) a {
      background-image: url('http://htmlacademy.ru/assets/icons/battery-empty-4x.png');
    }
  }
}
</style>
