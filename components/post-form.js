"use client";

import { useActionState, useState, useEffect } from "react";
import Editor from "react-simple-wysiwyg";
import DOMPurify from "dompurify";
import { createPost, editPost } from "@/app/actions/post-actions";
import Loader from "@/components/loader";

export default function PostForm({ existingPost = {}, editMode = false }) {
  const [formState, formAction, isPending] =
    useActionState(editMode ? editPost : createPost, {});
  const [content, setContent] = useState('');
  const [serializedContent, setSerializedContent] = useState("");

  const onChange = (e) => {
    setContent(e.target.value);
  };

  useEffect(() => {
    if (existingPost && existingPost?.content) {
      setContent(existingPost.content);
    }
  }, [existingPost])

  useEffect(() => {
    setSerializedContent(DOMPurify.sanitize(content));
  }, [content]);

  console.log(existingPost);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        {editMode && (
          <input type="hidden" name="id" value={existingPost.id} />
        )}
        <label htmlFor="title" className="block font-medium text-gray-700">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          className="w-full border border-gray-300 rounded p-2"
          defaultValue={editMode ? existingPost.title : ''}
          required
        />
      </div>
      <div>
        <label htmlFor="excerpt" className="block font-medium text-gray-700">
          Excerpt
        </label>
        <input
          id="excerpt"
          name="excerpt"
          type="text"
          className="w-full border border-gray-300 rounded p-2"
          defaultValue={editMode ? existingPost.excerpt : ''}
          required
        />
      </div>
      <div>
        <label htmlFor="content" className="block font-medium text-gray-700">
          Content
        </label>
        <Editor value={content} onChange={onChange} />
        <input type="hidden" name="content" value={serializedContent} />
      </div>
      <div>
        <label htmlFor="author" className="block font-medium text-gray-700">
          Author
        </label>
        <input
          id="author"
          name="author"
          type="text"
          className="w-full border border-gray-300 rounded p-2"
          defaultValue={editMode ? existingPost.author : ''}
          required
        />
      </div>
      <div>
        <label htmlFor="publishedDate" className="block font-medium text-gray-700">
          Published Date
        </label>
        <input
          id="publishedDate"
          name="publishedDate"
          type="date"
          className="w-full border border-gray-300 rounded p-2"
          defaultValue={editMode ? existingPost.published_date : ''}
          required
        />
      </div>
      {formState.errors && (
        <ul className="text-sm">
          {Object.keys(formState.errors).map((error) => (
            <li key={error} className="text-red-500">{formState.errors[error]}</li>
          ))}
        </ul>
      )}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex"
        disabled={isPending}
      >
        {isPending ? (
          <>
            <Loader />
            <span className="ml-2">Processing...</span>
          </>
        ) : (
          editMode ? "Update Post" : "Create Post"
        )}
      </button>
    </form>
  )
}