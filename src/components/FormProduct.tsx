'use client';

import { Label, Textarea, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';

type errorType = {
    title: string;
    price: string;
};

export default function FormProduct({ getDataForm }: any) {
    const [title, setTitle] = useState('Default');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('Default hahaha');
    const [category] = useState('electronic');
    const [image] = useState('https://www.flowbite-react.com/images/products/apple-watch.png');
    const [error, setError] = useState<errorType>({
        title: 'default',
        price: '',
    });
    //?Validate
    useEffect(() => {
        if (title.length < 3) {
            setError((prev) => {
                return { ...prev, title: 'Title must be at least 3 characters' };
            });
        } else {
            setError((prev) => {
                return { ...prev, title: '' };
            });
        }
        if (price < 1) {
            setError((prev) => {
                return { ...prev, price: 'Price must be greater than 0' };
            });
        } else {
            setError((prev) => {
                return { ...prev, price: '' };
            });
        }
    }, [title, price]);
    //Api
    useEffect(() => {
        getDataForm({ title, price, description, category, image });
    }, [title, price, description, category, image]);
    return (
        <form className="flex max-w-md flex-col gap-4">
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="title" value="Your title" />
                </div>
                <TextInput
                    id="title"
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    placeholder="name_to_insert"
                    required
                />
                {error.title && <p className="text-red-500">{error.title}</p>}
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="price" value="Your price" />
                </div>
                <TextInput
                    id="price"
                    onChange={(e) => setPrice(parseFloat(e.target.value))}
                    type="number"
                    required
                />
                {error.price && <p className="text-red-500">{error.price}</p>}
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="description" value="Your Description:" />
                </div>
                <Textarea
                    id="description"
                    name="description"
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
        </form>
    );
}
