import { useState } from "react";
import { Box, Button, Container, MenuItem, Select, Typography } from "@mui/material";
import { use } from "../../utils/use";
import axios from "axios";

const createRoom = async (gameType: string) => {
    let maxPlayers = gameType === "sanma" ? 3 : 4;
    return axios.post("http://localhost:8000/room",
        { max_players: maxPlayers, game_type: gameType },
        { withCredentials: true } // Cookie を送信
    );
};

const RoomForm = () => {
    const [gameType, setGameType] = useState("yonma");
    const [error, setError] = useState<string | null>(null);

    const handleCreateRoom = () => {
        const roomPromise = createRoom(gameType)
            .then(() => {
                console.log("部屋作成成功");
                setError(null);
            })
            .catch((err) => {
                console.error("部屋作成エラー:", err);
                setError("部屋の作成に失敗しました");
            });

        use(roomPromise);
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
                部屋を作成
            </Typography>
            {error && <Typography color="error">{error}</Typography>}
            <Box>
                <Select
                    value={gameType}
                    onChange={(e) => setGameType(e.target.value)}
                    fullWidth
                    displayEmpty
                >
                    <MenuItem value="sanma">三麻</MenuItem>
                    <MenuItem value="yonma">四麻</MenuItem>
                </Select>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={handleCreateRoom}
                >
                    作成
                </Button>
            </Box>
        </Container>
    );
};

export default RoomForm;
