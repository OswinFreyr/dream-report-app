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
    Themes.push({ "name": name });
}