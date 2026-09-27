import { useState } from "react";
import { useMarketStream } from "../../../hook/useMarketStream";

export const cryptoConvertHelper = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState("");

  const { prices } = useMarketStream();

  const fromPrice = prices[from];
  const toPrice = prices[to];

  const result =
    !amountError && Number(amount) > 0 && fromPrice && toPrice
      ? (Number(amount) * fromPrice) / toPrice
      : NaN;

  const handleAmountChange = (value: string) => {
    setAmount(value);

    if (value === "") {
      setAmountError("");
      return;
    }

    if (!/^\d*\.?\d*$/.test(value)) {
      setAmountError("Please enter a valid number.");
      return;
    }

    const numberValue = Number(value);

    if (numberValue <= 0) {
      setAmountError("Amount must be greater than 0.");
      return;
    }

    setAmountError("");
  };
  return {
    from,
    setFrom,
    to,
    setTo,
    amount,
    amountError,
    handleAmountChange,
    fromPrice,
    toPrice,
    result,
  };
};
