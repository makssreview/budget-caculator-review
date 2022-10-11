import React from 'react';
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store";
import {deleteTransaction, TransactionType} from "../../store/slice";

export interface ColorProps {
    amount: number
}

export const TransactionHistory = () => {
    let transactions = useSelector<AppRootStateType, Array<TransactionType>>(state => state.transaction.copyOfTransactions)
    const dispatch = useDispatch()
    return (
        <Container>
            {transactions.map((el) => {
                return (
                    <ListWrapper key={el.id}>
                        <DivWrapper>
                            <ImgWrapper src={el.category.src}/>
                            <ElementWrapper>
                                <div>{el.category.value}</div>
                                <DateWrapper>{el.date.toLocaleDateString('en-US')}</DateWrapper>
                            </ElementWrapper>
                            <TextWrapper>{el.text}</TextWrapper>
                            <SpanWrapper amount={el.amount}>{el.amount}$</SpanWrapper>
                            <ButtonWrapper
                                onClick={(e) =>
                                    dispatch(deleteTransaction(el.id))}>x</ButtonWrapper>
                        </DivWrapper>
                    </ListWrapper>

                )
            })}
        </Container>
    );
};

const Container = styled.ul`
  width: 450px;
  background: #f4f4f4;
  list-style-type: none;
  padding: 0;
`
const ListWrapper = styled.div`
  margin-top: 32px;
  height: 75px;
  background-color: #ffff;
  margin-left: 0;
  position: relative;
  display: block;
  margin-bottom: 32px;
`
const DivWrapper = styled.div`
  display: flex;
  padding: 20px 12px;
  gap: 10px;
`
const ElementWrapper = styled.div`
`
const DateWrapper = styled.div`
  font-size: 12px;
  color: #9e9e9e;
`
const TextWrapper = styled.div`
  font-size: 14px;
  padding: 12px 20px;
  opacity: 0.7;
  color: #008000FF;
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
`
const ImgWrapper = styled.img`
  width: 40px;
  height: 40px;
`
const SpanWrapper = styled.span<ColorProps>`
  justify-content: center;
  padding-top: 8px;
  position: absolute;
  right: 16px;
  color: ${props=>props.amount >0 ? '#039be5':'#e51c23'}
`
const ButtonWrapper = styled.button`
  cursor: pointer;
  background-color: rgba(255, 63, 101, 0.56);
  border: 0;
  color: #ffffff;
  font-size: 20px;
  line-height: 20px;
  padding: 2px 5px;
  position: absolute;
  top: 50%;
  left: 0;
  transform: translate(-100%, -50%);
  opacity: 0.2;
  &:hover {
    background-color: #039be5;
    color: white;
`
