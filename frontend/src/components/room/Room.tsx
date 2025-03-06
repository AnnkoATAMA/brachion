import { use } from "../../utils/use";
import { useState } from "react";
import { Container, List, ListItem, ListItemText, Typography, CircularProgress } from "@mui/material";
import axios from "axios";

interface RoomType {
    room_id: number;
    max_players: number;
    game_type: string;
}

const fetchRooms = async (): Promise<RoomType[]> => {
    return axios.get("http://localhost:8000/api/room").then((res) => res.data);
};

const Room = () => {
    const [rooms, setRooms] = useState<RoomType[]>([]);

    const roomPromise = fetchRooms().then((data) => {
        if (!Array.isArray(data)) {
            console.error("API Response is not an array:", data);
            return;
        }
        setRooms(data);
    }).catch((error) => {
        console.error("Error fetching rooms:", error);
    });

    use(roomPromise);

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
                部屋一覧
            </Typography>
            {rooms.length === 0 ? (
                <CircularProgress />
            ) : (
                <List>
                    {rooms.map((room) => (
                        <ListItem key={room.room_id}>
                            <ListItemText
                                primary={`部屋ID: ${room.room_id}`}
                                secondary={`最大プレイヤー: ${room.max_players}, ゲームタイプ: ${room.game_type}`}
                            />
                        </ListItem>
                    ))}
                </List>
            )}
        </Container>
    );
};

export default Room;