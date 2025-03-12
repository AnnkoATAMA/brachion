import { use } from "react";
import { Container, List, ListItem, ListItemText, Typography, Button } from "@mui/material";
import { fetchRooms, deleteRoom, joinRoom } from "../../utils/roomApi";
import {useNavigate} from "react-router-dom";

interface RoomType {
    id: number;
    max_players: number;
    game_type: string;
}

const roomListPromise = fetchRooms();

const Room = () => {
    const rooms: RoomType[] = use(roomListPromise);
    const navigate = useNavigate();

    const handleDeleteRoom = async (roomId: number) => {
        try {
            await deleteRoom(roomId);
            window.location.reload();
        } catch (err) {
            console.error("部屋の削除に失敗:", err);
        }
    };

    const handleJoinRoom = async (roomId: number) => {
        try {
            await joinRoom(roomId);
            console.log(`部屋 ${roomId} に参加しました`);
            navigate(`/room/${roomId}`);
        } catch (err) {
            console.error("部屋の参加に失敗:", err);
        }
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
                部屋一覧
            </Typography>
            <List>
                {rooms.map((room) => (
                    <ListItem key={room.id} sx={{ display: "flex", justifyContent: "space-between" }}>
                        <ListItemText
                            primary={`部屋ID: ${room.id}`}
                            secondary={`最大プレイヤー: ${room.max_players}, ゲームタイプ: ${room.game_type}`}
                        />
                        <Button variant="contained" color="error" onClick={() => handleDeleteRoom(room.id)}>
                            削除
                        </Button>
                        <Button variant="contained" color="success" onClick={() => handleJoinRoom(room.id)}>
                            参加
                        </Button>
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default Room;
