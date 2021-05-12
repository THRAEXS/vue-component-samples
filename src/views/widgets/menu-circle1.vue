<template>
  <nav class="circle-menu">
    <div class="center">
      <a href="#">天地科技</a>
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
      <!-- <li>
        <a href="#" />
      </li>
      <li>
        <a href="#" />
      </li> -->
    </ul>
  </nav>
</template>
<style lang="scss" scoped>
.circle-menu {
  position: relative;
  width: 400px;
  height: 400px;
  margin: 50px auto;
  // background: white;
  box-shadow: 0 0 5px #ccc;

  ul {
    position: absolute;
    width: 300px;
    height: 300px;
    margin: 50px;
    padding: 0;
    list-style: none;
    border-radius: 50%;
    overflow: hidden;
    border: 5px solid #FFF;
  }
  .center {
    position: absolute;
    top: 145px;
    left: 145px;
    z-index: 1000;
    width: 120px;
    height: 120px;
    border: 5px solid #FFF;
    border-radius: 50%;
    box-shadow: 0 0 3px #ccc;
    background-color: #d9c50f;
    cursor: pointer;
    text-align: center;
  }
  .center a {
    // border: 1px solid red;
    // width: 100%;
    font-size: 37px;
  }
  li {
    position: absolute;
    top: -10px;
    left: -10px;
    width: 160px;
    height: 160px;
    overflow: hidden;
    transform-origin: 100% 100%;
    // border: 1px solid red;
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
  // li:nth-child(5) {
  //   transform: rotate(240deg) skew(30deg);
  // }
  // li:nth-child(6) {
  //   transform: rotate(300deg) skew(30deg);
  // }
  li a {
    display: block;
    width: 220px;
    height: 220px;
    // margin-top: 10px;
    // margin-left: 10px;
    background: rgba(241, 196, 15, 0.5) url('http://htmlacademy.ru/assets/icons/monitor-4x.png') no-repeat 50% 40%;
    // transform: skew(-30deg) rotate(-60deg);
    transform: rotate(-45deg);
    // transform: rotate(-60deg) skew(-30deg);
    transition: background-color .5s;
    // border: 1px solid green;
  }
  li:nth-child(even) a {
    background-color: rgba(241, 196, 15, 0.75);
  }
  li a:hover, .center:hover {
    background-color: #f1c40f;
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
  li:nth-child(5) a {
    background-image: url('http://htmlacademy.ru/assets/icons/bluetooth-4x.png');
  }
  li:nth-child(6) a {
    background-image: url('http://htmlacademy.ru/assets/icons/browser-4x.png');
  }
}
</style>
