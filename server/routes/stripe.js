const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE);

router.post("/payment", async (req, res) => {
  const { amount, tokenId } = req.body;
  await stripe.charges.create(
    {
      source: tokenId,
      amount: amount,
      currency: "USD",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else res.status(200).json(stripeRes);
    }
  );
});
module.exports = router;
