import Transaction from "../models/transaction.model";
import TransactionHistory from "../models/transactionHistory.model";

export const addTransaction = async (req , res )=>{
   try {
    const { type , source , remark , debit , credit } = req.body;
    const userId = req.user._id;     // this we are adding from protected Route

    let transactionHistory  = await TransactionHistory.findOne({ userId })

    if(!transactionHistory){
        transactionHistory = await TransactionHistory.create({ userId })
    }

    const newTransaction = new Transaction({
        userId,
        type,
        source,
        remark,
        debit,
        credit,
    })

    if(newTransaction){
        transactionHistory.transactions.push(newTransaction._id);
    }

    await Promise.all([transactionHistory.save() , newTransaction.save()]);  // This will run in parallel

    res.status(201).json(transactionHistory);
    
   } catch (error) {
    console.log("Error from sendMessage controller " + error.message );
    res.status(500).json({ error : "Internal server error" });
   }
}

