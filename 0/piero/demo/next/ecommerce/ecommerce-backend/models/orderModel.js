import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    products: [
    {
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        }
    },
    ],
    payment: {},
    status: {
        type: String,
        default: "Pendiente de pago",
        enum: ["Pedido Recibido", "Preparando envío", "Enviado", "Entregado", "Cancelado", "Devuelto", "Reembolsado"],
    },
},{ 
    timestamps: true 
});

export default mongoose.model("orders", orderSchema);