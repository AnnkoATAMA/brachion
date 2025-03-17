import useWebSocket from "../../utils/useWebScoket.ts";
import Hand from "./Hand.tsx";
import LostPi from "./LostPi.tsx";
import Action from "./Aciton.tsx";
import Game from "./Game.tsx";


const GameRoom = ({ roomId, playerId }: { roomId: number; playerId: string }) => {
    const socket = useWebSocket(roomId);

    return (
        <div>
            <h2>ゲームルーム {roomId}</h2>
            <Hand playerId={playerId} />
            <LostPi roomId={roomId} socket={socket} />
            <Action playerId={playerId} socket={socket} />
            <Game />
        </div>
    );
};

export default GameRoom;