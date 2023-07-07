import { useState } from "react";
import IntlInputNumber, { NumberInputValue } from "../../dist";
import { NumberFormatStyle } from "intl-number-input";

export default function App() {
    const [value, setValue] = useState<number>(123456.789);

    const handleOnChange = (value: NumberInputValue) => {
        setValue(value.number);
    };

    return (
        <>
            <h1>React Intl Number Input</h1>

            <section>
                <h2>Default (browser locale)</h2>
                <IntlInputNumber placeholder="Enter a number" value={value} onChange={handleOnChange} />
            </section>

            <section>
                <h2>With specified locale it-IT</h2>
                <IntlInputNumber
                    placeholder="Enter a number"
                    value={value}
                    onChange={handleOnChange}
                    options={{
                        locale: "it-IT",
                    }}
                />
            </section>

            <section>
                <h2>Currency</h2>
                <IntlInputNumber
                    placeholder="Enter a number"
                    value={value}
                    onChange={handleOnChange}
                    options={{
                        currency: "EUR",
                        formatStyle: NumberFormatStyle.Currency,
                    }}
                />
            </section>
        </>
    );
}
