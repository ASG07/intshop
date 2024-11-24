import React from 'react';
import { Link } from '@inertiajs/react';
import { Product } from '@/types';
//import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CardItem {
    title: string;
    imageUrl: string;
}

interface CardListProps {
    cards?: Product[];
}

const CardList: React.FC<CardListProps> = ({ cards = [] }) => {
    // if (!cards || cards.length === 0) {
    //     return <div className="text-center text-gray-500">No cards to display</div>;
    // }

    return (
        // <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="flex flex-col md:flex-row gap-4 overflow-x-auto ">
            {cards.map((card, index) => (
                // <Card key={index} className="overflow-hidden">
                <Link href={`${card.id}`} key={index} className="overflow-hidden min-w-60 basis-2/6">

                    <div className="p-0 place-items-center">
                        <img
                            src={`/images/products/${card.id}/360/image1.jpg`}
                            alt={card.name}
                            // className="w-full h-48 object-cover"
                            className=" h-48 object-center"
                        />
                    </div>
                    <div>
                        <h3 className=' line-clamp-2 text-lg'>{card.name}</h3>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default CardList;