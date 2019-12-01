const { Psub, EventBus } = require("./Psub");

const eventBus = new EventBus();
const psub = new Psub(eventBus);

psub.subscribe("games", function(msg) {
  console.log(msg);
});

psub.publish("games", "red dead redemption");
psub.publish("games", "red dead redemption 2", false);
psub.publish("games", "outer worlds");
