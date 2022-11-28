class Events {
  /** 事件对象 */

  eventObj: { [name: string]: any } = {}

  //   constructor() {}

  /**
   * 发布
   * @param topic 要发布的主题
   * @param arg 作为事件发送的数据
   */
  publish(topic: string, ...args: any[]): void {
    // if (this.eventObj.hasOwnProperty(topic)) {
    if (Object.prototype.hasOwnProperty.call(this.eventObj, topic)) {
      const fn = this.eventObj[topic]
      fn.forEach((fn: any) => {
        fn.apply(this, args)
      })
    }
  }

  /**
   * 订阅
   * @param topic 要订阅的主题
   * @param handlers 事件处理函数
   */
  subscribe(topic: string, ...handlers: Function[]): void {
    if (!Object.prototype.hasOwnProperty.call(this.eventObj, topic)) {
      this.eventObj[topic] = []
    }
    this.eventObj[topic].push(...handlers)
  }

  /**
   * 取消订阅
   * @param topic 订阅的主题
   * @param handler 要取消的事件处理函数
   */
  unsubscribe(topic: string, handler?: Function): boolean {
    if (!Object.prototype.hasOwnProperty.call(this.eventObj, topic)) {
      return false
    }
    if (handler !== undefined) {
      // 如果处理函数存在，则从主题处理数组中删除它
      this.eventObj[topic] = this.eventObj[topic].filter((x: any) => x !== handler)
      return true
    } else {
      // 否则直接删除该主题
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      return delete this.eventObj[topic]
    }
  }
}

export default Events

const events = new Events()

export { events }
