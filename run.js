const { Psub } = require("./Psub");

const Psub = new Psub();

const gamesToken = Psub.subscribe("games", function(msg) {
  console.log(msg);
});
Psub.publish("games", "red dead redemption");

