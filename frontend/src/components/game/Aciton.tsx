import { useState } from "react";

const Action = ({ playerId, socket }: { playerId: string; socket: WebSocket | null }) => {
    const [selectedTile, setSelectedTile] = useState<string | null>(null);

    const hand = ["1m", "2m", "3m", "4m", "5m", "6m", "7m", "8m", "9m"];

    const handleDiscard = () => {
        if (socket && selectedTile) {
            socket.send(JSON.stringify({ event: "discard", player: playerId, tile: selectedTile }));
            setSelectedTile(null); // 送信後にリセット
        }
    };

    return (
        <div>
            <h3>アクションパネル</h3>
            <div>
                <h4>手牌</h4>
                {hand.map((tile) => (
                    <button
                        key={tile}
                        onClick={() => setSelectedTile(tile)}
                        style={{ margin: "5px", padding: "10px", background: selectedTile === tile ? "lightblue" : "white" }}
                    >
                        {tile}
                    </button>
                ))}
            </div>
            <button onClick={handleDiscard} disabled={!selectedTile}>
                {selectedTile ? `${selectedTile} を捨てる` : "牌を選択してください"}
            </button>
        </div>
    );
};

export default Action;
