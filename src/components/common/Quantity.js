export default function Quantity({ value, setValue, className }) {
  function dercrease() {
    setValue((state) => {
      if (state === 1) {
        return 1;
      } else {
        return state - 1;
      }
    });
  }

  function handleChange({ target }) {
    if (target.value < 1 || target.value.includes(".")) {
      setValue(1);
    } else if (target.value <= 10) {
      setValue(target.value);
    }
  }

  function increase() {
    if (value < 10) {
      setValue(++value);
    } else {
      setValue(10);
    }
  }

  return (
    <div className={"quantity " + (className ? className : "")}>
      <button
        className="quantity__button quantity__button--1"
        onClick={dercrease}
      ></button>
      <input
        type="number"
        className="quantity__value"
        value={value}
        onChange={handleChange}
      />
      <button
        className="quantity__button quantity__button--2"
        onClick={increase}
      ></button>
    </div>
  );
}
