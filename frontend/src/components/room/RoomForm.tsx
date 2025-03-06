import { useState } from "react";
import { Box, Button, Container, MenuItem, Select, Typography } from "@mui/material";
import { use } from "../../utils/use";
import axios from "axios";

const createRoom = async ( gameType: string) => {
    let maxPlayers = 0;
    if (gameType === "sanma") {
        maxPlayers =3
    } else {
        maxPlayers = 4
    }
    return axios.post("http://localhost:8000/api/room", { max_players: maxPlayers, game_type: gameType });
};
const RoomForm = () => {
    const [gameType, setGameType] = useState("yonma");

    const handleCreateRoom = () => {
        const roomPromise = createRoom(gameType);
        use(roomPromise);
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
                部屋を作成
            </Typography>
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
