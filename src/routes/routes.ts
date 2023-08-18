import express, { Response, Request } from "express";
const router = express.Router();
import { db } from "../config/db.connection";
import * as transactionController from "../controllers/transactionController";
import * as userController from '../controllers/userController';

router.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: 'Hello This is an Example of banking DB!'
    });
});

router.get('/transactions', transactionController.getAllTransactions);
router.get('/transactions/user/:userId', transactionController.getTransactionsByUser);
router.get('/transactions/type/:type', transactionController.getTransactionsByType);

router.post('/transactions', transactionController.createTransaction); 
router.put('/transactions/:id', transactionController.updateTransaction);
router.delete('/transactions/:id', transactionController.deleteTransaction);

// // Get user information with balance and total expenses
// router.get('/users/:id', userController.getUserInfo);


export default router;
