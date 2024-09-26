import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const MY_DOMAIN = 'http://localhost:5173';
export const makePayment = async (req, res) => {
    console.log("payment request");
    const body = req.body;
    const items = body.map(item => {
      return { 
        price_data: { 
          currency: "pkr", 
          product_data: { 
            name: item.title, 
          }, 
          unit_amount: item.price * 100, 
        }, 
        quantity: item.qty, 
      }
    });

    
    const checkOutSession = await stripe.checkout.sessions.create({
      line_items: items,
      mode: 'payment',
      success_url: `${MY_DOMAIN}?success=true`,
      cancel_url: `${MY_DOMAIN}?canceled=true`,
    });
    res.json({id:checkOutSession.id});
  }