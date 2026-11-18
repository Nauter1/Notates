export interface PostSummary {
    id: string,
    Title: string,
    Description: string,
}
export interface Post {
     //musthave
    PostTitle: string;
    PostDescription: string;
    ReleaseDate: Date;
    ContentLink: string;
 
     //canhave
     id: string
      /*ImageURL: CreationOptional<string | null>
     IsOwnedBy: CreationOptional<number>
     Reviews: CreationOptional<Json | null>
     Comments: CreationOptional<Json | null>*/

}
export interface PostInput {
     //musthave
     PostTitle: string;
     PostDescription: string;
     ReleaseDate: Date;
     ContentLink: string;
  
      //canhave
      id: string
       /*ImageURL: CreationOptional<string | null>
      IsOwnedBy: CreationOptional<number>
      Reviews: CreationOptional<Json | null>
      Comments: CreationOptional<Json | null>*/

}