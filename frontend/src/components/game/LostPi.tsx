import { useState, useEffect } from "react";

const LostPi = ({ roomId, socket }: { roomId: number; socket: WebSocket | null }) => {
    const [discards, setDiscards] = useState<string[]>([]);

    useEffect(() => {
        if (!socket) return;

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);

            if (data.event === "discard") {
                console.log(`Room ${roomId}: Discard event received`, data);
                setDiscards((prev) => [...prev, data.tile]);
            }
        };

        return () => {
            socket.onmessage = null;
        };
    }, [socket, roomId]);

    return (
        <div>
            <h3>捨て牌（ルーム {roomId}）</h3>
            {discards.map((tile, index) => (
                <span key={index}>{tile} </span>
            ))}
        </div>
    );
};

export default LostPi;
