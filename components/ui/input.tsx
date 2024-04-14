// hm/components/ui/input.tsx
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    // 可以在这里添加其他自定义属性
}

const Input: React.FC<InputProps> = ({ className, ...props }) => {
    return (
        <input
            className={`border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
            {...props}
        />
    );
};

export default Input;