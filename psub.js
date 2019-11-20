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
  constructor() {
    this.subscribers = [];
  }

  get subscriptions() {
    return this.subscribers;
  }

  _publish(topic, msg) {
    this.subscribers
      .filter(sub => sub.topic === topic)
      .forEach(sub => sub.callback({ msg })());
  }

  publish(topic, msg, isSync = true) {
    isSync
      ? sync(() => this._publish(topic, msg))
      : async(() => this._publish(topic, msg));
  }

  subscribe(topic, handler) {
    this.subscribers.push(new Subscriber(topic, handler));
  }

  unsubscribe(topic) {
    this.subscribers = this.subscribers.filter(sub => sub.topic !== topic);
  }
}

module.exports = { Psub };
