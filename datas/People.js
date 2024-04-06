export let People = [
    {
        "name": "Papa"
    },
    {
        "name": "Maman"
    }
];

export function addPerson(name) {
    People.push({ "name": name });
}