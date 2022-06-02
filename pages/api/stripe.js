import Stripe from 'stripe';

const key = "sk_test_51L6CodCju0FP20aDKfOzbWT55lDCdN4Z3dcwUCAApM7kEi1rXphs1buZ2D4MyRq7jmJGDZDQRV1LwFbh3GA4JzHF00vlCVF06P"
console.log(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY )

const stripe = new Stripe(key);


export default async function handler(req, res) {
    if (req.method === 'POST') {
        console.log(req.body.cartItems)
        try {
            // Create Checkout Sessions from body params.
            const params = {
                submit_type: "pay",
                mode: "payment",
                payment_method_types: ['card'],
                billing_address_collection: 'auto',
                shipping_options: [{
                        shipping_rate: "shr_1L6DTpCju0FP20aDknahlmcz"
                    },
                    // {
                    //     shipping_rate: "shr_1L6DVGCju0FP20aDBXUXIvRB"
                    // }
                ],
                line_items: req.body.map((item) => {
                    const img = item.image[0].asset._ref;
                    const newImage = img.replace('image-', 'https://cdn.sanity.io/images/oxxrymha/production/').replace('-webp', '.webp');
                    console.log('image ', newImage);

                    return {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: item.name,
                                images: [newImage],
                            },
                            unit_amount: item.price * 100
                        },
                        adjustable_quantity: {
                            enabled: true,
                            minimum: 1,
                        },
                        quantity: item.quantity
                    }
                }),
                // mode: 'payment',
                success_url: `${req.headers.origin}/?success=true`,
                cancel_url: `${req.headers.origin}/?canceled=true`,
            }
            const session = await stripe.checkout.sessions.create(params);
            res.status(200).json(session);
        } catch (err) {
            res.status(err.statusCode || 500).json(err.message);
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}