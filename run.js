const { Psub } = require("./Psub");

const psub = new Psub();

psub.subscribe("games", function(msg) {
  console.log(msg);
});

psub.publish("games", "red dead redemption");
