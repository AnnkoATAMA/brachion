const Hand = ({ playerId }: { playerId: string }) => {
    const tiles = ["1m", "2m", "3m", "4m", "5m", "6m", "7m", "8m", "9m"]; //仮

    return (
        <div>
            <h3>プレイヤー {playerId} の手牌</h3>
            {tiles.map((tile) => (
                <span key={tile}>{tile} </span>
            ))}
        </div>
    );
};

export default Hand;
