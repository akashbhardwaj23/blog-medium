export interface UserProfileType {
    name : string;
    email : string;
    id : string;
    followers : string[],
    following : string[]
    posts : BlogType[],
    createdAt? : string
}

export interface BlogType {
    content : string;
    title : string;
    id : string;
    createdAt : string;
    author : {
        name : string;
    }
}

export interface UserType {
    id : string,
    name : string
}