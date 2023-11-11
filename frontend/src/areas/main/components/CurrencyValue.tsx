import React from "react";
export const CurrencyValue: React.FC<{ currency: string, amount: number }> = ({ currency, amount }) => {
    const Format = new Intl.NumberFormat('hu-HU', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0
    })
    return Format.format(amount)
}