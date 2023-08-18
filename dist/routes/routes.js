"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const transactionController = __importStar(require("../controllers/transactionController"));
router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Hello This is an Example of banking DB!'
    });
});
router.get('/transactions', transactionController.getAllTransactions);
router.get('/transactions/user/:userId', transactionController.getTransactionsByUser);
router.get('/transactions/type/:type', transactionController.getTransactionsByType);
// router.post('/transactions', transactionController.createTransaction)
// router.put('/transactions/:id', transactionController.updateTransaction);
// router.delete('/transactions/:id', transactionController.deleteTransaction);
// // Get user information with balance and total expenses
// router.get('/users/:id', userController.getUserInfo);
exports.default = router;
