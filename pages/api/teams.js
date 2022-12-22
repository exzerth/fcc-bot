import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("fpldata");

    const teams = await db.collection("Teams").find({}).toArray();

    res.json(teams);
  } catch (e) {
    console.error(e);
  }
};

/* export default async (req, res) {
  const client = await clientPromise;
  const db = client.db("fpldata");
  switch (req.method) {
    case "POST":
      let bodyObject = JSON.parse(req.body);
      let myPost = await db.collection("posts").insertOne(bodyObject);
      res.json(myPost.ops[0]);
      break;
    case "GET":
      const Team = await db.collection("Team").find({}).toArray();
      res.json({ status: 200, data: Team });
      break;
  }
} */

/*


  useEffect(() => {
    setPostsState(allPosts);
  }, [allPosts]);
  
  let submitForm = async (e) => {
    setLoading(true);
    e.preventDefault();
    let res = await fetch("http://localhost:3000/api/posts", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        content: content,
      }),
    });
    res = await res.json();
    setPostsState([...postsState, res]);
    setTitle("");
    setContent("");
    setLoading(false);
  }; */
