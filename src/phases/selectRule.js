/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */

const curatorView = () => ({
    player: gameState.curator,
    view: [
        {
            type: "TITLE",
            data: {
                description: "Pick a theme for your collection"
            },
            child: {
                type: `TEXT_BOX`,
                data: Math.randomElement(resources.prompts)
            },
        },
        {
            type: `SUBMIT_BUTTON`,
            data: `Play`,
        },
    ]
})

const playerView = (player) => ({
    player,
    view: [
        {
            type: `CARD`,
            data: {
                text: gameState.curator.name + " is picking a theme for the collection."
            }
        },
    ]
})

const renderViews = () => {
    playerViews = gameState.players.map((player) => playerView(player))

    playerViews.push(curatorView());
}

const onInitialisation = () => {
    if (gameState.curator === undefined) {
        gameState.curator = Math.randomElement(players)
        gameState.players = players.filter((player) => player._id !== gameState.curator._id)
    }
        
    renderViews();
};

const onSubmit = () => {
    if (context.playerView.player._id === gameState.curator._id && context.component === 1) {
        gameState.rule = context.playerView.view[0].child.data

        phaseName = `submitItems`;
    }
};

const onTimeout = () => {};

const onPlayerJoined = () => {};

const onPlayerLeft = () => {};
