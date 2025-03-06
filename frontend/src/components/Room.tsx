import {useState} from "react";

const Room = () => {
    const [loading, setLoading] = useState(false);
    const [roomId, setRoomId] = useState<string | null>(null);

    const createRoom = async () => {
        setLoading(true);
        try{
            //仮API
            const response = await fetch("/api/create-room", {
                method: "POST",
            })
            if (!response.ok) throw new Error("ルームの作成に失敗しました。");

            const data = await response.json();
            setRoomId(data.roomId);
        }
    }
}