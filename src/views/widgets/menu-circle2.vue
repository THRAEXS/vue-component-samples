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
  position: relative;
  width: 400px;
  height: 400px;
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
    width: 200px;
    height: 200px;
    z-index: 1000;
    border: 8px solid #fff;
    // background-color: #d9c50f;
    border-radius: 50%;
    // display: none;

    a {
      display: block;
      // border: 1px solid;
      width: 184px;
      height: 184px;
      border-radius: 50%;
      background-color: #d9c50f;
      transition: background-color .5s;
    }
    a:hover {
        background-color: #f1c40f;
      }
  }

  ul {
    position: absolute;
    width: 400px;
    height: 400px;
    list-style: none;
    overflow: hidden;
    // border: 1px solid blue;
    border-radius: 50%;

    li:nth-child(even) a {
      background-color: rgba(241, 196, 15, 0.75);
    }

    li {
      position: absolute;
      top: 0;
      left: 0;
      width: 200px;
      height: 200px;
      overflow: hidden;
      transform-origin: 100% 100%;

      // border: 1px solid;

      a {
        display: block;
        width: 282.2px;
        height: 282.2px;
        background: rgba(241, 196, 15, 0.5) url('http://htmlacademy.ru/assets/icons/monitor-4x.png') no-repeat 50% 25%;
        transform: rotate(-45deg);
        transition: background-color .5s;
      }

      a:hover {
        background-color: #f1c40f;
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
