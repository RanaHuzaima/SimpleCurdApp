import React, { useState, useEffect } from 'react';
import { getItems, createItem, updateItem, deleteItem } from './services/api';

const App: React.FC = () => {
    const [items, setItems] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [editingItem, setEditingItem] = useState<{ id: number, name: string, description?: string } | null>(null);

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        const response = await getItems();
        setItems(response.data);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (editingItem) {
            await updateItem(editingItem.id, { id: editingItem.id, name, description });
            setEditingItem(null);
        } else {
            await createItem({ id: new Date().getTime(), name, description });
        }
        setName('');
        setDescription('');
        fetchItems();
    };

    const handleEdit = (item: { id: number, name: string, description?: string }) => {
        setName(item.name);
        setDescription(item.description || '');
        setEditingItem(item);
    };

    const handleDelete = async (id: number) => {
        await deleteItem(id);
        fetchItems();
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Simple CRUD App</h1>
            <form onSubmit={handleSubmit} className="mb-4">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="border p-2 mr-2 rounded-lg"
                />
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description"
                    className="border p-2 mr-2 rounded-lg"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg w-16">{editingItem ? 'Update' : 'Add'}</button>
            </form>
            <ul>
                {items.map((item: any) => (
                    <li key={item.id} className="border p-2 mb-2 flex justify-between rounded-lg">
                        <span>
                            <strong>{item.name}</strong>: {item.description}
                        </span>
                        <span>
                            <button onClick={() => handleEdit(item)} className="bg-yellow-500 text-white p-2 mr-2 rounded-lg w-16">Edit</button>
                            <button onClick={() => handleDelete(item.id)} className="bg-red-500 text-white p-2 rounded-lg w-16">Delete</button>
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;