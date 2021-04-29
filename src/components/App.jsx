import React, {useEffect, useState} from 'react';
import springChessDark from '../themes/springChessDark';
import { ThemeProvider } from '@material-ui/styles';
import {Container, CssBaseline, makeStyles} from '@material-ui/core';
import NavBar from "./NavBar.jsx";
import {ChessContext, UserContext, Web3Context} from "../contexts/contexts";
import detectEthereumProvider from "@metamask/detect-provider";
import Web3 from "web3";
import Chess from "./Chess";

const useStyles = makeStyles({

});

function App() {
    const classes = useStyles();

    const [web3, setWeb3] = useState(undefined);
    const [user, setUser] = useState({
        publicAddress: undefined,
        userName: undefined,
        accessToken: undefined,
        loggedIn: false
    })
    const [chess, setChess] = useState({
        game: {
            id: undefined,
            boardId: undefined,
            name: undefined,
            white: undefined,
            black: undefined,
            gameStatus: undefined
        },
        board: {
            position: undefined,
            halfMoveCounter: undefined,
            boardId: undefined,
            activePlayer: undefined,
            moveCounter: undefined,
            checkMate: undefined
        },
        player: undefined,
        gameList: []
    })


    useEffect(() => {
        detectEthereumProvider()
            .then(provider => {
                if(provider) setWeb3(new Web3(provider));
            })
    },[])

    return (
        <Web3Context.Provider value={{web3, setWeb3}}>
            <UserContext.Provider value={{user, setUser}}>
                <ChessContext.Provider value={{chess, setChess}}>
                    <ThemeProvider theme={springChessDark}>
                        <CssBaseline/>
                        <NavBar />
                        <Container>
                            <Chess/>
                        </Container>
                    </ThemeProvider>
                </ChessContext.Provider>
            </UserContext.Provider>
        </Web3Context.Provider>
    );
}

export default App;
