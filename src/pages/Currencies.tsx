import {useState} from "react";
import {Loader} from "../shared/ui";
import {Currency, CurrencyDropdown, CURRENCY_BASE, useCurrency} from "../entities/Currency";
import {Link} from "react-router-dom";
import {Cashify} from "cashify";

const CurrenciesPage = () => {
    const [currentCurrency, setCurrentCurrency] = useState<Currency>(CURRENCY_BASE)

    const {loading, error, currencies, rates} = useCurrency()

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

    const cashify = new Cashify({base: CURRENCY_BASE.code, rates});

    /**
     * Приводим данные к нужному для шаблона виду,
     * если вдруг это занимает много процессорного времени,
     * можно добавить useMemo
     */
    const currenciesFormatted = currencies
        .filter(({code}) => code !== currentCurrency.code)
        .map((currency, index) => ({
            index: index + 1,
            code: currency.code,
            name: currency.name,
            value: cashify.convert(1, {from: currentCurrency.code, to: currency.code}).toFixed(2)
        }))

    return <main>
        <header>
            <Link to={'/convertor'}>
                <button className="btn btn-outline btn-accent">Конвертор из одной валюты в другую</button>
            </Link>
        </header>

        <CurrencyDropdown currency={currentCurrency} currencies={currencies} onSelect={setCurrentCurrency}/>

        <table className="table">
            <caption className='text-2xl'>Курс валют</caption>
            <thead>
            <tr>
                <th></th>
                <th>Код</th>
                <th>Валюта</th>
                <th>Курс</th>
            </tr>
            </thead>
            <tbody>
            {currenciesFormatted.map((currency, index) => (
                <tr key={currency.code}>
                    <th>{index + 1}</th>
                    <td>{currency.code}</td>
                    <td>{currency.name}</td>
                    <td>{currency.value}</td>
                </tr>
            ))}
            </tbody>
        </table>
    </main>
}

export default CurrenciesPage
