import React, {ChangeEvent, useState} from 'react';
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {addTransaction, changePopUp} from "../../store/slice";
import DatePicker from "react-datepicker";
import {FaWindowClose} from "react-icons/fa";
import {SelectCategoryForm} from "./SelectCategoryForm";

type FormValues = {
    text: string,
    amount: number,
    date: Date,
    category: { value: string, src: string }
};

export const TransactionForm = () => {
    const [popUpForm, setPopUpForm] = useState(false)
    const [expense, setExpense] = useState(false)
    const [error, setError] = useState(false)
    const dispatch = useDispatch()

    const initialState = {
        text: '',
        amount: 0,
        date: new Date,
        category: {value: '', src: ''}
    }
    const [form, setForm] = useState<FormValues>(initialState)


    const onClickHandler = () => {
        dispatch(addTransaction(form))
        setForm(initialState)
        setPopUpForm(false)
        dispatch(changePopUp(popUpForm))
        setError(false)

    }

    const onPopUpHandler = () => {
        //Close Transaction form
        setPopUpForm(false)
        dispatch(changePopUp(popUpForm))

    }
    const ExpenseHandler = () => {
        //Change Button
        setForm({...form, amount: 0})
        setExpense(!expense)
    }
    const AmountHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setForm({...form, amount: (expense ? -Math.abs(Number(e.target.value)) : Number(e.target.value))})
    }

    //get from SelectCategoryForm value and src and set as an Object
    const categoryItems = (value: string, src: string) => {
        setForm({...form, category: {value, src}})
    }
    const buttonNameChange = expense ? 'Expense' : 'Income'

    const handleKeyDown = (e: string) => {
        if (e === 'Escape') {
            onPopUpHandler()
        }
        if (e === 'Enter') {
            onClickHandler()
        }
    }

    return (
        <Container tabIndex={0} onKeyDown={(e) => handleKeyDown(e.key)}>
            <Wrapper>
                <TitleWrapper>Add transaction</TitleWrapper>
                <ButtonWrapper>
                    <FaWindowClose onClick={onPopUpHandler}/>
                </ButtonWrapper>
                <InputWrapper>
                    <ExpenseWrapper onClick={ExpenseHandler}>{buttonNameChange}</ExpenseWrapper>
                    <SelectCategoryForm category={categoryItems} isExpense={expense}/>
                    <CategoryWrapper type='number' value={form.amount}
                                     onChange={AmountHandler}
                                     placeholder='Amount'/>
                </InputWrapper>
                <InputWrapper>
                    <DateWrapper closeOnScroll={true}
                                 selected={form.date}
                                 onChange={(e: Date) => setForm({...form, date: e})}/>
                    <CategoryWrapper onChange={(e) => setForm({...form, text: e.target.value})}
                                     value={form.text}
                                     placeholder='Note'/>
                </InputWrapper>
                <AddButtonWrapper>
                    <Button onClick={onClickHandler}>Add</Button>
                    <Button onClick={onPopUpHandler}>Cancel</Button>
                    {error && <ErrorWrapper> Please chose Category/Enter Amount</ErrorWrapper>}
                </AddButtonWrapper>
            </Wrapper>
        </Container>
    );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Wrapper = styled.div`
  background-color: white;
  max-width: 500px;
  width: 90%;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 15px;
  border-radius: 8px;
  position: relative;
`
const TitleWrapper = styled.div`
  justify-content: left;
  border-bottom: 1px solid #767676;
  padding-bottom: 10px;
`
const InputWrapper = styled.div`
  display: flex;
  justify-content: left;
  gap: 16px;

`
const CategoryWrapper = styled.input`
  height: 40px;
  width: 140px;
  padding-left: 30px;
  background-color: #fafafa;
  border-radius: 7px;
  border: 1px solid #767676
`
const ExpenseWrapper = styled.div`
  text-align: center;
  padding: 8px;
  height: 40px;
  width: 100px;
  background-color: #282C340A;
  border-radius: 70px;
  border: none;
  cursor: pointer;
  color: #039be5;

  &:hover {
    background-color: #039be5;
    color: white;
`

const DateWrapper = styled(DatePicker)`
  height: 40px;
  padding-left: 10px;
  color: #767676;
  background-color: #fafafa;
  border-radius: 7px;
  border: 1px solid #767676
`

const ButtonWrapper = styled.button`
  position: absolute;
  top: -10px;
  right: 0;
  transform: translateY(-100%);
  font-size: 1.2rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: #e51c23;
    border-radius: 20px;
    color: white;

`
const AddButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 1rem;
  gap: 1rem;
`
const Button = styled.div`
  font-size: 15px;
  background: rgba(40, 44, 52, 0.04);
  cursor: pointer;
  border-radius: 20px;
  border: none;
  color: #039be5;
  padding: 10px 20px;

  &:hover {
    background-color: #039be5;
    color: white;
`
const ErrorWrapper = styled.div`
  font-size: 14px;
  opacity: 0.8;
  color: rgba(255, 0, 0, 0.8);

`