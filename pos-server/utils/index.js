const { Ability, AbilityBuilder, defineAbility } = require("@casl/ability");

function getToken(req) {
  let token = req.headers.authorization
    ? req.headers.authorization.replace("Bearer ", "")
    : null;
  return token && token.length ? token : null;
}

const policies = {
  guest(user, { can }) {
    can("read", "Product");
  },
  user(user, { can }) {
    can("read", "Product");

    can("read", "Order");
    can("create", "Order");

    can("update", "User");

    can("read", "Cart");
    can("update", "Cart");

    can("read", "DeliveryAddress");
    can("create", "DeliveryAddress");
    can("update", "DeliveryAddress");
    can("delete", "DeliveryAddress");

    can("read", "Invoice");
  },
  admin(user, { can }) {
    can("manage", "all");
  },
};

const policyFor = (user) => {
  let builder = new AbilityBuilder();
  if (user && typeof policies[user.role] === "function") {
    policies[user.role](user, builder);
  } else {
    policies["guest"](user, builder);
  }
  return new Ability(builder.rules);
};

module.exports = {
  getToken,
  policyFor,
};
