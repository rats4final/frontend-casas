import axios from "axios";

export default async function Card({token, id} : {token: string, id:string}) {
    console.log(token, id);
    const {data} = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
    console.log(data)
    return (
        <p>This is the succesful fetch</p>
    )
}