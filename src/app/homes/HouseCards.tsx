import axios from "axios"
import Image from "next/image"

export default async function HouseCards() {

  // const house = await (await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/properties?page=1&per_page=2`)).data

  // //console.log(house)

  // return (
  //   <div>
  //     {house.data.map((item, index) => (
  //       <div key={index}>
  //         <p>{item.title}</p>
  //         <Image
  //           height={100}
  //           width={100}
  //           src={item.media[0].url}
  //           alt="bla"
  //         />
  //       </div>
  //     ))}
  //   </div>
  // )
  return (<div>Houses!</div>);
}
