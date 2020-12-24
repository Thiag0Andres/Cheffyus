import React from "react";
import { PayPalButton } from "react-paypal-button-v2";

interface Props {
  amount: any;
  onSuccess: any;
  currency: any;
}

const PayPal: React.FC<Props> = (props: Props) => {
  const { amount, onSuccess, currency } = props;

  return (
    <PayPalButton
      amount={amount}
      currency={currency}
      onSuccess={(details: any, data: any) => onSuccess(details, data)}
      options={{
        clientId:
          "AWMgQpG9r48x8Yaf210TN25NZDLthFou1k6AMh2RnNlmx58l_F_xm6WSWgtOjDIwhoI6YotYtIAunxY8",
      }}
    />
  );
};

export default PayPal;
