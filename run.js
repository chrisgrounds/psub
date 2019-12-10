const { Psub } = require("./Psub");

const eventBus = [];
const psub = new Psub(eventBus);

psub.subscribe("games", function(data) {
  console.log(data.msg);
});

psub.publish("games", "red dead redemption");
psub.publish("games", "red dead redemption 2", false);
psub.publish("games", "outer worlds");

psub.eventBus.map(o => o.callback({ o.msg }));
