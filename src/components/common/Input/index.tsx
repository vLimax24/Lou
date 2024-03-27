import { Input } from "@/components/ui/input";
import { useState } from "react";

enum InputTypes {
    button = 'button',
    checkbox = 'checkbox',
    color = 'color',
    date = 'date',
    localDatetime = 'datetime-local',
    email = 'email',
    file = 'file',
    hidden = 'hidden',
    image = 'image',
    month = 'month',
    number = 'number',
    password = 'password',
    radio = 'radio',
    range = 'range',
    search = 'search',
    tel = 'tel',
    text = 'text',
    time = 'time',
    url = 'url',
    week = 'week',
}

interface InputFieldProps {
    placeholder: string;
    disabled: boolean;
    type: keyof typeof InputTypes;
    className?: string;
    onValueChange: (value: string) => void;
}

export const InputField: React.FC<InputFieldProps> = ({ placeholder, disabled, type, className, onValueChange }) => {
    const [value, setValue] = useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value
        setValue(newValue);
        onValueChange(newValue);
    };

    return (
        <Input
            type={InputTypes[type]}
            placeholder={placeholder}
            disabled={disabled}
            className={`${className} text-white`}
            value={value}
            onChange={handleChange}
        />
    );
};
