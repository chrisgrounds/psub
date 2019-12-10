const { async, sync } = require("./async");

class Subscriber {
  constructor(topic, f) {
    this._topic = topic;
    this._f = f;
  }

  get topic() {
    return this._topic;
  }

  callback(data) {
    return () => this._f({ topic: this.topic, ...data });
  }
}

class Psub {
  constructor(eventBus) {
    this.subscribers = [];
    this.eventBus = eventBus;
    if (typeof eventBus.push === "undefined") {
      throw new Error("Psub constructor parameter does not implement push method");
    }
  }

  get subscriptions() {
    return this.eventBus.subscribers;
  }
  
  _publish(topic, msg) {
    this.subscribers
      .filter(sub => sub.topic === topic)
      .map(sub => this.eventBus.push({ msg, callback: sub.callback }));
  }

  publish(topic, msg) {
    async(() => this._publish(topic, msg));
  }
  
  publishSync(topic, msg) {
    sync(() => this._publish(topic, msg));
  }
  
  _call(topic, msg) {
    this.subscribers
      .filter(sub => sub.topic === topic)
      .forEach(sub => sub.callback({ msg })());
  }
  
  call(topic, msg) {
    async(() => this._call(topic, msg));
  }
  
  callSync(topic, msg) {
    sync(() => this._call(topic, msg));
  }

  subscribe(topic, handler) {
    this.subscribers.push(new Subscriber(topic, handler));
  }

  // TODO: Add ability to unsubscribe specific subscriber
  unsubscribe(topic) {
    this.subscribers = this.subscribers.filter(s => s.topic !== topic)
  }
}

module.exports = { Psub };
