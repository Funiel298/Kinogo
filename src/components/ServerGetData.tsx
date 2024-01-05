export default async function getData(link : string) {
    const response = await fetch(link)
    return response.json()

}


