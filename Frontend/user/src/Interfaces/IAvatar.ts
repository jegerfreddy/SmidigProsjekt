export interface AvatarItemProps {
    id: number;
    imageUrl: string;
    onClick : (id: number) => void;
}

export interface AvatarListProps {
    avatars?: AvatarItemProps[];
    onClick : (id: number) => void;
    
}