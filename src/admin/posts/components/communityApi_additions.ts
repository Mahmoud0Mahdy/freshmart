// ─── أضف الفانكشنز دي في communityApi.ts بتاعتك ───────────────────────────

// DELETE /api/posts/{postId}/comments/{commentId}
export const deleteComment = async (postId: number | string, commentId: number | string): Promise<void> => {
  const response = await fetch(`/api/posts/${postId}/comments/${commentId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      // لو بتستخدم auth token حطه هنا:
      // "Authorization": `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to delete comment: ${response.status}`);
  }
};

// ─── مش موجود في الـ backend دلوقتي ─────────────────────────────────────
// لما يضيفوا endpoint لتغيير status الـ post، هيكون شكله كده:
// PATCH /api/Posts/{id}/status
// export const updatePostStatus = async (postId: number | string, status: number): Promise<void> => {
//   const response = await fetch(`/api/Posts/${postId}/status`, {
//     method: "PATCH",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ status }),
//   });
//   if (!response.ok) throw new Error(`Failed to update status: ${response.status}`);
// };
