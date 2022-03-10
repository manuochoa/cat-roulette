import { useRef, useState } from "react";
import NumberFormat from "react-number-format";
import minting from "../images/svg/minting.svg";
import Quantity from "./common/Quantity";
import Price from "./Price";

import mintTitle from "../images/svg/mint.svg";
import token from "../images/svg/nft.svg";
import background from "../images/svg/roulette.svg";
import ball from "../images/ball.png";
import { gsap } from "gsap/gsap-core";
import { CSSPlugin } from "gsap/all";
gsap.registerPlugin(CSSPlugin)

export default function Mint() {
    const [qty, setQty] = useState(1);
    const [price] = useState({
        value: "0.25 ETH",
        fee: "1 x 0.25"
    });
    const [rotating, setRotating] = useState(false);
    const rouletteElement = useRef(null);
    // const angle = useRef(0);

    function handleMint() {
        if (rotating) return;
        // angle.current += (360) + 2880;
        setRotating(true);

        gsap.timeline({
            defaults: {
                duration: 8,
                ease: "cubic-bezier(.5,.1,.15,1)"
            },
            onComplete: () => {
                gsap.set(rouletteElement.current, {
                    clearProps: "all"
                });
                setRotating(false);
            }
        }).to(rouletteElement.current, {
            rotateZ: 3240
        });
    }

    return (
        <main className="mint container">
            <div className="mint__column">
                <img src={minting} alt="minting" className="mint__title" />
                <div className="mint__count">
                    <span className="mint__count-item">167</span>
                    <NumberFormat className="mint__count-item" value={10000} thousandSeparator={true} displayType="text" />
                </div>
                <p className="mint__text mint__text--center">NFT Minted</p>
                <Quantity value={qty} setValue={setQty} />
                <p className="mint__text">Max 20 per transaction</p>
                <Price price={price} />
                <button className="button button--mint mint__button" onClick={handleMint}>
                    <img src={mintTitle} alt="Mint" className="button__icon" />
                </button>
            </div>
            <div className="mint__column">
                <div className="mint__roulette">
                    <div className="mint__roulette-wrapper" ref={rouletteElement}>
                        <img src={background} alt="Roulette" className="mint__roulette-background" />
                        <img src={ball} alt="Ball" className="mint__roulette-ball" />
                    </div>
                    <img src={token} alt="Token" className="mint__roulette-image" />
                </div>
            </div>
        </main>
    )
}
