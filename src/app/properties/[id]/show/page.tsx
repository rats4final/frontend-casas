import { getPosts } from "@/lib/fillerData";

export default async function Page({params} : { params: {
    id: string
} }) {
    const { id } = params;
    const property = await getPosts()

    return (
        <main>
            <p>This is the {id} property</p>
        </main>
    )
}