import Transaction from "../models/transaction.model.js";
import TransactionHistory from "../models/transactionHistory.model.js";

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

    const transactionsHistory = await TransactionHistory.findOne({ userId }).populate("transactions");

    res.status(200).json(transactionsHistory.transactions );
    
   } catch (error) {
    console.log("Error from sendMessage controller " + error.message );
    res.status(500).json({ error : "Internal server error" });
   }
}

export const getTransactions = async (req , res )=> {
    try {
        const userId = req.user._id;

        const transactionsHistory = await TransactionHistory.findOne({ userId }).populate("transactions");

        const transactions = [];
        if(transactionsHistory) transactions = transactionsHistory.populate('transactions');
        
        res.status(200).json(transactions );

    }catch (error){
        console.log("Error in getMessages controller " , error.message );
        res.send(500).json({error : "Internal server error"});
    }
}