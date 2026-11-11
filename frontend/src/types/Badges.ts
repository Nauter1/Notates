export interface BadgeSummary {
    id: string,
    Title: string,
    Description: string,
}
export interface Badge {
    id: string,
    Title: string,
    Description: string,
    DateObtained: string,
    JoinDate: string,
    isAdmin: boolean,
    postCount: Number,
    isPlusMember: boolean,
    reactionCount: Number,
    isVerifiedArtist: boolean,
}
export interface BadgeInput {
    id: string,
    Title: string,
    Description: string,
    DateObtained: string,
    JoinDate: string,
    isAdmin: boolean,
    postCount: Number,
    isPlusMember: boolean,
    reactionCount: Number,
    isVerifiedArtist: boolean,
    createdAt: Date,
    updatedAt: Date,
}