export let People = [
    {
        "name": "Pierre Palmade"
    },
    {
        "name": "Aubrey Plaza"
    },
    {
        "name": "Mickey Mouse et ses gants"
    },
    {
        "name": "Brigitte Bardot"
    },
    {
        "name": "Feldawp du Brazil"
    }
];

export function addPerson(name) {
    People.push({ "name": name });
}