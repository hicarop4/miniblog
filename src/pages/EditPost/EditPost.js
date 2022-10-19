import styles from "./EditPost.module.css";

import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import { useEffect } from "react";

const EditPost = () => {
  const { id } = useParams();
  const { document: post } = useFetchDocument("posts", id);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
      setImage(post.image);
      const textTags = post.tagsArray.join(", ");
      setTags(textTags);
    }
  }, [post]);

  const { user } = useAuthValue();

  const { updateDocument, response } = useUpdateDocument("posts");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    // validar url da imagem
    try {
      new URL(image);
    } catch (error) {
      setFormError("A imagem precisa ser uma URL");
    }
    // criar o array de tags
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());
    // checar todos os valores
    if (!title || !image || !tags || !body) {
      setFormError("Por favor, preencha todos os campos");
      return;
    }
    if (formError) {
      return;
    }

    const data = {
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    };
    updateDocument(id, data);

    // redirect to home page
    navigate("/dashboard");
  };

  return (
    <div className={styles.edit_post}>
      {post && (
        <>
          <h1>Editando post: {post.title}</h1>
          <p>Faça suas alterações aqui.</p>
          <form onSubmit={handleSubmit}>
            <label>
              <span>Título: </span>
              <input
                type="text"
                name="title"
                id="title"
                required
                placeholder="Pense num bom título..."
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </label>
            <label>
              <span>URL da imagem: </span>
              <input
                type="text"
                name="image"
                id="image"
                required
                placeholder="Insira o link de uma boa imagem"
                onChange={(e) => setImage(e.target.value)}
                value={image}
              />
            </label>
            <img
              className={styles.image_preview}
              src={post.image}
              alt={post.title}
            />
            <p className={styles.preview_title}>Preview</p>
            <label>
              <span>Conteúdo: </span>
              <textarea
                name="body"
                id="body"
                cols="30"
                rows="10"
                required
                placeholder="Insira a descrição do seu post"
                onChange={(e) => setBody(e.target.value)}
                value={body}
              ></textarea>
            </label>
            <label>
              <span>Tags: </span>
              <input
                type="text"
                name="tags"
                id="tags"
                required
                placeholder="Insira tags separadas por vírgulas..."
                onChange={(e) => setTags(e.target.value)}
                value={tags}
              />
            </label>

            {!response.loading && (
              <button className="btn" type="submit">
                Salvar
              </button>
            )}

            {response.loading && (
              <button className="btn" disabled type="submit">
                Aguarde...
              </button>
            )}

            {response.error && <p className="error">{response.error}</p>}
            {formError && <p className="error">{formError}</p>}
          </form>
        </>
      )}
    </div>
  );
};

export default EditPost;
