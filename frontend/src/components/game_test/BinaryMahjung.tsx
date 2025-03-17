import { useState, useEffect } from "react";
import { Button, Card, Typography, Grid } from "@mui/material";

const API_URL = "http://localhost:8000";

interface BinaryMahjongProps {
    roomId: number;
}

export default function BinaryMahjong({ roomId }: BinaryMahjongProps) {
    const [hand, setHand] = useState<string[]>([]);
    const [discarded, setDiscarded] = useState<string[]>([]);
    const [winner, setWinner] = useState<string | null>(null);
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const WS_URL = `ws://localhost:8000/room/${roomId}/ws`;
        const ws = new WebSocket(WS_URL);

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === "hand") setHand(data.hand);
            if (data.type === "discarded") setDiscarded(data.discarded);
            if (data.type === "winner") setWinner(data.winner);
        };

        setSocket(ws);

        return () => {
            ws.close();
            setSocket(null);
        };
    }, [roomId]);

    const drawTile = () => {
        if (socket) {
            socket.send(JSON.stringify({ action: "draw" }));
        }
    };

    const discardTile = (tile: string) => {
        fetch(`${API_URL}/discard`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ player_id: 1, tile }),
        });
    };

    const declareRon = () => {
        fetch(`${API_URL}/ron`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ player_id: 1, is_agari: true }),
        });
    };

    const declareDoubt = () => {
        fetch(`${API_URL}/doubt`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ challenger_id: 2, target_id: 1 }),
        });
    };

    return (
        <Card sx={{ padding: 2, maxWidth: 600, margin: "auto" }}>
            <Typography variant="h5">バイナリ麻雀</Typography>
            <Typography variant="body1">あなたの手牌:</Typography>
            <Grid container spacing={1}>
                {hand.map((tile, index) => (
                    <Grid item key={index}>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => discardTile(tile)}
                        >
                            {tile}
                        </Button>
                    </Grid>
                ))}
            </Grid>
            <Button variant="contained" color="primary" onClick={drawTile} sx={{ mt: 2 }}>
                ツモる
            </Button>
            <Button variant="contained" color="success" onClick={declareRon} sx={{ mt: 2 }}>
                ロン宣言
            </Button>
            <Button variant="contained" color="error" onClick={declareDoubt} sx={{ mt: 2 }}>
                ダウト宣言
            </Button>
            <Typography variant="body1" sx={{ mt: 2 }}>捨て牌: {discarded.join(", ")}</Typography>
            {winner && <Typography variant="h6" sx={{ mt: 2 }}>勝者: {winner}</Typography>}
        </Card>
    );
}
