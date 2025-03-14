import useWebSocket from "../../utils/useWebScoket.ts";
import Hand from "./Hand.tsx";
import DiscardPile from "./LostPi.tsx";
import ActionPanel from "./Aciton.tsx";


const GameRoom = ({ roomId, playerId }: { roomId: number; playerId: string }) => {
    const socket = useWebSocket(roomId);

    return (
        <div>
            <h2>ゲームルーム {roomId}</h2>
            <Hand playerId={playerId} />
            <DiscardPile roomId={roomId} />
            <ActionPanel playerId={playerId} socket={socket} />
        </div>
    );
};

export default GameRoom;