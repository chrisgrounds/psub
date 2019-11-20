const { Psub } = require("./Psub");

const psub = new Psub();

const gamesToken = psub.subscribe("games", function(msg) {
  console.log(msg);
});
psub.publish("games", "red dead redemption");

