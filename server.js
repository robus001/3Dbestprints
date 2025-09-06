const express = require("express");
const app = express();
const stripe = require("stripe")("sk_test_51Q0pYWEPOakaAu5AQZl6bCzKZUgM59DO6uf29ikNGZB9KOCTwDuswDTsrVxtVnGkGJrMnhOdRkz1UcKExqyXcNx8006RFkLXBW");
const cors = require("cors");

app.use(cors());
app.use(express.static("public")); // aici pui checkout.html
app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
  const { amount } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "ron",
            product_data: {
              name: "Comanda 3Dbestprints",
            },
            unit_amount: amount, // în bani, deci 100 RON = 10000
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: "http://localhost:3000/success.html",
      cancel_url: "http://localhost:3000/cancel.html",
    });

    res.json({ id: session.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3000, () => console.log("Server pornit pe http://localhost:3000"));
