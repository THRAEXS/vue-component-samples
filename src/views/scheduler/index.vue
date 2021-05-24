<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :span="20">
        <scheduler class="left-container" :events="events" @event-updated="logEventUpdate" />
      </el-col>
      <el-col :span="4">
        <ul class="scheduler-messages">
          <li
            v-for="message in messages"
            :key="message"
            class="scheduler-message"
          >{{ message }}</li>
        </ul>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  components: {
    Scheduler: () => import('./scheduler')
  },
  data() {
    return {
      events: [
        { id: 1, start_date: '2020-01-20 6:00', end_date: '2020-01-20 15:00', text: 'Event 1' },
        { id: 2, start_date: '2020-01-23 6:00', end_date: '2020-01-23 20:00', text: 'Event 2' }
      ],
      messages: []
    }
  },
  methods: {
    addMessage(message) {
      this.messages.unshift(message)
      if (this.messages.length > 40) {
        this.messages.pop()
      }
    },
    logEventUpdate(id, mode, ev) {
      const text = (ev && ev.text ? ` (${ev.text})` : '')
      const message = `Event ${mode}: ${id} ${text}`
      this.addMessage(message)
    }
  }
}
</script>
<style>
  html, body {
    height: 100%;
    margin: 0;
    padding: 0;
  }
  .container {
    height: 100%;
    width: 100%;
  }
  .left-container {
    overflow: hidden;
    position: relative;
    height: 100vh;
    display: inline-block;
    /* width: 72vw; */
    width: 100%;
  }
  .right-container {
    border-right: 1px solid #cecece;
    float: right;
    height: 100%;
    width: 340px;
    box-shadow: 0 0 5px 2px #aaa;
    position: relative;
    z-index:2;
  }
.scheduler-messages {
    list-style-type: none;
    height: 50%;
    margin: 0;
    overflow-x: hidden;
    overflow-y: auto;
    padding-left: 5px;
  }
  .scheduler-messages > .scheduler-message {
    background-color: #f4f4f4;
    box-shadow:inset 5px 0 #d69000;
    font-family: Geneva, Arial, Helvetica, sans-serif;
    font-size: 14px;
    margin: 5px 0;
    padding: 8px 0 8px 10px;
  }
</style>
