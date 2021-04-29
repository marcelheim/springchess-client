import michealJacksonBlack from "../img/michaelJacksonBlack.png";
import michealJacksonWhite from "../img/michealJacksonWhite.png";
import React, {useContext, useState} from "react";
import {makeStyles, Toolbar, Typography} from "@material-ui/core";
import springChessDark from "../themes/springChessDark";
import {ChessContext, UserContext} from "../contexts/contexts";
import Chessboard from "chessboardjsx";
import {move} from "../utility/utils";

const Chess = require("chess.js");

const useStyles = makeStyles({
    chess: {
        '& > *': {
            margin: springChessDark.spacing(1),
        },
    },
});

function Game() {
    const classes = useStyles();

    const userContext = useContext(UserContext);
    const chessContext = useContext(ChessContext);

    const handleDrop = async ({sourceSquare, targetSquare, piece}) => {
        let promotion = "";
        console.log(sourceSquare, targetSquare, piece)
        if((piece === "wP" && targetSquare.charAt(1) === "8")
            || (piece==="bP" && targetSquare.charAt(1) === "1"))
            promotion = "q";
        await move(chessContext.chess.game.id,sourceSquare + targetSquare + promotion, userContext)
    }

    console.log(chessContext)

    return (<div>
        <Chessboard position={chessContext.chess.board ? chessContext.chess.board.position : ""} onDrop={handleDrop}
                    allowDrag={({piece, sourceSquare}) => {
                        if(chessContext.chess.player !== chessContext.chess.board.activePlayer || (chessContext.chess.board && chessContext.chess.board.checkMate)) return false;
                        return piece.charAt(0) === "b" ? chessContext.chess.player === "BLACK" : chessContext.chess.player === "WHITE";
                    }}
                    pieces={{
            wK: ({ squareWidth, isDragging }) => (
                <img
                    style={{
                        width: isDragging ? squareWidth : squareWidth,
                        height: isDragging ? squareWidth : squareWidth
                    }}
                    src={michealJacksonWhite}
                    alt={""}
                />
            ),
            bK: ({ squareWidth, isDragging }) => (
                <img
                    style={{
                        width: isDragging ? squareWidth : squareWidth,
                        height: isDragging ? squareWidth : squareWidth
                    }}
                    src={michealJacksonBlack}
                    alt={""}
                />
            )
        }}/>
        {(chessContext.chess.board && chessContext.chess.board.boardId) &&
            (chessContext.chess.board.checkMate ?
                <Typography>Winner: {chessContext.chess.board.activePlayer === "BLACK" ? "WHITE" : "BLACK"}</Typography> :
                <Typography>Your Side: {chessContext.chess.player} Active Player: {chessContext.chess.board.activePlayer}</Typography>)
        }
    </div>);
}

export default Game;