import {Link} from "react-router-dom";
import { CurrencyConvertor } from "../features/CurrencyConvertor";

const CurrencyPage = () => {
    return <main>
        <header>
            <Link to={'/convertor'}>
                <button className="btn btn-outline btn-accent">Конвертор из одной валюты в другую</button>
            </Link>
        </header>

        <CurrencyConvertor />
    </main>
}

export default CurrencyPage
