import type { Badge, BadgeSummary, BadgeInput } from "../types/Badges.ts"
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

export const gamesServices = {
    getAll(): Promise<BadgeSummary[]> {
       return request<BadgeSummary[]>("/badges") 
    },
    getById(id: string): Promise<Badge> {
       return request<Badge>("/badges") 
    },
    create(badge:BadgeInput): Promise<void> {
        return request<void>("/badges", {
            method: "POST",
            headers: {
                "Contest-Type": "application/json"
            },
            body: JSON.stringify(badge)
        })
    },
    update(id: string, badge: BadgeInput): Promise<void> {
        return request<void>(`/badges/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(badge)
        })
    },
    delete(id: string): Promise<void> {
        return request<void>(`/badges/${id}`, {
            method: "DELETE",
        })
    },
}