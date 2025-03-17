import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";

const Game = () => {
    const [myHand, setMyHand] = useState<string[]>([
        "1萬", "2萬", "3萬", "4萬", "5萬", "6萬", "7萬", "8萬", "9萬", "東", "南", "西", "北"
    ]);

    const hiddenHand = Array(13).fill("back");

    const [discardPiles, setDiscardPiles] = useState<{ [key: string]: string[] }>({
        自分: [],
        上家: [],
        対面: [],
        下家: [],
    });

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:8000/ws/game/1");

        socket.onopen = () => {
            console.log("WebSocket 接続成功");
        };

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log("受信データ:", data);

            if (data.discard) {
                setDiscardPiles((prev) => ({
                    ...prev,
                    [data.player]: [...prev[data.player], data.tile],
                }));
            }
        };

        socket.onclose = () => {
            console.log("WebSocket 接続終了");
        };

        return () => {
            socket.close();
        };
    }, []);

    const handleDiscard = (tile: string) => {
        setMyHand(myHand.filter((t) => t !== tile));
        setDiscardPiles((prev) => ({ ...prev, 自分: [...prev.自分, tile] }));
    };

    return (
        <Box sx={{ textAlign: "center", p: 2 }}>
            <Typography variant="h5">バイナリ麻雀</Typography>

            <Grid container direction="column" alignItems="center" spacing={1}>
                <Grid>
                    <Typography variant="subtitle1">対面</Typography>
                    <Grid container justifyContent="center" spacing={1} sx={{ border: "2px solid black", p: 1 }}>
                        {hiddenHand.map((_, i) => (
                            <Grid key={i}>
                                <Typography>裏</Typography>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>

                <Grid sx={{ border: "2px solid black", p: 1, mt: 1 }}>
                    <Typography variant="subtitle1">対面の捨て牌</Typography>
                    <Grid container justifyContent="center" spacing={1}>
                        {discardPiles.対面.map((_tile, i) => (
                            <Grid key={i}>
                                <Typography>表</Typography>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>

            <Grid container justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
                <Grid sx={{ width: "20%" }}>
                    <Typography variant="subtitle1">上家</Typography>
                    <Grid container direction="column" alignItems="center" spacing={1} sx={{ border: "2px solid black", p: 1 }}>
                        {hiddenHand.map((_, i) => (
                            <Grid key={i}>
                                <Typography>裏</Typography>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>

                <Grid sx={{ width: "20%", border: "2px solid black", p: 1 }}>
                    <Typography variant="subtitle1">上家の捨て牌</Typography>
                    <Grid container spacing={1}>
                        {discardPiles.上家.map((_tile, i) => (
                            <Grid key={i}>
                                <Typography>表</Typography>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>

                <Grid sx={{ width: "20%", border: "2px solid black", p: 1 }}>
                    <Typography variant="subtitle1">卓の中央（捨て牌）</Typography>
                    <Grid container justifyContent="center" spacing={1}>
                        {[...discardPiles.上家, ...discardPiles.対面, ...discardPiles.下家].map((_tile, i) => (
                            <Grid key={i}>
                                <Typography>表</Typography>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>

                <Grid sx={{ width: "20%", border: "2px solid black", p: 1 }}>
                    <Typography variant="subtitle1">下家の捨て牌</Typography>
                    <Grid container spacing={1}>
                        {discardPiles.下家.map((_tile, i) => (
                            <Grid key={i}>
                                <Typography>表</Typography>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>

                <Grid sx={{ width: "20%" }}>
                    <Typography variant="subtitle1">下家</Typography>
                    <Grid container direction="column" alignItems="center" spacing={1} sx={{ border: "2px solid black", p: 1 }}>
                        {hiddenHand.map((_, i) => (
                            <Grid key={i}>
                                <Typography>裏</Typography>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>

            <Grid sx={{ border: "2px solid black", p: 1, mt: 2 }}>
                <Typography variant="subtitle1">自分の捨て牌</Typography>
                <Grid container justifyContent="center" spacing={1}>
                    {discardPiles.自分.map((_tile, i) => (
                        <Grid key={i}>
                            <Typography>表</Typography>
                        </Grid>
                    ))}
                </Grid>
            </Grid>

            <Grid sx={{ mt: 2 }}>
                <Typography variant="h6">自分の手牌</Typography>
                <Grid container justifyContent="center" spacing={1} sx={{ border: "2px solid black", p: 1 }}>
                    {myHand.map((tile, i) => (
                        <Grid key={i}>
                            <Button onClick={() => handleDiscard(tile)}>
                                <Typography>表</Typography>
                            </Button>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Box>
    );
};

export default Game;
