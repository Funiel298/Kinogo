export default async function GetData(link : string) {
    const response = await fetch(link)
    return response.json()

}


