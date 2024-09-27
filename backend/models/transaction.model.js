import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ["Income", "Expenditure"]
    },
    source: {
        type: String,
        required: true
    },
    remark: {
        type: String,
        required: true
    },
    debit: {
        type: Number,
        validate: {
            validator: function (value) {
                return this.type === "Expenditure" ? value > 0 : value === undefined;
            },
            message: "Debit amount must be provided for 'Expenditure' type and greater than 0."
        }
    },
    credit: {
        type: Number,
        validate: {
            validator: function (value) {
                return this.type === "Income" ? value > 0 : value === undefined;
            },
            message: "Credit amount must be provided for 'Income' type and greater than 0."
        }
    }
}, { timestamps: true });

// Pre-save hook to ensure only one of debit or credit is set
transactionSchema.pre("save", function (next) {
    if (this.type === "Income" && this.debit) {
        this.invalidate("debit", "Debit should not be provided for 'Income' type.");
    } else if (this.type === "Expenditure" && this.credit) {
        this.invalidate("credit", "Credit should not be provided for 'Expenditure' type.");
    }
    next();
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
