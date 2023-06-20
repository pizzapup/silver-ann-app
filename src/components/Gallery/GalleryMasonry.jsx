import {useState, useEffect} from "react";
import {Box} from "@mui/material";
import "react-lazy-load-image-component/src/effects/opacity.css";
import {collection, getDocs} from "firebase/firestore";
import {db} from "../../firebase/firebase";
import GalleryImage from "./GalleryImage";

export const findAll = async () => {
  const docRefs = await getDocs(collection(db, "posts"));
  const res = [];
  docRefs.forEach((post) => {
    res.push({id: post.id, ...post.data()});
  });
  return res;
};

export default function GalleryMasonry() {
  const [list, setList] = useState([]);
  const [postValues, setPostValues] = useState([]);
  const [postId, setPostId] = useState("");
  const [loading, setLoading] = useState([]);
  const [enlarge, setEnlarge] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    const res = await findAll();
    setList([...res]);
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleImgClick = (id, item) => {
    setEnlarge(true);
    setPostId(id);
    setPostValues(item.values);
  };

  return (
    <>
      {enlarge ? (
        <GalleryImage
          backToGallery={() => setEnlarge(false)}
          data={postValues}
          id={postId}
        />
      ) : (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            "&::after": {content: "''", flexGrow: "999px"},
          }}
        >
          {list.map((item, i) => {
            return (
              <Box
                key={`key-${item.id}`}
                sx={{
                  flex: "1 1 auto",
                  height: "300px",
                  maxWidth: "550px",
                  position: "relative",
                }}
              >
                <Box sx={{width: "50px"}}></Box>
                <img
                  src={item.values.image}
                  alt=""
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                    verticalAlign: "middle",
                  }}
                  onClick={() => handleImgClick(item.id, item)}
                />
              </Box>
            );
          })}
        </Box>
      )}
    </>
  );
}
