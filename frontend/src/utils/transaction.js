import { MINING_REWARD_ADDRESS } from 'config';

const calculateTotalSpent = (transactions, address) => {
    return transactions.reduce((accumulator, current) => {
        const transactionAmount =
            current.input.address === MINING_REWARD_ADDRESS
                ? 0
                : current.input.address === address
                ? current.input.amount - current.output[current.input.address]
                : 0;
        return accumulator + transactionAmount;
    }, 0);
};

const calcTransactionVolume = (data) => {
    return data.reduce((accumulator, current) => {
        const recipients = Object.keys(current.output).filter((recipient) => recipient !== current.input.address);
        recipients.forEach((recipient) => (accumulator += current.output[recipient]));
        return accumulator;
    }, 0);
};

export { calculateTotalSpent, calcTransactionVolume };
