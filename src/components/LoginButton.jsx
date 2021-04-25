import React, {useContext, useEffect} from 'react';
import {Button, makeStyles} from "@material-ui/core";
import {UserContext, Web3Context} from "../contexts/contexts";

const useStyles = makeStyles({

});

function LoginButton(){
    const classes = useStyles();

    const web3Context = useContext(Web3Context);
    const userContext = useContext(UserContext);

    const handleLogin = async () => {
        if (web3Context.web3) {
            try {
                let accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
                let nonce = await (await fetch("/api/login/getNonce?publicAddress=" + accounts[0])).text();
                let signedNonce = await web3Context.web3.eth.personal.sign(nonce.toString(), accounts[0]);
                let token = await (await fetch("/api/login/getToken?signedNonce=" + signedNonce + "&nonce=" + nonce)).text()
                userContext.setUser({...userContext.user, publicAddress: accounts[0], accessToken: token, loggedIn: true});
            } catch (e) {
                console.error(e);
            }
        }
    }

    return (
        <Button onClick={handleLogin} color='secondary' variant="contained">Login</Button>
    );
}

export default LoginButton;