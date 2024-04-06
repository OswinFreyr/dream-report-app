export let Themes = [
    {
        "name": "Etudes"
    },
    {
        "name": "Relation"
    },
    {
        "name": "Vie Professionelle"
    },
    {
        "name": "Famille"
    }
];
export function addTheme(name) {
    console.log("entrée add theme")
    Themes.push({ "name": name });
}