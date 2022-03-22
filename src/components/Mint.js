import { useEffect, useRef, useState } from "react";
import NumberFormat from "react-number-format";
import minting from "../images/svg/minting.svg";
import Quantity from "./common/Quantity";
import Price from "./Price";

import mintTitle from "../images/svg/mint.svg";
import background from "../images/svg/roulette.svg";
import ball from "../images/ball.png";
import { gsap } from "gsap/gsap-core";
import { CSSPlugin } from "gsap/all";
import { tokensInitialState } from "../services/constants";
import { mint, getInitialSupply } from "../blockchain/functions";

gsap.registerPlugin(CSSPlugin);

export default function Mint({
  setPopupVisible,
  userAddress,
  walletType,
  walletProvider,
}) {
  const [qty, setQty] = useState(1);
  const [price] = useState({
    value: "0.25 ETH",
    fee: "1 x 0.25",
  });
  const [rotating, setRotating] = useState(false);
  const ballWrapper = useRef(null);
  const ballElement = useRef(null);
  const rouletteBackground = useRef(null);
  const angle = useRef(0);
  const [token, setToken] = useState(tokensInitialState[1]);
  const [finishSpin, setFinishSpin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [minted, setMinted] = useState(0);

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function create(delay) {
    setToken(tokensInitialState[getRandomInt(4)]);
    if (delay < 800) {
      setTimeout(create, Math.ceil(delay), delay / 0.9);
    }
  }

  async function handleMint() {
    setIsLoading(true);
    rotate();
    let receipt = await mint(qty, walletType, walletProvider);
    setIsLoading(false);
    if (receipt) {
      let id = Number(receipt.events[0].topics[3]);
      console.log(receipt, id);
      setToken(`https://flokigainz.com/api/cat-roulette/images/${id}.png`);
    }
    gsap.set(rouletteBackground.current, {
      clearProps: "all",
    });
  }

  function rotate() {
    // if (!isLoading) return;
    console.log("rotating", isLoading);
    angle.current += Math.random() * 960 + 2880;
    // setRotating(true);

    gsap
      .timeline({
        defaults: {
          duration: 20,
          ease: "cubic-bezier(.5,.1,.15,.1)",
        },
        onComplete: () => {
          gsap.set(rouletteBackground.current, {
            clearProps: "all",
          });
        },
        onStart: () => {
          //   create(50);
          setToken(tokensInitialState[0]);
        },
      })
      .to(
        ballWrapper.current,
        {
          rotateZ: angle.current,
        },
        0
      )
      .add(shake(70, 0.1), 0)
      .to(
        rouletteBackground.current,
        {
          rotateZ: 3240,
        },
        0
      );
  }

  function shake(shakes, speed) {
    let tl = gsap.timeline().set(ballElement.current, { x: "+=0" });
    let x = gsap.getProperty(ballElement.current, "x");
    let y = gsap.getProperty(ballElement.current, "y");
    let rotation = gsap.getProperty(ballElement.current, "rotation");
    let initProps = { x, y, rotation };

    function R(max, min) {
      return Math.random() * (max - min) + min;
    }
    //shake a bunch of times
    for (let i = 0; i < shakes; i++) {
      tl.to(ballElement.current, speed, {
        x: initProps.x + R(-4, 4),
        y: initProps.y + R(-2, 2),
        rotation: initProps.rotation + R(-5, 5),
      });
    }
    //return to pre-shake values
    tl.to(ballElement.current, speed, {
      x: initProps.x,
      y: initProps.y,
      scale: initProps.scale,
      rotation: initProps.rotation,
    });

    return tl;
  }

  const getSupply = async () => {
    let supply = await getInitialSupply();

    if (supply) {
      setMinted(Number(supply));
    }
  };

  useEffect(() => {
    // const interval = setInterval(() => {
    //   if (finishSpin || rotating) return;
    //   setToken(tokensInitialState[getRandomInt(4)]);
    // }, 500);
    // if (finishSpin) {
    //   clearInterval(interval);
    // }
    // return () => {
    //   clearInterval(interval);
    // };
  }, [finishSpin, rotating]);

  useEffect(() => {
    getSupply();
  }, []);

  return (
    <main className="mint container">
      <div className="mint__column">
        <img src={minting} alt="minting" className="mint__title" />
        <div className="mint__count">
          <span className="mint__count-item">{minted}</span>
          <NumberFormat
            className="mint__count-item"
            value={500}
            thousandSeparator={true}
            displayType="text"
          />
        </div>
        <p className="mint__text mint__text--center">NFT Minted</p>
        <Quantity value={qty} setValue={setQty} />
        <p className="mint__text">Max 10 per transaction</p>
        <Price qty={qty} minted={minted} price={price} />
        <button
          className="button button--mint mint__button"
          onClick={userAddress ? handleMint : () => setPopupVisible(true)}
        >
          <img src={mintTitle} alt="Mint" className="button__icon" />
        </button>
      </div>
      <div className="mint__column">
        <div className="mint__roulette">
          <div className="mint__roulette-wrapper" ref={ballWrapper}>
            <img
              src={ball}
              alt="Ball"
              className="mint__roulette-ball"
              ref={ballElement}
            />
          </div>
          <img
            src={background}
            alt="Roulette"
            className="mint__roulette-background"
            ref={rouletteBackground}
          />
          <img src={token} alt="Token" className="mint__roulette-image" />
        </div>
      </div>
    </main>
  );
}
