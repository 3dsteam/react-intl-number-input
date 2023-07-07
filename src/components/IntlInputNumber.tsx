import { InputHTMLAttributes, useEffect, useRef } from "react";
import { NumberInput, NumberInputOptions, NumberInputValue } from "intl-number-input";

type IntlInputNumberProps = InputHTMLAttributes<HTMLInputElement> & {
    options?: NumberInputOptions;
    value?: number;
    onInput?: (value: NumberInputValue) => void;
    onChange?: (value: NumberInputValue) => void;
};

export const IntlInputNumber = (props: IntlInputNumberProps) => {
    const input = useRef<HTMLInputElement>();
    const intlNumberInput = useRef<NumberInput>();

    useEffect(() => {
        if (intlNumberInput.current) return;

        intlNumberInput.current = new NumberInput({
            el: input.current!,
            options: {
                ...props.options,
                locale: props.options?.locale ?? navigator.language,
            },
            onInput(value) {
                props.onInput?.(value);
            },
            onChange: (value) => {
                props.onChange?.(value);
            },
        });
    }, []);

    useEffect(() => {
        if (props.value !== undefined && props.value !== intlNumberInput.current?.getValue().number) {
            intlNumberInput.current?.setValue(props.value);
        }
    }, [props.value]);

    return (
        <input
            data-testid="intl-input-number"
            ref={(el) => void (input.current = el || undefined)}
            type="text"
            {...props}
            // Exclude props that are handled by intl-number-input
            value={undefined}
            onInput={() => undefined}
            onChange={() => undefined}
        />
    );
};
