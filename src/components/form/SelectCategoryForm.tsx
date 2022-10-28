import React, {useCallback, useState} from 'react';
import styled from "styled-components";
import Select from "react-select";
import coffee from '../images/coffee.png'
import educations from '../images/education.png'
import fun from '../images/funspending.png'
import grocery from '../images/groceries.png'
import healths from '../images/health.png'
import others from '../images/other.png'
import rental from '../images/rental.png'
import transport from '../images/transport.png'
import utilities from '../images/utility.png'
import moneySend from '../images/transfer.png'
import work from '../images/work.png'
import business from '../images/business.png'
import deposit from '../images/deposit.png'
const IconWrapper=styled.div`
  display: flex;
  gap:  10px;
  justify-content: left;
  font-size: 17px;
`
const ImageWrapper = styled.img`
    height:30px ;
    width:30px;
    position: relative;
`
const SelectWrapper = styled(Select)`
  .Select__control {
    height: 40px;
    width: 180px;
    background-color:#fafafa ;
    border-radius: 7px;
    border: 1px solid #767676
  }

  .Select__control:hover {
    border-color: #a1a1a1;
  }

  .Select__control--is-focused {
    box-shadow: 0 0 0 1px black;
    outline: none;
  }

  .Select__indicator-separator {
    display: none;
  }
`
const optionsExpense = [
    {
        value: 'Rental',
        label: <IconWrapper><ImageWrapper src={rental} height="30px" width="30px"/>Rentals</IconWrapper>,
        src: rental
    },
    {
        value: 'Transportation',
        label: <IconWrapper><ImageWrapper src={transport} height="30px" width="30px"/>Transportation</IconWrapper>,
        src: transport
    },
    {
        value: 'Utility',
        label: <IconWrapper><ImageWrapper src={utilities} height="30px" width="30px"/>Utility</IconWrapper>,
        src: utilities
    },
    {
        value: 'Groceries',
        label: <IconWrapper><ImageWrapper src={grocery} height="30px" width="30px"/>Groceries</IconWrapper>,
        src: grocery
    },
    {
        value: 'Education',
        label: <IconWrapper><ImageWrapper src={educations} height="30px" width="30px"/>Education</IconWrapper>,
        src: educations
    },
    {
        value: 'Health',
        label: <IconWrapper><ImageWrapper src={healths} height="30px" width="30px"/>Health</IconWrapper>,
        src: healths
    },
    {
        value: 'Coffee',
        label: <IconWrapper><ImageWrapper src={coffee} height="30px" width="30px"/>Coffee</IconWrapper>,
        src: coffee
    },
    {
        value: 'Fun Money',
        label: <IconWrapper><ImageWrapper src={fun} height="30px" width="30px"/>Fun Money</IconWrapper>,
        src: fun
    },
    {
        value: 'Other',
        label: <IconWrapper><ImageWrapper src={others} height="30px" width="30px"/>Other</IconWrapper>,
        src: others
    },
]
const optionsIncome=[
    {
        value: 'Salary',
        label: <IconWrapper><ImageWrapper src={work} height="30px" width="30px"/>Salary</IconWrapper>,
        src: work
    },
    {
        value: 'Business',
        label: <IconWrapper><ImageWrapper src={business} height="30px" width="30px"/>Business</IconWrapper>,
        src: business
    },
    {
        value: 'Transfer',
        label: <IconWrapper><ImageWrapper src={moneySend} height="30px" width="30px"/>Transfer</IconWrapper>,
        src: moneySend
    },
    {
        value: 'Interest',
        label: <IconWrapper><ImageWrapper src={deposit} height="30px" width="30px"/>Interest</IconWrapper>,
        src: deposit
    },
    {
        value: 'Other Income',
        label: <IconWrapper><ImageWrapper src={others} height="30px" width="30px"/>Other Income</IconWrapper>,
        src: others
    },
]

export type PropsType ={
    category:(value:string,label:string)=>void
    isExpense:boolean
}
export const SelectCategoryForm = (props:PropsType) => {
    const [category, setCategory] =useState()

    const getValue = useCallback(() => {
        return category
            ? optionsExpense.find(c => c.value === category)
            :optionsIncome.find(c => c.value === category)
    },[category])

    const onChangeHandler = useCallback((e:any )=>{
        setCategory(e.constructor)
        props.category(e.value,e.src)
    },[category])

    const options = props.isExpense ? optionsExpense : optionsIncome

    return (
        <div>
             <SelectWrapper placeholder='Category'
                                             classNamePrefix="Select"
                                             value={getValue()}
                                             isSearchable={false}
                                             onChange={onChangeHandler}
                                             options={options}/>
        </div>
    );
};

