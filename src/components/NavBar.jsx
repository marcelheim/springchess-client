import React, {useContext} from 'react';
import {AppBar, Button, makeStyles, Tab, Tabs, Toolbar, Typography} from "@material-ui/core";
import LoginButton from "./LoginButton";
import {UserContext} from "../contexts/contexts";

const useStyles = makeStyles({
    "appBar": {
        "& div p": {
            flexGrow: 1
        },
        "& div div": {
            flexGrow: 1
        }
    },
});

function NavBar(){
    const classes = useStyles();

    const userContext = useContext(UserContext);

    return (
        <AppBar className={classes.appBar} position='relative' elevation={0} color="primary">
            <Toolbar>
                <Typography color='inherit'>Spring Chess</Typography>
                {!userContext.user.loggedIn && <LoginButton />}
                {userContext.user.loggedIn && <Button>{userContext.user.publicAddress}</Button>}
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;