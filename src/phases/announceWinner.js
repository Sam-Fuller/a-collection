/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */

const winnerView = (player) => ({
    player,
    view: [
        theCollection(true),
        {
            type: "TITLE",
            data: {
                title: gameState.winner.player.name,
                description: "successfully guessed the theme:"
            },
            child: {
                type: `CARD`,
                data: {text: gameState.winner.guess}
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
    if (context.component === 2) phaseName = "selectRule"
};

const onTimeout = () => {};

const onPlayerJoined = () => {};

const onPlayerLeft = () => {};
