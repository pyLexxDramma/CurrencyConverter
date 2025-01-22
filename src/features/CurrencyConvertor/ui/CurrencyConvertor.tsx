import {Currency, CURRENCY_BASE, CurrencyDropdown, useCurrency} from "../../../entities/Currency";
import {useMemo, useState} from "react";
import {Cashify} from "cashify";
import {Loader} from "../../../shared/ui";

const CurrencyConvertor = () => {
    const [fromCurrency, setFromCurrency] = useState<Currency>(CURRENCY_BASE)
    const [toCurrency, setToCurrency] = useState<Currency>(CURRENCY_BASE)
    const [toCurrencyValue, setToCurrencyValue] = useState(1)

    const {loading, error, currencies, rates} = useCurrency()

    const cashify = useMemo(() => new Cashify({base: CURRENCY_BASE.code, rates}), [rates]);

    if (loading) {
        /**
         * Альтернатива, сделать skeleton
         * See: https://vc.ru/design/745749-ux-pattern-vizualizaciya-zagruzki-dannyh-loader-spin-progress-skeleton-kogda-i-kak-ispolzovat
         */
        return <Loader/>
    }

    if (error) {
        /**
         * Главное не забыть обработать ошибку и уведомить пользователя, что пошло не так
         * Визуально можно выделить ошибку как отдельный блок
         * See: https://habr.com/ru/companies/jugru/articles/353668/
         */
        return <div>Произошла ошибка. Попробуйте перезагрузить страницу</div>
    }

    /**
     * Что тут можно улучшить:
     * 1. debounce на ввод числа. See: https://doka.guide/js/debounce/
     * 2. Дизайн :)
     */

    return (<>
        <p>
            Из валюты
            <CurrencyDropdown currency={fromCurrency} currencies={currencies} onSelect={setFromCurrency}/>
        </p>

        <p>
            В валюту
            <CurrencyDropdown currency={toCurrency} currencies={currencies} onSelect={setToCurrency}/>
        </p>

        <input value={toCurrencyValue} onChange={e => {
            setToCurrencyValue(Number(e.target.value) || 1);
        }} placeholder="Введите кол-во денег" type="number" className="input input-bordered w-full max-w-xs"/>

        <p className='text-2xl'>
            Результат: {cashify.convert(toCurrencyValue, {
            from: fromCurrency.code,
            to: toCurrency.code
        }).toFixed(2)} {toCurrency.code}
        </p>
    </>)
}

export default CurrencyConvertor
