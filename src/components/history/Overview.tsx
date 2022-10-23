import React from 'react';
import {IncomeExpenseTable} from "./IncomeExpenseTable";
import {TransactionHistory} from "./TransactionHistory";

type PropsType = {
    isPie: boolean
    isChart: boolean
}

export const Overview = (props: PropsType) => {
    const isShown = props.isPie || props.isChart

    return (
        <div>
            <IncomeExpenseTable/>
            {
                !isShown
                && <TransactionHistory/>
            }
        </div>
    );
};

