const rooms = [
  {
    id: 'location-0',
    name: '主楼',
    remark: '260备有双投影、双幕布，分屏投影，请自带2台笔记本电脑',
    children: [
      { id: 'room-0', name: '第四会议室(234)' },
      { id: 'room-1', name: '第五会议室(222、555)' },
      { id: 'room-2', name: '第九会议室(678)' },
      { id: 'room-3', name: '137圆桌会议室(137)' },
      { id: 'room-4', name: '139视频会议室(139)' },
      { id: 'room-5', name: '260阶梯会议室(260-261)' }
    ]
  },
  {
    id: 'location-1',
    name: '科技会议中心',
    remark: '第一、第三、第六备有双投影、双幕布，分屏投影，请自带2台笔记本电脑',
    children: [
      { id: 'room-6', name: '第一会议室' },
      { id: 'room-7', name: '第二会议室' },
      { id: 'room-8', name: '第三会议室' },
      { id: 'room-9', name: '第六会议室' }
    ]
  },
  {
    id: 'location-2',
    name: '数据中心',
    children: [
      { id: 'room-10', name: '第二会议室(917-919)' },
      { id: 'room-11', name: '第三会议室(921-923)' },
      { id: 'room-12', name: '第四会议室(999-999)' },
      { id: 'room-13', name: '第五会议室(999-999)' },
      { id: 'room-14', name: '第六会议室(999-999)' }
    ]
  }
]

module.exports = [
  {
    url: '/api/thraex/server/time',
    type: 'get',
    response: _ => ({ code: 20000, data: Date.now() })
  },
  {
    url: '/api/thraex/boardrooms',
    type: 'get',
    response: _ => ({ code: 20000, data: rooms })
  }
]
