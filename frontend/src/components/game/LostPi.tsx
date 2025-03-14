import { useState } from "react";

const DiscardPile = ({ roomId }: { roomId: number }) => {
    const [discards, setDiscards] = useState<string[]>([]);

    return (
        <div>
            <h3>捨て牌</h3>
            {discards.map((tile, index) => (
                <span key={index}>{tile} </span>
            ))}
        </div>
    );
};

export default DiscardPile;
