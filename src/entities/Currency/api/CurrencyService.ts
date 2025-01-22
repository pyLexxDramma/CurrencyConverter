import {Currency} from "../model/Currency.ts";
import {CURRENCY_BASE} from "../model";

/**
 * простой inMemoryCache, в реальном мире мб стоило сохранить в localStorage/sessionStorage
 * либо использовать готовые решения, например @tanstack/react-query
 * See: https://tanstack.com/query/latest/docs/react/guides/queries
  */
let cache: Currency[] | undefined

// https://www.cbr-xml-daily.ru/daily_json.js
export const dailyCurrency = async (): Promise<Currency[]> => {
    // сделаем глупый кеш, в реальном мире его нужно было инвалидировать раз в день
    if (cache) {
        return cache
    }

    // симулируем сетевые задержки, так же можно добавить генерацию ошибок
    await new Promise(resolve => setTimeout(resolve, Math.random() * 800));

    // т.к. неизвестно, будет ли работать АПИ когда будут проверить тестовое, замокаем апи :)
    const response = (await import('./data.json')).Valute

    // приводим данные от АПИ к виду нужному нашему приложению
    // тут так же можно было бы добавить валидацию данных, например при помощи yup или io-ts
    const currencies = Object.values(response).map((currency => {
        return {
            code: currency.CharCode,
            value: currency.Value,
            name: currency.Name,
        }
    })).concat(CURRENCY_BASE);

    cache = currencies;

    return currencies
}
