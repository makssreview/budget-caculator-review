import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../store";
import {TransactionType} from "../../store/slice";
import {Cell, Pie, PieChart} from "recharts";
import styled from "styled-components";

export const PieGraph = () => {
    const data = useSelector<AppRootStateType, Array<TransactionType>>(state => state.transaction.copyOfTransactions)
    const categoriesExpense = ['Rental', 'Transportation', 'Utility', 'Groceries', 'Education', 'Health', 'Coffee', 'Fun Money', 'Other',]
    const categoriesIncome = ['Salary', 'Business', 'Transfer', 'Interest', 'Other Income']
    const COLORS = ['green', '#039be5', '#e51c23', '#611d98', '#48a9a6', 'D4B483'];
    const [changePie, setChangePie] = useState(false)
    const pieName = changePie ? 'Inflow' : 'Outflow'
    const pieType = changePie ? categoriesIncome : categoriesExpense

        const pieData = pieType.reduce((acc, current) => {
            const sumOfAmount = Math.abs(data.filter(el => el.category.value === current).map(el => el.amount)
                .reduce((el, acc) => acc + el, 0))
           return sumOfAmount > 0 ? [...acc, {name:current,sumOfAmount}]: acc
        }, [] as object[])


        return (
            <div>
                {data.length > 0 &&
                    <Container>
                        <PieWrapper>
                            <ChangePieWrapper onClick={() => setChangePie(!changePie)}>{pieName}</ChangePieWrapper>
                            <PieChart
                                width={450}
                                height={250}>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80}
                                    outerRadius={90}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="sumOfAmount"
                                    label={(entry) => entry.name}
                                    opacity={0.9}
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length + 1]}
                                              fontSize={15}/>
                                    ))}
                                </Pie>
                            </PieChart>

                        </PieWrapper>
                    </Container>}
            </div>
        );
    }
    ;

    const Container = styled.div`
      width: 450px;
      background: #f4f4f4;
      justify-content: center;
    `
    const PieWrapper = styled.div`
      width: 450px;
      height: 300px;

    `
    const ChangePieWrapper = styled.div`
      position: relative;
      left: 20px;
      top: 20px;
      background-color: white;
      color: #039be5;
      height: 40px;
      width: 80px;
      border-radius: 70px;
      text-align: center;
      padding: 8px;
      cursor: pointer;

      &:hover {
        background-color: #039be5;
        color: white;
        cursor: pointer;

    `
