export const formatMoney = ({
    amount,
    decimalCount = 0,
    decimal = ".",
    thousands = ".",
    currency = "Rp",
}) => {
    try {
        let decimalCountData = Math.abs(decimalCount);
        decimalCountData = Number.isNaN(decimalCountData)
            ? 2
            : decimalCountData;
        let amountResult = amount;

        const negativeSign = amountResult < 0 ? "-" : "";
        amountResult = Math.abs(Number(amountResult) || 0).toFixed(
            decimalCountData
        );
        const i = Number(amountResult).toString();
        const j = i.length > 3 ? i.length % 3 : 0;
        const resultFormat =
            negativeSign +
            (j ? i.substr(0, j) + thousands : "") +
            i.substr(j).replace(/(\d{3})(?=\d)/g, `$1${thousands}`) +
            (decimalCountData
                ? decimal +
                  Math.abs(amount - i)
                      .toFixed(decimalCountData)
                      .slice(2)
                : "");
        return `${currency} ${resultFormat}`;
    } catch (e) {
        return "";
    }
};

export const percentage = (value, suffix) => {
    return `${String(value).replace(/[^0-9.,]+/g, "")}${
        !suffix || suffix === undefined ? "%" : suffix
    }`;
};
