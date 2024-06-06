export interface AvatarItemProps {
    id: number;
    imageUrl: string;
    onClick : (id: number) => void;
    orientation: string;
}

export interface AvatarListProps {
    avatars?: AvatarItemProps[];
    onClick : (id: number) => void;
    orientation: string;
    
}