import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import { Wheel } from "react-custom-roulette";
import { PrizeData, RouletteForm } from "./roulette-form.tsx";
import { Modal } from "./modal.tsx";
import ConfettiExplosion from "confetti-explosion-react";

function App(): JSX.Element {
    const [mustSpin, setMustSpin] = useState<boolean>(false);
    const [spinClicked, setSpinClicked] = useState<boolean>(false);

    const [prizeNumber, setPrizeNumber] = useState<number>(0);
    const [rouletteData, setRouletteData] = useState<PrizeData[]>([
        { id: 0, option: "", image: null },
    ]);

    const [showModal, setShowModal] = useState<boolean>(false);
    const [audioPlaying, setAudioPlaying] = useState(false);
    const [isExploding, setIsExploding] = React.useState(false);

    const [audioSong] = useState(new Audio("steam-roulette-song.mp3")); // Provide the correct path to your sound file

    const startSong = useCallback(() => {
        audioSong.play();
        setAudioPlaying(true);
    }, [audioSong]);

    const stopSong = useCallback(() => {
        audioSong.pause();
        audioSong.currentTime = 0; // Reset playback position
        setAudioPlaying(false);
    }, [audioSong]);

    const handleSpinClick = (): void => {
        const newPrizeNumber: number = Math.floor(
            Math.random() * rouletteData.length
        );
        setPrizeNumber(newPrizeNumber);
        setMustSpin(true);
        setSpinClicked(true);
        startSong();
    };

    useEffect(() => {
        if (!mustSpin && spinClicked) {
            const audioWoop = new Audio("birthday-party-horn-sound-effect.mp3");
            audioSong.volume = 0.5;
            setTimeout(() => {
                stopSong();
            }, 2000);
            audioWoop.play();
            setShowModal(true);
            setIsExploding(true);
            setTimeout(() => {
                setIsExploding(false);
            }, 2000);
        }
    }, [mustSpin, prizeNumber, spinClicked, audioSong, startSong, stopSong]);

    return (
        <div className={"container"}>
            <h1>Roulette Game</h1>
            <div className={"panel-container"}>
                <div className={"panel left"}>
                    <Wheel
                        mustStartSpinning={mustSpin}
                        prizeNumber={prizeNumber}
                        data={rouletteData}
                        outerBorderColor={["#f2f2f2"]}
                        outerBorderWidth={[25]}
                        innerBorderColor={["#f2f2f2"]}
                        radiusLineColor={["#dedede"]}
                        radiusLineWidth={[10]}
                        textColors={["#ffffff"]}
                        fontSize={[50]}
                        perpendicularText={[true]}
                        backgroundColors={["#F22B35", "#24CA69"]}
                        onStopSpinning={() => {
                            setMustSpin(false);
                        }}
                    />
                    <button className="button2" onClick={handleSpinClick}>
                        SPIN
                    </button>
                </div>
                <div className={"panel right"}>
                    <h1>Roulette Form</h1>
                    <RouletteForm
                        data={rouletteData}
                        setData={setRouletteData}
                    />
                </div>
                {showModal && (
                    <Modal
                        name={rouletteData[prizeNumber].option}
                        url={rouletteData[prizeNumber].image?.uri}
                        onClose={() => {
                            setShowModal(false);
                        }}
                    />
                )}
                {isExploding && (
                    <div className={"confetti"}>
                        <ConfettiExplosion />
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
