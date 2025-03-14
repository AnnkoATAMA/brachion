import { useEffect, useState } from "react";

const useWebSocket = (roomId: number) => {
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket(`ws://localhost:8000/ws/${roomId}`);

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("受信:", data);

            if (data.event === "player_turn") {
                alert(`あなたのターン: ツモ ${data.tsumo}`);
            }
        };

        setSocket(ws);

        return () => {
            ws.close();
        };
    }, [roomId]);

    return socket;
};

export default useWebSocket;
