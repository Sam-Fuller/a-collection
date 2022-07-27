/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */

const options = resources.points;

const theCollection = () => {
    const name = gameState.curator.name;
    
    console.log("curator", gameState.curator._id)
    console.log("player", context.playerView.player._id)
    console.log("rule", gameState.rule)

    const collectionName = name + "'s Collection" + ((gameState.curator._id === context.playerView.player._id)? (" of " + gameState.rule): "")
    
    return ({
        type: "TITLE",
        data: {
            title: collectionName,
            description: gameState.selectedGuesses.length? undefined: `No new items have been added to ${collectionName}.`
        },
        child: {
            type: `CARD_LIST`,
            data: gameState.selectedGuesses.map((guess) => {
                return {
                    text: guess,
                };
            }),
            settings: {
                maxSelectable: 0,
            },
        },
    })

}