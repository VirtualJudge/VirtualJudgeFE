export default {
  /**
   * @return {null}
   */
  WebSocketFunc(protocol, chat_type, callback) {
    if ("WebSocket" in window) {
      // 打开一个 web socket
      let ws = new WebSocket(protocol + window.location.host + '/api/ws_' + chat_type);

      ws.onmessage = function (evt) {
        let received = JSON.parse(evt.data)
        callback(received.message)

      };
      ws.onclose = function () {
        // 关闭 websocket
      };
      return ws
    } else return null
  }
}
