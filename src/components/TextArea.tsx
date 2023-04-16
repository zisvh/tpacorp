// components/contactForm/TextArea.tsx
import React from "react";

interface TextAreaProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
    id: string;
    name: string;
    label: string;
    placeholder: string;
    type?: string;
    error?: boolean;
    errorMessage?: string;
}
const TextArea = ({
                      id,
                      name,
                      label,
                      placeholder,
                      error,
                      errorMessage,
                      ...props
                  }: TextAreaProps) => {
    return (
        <div className="mt-4 block">
            <label className="block text-sm font-semibold leading-6 text-gray-900 dark:text-white" htmlFor={id}>
                {label}
            </label>
            <textarea
                {...props}
                id={id}
                name={name}
                rows={5}
                placeholder={placeholder}
                className="block w-full bg-gray-500/10 rounded-md border-0 px-3.5 py-2 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
            ></textarea>
            {error && <p className="mt-2 text-sm text-pink-600">*{errorMessage}</p>}
        </div>
    );
};
export default TextArea;