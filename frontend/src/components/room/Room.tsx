import { useEffect, useState } from "react";
import { Container, List, ListItem, ListItemText, Typography, CircularProgress } from "@mui/material";
import axios from "axios";

interface RoomType {
    id: number;
    max_players: number;
    game_type: string;
}

const fetchRooms = async (): Promise<RoomType[]> => {
    return axios.get("http://localhost:8000/room")
        .then((res) => {
            console.log("API Response:", res.data);  // 👈 デバッグ用
            return res.data;
        });
};

const Room = () => {
    const [rooms, setRooms] = useState<RoomType[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const loadRooms = async () => {
            try {
                const data = await fetchRooms();
                if (!Array.isArray(data)) {
                    throw new Error("API Response is not an array");
                }
                if (isMounted) {
                    setRooms(data);
                }
            } catch (err) {
                if (isMounted) {
                    setError("部屋一覧の取得に失敗しました");
                    console.error("Error fetching rooms:", err);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadRooms();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
                部屋一覧
            </Typography>
            {loading ? (
                <CircularProgress />
            ) : error ? (
                <Typography color="error">{error}</Typography>
            ) : (
                <List>
                    {rooms.map((room, index) => (
                        <ListItem key={room.id ?? `room-${index}`}>
                            <ListItemText
                                primary={`部屋ID: ${room.id}`}
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
