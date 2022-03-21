import { useEffect, useState } from "react";

export default function Price({ minted, price, qty }) {
  const [finalPrice, setFinalPrice] = useState(0);

  const paymentAmount = () => {
    let supply = minted + 1;
    let price = 0;

    for (let i = 0; i < qty; i++) {
      price += getPrice(supply + i);
    }

    setFinalPrice(price.toFixed(2));
  };

  const getPrice = (_tokenId) => {
    if (_tokenId <= 150) {
      return 0.15;
    } else if (_tokenId <= 300) {
      return 0.2;
    } else {
      return 0.25;
    }
  };

  useEffect(() => {
    paymentAmount();
  }, [qty]);

  return (
    <div className="price">
      {/* <div className="price__column">
                <div className="price__value">{price.fee}</div>
                <h5 className="price__title">Excluding gas fee</h5>
            </div> */}
      <div className="price__column">
        <div className="price__value price__value--2">{finalPrice}</div>
        <h5 className="price__title">Price (Excluding gas fee)</h5>
      </div>
    </div>
  );
}
