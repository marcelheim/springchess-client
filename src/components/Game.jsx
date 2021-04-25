import React from "react";
import {makeStyles} from "@material-ui/core";
import springChessDark from "../themes/springChessDark";
import {useContext} from "react";
import {ChessContext, UserContext} from "../contexts/contexts";

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

    return (<div>

    </div>);
}

export default Game;