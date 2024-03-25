export interface IClinics {
    id?: string;
    name?: string;
    imgUrl?: string;
    imageUrl?: string;
    imageObjectId?: string;
    descriptionHtml?: string;
    status?: number;
    address?: string;
    hasChildren?: number;
    data?: IClinics
    currentPage?: number;
    totalItems?: number
}