/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */

const winnerView = (player) => ({
    player,
    view: [
        {
            type: "TITLE",
            data: {
                title: gameState.winner.name,
                description: "successfully guessed the theme:"
            },
            child: {
                type: `CARD`,
                data: gameState.rule
            },
        },
        {
            type: `SUBMIT_BUTTON`,
            data: `Play again`,
        },
    ]
})

const renderViews = () => {
    playerViews = players.map((player) => winnerView(player))
}

const onInitialisation = () => {
    renderViews();
};

const onSubmit = () => {
    phaseName = "selectRule"
};

const onTimeout = () => {};

const onPlayerJoined = () => {};

const onPlayerLeft = () => {};
