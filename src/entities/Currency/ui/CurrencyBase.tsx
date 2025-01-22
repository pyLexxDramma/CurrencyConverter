import {Currency} from "../model/Currency.ts";
import {ReactNode, useState} from "react";

interface Props {
    currency: Currency;
    currencies: Currency[];
    onSelect: (currency: Currency) => void;
}

const CurrencyDropdown = ({ currency, currencies, onSelect }: Props) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggle = () => {
        setIsOpen(isOpen => !isOpen)
    }

    const handlerSelect = (currency: Currency) => {
        setIsOpen(false)
        onSelect(currency)
    }

    let options: ReactNode

    if (isOpen) {
        options = <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
            {currencies.map((currency) => (
                <li key={currency.code} onClick={() => { handlerSelect(currency); }}><a>[{currency.code}] {currency.name}</a></li>
            ))}
        </ul>
    }

    return <div className={ `dropdown ${isOpen ? 'dropdown-open' : ''}}` }>
        <label tabIndex={0} className="btn m-1" onClick={toggle}>Валюта: {currency.code}</label>
        {options}
    </div>
}

export default CurrencyDropdown
