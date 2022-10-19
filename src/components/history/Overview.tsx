import React from 'react';
import {IncomeExpenseTable} from "./IncomeExpenseTable";
import {TransactionHistory} from "./TransactionHistory";

type PropsType = {
    isPie: boolean
    isChart: boolean
}

export const Overview = (props: PropsType) => {
    const show = ()=>{
        return props.isPie ||props.isChart
    }
    return (
        <div>
            <IncomeExpenseTable/>
            {   show()
                ? ''
                :<TransactionHistory/>
            }
        </div>
    );
};

