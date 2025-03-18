import { useState } from "react";
import {Box,Typography,} from "@mui/material";
import Grid from "@mui/material/Grid2";
import "./GamePage.css"
import OpenDialogButton from "../components/mahjong/OpenDialogButton.tsx";


const GamePage = () => {
    const [myHand] = useState(["110001 11100011 10000011 10011110 11100011 10000011 10110011 11100011 10000010 10111010","11101000 10110101 10100100 110101 11100011 10000010 10111101 11100011 10000011 10111100 11100011 10000010 10111010","11100111 10011001 10111101","3p","1m","2m","3m","1s","2s","3s","東","南","西","北",]);
    const [hiddenHand,] = useState(Array(13).fill("裏"));
    const [newDiscardTiles] = useState<{ [key: string]: string }>({
        自分: "1",
        対面: "2",
        上家: "4",
        下家: "6",
    });
    const [discardTiles] = useState<{ [key: string]: string[] }>({
        自分: [],
        対面: [],
        上家: [],
        下家: [],
    });





    return (
        <Box className="container">
            <Box sx={{ textAlign: "center", p: 2, borderRadius: "15px" }} className="jyantaku">

                <Grid container direction="column" alignItems="center" spacing={1}>
                    <Grid>
                        <Typography variant="subtitle1">対面</Typography>
                        <Grid container justifyContent="center" spacing={1} sx={{ border: "2px solid black", p: 1 }}>
                            {hiddenHand.map((_, i) => (
                                <Grid key={i}>
                                    <Typography className="t-hand">裏</Typography>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
                <Box className="toi-discard-area">
                    <OpenDialogButton buttonText="対面の捨て牌" discardTiles={discardTiles.対面} />
                    <Box className="discard-pile">

                        <Typography >{newDiscardTiles.対面}</Typography>

                    </Box>
                </Box>

                <Grid container justifyContent="space-evenly" alignItems="center" sx={{ mt: 9  }}>
                    <Grid sx={{ width: "10%" }}>
                        <Typography variant="subtitle1">上家</Typography>
                        <Grid container direction="column" alignItems="center" spacing={1} sx={{ border: "2px solid black", p: 1 }}>
                            {hiddenHand.map((_, i) => (
                                <Grid key={i}>
                                    <Typography className="k-hand">裏</Typography>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>

                    <Grid sx={{ width: "18%", border: "2px solid black", p: 4 }} className="ks-discard-area">
                        <OpenDialogButton buttonText="上家の捨て牌" discardTiles={discardTiles.上家} />

                        <Grid container spacing={1}>
                            <Grid>
                                <Typography>{newDiscardTiles.上家}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid sx={{ width: "16%", border: "2px solid black", p: 9 }}>
                        <Typography variant="subtitle1">卓の中央</Typography>
                        <Grid container justifyContent="center" spacing={1}>
                        </Grid>
                    </Grid>

                    <Grid sx={{ width: "18%", border: "2px solid black", p: 4 }} className="ks-discard-area">
                        <OpenDialogButton buttonText="下家の捨て牌" discardTiles ={discardTiles.下家} />
                        <Grid container spacing={1}>
                            <Grid>
                                <Typography>{newDiscardTiles.下家}</Typography>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid sx={{ width: "10%" }}>
                        <Typography variant="subtitle1">下家</Typography>
                        <Grid container direction="column" alignItems="center" spacing={1} sx={{ border: "2px solid black", p: 1 }}>
                            {hiddenHand.map((_, i) => (
                                <Grid key={i}>
                                    <Typography className="s-hand">裏</Typography>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>

                <Box className="my-discard-area">
                    <OpenDialogButton buttonText="自分の捨て牌" discardTiles={discardTiles.自分} />
                    <Box>
                        <Grid>
                            <Typography>{newDiscardTiles.自分}</Typography>
                        </Grid>
                    </Box>
                </Box>

                <Grid sx={{ mt: 2 , p: 6}}>
                    <Typography variant="h6">自分の手牌</Typography>
                    <Grid container justifyContent="center" spacing={1} sx={{ border: "2px solid black" }}>
                        {myHand.map((tile, i) => (
                            <Grid key={i}>
                                <p  className="my-hand">{tile}</p>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Box>
        </Box>

    );
};

export default GamePage;
