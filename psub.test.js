const assert = require('assert');
const sinon = require('sinon');

const { Psub } = require("./psub");

describe('Psub', function() {
  describe('publish sync', function() {
    it('calls subscriber for topic', function() {
      const psub = new Psub();
      const topic = "news";
      const msg = "Atlantis found!"
      const handler = sinon.spy();

      psub.subscribe(topic, handler);
      psub.publish(topic, msg);

      sinon.assert.calledOnce(handler);
      sinon.assert.calledWith(handler, { topic: 'news', msg: 'Atlantis found!' });
    });

    it('calls subscriber for topic, multiple times', function() {
      const psub = new Psub();
      const topic = "news";
      const msg = "Atlantis found!"
      const handler = sinon.spy();

      psub.subscribe(topic, handler);
      psub.publish(topic, msg);
      psub.publish(topic, msg);
      psub.publish(topic, msg);

      sinon.assert.calledThrice(handler);
    });
  });

  describe('subscribe', function() {
    it('can subscribe to a topic', function() {
      const psub = new Psub();
      const topic = "news";
      const handler = () => {};

      psub.subscribe(topic, handler);

      const res = psub.subscriptions.map(s => s.topic);
      const expectedRes = [ "news" ];

      assert.deepEqual(res, expectedRes);
    });

    it('can subscribe multiple times to a topic', function() {
      const psub = new Psub();
      const topic = "news";
      const handler = () => {};

      psub.subscribe(topic, handler);
      psub.subscribe(topic, handler);

      const res = psub.subscriptions.map(o => o.topic);
      const expectedRes = [ "news", "news" ];

      assert.deepEqual(res, expectedRes);
    });

    it('can subscribe to different topics', function() {
      const psub = new Psub();
      const handler = () => {};

      psub.subscribe("news", handler);
      psub.subscribe("games", handler);

      const res = psub.subscriptions.map(o => o.topic);
      const expectedRes = [ "news", "games" ];

      assert.deepEqual(res, expectedRes);
    });
  });

  describe('unsubscribe', function() {
    it('can unsubscribe from a topic', function() {
      const psub = new Psub();
      const topic = "news";
      const handler = () => {};

      psub.subscribe(topic, handler);
      psub.unsubscribe(topic);

      const res = psub.subscriptions;
      const expectedRes = [];

      assert.deepEqual(res, expectedRes);
    });
  });
});
