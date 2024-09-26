import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const MY_DOMAIN = 'http://localhost:5173';
export const makePayment = async (req, res) => {
    console.log("payment request");
    
    const checkOutSession = await stripe.checkout.sessions.create({
      line_items: [
        {
            price_data: {
              currency: 'usd', // Set the currency
              product_data: {
                name: 'Sample Product', // Name of the product
                description: 'A sample product description', // Optional
              },
              unit_amount: 5000, // Price in cents ($50.00 in this case)
            },
            quantity: 1, // Number of items
        },
      ],
      mode: 'payment',
      success_url: `${MY_DOMAIN}?success=true`,
      cancel_url: `${MY_DOMAIN}?canceled=true`,
    });
  
    console.log("-----------------------", checkOutSession)
    res.redirect(303, checkOutSession.url);
  }