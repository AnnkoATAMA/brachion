import React, { useState } from "react";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from "@mui/material";
import "../Page/GamePage.css"
interface OpenDialogButtonProps {
    buttonText: string;
    discardTiles: string[];
}

const OpenDialogButton: React.FC<OpenDialogButtonProps> = ({ buttonText, discardTiles }) => {
    const [open, setOpen] = useState<boolean>(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <button className="discard-button" onClick={handleClickOpen}>
                {buttonText}
            </button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{buttonText}</DialogTitle>
                <DialogContent>
                    {discardTiles.length > 0 ? (
                        discardTiles.map((tile: string, i: number) => (
                            <Typography key={i}>{tile}</Typography>
                        ))
                    ) : (
                        <Typography>まだ捨て牌がありません</Typography>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        閉じる
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default OpenDialogButton;
