import {useCallback, useEffect, useMemo, useState} from "react";
import {Currency} from "./Currency.ts";
import * as CurrencyService from "../api/CurrencyService.ts";

export const useCurrency = () => {
    const [loading, setLoader] = useState(true)
    const [error, setError] = useState<unknown>(null)
    const [currencies, setCurrencies] = useState<Currency[]>([])


    const fetchData = useCallback(async () => {
        try {
            setLoader(true)
            const response = await CurrencyService.dailyCurrency()
            setCurrencies(response)

            setError(null)
        } catch (error) {
            /**
             * В реальном мире мб стоило так же отправить
             * в систему мониторинга ошибок. Например, в sentry
             */
            setError(error)
            console.warn(error)
        } finally {
            setLoader(false)
        }
    }, [])


    useEffect(() => {
        void fetchData();
        /**
         * Мой фейковый код не поддерживает AbortController, но
         * в реальном мире стоило бы прервать запрос, если он не завершился сам
         *
         * () => {
         * See: https://developer.mozilla.org/en-US/docs/Web/API/AbortController
         * abortController.abort();
         * }
         */
    }, [fetchData]);

    const rates = useMemo(() => {
        return currencies.reduce<Record<string, number>>((acc, currency) => {
            acc[currency.code] = currency.value;
            return acc;
        }, {})
    }, [currencies]);


    return {
        rates,
        loading,
        error,
        currencies
    }
}
