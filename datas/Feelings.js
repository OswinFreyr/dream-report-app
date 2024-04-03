export let Feelings = [
    {
        "name" : "Joie"
    },
    {
        "name" : "Colère"
    },
    {
        "name" : "Peur"
    },
    {
        "name" : "Tristesse"
    },
    {
        "name" : "Nostalgie"
    },
    {
        "name" : "Dégoût"
    },
    {
        "name" : "Envie"
    },
    {
        "name" : "Amour"
    },
    {
        "name" : "Anxiété"
    },
    {
        "name" : "Désespoir"
    },
    {
        "name" : "Malaise"
    }
    ];

    export function addFeeling(name) {
        Feelings.push({ "name": name });
    }