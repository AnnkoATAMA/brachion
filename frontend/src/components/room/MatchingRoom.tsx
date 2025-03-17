import { use } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, List, ListItem, ListItemText, Typography, Button } from "@mui/material";
import { fetchRoomPlayers, leaveRoom, deleteRoom } from "../../utils/roomApi";

interface PlayerType {
    user_id: number;
    username: string;
}

const roomPlayersCache: Record<number, Promise<any>> = {};

const roomPlayersPromise = (roomId: number) => {
    if (!roomPlayersCache[roomId]) {
        roomPlayersCache[roomId] = fetchRoomPlayers(roomId);
    }
    return roomPlayersCache[roomId];
};

const MatchingRoom = () => {
    const { roomId } = useParams<{ roomId: string }>();
    const navigate = useNavigate();

    const players: PlayerType[] = use(roomPlayersPromise(Number(roomId)));

    const handleLeaveRoom = async () => {
        try {
            await leaveRoom(Number(roomId));
            navigate("/room");
        } catch (err) {
            console.error("退出に失敗しました:", err);
        }
    };

    const handleDeleteRoom = async () => {
        try {
            await deleteRoom(Number(roomId));
            console.log(`部屋 ${roomId} を削除しました`);
            navigate("/room");
        } catch (err) {
            console.error("部屋の削除に失敗:", err);
        }
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
                ルーム {roomId} - 参加者一覧
            </Typography>

            <List>
                {players.map((player) => (
                    <ListItem key={player.user_id}>
                        <ListItemText primary={player.username} />
                    </ListItem>
                ))}
            </List>

            <Button variant="contained" color="secondary" sx={{ mt: 2 }} onClick={handleLeaveRoom}>
                退出
            </Button>

            <Button variant="contained" color="error" sx={{ mt: 2, ml: 2 }} onClick={handleDeleteRoom}>
                部屋を削除
            </Button>
        </Container>
    );
};

export default MatchingRoom;
