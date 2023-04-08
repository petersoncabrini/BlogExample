import { Post } from "../models/Post/Post";

export enum PostCategory {
    Technology = 1,
    Lifestyle = 2,
    Culture = 3,
    Business = 4,
    Education = 5,
    News = 6
}

export const PostCategoryLabelMapping = [
    { value: PostCategory.Technology, label: "Technology" },
    { value: PostCategory.Lifestyle, label: "Lifestyle" },
    { value: PostCategory.Culture, label: "Culture" },
    { value: PostCategory.Business, label: "Business" },
    { value: PostCategory.Education, label: "Education" },
    { value: PostCategory.News, label: "News" }
]