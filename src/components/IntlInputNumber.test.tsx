import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { IntlInputNumber } from "./IntlInputNumber";
import { NumberFormatStyle } from "intl-number-input";

describe("IntlInputNumber", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("renders input element", () => {
        const { getByTestId } = render(<IntlInputNumber />);
        expect(getByTestId("intl-input-number")).toBeInTheDocument();
    });

    it("renders initial value", () => {
        const { getByTestId } = render(<IntlInputNumber value={1234.56} onChange={jest.fn()} />);
        expect(getByTestId("intl-input-number")).toHaveValue("1,234.56");
    });

    it("renders initial value with specified locale", () => {
        const { getByTestId } = render(
            <IntlInputNumber value={1234.56} onChange={jest.fn()} options={{ locale: "it-IT" }} />
        );
        expect(getByTestId("intl-input-number")).toHaveValue("1.234,56");
    });

    it("callbacks onChange when input value changes", () => {
        const onChange = jest.fn();
        const { getByTestId } = render(<IntlInputNumber onChange={onChange} />);
        const input = getByTestId("intl-input-number");
        fireEvent.input(input, { target: { value: "1234.56" } });
        // Event is not fired when input value is not changed
        fireEvent.blur(input);
        expect(onChange).toHaveBeenCalledWith({ number: 1234.56, formatted: "1,234.56" });
    });

    it("renders value with currency", () => {
        const { getByTestId } = render(
            <IntlInputNumber
                value={1234.56}
                onChange={jest.fn()}
                options={{
                    currency: "EUR",
                    formatStyle: NumberFormatStyle.Currency
                }}
            />
        );
        expect(getByTestId("intl-input-number")).toHaveValue("€1,234.56");
    });

    describe("Min and Max range", () => {

        it("uses min and max range with percentage values", () => {
            const onChange = jest.fn();
            const { getByTestId } = render(
                <IntlInputNumber
                    value={45}
                    onChange={onChange}
                    options={{
                        formatStyle: NumberFormatStyle.Percent,
                        valueRange: { min: 0.1, max: 0.5 }
                    }}
                />
            );
            const input = getByTestId("intl-input-number");
            // Set value to 0, which is below the min range
            fireEvent.input(input, { target: { value: "0" } });
            fireEvent.blur(input);
            expect(onChange).toHaveBeenCalledWith({ number: 0.1, formatted: "10%" });
            // Set value to 100, which is above the max range
            fireEvent.input(input, { target: { value: "100" } });
            fireEvent.blur(input);
            expect(onChange).toHaveBeenCalledWith({ number: 0.5, formatted: "50%" });
            // Set valid value
            fireEvent.input(input, { target: { value: "30" } });
            fireEvent.blur(input);
            expect(onChange).toHaveBeenCalledWith({ number: 0.3, formatted: "30%" });
        });
    });
});
