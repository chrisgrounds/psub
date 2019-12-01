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

class EventBus {
  constructor() {
    this.subscribers = [];
  }

  post(topic, msg) {
    this.subscribers
      .filter(sub => sub.topic === topic)
      .forEach(sub => sub.callback({ msg })());
  }

  addSubscriber(sub) {
    this.subscribers.push(sub);
  }

  removeSubscribersWithTopic(topic) {
    this.subscribers = this.subscribers.filter(s => s.topic !== topic)
  }
}

class Psub {
  constructor(eventBus) {
    this.eventBus = eventBus;
  }

  get subscriptions() {
    return this.eventBus.subscribers;
  }

  publish(topic, msg, isSync = true) {
    isSync
      ? sync(() => this.eventBus.post(topic, msg))
      : async(() => this.eventBus.post(topic, msg));
  }

  subscribe(topic, handler) {
    this.eventBus.addSubscriber(new Subscriber(topic, handler));
  }

  unsubscribe(topic) {
    this.eventBus.removeSubscribersWithTopic(topic);
  }
}

module.exports = { Psub, EventBus };
