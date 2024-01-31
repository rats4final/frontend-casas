import axios from "axios";
import { z } from "zod";

// type Posts = {
//   data: [
//     {
//       id: number;
//       title: string;
//       body: string;
//       userId: number;
//     },
//   ];
// };

const PostSchema = z.array(
  z.object({
    id: z.number(),
    title: z.string(),
    body: z.string(),
    userId: z.number(),
  }),
);

export type Posts = z.infer<typeof PostSchema>;

export async function getPosts() {
  const { data } = await axios.get<Posts>(
    "https://jsonplaceholder.typicode.com/posts",
  );

  const safePosts = PostSchema.safeParse(data);

  if (safePosts.success) {
    return safePosts.data;
  } else {
    // TODO: this should return something else i guess
    console.error(safePosts.error);
    throw new Error("Error During Api Fetch or Validation");
    return;
  }
}

export async function getPostById(id: string) {
  const { data: post } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
  return post;
}
