const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.processPayment = async (req, res) => {
    try {
        const { amount, source } = req.body;

        // Crear PaymentIntent en soles
        const paymentIntent = await stripe.paymentIntents.create({
            amount, // Monto en céntimos
            currency: 'PEN',
            payment_method: source,
            automatic_payment_methods: {
                enabled: true,
                allow_redirects: 'never',
            },
        });

        // Confirmar PaymentIntent si está en estado 'requires_confirmation'
        if (paymentIntent.status === 'requires_confirmation') {
            const confirmedPaymentIntent = await stripe.paymentIntents.confirm(paymentIntent.id);
            return res.status(200).json({ success: true, paymentIntent: confirmedPaymentIntent });
        }

        res.status(200).json({ success: true, paymentIntent });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};
