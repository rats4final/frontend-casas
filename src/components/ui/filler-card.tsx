import { Posts, getPosts } from "@/lib/fillerData";

export default async function FillerCard() {
    const data = await getPosts();
    return (
        <section>
            {data?.map((item)=> (
                <div key={item.id}>{item.title}</div>
            ))}
        </section>
    )
}