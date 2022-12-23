import { Web3Button } from "@thirdweb-dev/react";
import React, { useState } from "react";
import { LENS_CONTRACT_ABI, LENS_CONTRACT_ADDRESS } from "../const/contracts";
import { useCreatePost } from "../lib/useCreatePost";
import styles from "../styles/Create.module.css";

export default function Create() {
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const { mutateAsync: createPost } = useCreatePost();

  console.log("content:", {
    image,
    title,
    description,
    content,
  });

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        {/* Input for the image */}
        <div className={styles.inputContainer}>
          <input
            type="file"
            onChange={(e) => {
              if (e.target.files) {
                setImage(e.target.files[0]);
              }
            }}
          />
        </div>

        {/* Input for the title */}
        <div className={styles.inputContainer}>
          <input
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Description */}
        <div className={styles.inputContainer}>
          <textarea
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Content */}
        <div className={styles.inputContainer}>
          <textarea
            placeholder="Content"
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <Web3Button
          contractAddress={LENS_CONTRACT_ADDRESS}
          contractAbi={LENS_CONTRACT_ABI}
          action={async () => {
            if (!image) return;

            return await createPost({
              image,
              title,
              description,
              content,
            });
          }}
        >
          Create Post
        </Web3Button>
      </div>
    </div>
  );
}
