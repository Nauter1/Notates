import type { Post, PostSummary, PostInput } from "../types/Posts"
const API_URL = import.meta.env.VITE_BACKEND_URL

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(API_URL + endpoint, options)
    
    if (!response.ok) {
        throw new Error(
            `Request has failed, status: ${response.status}` 
        )
    }
    if (response.status === 204) {
        return undefined as T
    }
    
    return response.json() as Promise<T>
}

/* service */

export const postsServices = {
    getAll(): Promise<PostSummary[]> {
       return request<PostSummary[]>("/posts") 
    },
    getById(id: string): Promise<Post> {
       return request<Post>(`/posts/${id}`)
    },
    create(post:PostInput): Promise<void> {
        return request<void>("/posts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(post)
            
        })
    },
    update(id: string, post: PostInput): Promise<void> {
        return request<void>(`/posts/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(post)
        })
    },
    delete(id: string): Promise<void> {
        return request<void>(`/posts/${id}`, {
            method: "DELETE",
        })
    },
}