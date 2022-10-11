import React from 'react';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../store";
import {TransactionType} from "../../store/slice";
import {Bar, BarChart, CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis} from "recharts";
import {Types} from "./PieChartGraph";
import styled from "styled-components";


const formatDecimals = (item: number) => {
    return Number(item.toFixed(2))
}
type ArrayType = {
    date:Date
    amount:number
}

export const Chart = () => {
        const data = useSelector<AppRootStateType, Array<TransactionType>>(state => state.transaction.copyOfTransactions)

        const arrayExpense: Array<ArrayType> = []
        //https://stackoverflow.com/questions/71050536/how-to-sum-data-by-date-filter-in-javascript
        data.reduce(function(res:any, value) {
            let onlyDate = value.date.toLocaleDateString()

            // Second approach is just to take first 10 characters of a substring like this:
            // let onlyDate = value.date.substring(0, 10);

            if (!res[onlyDate]) {
                res[onlyDate] = { date: onlyDate, amount: 0 };
                arrayExpense.push(res[onlyDate])
            }
            res[onlyDate].amount += value.amount;
            return res;
        }, {});
        //https://bobbyhadz.com/blog/javascript-sort-array-of-objects-by-date-property
        const sortedArrayExpense =
            [...arrayExpense].sort((objA, objB) => Number(objB.date) - Number(objA.date),)
            console.log(sortedArrayExpense)


        const  filterData = sortedArrayExpense.map((el,index) => ({
        xAxis: el.date,
        expense:formatDecimals(el.amount),
    }))





    return (
        <div>
            {data.length>0?
            <Container>
                <BarChart width={430} height={250} data={filterData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey='xAxis'  tick={{fontSize: 8}} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey='expense' fill="#8884d8"  name='Cash Flow'  barSize={20} />
                </BarChart>
            </Container>
            :''
            }

        </div>
    );
}

const Container = styled.div`
  padding-top: 40px;
  width: 450px;
  height: 300px;
`
