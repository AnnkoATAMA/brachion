import { useState } from "react";

const ActionPanel = ({ playerId, socket }: { playerId: string; socket: WebSocket | null }) => {
    const [selectedTile, setSelectedTile] = useState<string | null>(null);

    const handleDiscard = () => {
        if (socket && selectedTile) {
            socket.send(JSON.stringify({ event: "discard", player: playerId, tile: selectedTile }));
        }
    };

    return (
        <div>
            <h3>アクションパネル</h3>
            <button onClick={handleDiscard} disabled={!selectedTile}>
                {selectedTile ? `${selectedTile} を捨てる` : "牌を選択してください"}
            </button>
        </div>
    );
};

export default ActionPanel;
