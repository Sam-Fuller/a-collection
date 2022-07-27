/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */

const options = resources.points;

const theCollection = (isCurator) => {
    const name = gameState.curator.name;
    const collectionName = name + "'s Collection" + (isCurator? " of " + gameState.rule: "")
    
    return ({
        type: "TITLE",
        data: {
            title: collectionName,
            description: (gameState.collection.length + gameState.selectedGuesses.length)? undefined: `No new items have been added to ${collectionName}.`
        },
        child: {
            type: `CARD_LIST`,
            data: gameState.collection.map((guess) => {
                return {
                    text: guess,
                };
            }).concat(
                gameState.selectedGuesses.map((guess) => {
                    return {
                        text: guess,
                    };
                })
            ),
            settings: {
                maxSelectable: 0,
            },
        },
    })

}