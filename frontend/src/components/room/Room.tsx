import { useEffect, useState } from "react";
import { Container, List, ListItem, ListItemText, Typography, CircularProgress, Button } from "@mui/material";
import { fetchRooms, deleteRoom, joinRoom, leaveRoom } from "../../utils/roomApi";

interface RoomType {
    id: number;
    max_players: number;
    game_type: string;
}

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

    // const handleUpdateRoom = async (roomId: number) => {
    //     try {
    //         await updateRoom(roomId, "yonma", 4);
    //         setRooms(await fetchRooms());  // ✅ 更新後にリストを再取得
    //     } catch (err) {
    //         console.error("部屋の更新に失敗:", err);
    //     }
    // };

    const handleDeleteRoom = async (roomId: number) => {
        try {
            await deleteRoom(roomId);
            setRooms(rooms.filter(room => room.id !== roomId));  // ✅ 即時リストから削除
        } catch (err) {
            console.error("部屋の削除に失敗:", err);
        }
    };

    const handleJoinRoom = async (roomId: number) => {
        try {
            await joinRoom(roomId);
            console.log(`部屋 ${roomId} に参加しました`);
        } catch (err) {
            console.error("部屋の参加に失敗:", err);
        }
    };

    const handleLeaveRoom = async (roomId: number) => {
        try {
            await leaveRoom(roomId);
            console.log(`部屋 ${roomId} から退出しました`);
        } catch (err) {
            console.error("部屋の退出に失敗:", err);
        }
    };

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
                    {rooms.map((room) => (
                        <ListItem key={room.id} sx={{ display: "flex", justifyContent: "space-between" }}>
                            <ListItemText
                                primary={`部屋ID: ${room.id}`}
                                secondary={`最大プレイヤー: ${room.max_players}, ゲームタイプ: ${room.game_type}`}
                            />
                            {/*<Button variant="contained" color="info" onClick={() => handleUpdateRoom(room.id)}>*/}
                            {/*    更新*/}
                            {/*</Button>*/}
                            <Button variant="contained" color="error" onClick={() => handleDeleteRoom(room.id)}>
                                削除
                            </Button>
                            <Button variant="contained" color="success" onClick={() => handleJoinRoom(room.id)}>
                                参加
                            </Button>
                            <Button variant="contained" color="secondary" onClick={() => handleLeaveRoom(room.id)}>
                                退出
                            </Button>
                        </ListItem>
                    ))}
                </List>
            )}
        </Container>
    );
};

export default Room;
