export default {
  WebSocketTest(protocol, chat_type, number, index, callback) {
    if ("WebSocket" in window) {
      // 打开一个 web socket
      let ws = new WebSocket(protocol + window.location.host + '/api/ws/' + chat_type + '/' + number);

      ws.onmessage = function (evt) {
        console.log(evt.data)
        let received = JSON.parse(evt.data)
        callback(index, received.message)
        if (received.message.verdict !== 'Running' && received.message.verdict !== 'Pending') {
          ws.close()
        }

      };
      ws.onclose = function () {
        // 关闭 websocket
        console.log(number + ' close')
      };
    } else {
      // 浏览器不支持 WebSocket
    }
  }
}
